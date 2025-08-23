import React from 'react';
import cancelIcon from '../../assets/mypage/cancel.svg';

interface TagBoxProps {
  children: React.ReactNode;
  onDelete?: () => void;
}

export default function TagBox({ children, onDelete }: TagBoxProps) {
  return (
    <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-[100px] flex items-center justify-center px-[10px] py-[8px] gap-[4px]">
      <span className="text-[#111111] text-[16px] font-medium leading-[100%] tracking-[-0.025em]">
        {children}
      </span>
      <img 
        src={cancelIcon} 
        alt="삭제" 
        className="w-[10px] h-[10px] cursor-pointer" 
        onClick={onDelete}
      />
    </div>
  );
}
