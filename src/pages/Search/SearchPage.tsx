import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../../components/search/SearchInput';
import SearchTag from '../../components/search/SearchTag';
import PopularKeywords from '../../components/search/PopularKeywords';
import PageHeader from '../../components/common/PageHeader';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearch = (keyword: string) => {
    console.log('검색:', keyword);
    
    // 검색어가 비어있으면 검색하지 않음
    if (!keyword.trim()) {
      return;
    }
    
    // 검색 결과 페이지로 이동
    // 검색어를 URL 파라미터로 전달
    navigate(`/search-results?keyword=${encodeURIComponent(keyword.trim())}`);
  };

  const handleTagSelect = (tag: string) => {
    console.log('태그 선택:', tag);
    // SearchTag에서 클릭한 경우: 태그칩 표시
    setSearchKeyword(tag);
  };

  const handleInputChange = (inputValue: string) => {
    if (inputValue.startsWith('selected:')) {
      // 입력창에서 태그를 입력한 경우: 태그칩 표시 없이 SearchTag만 선택
      const tagName = inputValue.substring(9); // 'selected:' 제거
      setSearchKeyword(tagName); // 일반 텍스트로 저장
    } else {
      setSearchKeyword(inputValue);
    }
  };

  // 입력된 태그들을 파싱하여 배열로 변환
  const getSelectedTagsFromInput = () => {
    if (!searchKeyword) return [];
    
    // 전체 태그 목록
    const allTags = ['도예체험', '꽃꽂이', '영어 회화', '천연비누 만들기', '사진교실', '수채화 클래스', '캘리그라피', '가죽공예'];
    
    // ✓로 시작하는 태그들을 찾아서 정확히 매칭
    const selectedTags = [];
    const tagString = searchKeyword;
    
    for (const tag of allTags) {
      if (tagString.includes(`✓${tag}`)) {
        selectedTags.push(tag);
      }
    }
    
    return selectedTags;
  };

  const handleKeywordClick = (keyword: string) => {
    console.log('인기 키워드 클릭:', keyword);
    // 인기 키워드 클릭 로직 구현
  };

  return (
    <div>
      {/* Header */}
      <PageHeader
        title="클래스 검색"
        onBack={handleBack}
      />

      {/* Main Content */}
      <div className="px-[24px] pt-[14px]">
        {/* Search Input */}
        <SearchInput 
          onSearch={handleSearch} 
          value={searchKeyword}
          onChange={handleInputChange}
        />

        {/* Description */}
        <div className="mt-[24px] mb-[10px] text-[#B3B3B3] text-[14px] font-normal leading-[120%] tracking-[-0.025em] underline">
          원하시는 키워드를 태그 선택으로 쉽게 찾을 수 있어요!
        </div>

        {/* Search Tags */}
        <SearchTag 
          onTagSelect={handleTagSelect} 
          selectedTagsFromInput={getSelectedTagsFromInput()}
        />

        {/* Popular Keywords */}
        <div className="mt-[40px]">
          <PopularKeywords onKeywordClick={handleKeywordClick} />
        </div>
      </div>
    </div>
  );
}
