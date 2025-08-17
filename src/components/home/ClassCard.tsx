import React from 'react';

interface ClassCardProps {
  title: string;
  currentParticipants: number;
  maxParticipants: number;
  onClick?: () => void;
  size?: 'small' | 'medium';
}

export default function ClassCard({
  title,
  currentParticipants,
  maxParticipants,
  onClick,
  size = 'medium'
}: ClassCardProps) {
  return (
    <div 
      className={`bg-[#009DFF] rounded-[20px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] flex items-center cursor-pointer ${
        size === 'small' 
          ? 'pl-[10px] pr-[3px] pt-[4px] pb-[4px]' 
          : 'pl-[10px] pr-[5px] pt-[5px] pb-[3px]'
      }`}
      onClick={onClick}
    >
      {/* 클래스 제목 */}
      <div className={`text-[#FDFDFD] font-medium leading-[1.2em] tracking-[-0.025em] line-clamp-2 flex-1 ${
        size === 'small'
          ? 'text-[8px] max-w-[56px]'
          : 'text-[10px] max-w-[75px]'
      }`}>
        {title}
      </div>
      
      {/* 간격 */}
      <div className="pl-[2px]"></div>
      
      {/* 참여인원 정보 */}
      <div className={`bg-[#FDFDFD] rounded-[50px] flex flex-col items-center justify-center ${
        size === 'small'
          ? 'px-[3px] py-[3px]'
          : 'px-[3px] py-[4px]'
      }`}>
        <div className={`text-[#545454] font-light leading-[1em] tracking-[-0.025em] ${
          size === 'small' ? 'text-[6px]' : 'text-[8px]'
        }`}>
          참여인원
        </div>
        <div className={`text-[#545454] font-normal leading-[1em] tracking-[-0.025em] ${
          size === 'small' ? 'text-[8px]' : 'text-[10px]'
        }`}>
          {currentParticipants} / {maxParticipants}
        </div>
      </div>
    </div>
  );
}
