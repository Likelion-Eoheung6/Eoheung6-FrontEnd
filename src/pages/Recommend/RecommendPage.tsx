import React, { useState } from 'react';
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
}> = ({ classData, onClassClick }) => {
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
        onClick={() => onClassClick(classData.openId)}
      />
    </div>
  );
};

const RecommendPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: recommendData, isLoading, error } = useRecommendClasses();
  const [hasSelectedTags, setHasSelectedTags] = useState(true);

  const recommendClasses = recommendData?.data || [];

  const handleClassClick = (classId: number) => {
    navigate(`/class/${classId}`);
  };

  const handleNewRecommendation = () => {
    // 사용자의 버전에 따라 태그 선택 페이지로 이동
    const userVersion = sessionStorage.getItem('userVersion');
    if (userVersion === 'easy') {
      navigate('/tags?version=easy');
    } else {
      navigate('/tags');
    }
  };

  if (isLoading) {
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
          {recommendClasses.map((classData, index) => (
            <ClassCardWrapper 
              key={`${classData.openId}-${index}`} 
              classData={classData} 
              onClassClick={handleClassClick}
            />
          ))}
        </div>

        {/* 새로운 추천 요청 버튼 */}
        <div className="mt-8 mb-[31px]">
          <div 
            className="w-full py-[7px] bg-[#009DFF] rounded-[20px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] flex items-center justify-center cursor-pointer"
            onClick={handleNewRecommendation}
          >
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
