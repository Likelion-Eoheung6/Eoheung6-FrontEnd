import React from 'react';
import backIcon from '../../assets/common/back.svg';

interface PageHeaderProps {
  title: string;
  message?: string;
  onBack?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, message, onBack }) => {
  return (
    <>
      {/* 헤더 */}
      <div className="h-[38px] flex items-center justify-between px-[8px] relative">
        {onBack && (
          <img 
            src={backIcon} 
            alt="뒤로가기" 
            className="w-[30px] h-[30px] cursor-pointer" 
            onClick={onBack}
          />
        )}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-[#111111] text-[16px] font-medium leading-[120%] tracking-[-0.025em]">
            {title}
          </h1>
        </div>
        {onBack && <div className="w-[30px]"></div>}
      </div>

      {/* 메시지 (선택적) */}
      {message && (
        <div className="px-[16px] mt-[24px]">
          <div className="w-full h-[38px] bg-[#FAFAFA] rounded-[20px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] flex items-center justify-center">
            <span className="text-[#545454] text-[16px] font-medium leading-[120%] tracking-[-0.025em]">
              {message}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default PageHeader;
