import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassCard from '../../components/common/ClassCard';
import PageHeader from '../../components/common/PageHeader';
import EmptyState from '../../components/common/EmptyState';
import arrowRightIcon from '../../assets/recommend/arrow-right.svg';

interface ClassData {
  id: string;
  title: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  tags: string[];
  isRecommended?: boolean;
  imageUrl?: string;
}

const mockClasses: ClassData[] = [
  {
    id: '1',
    title: '한성대 영문과 학생과 함께하는 영어교..',
    location: '성북구성북구성북구성북구성북구성북구...',
    maxParticipants: 5,
    currentParticipants: 4,
    price: 5000,
    tags: ['영어 회화', '편안한 분위기', '초보환영']
  },
  {
    id: '2',
    title: '전직 영어 교사와 함께하는 영어교실',
    location: '성북구성북구성북구성북구성북구성북구...',
    maxParticipants: 10,
    currentParticipants: 4,
    price: 10000,
    tags: ['영어 회화', '재밌는 수업', '초보 환영']
  },
  {
    id: '3',
    title: '플로리스트에게 배우는 꽃꽂이 수업',
    location: '성북구성북구성북구성북구성북구성북구...',
    maxParticipants: 10,
    currentParticipants: 7,
    price: 15000,
    tags: ['꽃꽂이', '누구나 가능', '실용적']
  },
  {
    id: '4',
    title: '화과자 만드는 방법 배워보기',
    location: '성북구성북구성북구성북구성북구성북구...',
    maxParticipants: 5,
    currentParticipants: 2,
    price: 18000,
    tags: ['화과자', '홈 베이킹', '실용적'],
    isRecommended: true
  }
];

const ClassCardWrapper: React.FC<{ classData: ClassData }> = ({ classData }) => {
  return (
    <div>
      <ClassCard
        title={classData.title}
        location={classData.location}
        maxParticipants={classData.maxParticipants}
        currentParticipants={classData.currentParticipants}
        price={classData.price}
        tags={classData.tags}
        isRecommended={classData.isRecommended}
        imageUrl={classData.imageUrl}
      />
    </div>
  );
};

const RecommendPage: React.FC = () => {
  const navigate = useNavigate();
  const [hasSelectedTags, setHasSelectedTags] = useState(false); // 태그 선택 여부 상태

  return (
    <div>
      <PageHeader 
        title="AI 추천" 
        message={hasSelectedTags ? "당신이 좋아할 만한 클래스를 추천해드릴게요!" : undefined}
      />

      <div className="px-4">
        {hasSelectedTags ? (
          <>
            {/* 클래스 목록 */}
            <div className="space-y-[18px] mt-[30px]">
              {mockClasses.map((classData) => (
                <ClassCardWrapper key={classData.id} classData={classData} />
              ))}
            </div>

            {/* 새로운 추천 요청 버튼 */}
            <div className="mt-8">
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
          </>
        ) : (
          <EmptyState 
            message="앗! 추천 클래스가 없어요."
            buttonText="태그 선택하고 AI 추천 받기"
            onButtonClick={() => setHasSelectedTags(true)}
          />
        )}
      </div>
    </div>
  );
};

export default RecommendPage;
