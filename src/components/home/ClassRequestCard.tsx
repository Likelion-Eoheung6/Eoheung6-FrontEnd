import React, { useState } from 'react';
import WishIcon from '../../assets/common/wish-n.svg';
import WishSelectedIcon from '../../assets/common/wish.svg';
import { toggleWishlist } from '../../apis/home/homeApi';

interface ClassRequestCardProps {
  title: string;
  currentParticipants: number;
  maxParticipants: number;
  recruitId: number;
  isJoined?: boolean;
  onWishlistClick?: () => void;
  onClick?: () => void;
}

export default function ClassRequestCard({
  title,
  currentParticipants,
  maxParticipants,
  recruitId,
  isJoined = false,
  onWishlistClick,
  onClick
}: ClassRequestCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(isJoined);
  const [isLoading, setIsLoading] = useState(false);
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
        className={`w-[30px] h-[30px] rounded-full flex items-center justify-center ${
          isJoined ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
        onClick={async (e) => {
          e.stopPropagation();
          if (isLoading || isJoined) return;
          
          setIsLoading(true);
          try {
            await toggleWishlist(recruitId);
            setIsWishlisted(!isWishlisted);
            onWishlistClick?.();
          } catch (error) {
            console.error('위시리스트 토글 실패:', error);
            // 에러 시 상태 되돌리기
          } finally {
            setIsLoading(false);
          }
        }}
      >
        <img 
          src={isWishlisted ? WishSelectedIcon : WishIcon} 
          alt="위시리스트" 
          className={`w-[30px] h-[30px] ${isLoading ? 'opacity-50' : ''}`} 
        />
      </div>
    </div>
  );
}
