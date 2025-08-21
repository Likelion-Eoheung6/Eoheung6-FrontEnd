import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom'; // 데이터를 받기 위해 import
import ClassContainer from '../../components/class/ClassContainer';
import ClassHeaderBar from '../../components/class/ClassHeaderBar';
import BodyContainer from '../../components/common/BodyContainer';
import CheckIcon from '../../assets/class/check.svg';
// 아래 아이콘들은 실제 프로젝트 경로에 맞게 준비해야 합니다.
import StarCharacterIcon from '../../assets/class/main-character.svg';
import WonIcon from '../../assets/class/money.svg';
import PeopleIcon from '../../assets/class/people.svg';

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState<{
    amount: number;
    count: number;
  } | null>(null);

  useEffect(() => {
    // URL 쿼리 파라미터에서 값을 먼저 확인합니다 (토스페이먼츠 방식).
    const amountFromUrl = searchParams.get('amount');
    const orderIdFromUrl = searchParams.get('orderId'); // 토스는 orderId도 함께 줍니다.

    if (amountFromUrl && orderIdFromUrl) {
      // 토스로부터 돌아온 경우
      // TODO: 백엔드에 orderId로 수량을 조회하여 count를 가져오는 로직이 필요할 수 있습니다.
      // 우선 임시로 1로 설정합니다.
      setPaymentInfo({
        amount: Number(amountFromUrl),
        count: 1, // 임시 값
      });
    } else {
      // sessionStorage에서 값을 확인합니다 (카카오페이 방식).
      const amountFromStorage = sessionStorage.getItem('amount');
      const countFromStorage = sessionStorage.getItem('count');

      if (amountFromStorage && countFromStorage) {
        setPaymentInfo({
          amount: Number(amountFromStorage),
          count: Number(countFromStorage),
        });

        // 사용 후에는 sessionStorage에서 데이터를 정리해주는 것이 좋습니다.
        sessionStorage.removeItem('amount');
        sessionStorage.removeItem('count');
      }
    }
    // 여기에 최종 결제 승인 로직(백엔드 API 호출)이 추가되어야 합니다.
  }, [searchParams]);

  if (!paymentInfo) {
    // 데이터를 불러오는 중이거나 데이터가 없는 경우
    return <div>결제 정보를 불러오는 중입니다...</div>;
  }

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
                {paymentInfo.amount} 원
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
                {paymentInfo.count} 명
              </span>
            </div>
          </div>
        </div>
      </BodyContainer>
    </ClassContainer>
  );
}
