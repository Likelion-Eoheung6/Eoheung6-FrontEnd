import React from 'react';
import { usePopularTags } from '../../hooks/search/useSearch';

interface PopularKeywordsProps {
  onKeywordClick: (keyword: string) => void;
}

export default function PopularKeywords({ onKeywordClick }: PopularKeywordsProps) {
  const { data: popularTagsData, isLoading, error } = usePopularTags();
  
  // API 데이터가 없을 때의 기본값
  const defaultKeywords = [
    ['베이커리', '영어교실', '실생활', '자격증', '캘리그라피'],
    ['마들렌', '한식조리', '컴퓨터', '법률', '반찬']
  ];

  // API 데이터를 2행으로 나누기
  const getKeywordsFromAPI = () => {
    if (!popularTagsData?.data?.tags || popularTagsData.data.tags.length === 0) {
      return defaultKeywords;
    }

    const tags = popularTagsData.data.tags;
    const midPoint = Math.ceil(tags.length / 2);
    
    return [
      tags.slice(0, midPoint),
      tags.slice(midPoint)
    ];
  };

  const popularKeywords = getKeywordsFromAPI();

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="w-full h-[38px] bg-[#009DFF] rounded-[20px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] flex items-center justify-center mb-[14px]">
          <span className="text-[#FAFAFA] text-[18px] font-semibold leading-[120%] tracking-[-0.025em]">
            현재 인기 있는 키워드는?
          </span>
        </div>
        <div className="flex gap-[23px] w-full">
          <div className="flex flex-col gap-[14px] flex-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-full h-[29px] border border-[#E0E0E0] rounded-[20px] bg-gray-200 animate-pulse"></div>
            ))}
          </div>
          <div className="flex flex-col gap-[14px] flex-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-full h-[29px] border border-[#E0E0E0] rounded-[20px] bg-gray-200 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="w-full h-[38px] bg-[#009DFF] rounded-[20px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] flex items-center justify-center mb-[14px]">
          <span className="text-[#FAFAFA] text-[18px] font-semibold leading-[120%] tracking-[-0.025em]">
            현재 인기 있는 키워드는?
          </span>
        </div>
        <div className="text-center text-gray-500 text-sm">
          인기 키워드를 불러오는데 실패했습니다.
        </div>
      </div>
    );
  }

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
