import React, { useState } from 'react';
import WishIcon from '../../assets/common/wish-n.svg';
import WishSelectedIcon from '../../assets/common/wish.svg';

interface ClassRequestCardProps {
  title: string;
  currentParticipants: number;
  maxParticipants: number;
  onWishlistClick?: () => void;
  onClick?: () => void;
}

export default function ClassRequestCard({
  title,
  currentParticipants,
  maxParticipants,
  onWishlistClick,
  onClick
}: ClassRequestCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  return (
    <div 
      className="w-full h-[34px] bg-[#FDFDFD] rounded-[20px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] flex items-center pl-[14px] pr-[6px] cursor-pointer"
      onClick={onClick}
    >
      {/* 제목 */}
      <div className="text-[#545454] text-[14px] font-medium leading-[120%] tracking-[-0.025em] w-[24px]">
        제목
      </div>
      
      {/* 구분선 */}
      <div className="w-[1px] h-[20px] bg-[#E0E0E0] mx-[14px]"></div>
      
      {/* 클래스 제목 */}
      <div className="text-[#545454] text-[14px] font-normal leading-[120%] tracking-[-0.025em] flex-1 truncate">
        {title}
      </div>
      
      {/* 현재 인원 정보 */}
      <div className="border border-[#E0E0E0] rounded-[20px] flex items-center justify-center px-[10px] py-[7px]">
        <div className="text-[#545454] text-[12px] font-normal leading-[120%] tracking-[-0.025em]">
          현재 인원 {currentParticipants}
        </div>
      </div>
      
      {/* 위시리스트 아이콘 */}
      <div 
        className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setIsWishlisted(!isWishlisted);
          onWishlistClick?.();
        }}
      >
        <img 
          src={isWishlisted ? WishSelectedIcon : WishIcon} 
          alt="위시리스트" 
          className="w-[30px] h-[30px]" 
        />
      </div>
    </div>
  );
}
