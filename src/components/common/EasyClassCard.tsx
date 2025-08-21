import React from 'react';

interface EasyClassCardProps {
  title: string;
  participants: {
    current: number;
    max: number;
  };
  image?: string;
  onClick?: () => void;
}

export default function EasyClassCard({ 
  title, 
  participants, 
  image, 
  onClick 
}: EasyClassCardProps) {
  return (
    <div className="flex items-start gap-[9px] w-full">
      {/* 클래스 이미지 - 왼쪽 배치 */}
      <div className="w-[94px] h-[94px] bg-[#B3B3B3] rounded-[20px] flex items-center justify-center flex-shrink-0">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover rounded-[20px]" />
        ) : (
          <div className="text-[#666666] text-[14px]"></div>
        )}
      </div>

      {/* 클래스 카드 - 오른쪽 배치 */}
      <div 
        className="bg-[#FAFAFA] rounded-[20px] shadow-[0px_4px_4px_4px_rgba(0,0,0,0.04)] cursor-pointer hover:shadow-lg transition-shadow h-[96px] flex-1 relative"
        onClick={onClick}
      >
        {/* 클래스 제목 */}
        <h3 className="absolute left-[9px] top-[10px] right-[9px] text-[#545454] text-[16px] font-medium leading-[120%] tracking-[-0.025em] overflow-hidden line-clamp-3">
          {title}
        </h3>

        {/* 참여 인원 */}
        <div className="absolute right-[7px] bottom-[10px] border border-[#E0E0E0] rounded-[20px] flex items-center pt-[6px] pb-[5px] px-[14px]">
          <span className="text-[#545454] text-[14px] font-medium leading-[120%] tracking-[-0.025em]">
            참여 인원 {participants.current} / {participants.max}
          </span>
        </div>
      </div>
    </div>
  );
}
