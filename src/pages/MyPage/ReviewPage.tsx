import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import ActivityClassCard from '../../components/mypage/ActivityClassCard';
import ReviewModal from '../../components/mypage/ReviewModal';

export default function ReviewPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string>('');

  const handleBack = () => {
    navigate(-1);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedClassId('');
  };

  const handleReviewSubmit = (rating: number) => {
    console.log('리뷰 제출:', { classId: selectedClassId, rating });
    // 여기서 리뷰 데이터를 서버로 전송
  };

  // 샘플 클래스 데이터
  const sampleClasses = [
    {
      id: '1',
      title: '한성대 영문과 학생과 함께하는 영어교...',
      location: '성북구성북구성북구성북구성북구성...',
      maxParticipants: 5,
      currentParticipants: 4,
      price: 5000,
      imageUrl: '',
      hasReview: true,
      reviewRating: 2
    },
    {
      id: '2',
      title: '한성대 영문과 학생과 함께하는 영어교...',
      location: '성북구성북구성북구성북구성북구성...',
      maxParticipants: 5,
      currentParticipants: 4,
      price: 5000,
      imageUrl: '',
      hasReview: false,
      reviewRating: 0
    },
    {
      id: '3',
      title: '한성대 영문과 학생과 함께하는 영어교...',
      location: '성북구성북구성북구성북구성북구성...',
      maxParticipants: 5,
      currentParticipants: 4,
      price: 5000,
      imageUrl: ''
    },
    {
      id: '4',
      title: '한성대 영문과 학생과 함께하는 영어교...',
      location: '성북구성북구성북구성북구성북구성...',
      maxParticipants: 5,
      currentParticipants: 4,
      price: 5000,
      imageUrl: ''
    },
    {
      id: '5',
      title: '한성대 영문과 학생과 함께하는 영어교...',
      location: '성북구성북구성북구성북구성북구성...',
      maxParticipants: 5,
      currentParticipants: 4,
      price: 5000,
      imageUrl: ''
    },
    {
      id: '6',
      title: '한성대 영문과 학생과 함께하는 영어교...',
      location: '성북구성북구성북구성북구성북구성...',
      maxParticipants: 5,
      currentParticipants: 4,
      price: 5000,
      imageUrl: ''
    }
  ];

  const handleReviewClick = (classId: string) => {
    setSelectedClassId(classId);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* 페이지 헤더 */}
      <PageHeader 
        title="리뷰 남기기" 
        message="사용자 님의 최근 클래스"
        onBack={handleBack}
      />

      {/* 클래스 카드들 */}
      <div className="mt-[24px] px-[16px] space-y-[24px] pb-[100px]">
        {sampleClasses.map((classItem) => (
          <div key={classItem.id} className="relative">
            <ActivityClassCard
              title={classItem.title}
              location={classItem.location}
              maxParticipants={classItem.maxParticipants}
              currentParticipants={classItem.currentParticipants}
              price={classItem.price}
              buttonText="리뷰 남기기 >"
              imageUrl={classItem.imageUrl}
              onButtonClick={() => handleReviewClick(classItem.id)}
              hasReview={classItem.hasReview}
              reviewRating={classItem.reviewRating}
            />
          </div>
        ))}
      </div>

      {/* 리뷰 작성 모달 */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
}
