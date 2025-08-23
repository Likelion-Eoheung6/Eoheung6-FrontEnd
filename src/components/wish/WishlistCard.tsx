import React, { useState } from 'react';
import wishIcon from '../../assets/common/wish-n.svg';
import wishSelectedIcon from '../../assets/common/wish.svg';
import InfoCard from './InfoCard';

interface WishlistCardProps {
  title: string;
  date: string;
  price: string;
  location: string;
  imageUrl?: string;
  openId: number;
  onToggleWish?: (openId: number, isWished: boolean) => void;
  isWished?: boolean;
  isLoading?: boolean;
}

export default function WishlistCard({
  title,
  date,
  price,
  location,
  imageUrl,
  openId,
  onToggleWish,
  isWished = true, // 위시리스트에 있으므로 true로 시작
  isLoading = false,
}: WishlistCardProps) {
  const [isToggling, setIsToggling] = useState(false);

  const handleWishClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isToggling || isLoading) return; // 이미 토글 중이거나 로딩 중이면 무시
    
    const newWishState = !isWished;
    onToggleWish?.(openId, newWishState);
  };

  const isDisabled = isToggling || isLoading;

  return (
    <div 
      className="w-full flex items-center gap-[7px]">
      {/* 이미지 */}
      <div className="w-[88px] h-[88px] bg-[#B3B3B3] rounded-[21px] flex-shrink-0">
        {imageUrl && (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover rounded-[21px]" 
          />
        )}
      </div>

      {/* 정보 카드 */}
      <div className="flex-1 w-[205px] h-[87px] space-y-[5px]">
        <InfoCard label="제목" value={title} />
        <InfoCard label="일시" value={date} />
        <InfoCard label="장소" value={location} />
        <InfoCard label="금액" value={price} />
      </div>

      {/* 위시 아이콘 */}
      <button 
        className="w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0 bg-transparent border-none p-0"
        onClick={handleWishClick}
        disabled={isDisabled}
      >
        {isToggling ? (
          <div className="w-[22px] h-[22px] border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        ) : (
          <img 
            src={isWished ? wishSelectedIcon : wishIcon} 
            alt="위시리스트" 
            className="w-[22px] h-[22px]" 
          />
        )}
      </button>
    </div>
  );
}
