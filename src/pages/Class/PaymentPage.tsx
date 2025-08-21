import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from '../../apis/axios';
import BodyContainer from '../../components/common/BodyContainer';
import ButtonComponent from '../../components/common/ButtonComponent';
import ClassContainer from '../../components/class/ClassContainer';
import ClassHeaderBar from '../../components/class/ClassHeaderBar';
import KakaoTalkIcon from '../../assets/class/kakaotalk.svg';
import TransferIcon from '../../assets/class/transfer.svg';

import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';

// location.state로 받아올 데이터의 타입을 정의합니다.
interface PaymentInfoState {
  orderId: string;
  itemName: string;
  quantity: number;
  totalPrice: number;
  customerName?: string;
  customerEmail?: string;
}

// 토스페이먼츠 클라이언트 키 (실제 키로 교체 필요)
const tossClientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. location.state에서 결제 정보를 가져옵니다.
  // 타입 단언을 사용하여 state의 타입을 명확히 합니다.
  const paymentInfo = location.state as PaymentInfoState | null;
  const [selectedMethod, setSelectedMethod] = useState<
    'KAKAOPAY' | 'TOSS_TRANSFER'
  >('KAKAOPAY');
  const [tossWidgets, setTossWidgets] = useState<any>(null);
  const [tossReady, setTossReady] = useState(false);

  // 2. 데이터 유효성 검사
  // 만약 state 없이 이 페이지에 직접 접근하면, 이전 페이지로 돌려보냅니다.
  useEffect(() => {
    if (!paymentInfo) {
      alert('잘못된 접근입니다. 이전 페이지로 돌아갑니다.');
      navigate(-1); // 이전 페이지로 이동
    }
  }, [paymentInfo, navigate]);

  // 1. 토스 위젯 인스턴스 생성
  useEffect(() => {
    if (selectedMethod !== 'TOSS_TRANSFER' || !paymentInfo) return;

    async function fetchTossWidgets() {
      const tossPayments = await loadTossPayments(tossClientKey);
      const widgets = tossPayments.widgets({
        // 고객을 특정하는 값으로, 실제 유저 ID 또는 이름을 사용하는 것을 권장합니다.
        customerKey: paymentInfo?.customerName || ANONYMOUS,
      });
      setTossWidgets(widgets);
    }
    fetchTossWidgets();
  }, [selectedMethod, paymentInfo]);

  // 2. 토스 위젯 렌더링
  useEffect(() => {
    if (tossWidgets == null || !paymentInfo) return;

    async function renderTossWidgets() {
      await tossWidgets.setAmount({
        currency: 'KRW',
        value: paymentInfo?.totalPrice,
      });
      await tossWidgets.renderPaymentMethods({
        selector: '#payment-method',
        variantKey: 'DEFAULT',
      });
      await tossWidgets.renderAgreement({
        selector: '#agreement',
        variantKey: 'AGREEMENT',
      });
      setTossReady(true);
    }
    renderTossWidgets();
  }, [tossWidgets, paymentInfo]);

  const kakaoPayment = async () => {
    // paymentInfo가 없으면 결제 요청을 보내지 않습니다.
    if (!paymentInfo) {
      alert('결제 정보가 없습니다.');
      return;
    }

    try {
      const response = await API.post('/kakao-pay/ready', paymentInfo);

      if (response.data && response.data.data.next_redirect_pc_url) {
        const nextRedirectUrl = response.data.data.next_redirect_pc_url;
        window.location.href = nextRedirectUrl;
        navigate(
          `/payment/success?provider=kakao&orderId=${paymentInfo.orderId}`,
          {
            replace: true,
          }
        );

        console.log('카카오페이: ', response.data.data);
      } else {
        alert(`결제 준비에 실패했습니다: ${response.data.message}`);
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('결제 요청 중 오류가 발생했습니다.');
    }
  };

  const tossPayment = async () => {
    if (!tossWidgets || !paymentInfo) return;
    try {
      await tossWidgets.requestPayment({
        orderId: paymentInfo.orderId,
        orderName: paymentInfo.itemName,
        customerName: paymentInfo.customerName,
        customerEmail: paymentInfo.customerEmail,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (error) {
      console.error('토스 결제 요청 에러:', error);
      alert('결제 요청 중 에러가 발생했습니다.');
    }
  };

  // --- 메인 핸들러 ---
  const handlePayment = () => {
    if (selectedMethod === 'KAKAOPAY') {
      kakaoPayment();
    } else if (selectedMethod === 'TOSS_TRANSFER') {
      tossPayment();
    }
  };

  // paymentInfo가 로드되기 전에 렌더링되는 것을 방지
  if (!paymentInfo) {
    return null; // 또는 로딩 스피너를 보여줄 수 있습니다.
  }

  return (
    <ClassContainer>
      <ClassHeaderBar title="결제하기" />
      <BodyContainer>
        <div className="w-full rounded-[1rem] box-border p-3 shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-8">
          <div className="flex flex-col">
            <span className="w-fit px-3.5 py-1.5 text-sm rounded-full font-semibold mb-3">
              결제수단
            </span>
            <div className="flex gap-4">
              {/* 카카오페이 선택 버튼 */}
              <div className="text-center">
                <img
                  src={KakaoTalkIcon}
                  alt="카카오톡"
                  className="mx-auto mb-2"
                />
                <button
                  onClick={() => setSelectedMethod('KAKAOPAY')}
                  className={`rounded-2xl box-border p-3 font-bold ${
                    selectedMethod === 'KAKAOPAY'
                      ? 'border-2 border-blue-500 bg-blue-50 text-blue-700'
                      : 'border border-gray-300 text-gray-500'
                  }`}
                >
                  카카오 페이
                </button>
              </div>
              {/* 계좌이체(토스) 선택 버튼 */}
              <div className="text-center">
                <img
                  src={TransferIcon}
                  alt="계좌이체"
                  className="mx-auto mb-2"
                />
                <button
                  onClick={() => setSelectedMethod('TOSS_TRANSFER')}
                  className={`rounded-2xl box-border p-3 font-bold ${
                    selectedMethod === 'TOSS_TRANSFER'
                      ? 'border-2 border-blue-500 bg-blue-50 text-blue-700'
                      : 'border border-gray-300 text-gray-500'
                  }`}
                >
                  계좌이체
                </button>
              </div>{' '}
            </div>
          </div>
        </div>
        {/* 토스페이먼츠 위젯이 렌더링될 영역 (계좌이체 선택 시 보임) */}
        {selectedMethod === 'TOSS_TRANSFER' && (
          <div className="mb-8">
            <div id="payment-method" className="w-full" />
            <div id="agreement" className="w-full" />
          </div>
        )}
        <ButtonComponent
          text={`${paymentInfo.totalPrice.toLocaleString()}원 결제하기`}
          onClick={handlePayment}
          // 토스 위젯이 준비 중일 때는 버튼 비활성화
          isActive={selectedMethod === 'TOSS_TRANSFER' ? tossReady : true}
        />{' '}
      </BodyContainer>
    </ClassContainer>
  );
}
