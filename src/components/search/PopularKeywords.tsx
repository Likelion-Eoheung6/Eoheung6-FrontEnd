import React from 'react';

interface PopularKeywordsProps {
  onKeywordClick: (keyword: string) => void;
}

export default function PopularKeywords({ onKeywordClick }: PopularKeywordsProps) {
  const popularKeywords = [
    ['베이커리', '영어교실', '실생활', '자격증', '캘리그라피'],
    ['마들렌', '한식조리', '컴퓨터', '법률', '반찬']
  ];

  return (
    <div className="w-full">
      {/* 제목 */}
      <div className="w-full h-[38px] bg-[#009DFF] rounded-[20px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] flex items-center justify-center mb-[14px]">
        <span className="text-[#FAFAFA] text-[18px] font-semibold leading-[120%] tracking-[-0.025em]">
          현재 인기 있는 키워드는?
        </span>
      </div>

      {/* 키워드 그리드 */}
      <div className="flex gap-[23px] w-full">
        {popularKeywords.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-col gap-[14px] flex-1">
            {row.map((keyword, keywordIndex) => {
              const globalIndex = rowIndex * 5 + keywordIndex + 1;
              return (
                <button
                  key={keywordIndex}
                  onClick={() => onKeywordClick(keyword)}
                  className="w-full h-[29px] border border-[#E0E0E0] rounded-[20px] bg-[#FAFAFA] flex items-center pl-[15px] pr-[10px] py-[5px] hover:bg-[#F0F0F0] transition-colors"
                >
                  <span className="text-[#545454] text-[16px] font-normal leading-[120%] tracking-[-0.025em] mr-[8px]">
                    {globalIndex}.
                  </span>
                  <span className="text-[#111111] text-[16px] font-normal leading-[120%] tracking-[-0.025em]">
                    {keyword}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
