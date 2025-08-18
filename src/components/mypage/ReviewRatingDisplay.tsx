import starIcon from '../../assets/mypage/star.svg';
import onStarIcon from '../../assets/mypage/on-star.svg';

interface ReviewRatingDisplayProps {
  rating: number;
}

export default function ReviewRatingDisplay({ rating }: ReviewRatingDisplayProps) {
  const getRatingText = (rating: number) => {
    if (rating === 1 || rating === 2) return '(아쉬워요)';
    if (rating === 3) return '(그저그래요)';
    if (rating === 4) return '(괜찮아요)';
    if (rating === 5) return '(최고예요)';
    return '';
  };

  return (
    <div className="flex gap-[2px]">
      {/* 별점 표시 */}
      <div className="flex items-center gap-[4px]">
        {[0, 1, 2, 3, 4].map((starIndex) => (
          <img 
            key={starIndex}
            src={starIndex < rating ? onStarIcon : starIcon} 
            alt="별" 
            className="w-[22px] h-[22px]"
          />
        ))}
      </div>
      
      {/* 점수 텍스트 */}
      <div className="flex items-center gap-[2px]">
        <span className="text-[#545454] text-[12px] font-medium leading-[120%] tracking-[-0.025em]">
          {rating}점
        </span>
        <span className="text-[#545454] text-[12px] font-normal leading-[120%] tracking-[-0.025em]">
          {getRatingText(rating)}
        </span>
      </div>
    </div>
  );
}
