import React, { useState } from 'react';
import starIcon from '../../assets/mypage/star.svg';
import onStarIcon from '../../assets/mypage/on-star.svg';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  disabled?: boolean;
}

export default function StarRating({ rating, onRatingChange, disabled = false }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (starIndex: number) => {
    if (!disabled) {
      // 클릭한 별만 토글 (채우기/비우기)
      if (rating === starIndex + 1) {
        // 같은 별을 다시 클릭하면 이전 별로 설정
        onRatingChange(starIndex);
      } else {
        // 다른 별을 클릭하면 해당 별점으로 설정
        onRatingChange(starIndex + 1);
      }
    }
  };

  const handleStarHover = (starIndex: number) => {
    if (!disabled) {
      setHoverRating(starIndex + 1);
    }
  };

  const handleStarLeave = () => {
    if (!disabled) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex flex-col items-start gap-[4px]">
      <div className={`text-[12px] font-normal leading-[120%] tracking-[-0.025em] ${rating > 0 ? 'text-[#545454]' : 'text-[#B3B3B3]'}`}>
        별점 등록 ({rating}/5)
      </div>
      <div className="flex items-center gap-[4px]">
        {[0, 1, 2, 3, 4].map((starIndex) => (
          <button
            key={starIndex}
            onClick={() => handleStarClick(starIndex)}
            onMouseEnter={() => handleStarHover(starIndex)}
            onMouseLeave={handleStarLeave}
            disabled={disabled}
            className="w-[49px] h-[49px] flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
          >
            <img 
              src={starIndex < rating ? onStarIcon : starIcon} 
              alt="별" 
              className="w-[49px] h-[49px]"
            />
          </button>
        ))}
      </div>
      <div className={`text-[#545454] text-[12px] leading-[120%] tracking-[-0.025em] text-center w-full ${rating > 0 ? 'font-medium' : 'font-normal'}`}>
        {rating > 0 ? (
          `${rating}점 ${rating === 1 || rating === 2 ? '(아쉬워요)' : rating === 3 ? '(그저그래요)' : rating === 4 ? '(괜찮아요)' : '(최고예요)'}`
        ) : (
          '별을 클릭해 주세요!'
        )}
      </div>
    </div>
  );
}
