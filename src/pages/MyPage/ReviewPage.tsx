import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import ActivityClassCard from '../../components/mypage/ActivityClassCard';
import ReviewModal from '../../components/mypage/ReviewModal';
import LoadingScreen from '../../components/common/LoadingScreen';
import { useTakenClasses } from '../../hooks/mypage/useTakenClasses';
import { useCreateReview } from '../../hooks/mypage/useCreateReview';

export default function ReviewPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string>('');

  // 수강한 클래스 데이터 가져오기
  const { data: takenClassesData, isLoading, error } = useTakenClasses();
  
  // 리뷰 작성 훅
  const { mutate: createReview, isPending: isCreatingReview } = useCreateReview();

  const handleBack = () => {
    navigate(-1);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedClassId('');
  };

  const handleReviewSubmit = (rating: number) => {
    console.log('리뷰 제출:', { classId: selectedClassId, rating });
    createReview({ classId: selectedClassId, score: rating });
    handleModalClose();
  };

  const handleReviewClick = (classId: string) => {
    setSelectedClassId(classId);
    setIsModalOpen(true);
  };

  // 수강한 클래스 데이터를 ActivityClassCard에서 사용할 형태로 변환
  const reviewClasses = takenClassesData?.data?.map(classItem => ({
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

  // 로딩 중일 때 LoadingScreen 표시
  if (isLoading) {
    return <LoadingScreen isVisible={true} />;
  }

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
        {error ? (
          <div className="text-center text-red-500">데이터를 불러오는 중 오류가 발생했습니다.</div>
        ) : reviewClasses.length === 0 ? (
          <div className="text-center text-gray-500">리뷰를 남길 수 있는 클래스가 없습니다.</div>
        ) : (
          reviewClasses.map((classItem) => (
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
          ))
        )}
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
