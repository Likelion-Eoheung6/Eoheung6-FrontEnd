import React from 'react';
import notIcon from '../../assets/common/not-icon.svg';

interface EmptyStateProps {
  message: string;
  buttonText: string;
  onButtonClick?: () => void;
  iconSrc?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message, 
  buttonText, 
  onButtonClick, 
  iconSrc = notIcon 
}) => {
  return (
    <div className="flex flex-col items-center justify-center px-[32px] pb-[154px]">
      {/* 아이콘 */}
      <div className="mt-[163px] w-[161px] h-[269px] mb-[22px] flex items-center justify-center">
        <img src={iconSrc} alt="empty state" className="w-full h-full" />
      </div>
      
      {/* 메시지 */}
      <div className="text-[#545454] text-[18px] font-medium leading-[120%] tracking-[-0.025em] mb-[38px]">
        {message}
      </div>
      
      {/* 버튼 */}
      <div 
        className="w-full py-[10px] bg-[#009DFF] rounded-[20px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] flex items-center justify-center cursor-pointer"
        onClick={onButtonClick}
      >
        <span className="text-[#FAFAFA] text-[16px] font-semibold leading-[120%] tracking-[-0.025em]">
          {buttonText}
        </span>
      </div>
    </div>
  );
};

export default EmptyState;
