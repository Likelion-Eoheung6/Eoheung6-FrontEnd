import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import ClassCard from '../../components/common/ClassCard';
import EmptyState from '../../components/common/EmptyState';

export default function SearchResultsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    // 검색어가 없으면 검색 페이지로 리다이렉트
    if (!keyword.trim()) {
      navigate('/search');
      return;
    }

    // 실제 검색 로직 구현 (현재는 목업 데이터 사용)
    performSearch(keyword);
  }, [keyword, navigate]);

  const performSearch = async (searchKeyword: string) => {
    setLoading(true);
    
    try {
      // 실제 API 호출 대신 목업 데이터 사용
      const mockResults = [
        {
          id: 1,
          title: '영어 회화 기초 클래스',
          instructor: '김영어',
          price: '50,000원',
          location: '강남구',
          rating: 4.8,
          reviewCount: 127,
          image: '/path/to/image1.jpg',
          tags: ['영어 회화', '기초']
        },
        {
          id: 2,
          title: '비즈니스 영어 회화',
          instructor: '박비즈니스',
          price: '80,000원',
          location: '서초구',
          rating: 4.9,
          reviewCount: 89,
          image: '/path/to/image2.jpg',
          tags: ['영어 회화', '비즈니스']
        },
        {
          id: 3,
          title: '도예체험 클래스',
          instructor: '이도예',
          price: '35,000원',
          location: '마포구',
          rating: 4.7,
          reviewCount: 156,
          image: '/path/to/image3.jpg',
          tags: ['도예체험', '체험']
        }
      ];

      // 검색어에 따라 필터링
      const filteredResults = mockResults.filter(item => 
        item.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchKeyword.toLowerCase()))
      );

      setSearchResults(filteredResults);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleClassClick = (classId: number) => {
    navigate(`/open-class/apply/${classId}`);
  };

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
            {searchResults.map((classItem) => (
              <div key={classItem.id} onClick={() => handleClassClick(classItem.id)}>
                <ClassCard
                  title={classItem.title}
                  location={classItem.location}
                  maxParticipants={10}
                  currentParticipants={classItem.reviewCount}
                  price={parseInt(classItem.price.replace(/[^0-9]/g, ''))}
                  tags={classItem.tags}
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
