import React from 'react';
import { useNavigate } from 'react-router-dom';
import arrowRightIcon from '../../assets/mypage/arrow-right.svg';

interface ActivityItemProps {
  title: string;
  onClick?: () => void;
}

function ActivityItem({ title, onClick }: ActivityItemProps) {
  return (
    <div 
      className="w-full h-[34px] bg-[#FDFDFD] rounded-[20px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] flex items-center justify-between px-[14px] cursor-pointer"
      onClick={onClick}
    >
      <span className="text-[#545454] text-[12px] font-medium leading-[120%] tracking-[-0.025em]">
        {title}
      </span>
      <img src={arrowRightIcon} alt="화살표" className="w-[12px] h-[17px]" />
    </div>
  );
}

export default function ActivitySection() {
  const navigate = useNavigate();

  const handleMyActivity = () => {
    navigate('/my-activity');
  };

  const handleReview = () => {
    navigate('/review');
  };

  return (
    <div className="px-[32px]">
      <div className="w-full bg-[#FAFAFA] rounded-[20px] p-[12px]">
        {/* 내 활동 제목 */}
        <div className="flex items-center gap-[4px] mb-[10px]">
          <div className="w-[67px] h-[28px] bg-[#009DFF] rounded-[20px] flex items-center justify-center">
            <span className="text-white text-[14px] font-semibold leading-[120%] tracking-[-0.025em]">
              내 활동
            </span>
          </div>
          <div className="text-[#545454] text-[10px] font-medium leading-[120%] tracking-[-0.025em]">
            신청한 클래스, 개설한 클래스, 수강한 클래스를 볼 수 있어요.
          </div>
        </div>
        
        {/* 내 활동 확인하기 */}
        <ActivityItem title="내 활동 확인하기" onClick={handleMyActivity} />
        <div className="mb-[20px]"></div>
        
        {/* 리뷰 제목 */}
        <div className="flex items-center gap-[4px] mb-[10px]">
          <div className="w-[52px] h-[28px] bg-[#009DFF] rounded-[20px] flex items-center justify-center">
            <span className="text-white text-[14px] font-semibold leading-[120%] tracking-[-0.025em]">
              리뷰
            </span>
          </div>
          <div className="text-[#545454] text-[10px] font-medium leading-[120%] tracking-[-0.025em]">
            수강한 클래스의 리뷰를 남길 수 있어요.
          </div>
        </div>
        
        {/* 리뷰 남기기 */}
        <ActivityItem title="리뷰 남기기" onClick={handleReview} />
        <div className="mb-[20px]"></div>
        
        {/* 로그인 / 회원정보 제목 */}
        <div className="w-[122px] h-[28px] bg-[#009DFF] rounded-[20px] flex items-center justify-center mb-[10px]">
          <span className="text-white text-[14px] font-semibold leading-[120%] tracking-[-0.025em]">
            로그인 / 회원정보
          </span>
        </div>
        
        {/* 비밀번호 변경 */}
        <ActivityItem title="비밀번호 변경" />
        <div className="mb-[10px]"></div>
        
        {/* 계좌 등록 / 변경 */}
        <ActivityItem title="계좌 등록 / 변경" />
      </div>
    </div>
  );
}
