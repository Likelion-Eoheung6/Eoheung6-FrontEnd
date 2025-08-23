import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecommendClasses } from '../../hooks/recommend/useRecommend';
import ClassCard from '../../components/common/ClassCard';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/common/EmptyState';
import LoadingScreen from '../../components/common/LoadingScreen';
import arrowRightIcon from '../../assets/recommend/arrow-right.svg';

const ClassCardWrapper: React.FC<{ 
  classData: any; 
  onClassClick: (classId: number) => void;
  onImageLoad: (openId: number) => void;
}> = ({ classData, onClassClick, onImageLoad }) => {
  return (
    <div>
      <ClassCard
        title={classData.title}
        location={classData.roadAddress}
        maxParticipants={classData.capacity}
        currentParticipants={classData.appliedCount}
        price={classData.price}
        tags={[...classData.modeGenre, classData.eduGenre]}
        isRecommended={true}
        imageUrl={classData.imageUrl}
        onImageLoad={() => onImageLoad(classData.openId)}
        onImageError={() => onImageLoad(classData.openId)}
        onClick={() => onClassClick(classData.openId)}
      />
    </div>
  );
};

const RecommendPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: recommendData, isLoading, error } = useRecommendClasses();
  const [hasSelectedTags, setHasSelectedTags] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [areAllImagesLoaded, setAreAllImagesLoaded] = useState(false);

  const recommendClasses = recommendData?.data || [];

  // 이미지 로드 상태 관리
  const handleImageLoad = (openId: number) => {
    setLoadedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(openId);
      return newSet;
    });
  };

  // 모든 이미지가 로드되었는지 확인
  useEffect(() => {
    if (recommendClasses.length > 0 && loadedImages.size === recommendClasses.length) {
      setAreAllImagesLoaded(true);
    } else {
      setAreAllImagesLoaded(false);
    }
  }, [loadedImages, recommendClasses.length]);

  // 데이터가 변경되면 로드 상태 초기화
  useEffect(() => {
    setLoadedImages(new Set());
    setAreAllImagesLoaded(false);
  }, [recommendData]);

  const handleClassClick = (classId: number) => {
    navigate(`/class/${classId}`);
  };

  if (isLoading || !areAllImagesLoaded) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            AI 추천을 불러오는데 실패했습니다
          </h2>
        </div>
      </div>
    );
  }

  if (recommendClasses.length === 0) {
    return (
      <div>
        <PageHeader title="AI 추천" />
        <EmptyState 
          message="앗! 추천 클래스가 없어요."
          buttonText="태그 선택하고 AI 추천 받기"
          onButtonClick={() => setHasSelectedTags(true)}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader 
        title="AI 추천" 
        message="당신이 좋아할 만한 클래스를 추천해드릴게요!"
      />

      <div className="px-4">
        {/* 클래스 목록 */}
        <div className="space-y-[18px] mt-[30px]">
          {recommendClasses.map((classData) => (
            <ClassCardWrapper 
              key={classData.openId} 
              classData={classData} 
              onClassClick={handleClassClick}
              onImageLoad={handleImageLoad}
            />
          ))}
        </div>

        {/* 새로운 추천 요청 버튼 */}
        <div className="mt-8 mb-[31px]">
          <div className="w-full py-[7px] bg-[#009DFF] rounded-[20px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] flex items-center justify-center cursor-pointer">
            <div className="flex items-center">
              <span className="text-white text-[16px] font-semibold leading-[120%] tracking-[-0.025em]">
                새로운 클래스를 추천받고 싶다면?
              </span>
              <div className="w-6 h-6">
                <img src={arrowRightIcon} alt="arrow" className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendPage;
