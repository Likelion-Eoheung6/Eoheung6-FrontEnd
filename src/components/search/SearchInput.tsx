import React, { useState } from 'react';
import searchIcon from '../../assets/common/search2.svg';

interface SearchInputProps {
  onSearch: (keyword: string) => void;
  value?: string;
  onChange?: (value: string) => void;
}

export default function SearchInput({ onSearch, value, onChange }: SearchInputProps) {
  const [searchKeyword, setSearchKeyword] = useState(value || '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchKeyword(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchKeyword);
    }
  };

  return (
    <div className="w-full h-[48px] bg-[#FDFDFD] rounded-[40px] shadow-[0px_4px_4px_2px_#0000000A] flex items-center justify-between pl-[10px] pr-[10px]">
      <div className="flex-1 flex items-center gap-[3px] overflow-hidden">
        {value && value.includes('✓') ? (
          // 선택된 태그들을 스타일로 표시
          value.split(' ').map((tag, index) => {
            if (tag.startsWith('✓')) {
              return (
                <div key={index} className="px-[12px] py-[12px] rounded-[100px] border border-[#00BBFF] bg-[#FDFDFD] flex items-center relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:rounded-[100px] before:bg-[rgba(149,227,255,0.4)]">
                  <span className="text-[#111111] text-[16px] font-medium leading-[100%] tracking-[-0.025em] mr-[4px] relative z-[1]">✓</span>
                  <span className="text-[#111111] text-[16px] font-medium leading-[100%] tracking-[-0.025em] relative z-[1]">{tag.substring(1)}</span>
                </div>
              );
            }
            return null;
          })
        ) : (
          <input
            type="text"
            value={value !== undefined ? value : searchKeyword}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="클래스 키워드 검색하기"
            className="flex-1 bg-transparent text-[#545454] text-[14px] font-normal leading-[120%] tracking-[-0.025em] outline-none"
          />
        )}
      </div>
      <img 
        src={searchIcon} 
        alt="검색" 
        className="w-[30px] h-[30px] cursor-pointer" 
        onClick={() => onSearch(value || searchKeyword)}
      />
    </div>
  );
}
