import React, { useState } from 'react';
import StarRating from './StarRating';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
  classNameTitle?: string;
}

export default function ReviewModal({ isOpen, onClose, onSubmit, classNameTitle }: ReviewModalProps) {
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating);
      setRating(0);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 백그라운드 블러 */}
      <div 
        className="absolute inset-0 max-w-[430px] mx-auto bg-[rgba(179,179,179,0.4)] backdrop-blur-[6px]"
        onClick={onClose}
      />
      
      {/* 모달 컨테이너 */}
      <div className="relative w-[329px] h-[268px] bg-[#FAFAFA] rounded-[20px] shadow-[0px_4px_4px_4px_rgba(0,0,0,0.04)]">
        {/* 메인 컨텐츠 */}
        <div className="w-[307px] h-[187px] bg-[#FAFAFA] border border-[#E0E0E0] rounded-[16px] mx-[11px] mt-[15px] flex flex-col items-center">
          {/* 제목 */}
          <div className="text-[#009DFF] text-[16px] font-semibold leading-[120%] tracking-[-0.025em] text-center mt-[20px] mb-[24px]">
            수강하신 클래스는 어떠셨나요?<br />
            별점을 남겨주세요!
          </div>
          
          {/* 별점 컴포넌트 */}
          <div className="px-[23px]">
            <StarRating
              rating={rating}
              onRatingChange={setRating}
            />
          </div>
        </div>
        
        {/* 등록하기 버튼 */}
        <div className="absolute bottom-[15px] left-[14px] right-[14px]">
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className={`w-full h-[36px] rounded-[20px] text-[#FFFFFF] text-[16px] font-semibold leading-[120%] tracking-[-0.025em] ${
              rating > 0 
                ? 'bg-[#009DFF] hover:bg-[#0088E6]' 
                : 'bg-[#B3B3B3] cursor-not-allowed'
            }`}
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
