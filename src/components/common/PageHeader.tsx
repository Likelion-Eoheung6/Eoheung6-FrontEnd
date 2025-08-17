import React from 'react';

interface PageHeaderProps {
  title: string;
  message?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, message }) => {
  return (
    <>
      {/* 헤더 */}
      <div className="h-[38px] bg-white flex items-center justify-center mb-[24px] py-[10px]">
        <h1 className="text-[#111111] text-[16px] font-medium leading-[120%] tracking-[-0.025em]">
          {title}
        </h1>
      </div>

      {/* 메시지 (선택적) */}
      {message && (
        <div className="px-[16px]">
          <div className="w-full h-[38px] bg-[#FAFAFA] rounded-[20px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] flex items-center justify-center mb-[10px]">
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
