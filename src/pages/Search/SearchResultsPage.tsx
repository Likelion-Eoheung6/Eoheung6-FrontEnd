import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSearchClasses } from '../../hooks/search/useSearch';
import PageHeader from '../../components/common/PageHeader';
import ClassCard from '../../components/common/ClassCard';
import EmptyState from '../../components/common/EmptyState';
import LoadingScreen from '../../components/common/LoadingScreen';

export default function SearchResultsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchClassesMutation = useSearchClasses();

  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    // 검색어가 없으면 검색 페이지로 리다이렉트
    if (!keyword.trim()) {
      navigate('/search');
      return;
    }

    // 실제 검색 로직 구현
    performSearch(keyword);
  }, [keyword, navigate]);

  const performSearch = async (searchKeyword: string) => {
    try {
      let retrieveValue: string[];
      
      // # 기호로 시작하는 키워드는 단일 객체로 처리
      if (searchKeyword.startsWith('#')) {
        const singleKeyword = searchKeyword.substring(1).trim();
        retrieveValue = [singleKeyword];
      } else {
        // 쉼표로 구분된 태그들을 분리하고 쉼표 제거
        const tags = searchKeyword
          .split(', ')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0);
        
        // 항상 배열로 전달
        retrieveValue = tags;
      }

      const response = await searchClassesMutation.mutateAsync({
        retrieve: retrieveValue
      });

      if (response.isSuccess) {
        // normal과 Advertisement 클래스를 합쳐서 결과로 사용
        const allClasses = [
          ...response.data.normal,
          ...response.data.Advertisement
        ];
        setSearchResults(allClasses);
      } else {
        console.error('검색 실패:', response.message);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
      setSearchResults([]);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleClassClick = (classId: number) => {
    navigate(`/open-class/apply/${classId}`);
  };

  if (searchClassesMutation.isPending) {
    return <LoadingScreen />;
  }

  return (
    <div>
      {/* Header */}
      <PageHeader
        title={`클래스 검색 결과`}
        message={searchResults.length > 0 ? `"${keyword}" 검색 결과 키워드에 대한 검색 결과에요!` : undefined}
        onBack={handleBack}
      />

      {/* Main Content */}
      {searchResults.length > 0 ? (
        <div className="px-[16px] pt-[30px]">
          <div className="space-y-[16px]">
            {searchResults.map((classItem, index) => (
              <div key={`${classItem.openId}-${index}`} onClick={() => handleClassClick(classItem.openId)}>
                <ClassCard
                  title={classItem.title}
                  location={classItem.roadAddress}
                  maxParticipants={classItem.capacity}
                  currentParticipants={classItem.count}
                  price={classItem.price}
                  tags={[...classItem.moodTagsJson, classItem.educationTagGenre]}
                  imageUrl={classItem.image}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          message="앗! 검색하신 키워드의 클래스가 없어요."
          buttonText="키워드 다시 검색하기"
          onButtonClick={() => navigate('/search')}
        />
      )}
    </div>
  );
}
