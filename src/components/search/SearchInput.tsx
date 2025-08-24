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
        <input
          type="text"
          value={value !== undefined ? value : searchKeyword}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="클래스 키워드 검색하기"
          className="flex-1 bg-transparent text-[#545454] text-[14px] font-normal leading-[120%] tracking-[-0.025em] outline-none"
        />
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
