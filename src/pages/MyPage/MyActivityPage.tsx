import React from 'react';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../assets/common/back.svg';
import ActivitySectionHeader from '../../components/mypage/ActivitySectionHeader';

export default function MyActivityPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/mypage');
  };

  const handleToggle = (isExpanded: boolean) => {
    console.log('섹션 토글:', isExpanded);
  };

  return (
    <div>
      {/* 헤더 */}
      <div className="flex items-center justify-center py-[10px] relative">
        <button 
          onClick={handleBack}
          className="absolute left-[8px]"
        >
          <img src={backIcon} alt="뒤로가기" className="w-[30px] h-[30px]" />
        </button>
        <span className="text-[#111111] text-[16px] font-medium leading-[120%] tracking-[-0.025em]">
          내 활동
        </span>
      </div>
      
      {/* 활동 섹션들 */}
      <div className="mt-[24px] px-[32px] space-y-[24px]">
        {/* 예약한 클래스 섹션 */}
        <ActivitySectionHeader 
          title="예약한 클래스" 
          onToggle={handleToggle}
        />
        
        {/* 개설한 클래스 섹션 */}
        <ActivitySectionHeader 
          title="개설한 클래스" 
          onToggle={handleToggle}
        />
        
        {/* 수강한 클래스 섹션 */}
        <ActivitySectionHeader 
          title="수강한 클래스" 
          onToggle={handleToggle}
        />
      </div>
    </div>
  );
}
