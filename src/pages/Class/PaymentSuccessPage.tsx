import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'; // 데이터를 받기 위해 import
import ClassContainer from '../../components/class/ClassContainer';
import ClassHeaderBar from '../../components/class/ClassHeaderBar';
import BodyContainer from '../../components/common/BodyContainer';
import CheckIcon from '../../assets/class/check.svg';
// 아래 아이콘들은 실제 프로젝트 경로에 맞게 준비해야 합니다.
import StarCharacterIcon from '../../assets/class/main-character.svg';
import WonIcon from '../../assets/class/money.svg';
import PeopleIcon from '../../assets/class/people.svg';
import ButtonComponent from '../../components/common/ButtonComponent';
import { confirmTossPayment, getClassDetail } from '../../apis/apply/applyApi';
import type { ClassDetailData } from '../../types/apply/applyTypes';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState<{
    totalPrice: number;
    quantity: number;
  } | null>(null);
  const [status, setStatus] = useState<'LOADING' | 'SUCCESS' | 'ERROR'>(
    'LOADING'
  );
  const [errorMsg, setErrorMsg] = useState('');

  const [totalPrice, setTotalPrice] = useState();
  const [quantity, setQuantity] = useState();

  useEffect(() => {
    const fetchFinalDetails = async () => {
      const orderId = sessionStorage.getItem('orderId');
      const totalPrice = sessionStorage.getItem('totalPrice');
      const quantity = sessionStorage.getItem('quantity');
      if (totalPrice && quantity) {
        setPaymentInfo({
          totalPrice: Number(totalPrice),
          quantity: Number(quantity),
        });
      }

      if (!orderId) {
        setStatus('ERROR');
        setErrorMsg('주문 정보를 찾을 수 없습니다.');
        return;
      }

      // 확인이 끝났으므로 임시 데이터를 정리합니다.
      sessionStorage.removeItem('orderId');
      sessionStorage.removeItem('totalPrice');
      sessionStorage.removeItem('quantity');
    };

    fetchFinalDetails();
  }, []);

  useEffect(() => {
    // 1. URL에서 paymentKey, orderId, amount 값을 가져옵니다.
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    // 2. 세 가지 값이 모두 존재하는지 확인합니다. (null이나 undefined가 아닌지 체크)
    if (paymentKey && orderId && amount) {
      // 3. 조건이 참일 경우, API 호출 함수를 실행합니다.
      const handlePaymentConfirm = async () => {
        try {
          // 로딩 상태 시작 (필요 시)
          // setLoading(true);

          const response = await confirmTossPayment({
            // 소괄호() 안에 객체를 전달합니다.
            paymentKey,
            orderId,
            amount: Number(amount),
          });

          // API 호출 성공 후 로직
          console.log('결제 승인 성공:', response);
        } catch (error) {
          // API 호출 실패 시 로직
          console.error('결제 승인 실패:', error);
        } finally {
        }
      };

      handlePaymentConfirm();
    } else {
      // 필수 파라미터가 하나라도 없는 경우의 처리
      console.error('필수 결제 정보가 누락되었습니다.');
    }

    // searchParams가 변경될 때마다 이 useEffect를 다시 실행합니다.
  }, [searchParams]);

  return (
    <ClassContainer>
      <ClassHeaderBar title="결제성공" />
      <BodyContainer>
        {/* 전체를 감싸는 세로/가로 중앙 정렬 컨테이너 */}
        <div className="flex flex-col items-center justify-center text-center h-full pt-16">
          {/* 상단 체크 아이콘 */}
          <div className="p-2 mb-4 ">
            <img src={CheckIcon} alt="성공 체크" className="w-8 h-8" />
          </div>

          {/* 별 캐릭터 아이콘 */}
          <img
            src={StarCharacterIcon}
            alt="성공 캐릭터"
            className="w-32 h-32 mb-4"
          />

          {/* 메인 메시지 */}
          <h2 className="text-2xl font-semibold text-[#009DFF] mb-8">
            결제가 완료 되었습니다!
          </h2>

          {/* 정보 카드 */}
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] space-y-5">
            {/* 결제 금액 행 */}
            <div className="flex justify-between items-center text-base rounded-2xl p-2 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
              <div className="flex items-center space-x-3">
                <img src={WonIcon} alt="결제 금액 아이콘" className="w-6 h-6" />
                <span className="text-gray-500">결제 금액 | 총</span>
              </div>
              <span className="font-bold text-gray-800">
                {paymentInfo?.totalPrice} 원
              </span>
            </div>

            {/* 신청 인원 행 */}
            <div className="flex justify-between items-center text-base rounded-2xl p-2 shadow-[0_4px_12px_rgba(0,0,0,0.08)] ">
              <div className="flex items-center space-x-3">
                <img
                  src={PeopleIcon}
                  alt="신청 인원 아이콘"
                  className="w-6 h-6"
                />
                <span className="text-gray-500">신청 인원 |</span>
              </div>
              <span className="font-bold text-gray-800">
                {paymentInfo?.quantity} 명
              </span>
            </div>
          </div>
          <div className="w-full mt-8">
            <ButtonComponent
              text="확인"
              onClick={() =>
                navigate('/class/done', {
                  state: {
                    type: 'application', // '신청' 완료임을 명시
                  },
                })
              }
            />
          </div>
        </div>
      </BodyContainer>
    </ClassContainer>
  );
}
