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

interface PaymentInfoState {
  orderId: string;
  itemName: string;
  quantity: number;
  totalPrice: number;
  customerName?: string;
  customerEmail?: string;
}

// 토스페이먼츠 클라이언트 키 (실제 키로 교체 필요)
const tossClientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // location.state에서 결제 정보를 가져온다
  const paymentInfo = location.state as PaymentInfoState | null;
  const [selectedMethod, setSelectedMethod] = useState<
    'KAKAOPAY' | 'TOSS_TRANSFER'
  >('KAKAOPAY');
  const [tossWidgets, setTossWidgets] = useState<any>(null);
  const [tossPayments, setTossPayments] = useState<any>(null);

  // 1. 토스 위젯 인스턴스 생성
  useEffect(() => {
    async function fetchTossPayments() {
      const loadedTossPayments = await loadTossPayments(tossClientKey);
      setTossPayments(loadedTossPayments);
    }
    fetchTossPayments();
  }, []);

  // 2. 토스 위젯 렌더링
  // useEffect(() => {
  //   if (tossWidgets == null || !paymentInfo) return;

  //   async function renderTossWidgets() {
  //     await tossWidgets.setAmount({
  //       currency: 'KRW',
  //       value: paymentInfo?.totalPrice,
  //     });
  //     await tossWidgets.renderPaymentMethods({
  //       selector: '#payment-method',
  //       variantKey: 'DEFAULT',
  //     });
  //     await tossWidgets.renderAgreement({
  //       selector: '#agreement',
  //       variantKey: 'AGREEMENT',
  //     });
  //     setTossReady(true);
  //   }
  //   renderTossWidgets();
  // }, [tossWidgets, paymentInfo]);

  const kakaoPayment = async () => {
    // paymentInfo가 없으면 결제 요청을 보내지 않습니다.
    if (!paymentInfo) {
      alert('결제 정보가 없습니다.');
      return;
    }

    try {
      const response = await API.post('/kakao-pay/ready', paymentInfo);

      if (response.data && response.data.data.next_redirect_mobile_url) {
        const nextRedirectUrl = response.data.data.next_redirect_mobile_url;
        window.location.href = nextRedirectUrl;

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
    if (!tossPayments || !paymentInfo) {
      alert('결제 모듈이 준비되지 않았습니다.');
      return;
    }
    try {
      const customerKey = window.btoa(Math.random().toString()).slice(0, 20);
      const payment = tossPayments.payment({ customerKey });

      await payment.requestPayment({
        method: 'TRANSFER',
        amount: {
          currency: 'KRW',
          value: paymentInfo.totalPrice,
        },
        orderId: paymentInfo.orderId,
        orderName: paymentInfo.itemName,
        customerName: paymentInfo.customerName || '고객님',
        customerEmail: paymentInfo.customerEmail,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/fail`,
        // 계좌이체 관련 추가 옵션
        transfer: {
          cashReceipt: {
            type: '소득공제', // 현금영수증 종류
          },
          useEscrow: false, // 에스크로 사용 여부
        },
      });
    } catch (error) {
      console.error('Toss Payment error:', error);
      alert('토스페이먼츠 요청 중 오류가 발생했습니다.');
    }
  };

  // --- 메인 핸들러 ---
  const handlePayment = () => {
    if (paymentInfo) {
      sessionStorage.setItem('orderId', paymentInfo.orderId);
      sessionStorage.setItem('totalPrice', paymentInfo.totalPrice.toString());
      sessionStorage.setItem('quantity', paymentInfo.quantity.toString());
    }

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
        <div className="w-full rounded-[1rem] box-border p-3 shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] bg-[#FAFAFA] mb-8">
          <div className="flex flex-col">
            <span className="w-fit px-3.5 py-1.5 text-sm rounded-full font-semibold mb-3">
              결제수단
            </span>
            <div className="flex gap-4">
              {/* 카카오페이 선택 버튼 */}
              <div className="text-center">
                <button
                  onClick={() => setSelectedMethod('KAKAOPAY')}
                  className={`rounded-2xl box-border p-3 font-bold ${
                    selectedMethod === 'KAKAOPAY'
                      ? 'rounded-2xl border border-[#95E3FF] bg-[#FDFDFD] shadow-[0_0_4px_4px_rgba(0,187,255,0.16)]'
                      : 'border border-gray-300 text-gray-500'
                  }`}
                >
                  <img
                    src={KakaoTalkIcon}
                    alt="카카오톡"
                    className="mx-auto mb-2"
                  />
                  카카오 페이
                </button>
              </div>
              {/* 계좌이체(토스) 선택 버튼 */}
              <div className="text-center">
                <button
                  onClick={() => setSelectedMethod('TOSS_TRANSFER')}
                  className={`rounded-2xl box-border px-6 py-2 font-bold ${
                    selectedMethod === 'TOSS_TRANSFER'
                      ? 'rounded-2xl border border-[#95E3FF] bg-[#FDFDFD] shadow-[0_0_4px_4px_rgba(0,187,255,0.16)]'
                      : 'border border-gray-300 text-gray-500'
                  }`}
                >
                  <img
                    src={TransferIcon}
                    alt="계좌이체"
                    className="mx-auto mb-2"
                  />
                  계좌이체
                </button>
              </div>{' '}
            </div>
          </div>
        </div>
        <ButtonComponent
          text={`결제하기`}
          onClick={handlePayment}
          // tossPayments 인스턴스가 로드되었는지 여부로 활성화 결정
          isActive={selectedMethod === 'TOSS_TRANSFER' ? !!tossPayments : true}
        />
      </BodyContainer>
    </ClassContainer>
  );
}
