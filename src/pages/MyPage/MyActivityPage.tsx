import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActivitySectionHeader from '../../components/mypage/ActivitySectionHeader';
import PageHeader from '../../components/common/PageHeader';

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
      {/* 페이지 헤더 */}
      <PageHeader 
        title="내 활동" 
        onBack={handleBack}
      />
      
      {/* 활동 섹션들 */}
      <div className="mt-[24px] px-[16px] space-y-[24px]">
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
