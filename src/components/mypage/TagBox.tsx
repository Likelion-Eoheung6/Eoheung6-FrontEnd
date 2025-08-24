import React from 'react';
import cancelIcon from '../../assets/mypage/cancel.svg';

interface TagBoxProps {
  children: React.ReactNode;
  onDelete?: () => void;
  isEditMode?: boolean;
}

export default function TagBox({ children, onDelete, isEditMode = false }: TagBoxProps) {
  return (
    <div className="bg-[#FAFAFA] border border-[#E0E0E0] rounded-[100px] flex items-center justify-center px-[10px] py-[6px] gap-[4px] min-h-fit">
      <span className="text-[#111111] text-[12px] font-medium leading-[120%] tracking-[-0.025em] whitespace-nowrap">
        {children}
      </span>
      {isEditMode && onDelete && (
        <img 
          src={cancelIcon} 
          alt="삭제" 
          className="w-[8px] h-[8px] cursor-pointer flex-shrink-0" 
          onClick={onDelete}
        />
      )}
    </div>
  );
}
