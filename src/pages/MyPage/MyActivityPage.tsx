import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActivitySectionHeader from '../../components/mypage/ActivitySectionHeader';
import PageHeader from '../../components/common/PageHeader';
import { useReservedClasses } from '../../hooks/mypage/useReservedClasses';

export default function MyActivityPage() {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  
  // 예약한 클래스 데이터 가져오기 (토글이 열렸을 때만)
  const { data: reservedClassesData, isLoading, error, refetch: refetchReservedClasses } = useReservedClasses({
    enabled: false // 초기 로딩 시 API 호출하지 않음
  });

  const handleBack = () => {
    navigate('/mypage');
  };

  const handleToggle = (sectionTitle: string, isExpanded: boolean) => {
    console.log('섹션 토글:', sectionTitle, isExpanded);
    
    const newExpandedSections = new Set(expandedSections);
    
    if (isExpanded) {
      newExpandedSections.add(sectionTitle);
      // 예약한 클래스 섹션이 열렸을 때만 API 호출
      if (sectionTitle === '예약한 클래스') {
        refetchReservedClasses();
      }
    } else {
      newExpandedSections.delete(sectionTitle);
    }
    
    setExpandedSections(newExpandedSections);
  };

  // 예약한 클래스 데이터를 ActivitySectionHeader에서 사용할 형태로 변환
  const reservedClassesForActivity = reservedClassesData?.data?.map(classItem => ({
    id: classItem.openId.toString(),
    title: classItem.title,
    location: classItem.roadAddress,
    maxParticipants: classItem.capacity,
    currentParticipants: classItem.appliedCount,
    price: classItem.price,
    imageUrl: classItem.imageUrl
  })) || [];

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
          classes={expandedSections.has('예약한 클래스') ? reservedClassesForActivity : []}
          onToggle={(isExpanded) => handleToggle('예약한 클래스', isExpanded)}
          isLoading={expandedSections.has('예약한 클래스') && isLoading}
          error={expandedSections.has('예약한 클래스') && error ? '데이터를 불러오는 중 오류가 발생했습니다.' : null}
        />
        
        {/* 개설한 클래스 섹션 */}
        <ActivitySectionHeader 
          title="개설한 클래스" 
          classes={[]} // TODO: 개설한 클래스 API 연동 필요
          onToggle={(isExpanded) => handleToggle('개설한 클래스', isExpanded)}
        />
        
        {/* 수강한 클래스 섹션 */}
        <ActivitySectionHeader 
          title="수강한 클래스" 
          classes={[]} // TODO: 수강한 클래스 API 연동 필요
          onToggle={(isExpanded) => handleToggle('수강한 클래스', isExpanded)}
        />
      </div>
    </div>
  );
}
