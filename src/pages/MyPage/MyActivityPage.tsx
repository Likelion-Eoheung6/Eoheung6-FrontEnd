import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActivitySectionHeader from '../../components/mypage/ActivitySectionHeader';
import PageHeader from '../../components/common/PageHeader';
import { useReservedClasses } from '../../hooks/mypage/useReservedClasses';
import { useTakenClasses } from '../../hooks/mypage/useTakenClasses';
import { useMyClasses } from '../../hooks/mypage/useMyClasses';

export default function MyActivityPage() {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  
  // 예약한 클래스 데이터 가져오기 (토글이 열렸을 때만)
  const { data: reservedClassesData, isLoading: reservedLoading, error: reservedError, refetch: refetchReservedClasses } = useReservedClasses({
    enabled: false // 초기 로딩 시 API 호출하지 않음
  });

  // 수강한 클래스 데이터 가져오기 (토글이 열렸을 때만)
  const { data: takenClassesData, isLoading: takenLoading, error: takenError, refetch: refetchTakenClasses } = useTakenClasses({
    enabled: false // 초기 로딩 시 API 호출하지 않음
  });

  // 개설한 클래스 데이터 가져오기 (토글이 열렸을 때만)
  const { data: myClassesData, isLoading: myClassesLoading, error: myClassesError, refetch: refetchMyClasses } = useMyClasses({
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
      if (sectionTitle === '신청한 클래스') {
        refetchReservedClasses();
      }
      // 수강한 클래스 섹션이 열렸을 때만 API 호출
      if (sectionTitle === '수강한 클래스') {
        refetchTakenClasses();
      }
      // 개설한 클래스 섹션이 열렸을 때만 API 호출
      if (sectionTitle === '개설한 클래스') {
        refetchMyClasses();
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

  // 수강한 클래스 데이터를 ActivitySectionHeader에서 사용할 형태로 변환
  const takenClassesForActivity = takenClassesData?.data?.map(classItem => ({
    id: classItem.openId.toString(),
    title: classItem.title,
    location: classItem.roadAddress,
    maxParticipants: classItem.capacity,
    currentParticipants: classItem.appliedCount,
    price: classItem.price,
    imageUrl: classItem.imageUrl,
    hasReview: classItem.reviews.length > 0,
    reviewRating: classItem.reviews.length > 0 ? classItem.reviews[0].score : 0
  })) || [];

  // 개설한 클래스 데이터를 ActivitySectionHeader에서 사용할 형태로 변환
  const myClassesForActivity = myClassesData?.data?.map(classItem => ({
    id: classItem.openId.toString(),
    title: classItem.title,
    location: classItem.roadAddress,
    maxParticipants: classItem.capacity,
    currentParticipants: classItem.participantCount,
    price: classItem.price,
    imageUrl: classItem.thumbnailUrl
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
        {/* 신청한 클래스 섹션 */}
        <ActivitySectionHeader 
          title="신청한 클래스" 
          classes={expandedSections.has('신청한 클래스') ? reservedClassesForActivity : []}
          onToggle={(isExpanded) => handleToggle('신청한 클래스', isExpanded)}
          isLoading={expandedSections.has('신청한 클래스') && reservedLoading}
          error={expandedSections.has('신청한 클래스') && reservedError && (reservedError as any)?.response?.status !== 404 ? '데이터를 불러오는 중 오류가 발생했습니다.' : null}
        />
        
        {/* 개설한 클래스 섹션 */}
        <ActivitySectionHeader 
          title="개설한 클래스" 
          classes={expandedSections.has('개설한 클래스') ? myClassesForActivity : []}
          onToggle={(isExpanded) => handleToggle('개설한 클래스', isExpanded)}
          isLoading={expandedSections.has('개설한 클래스') && myClassesLoading}
          error={expandedSections.has('개설한 클래스') && myClassesError && (myClassesError as any)?.response?.status !== 404 ? '데이터를 불러오는 중 오류가 발생했습니다.' : null}
        />
        
        {/* 수강한 클래스 섹션 */}
        <ActivitySectionHeader 
          title="수강한 클래스" 
          classes={expandedSections.has('수강한 클래스') ? takenClassesForActivity : []}
          onToggle={(isExpanded) => handleToggle('수강한 클래스', isExpanded)}
          isLoading={expandedSections.has('수강한 클래스') && takenLoading}
          error={expandedSections.has('수강한 클래스') && takenError && (takenError as any)?.response?.status !== 404 ? '데이터를 불러오는 중 오류가 발생했습니다.' : null}
        />
      </div>
    </div>
  );
}
