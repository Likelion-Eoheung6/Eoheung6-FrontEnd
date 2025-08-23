import React, { useState, useEffect } from 'react';

interface SearchTagProps {
  onTagSelect: (tag: string) => void;
  selectedTagsFromInput?: string[];
}

export default function SearchTag({ onTagSelect, selectedTagsFromInput = [] }: SearchTagProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // 외부에서 전달된 선택된 태그들과 동기화
  useEffect(() => {
    if (selectedTagsFromInput.length > 0) {
      setSelectedTags(selectedTagsFromInput);
    } else {
      setSelectedTags([]);
    }
  }, [selectedTagsFromInput]);

  const tagCategories = [
    ['도예체험', '꽃꽂이', '영어 회화'],
    ['천연비누 만들기', '사진교실', '수채화 클래스'],
    ['캘리그라피', '가죽공예']
  ];

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      const newSelectedTags = selectedTags.filter(t => t !== tag);
      setSelectedTags(newSelectedTags);
      // 선택된 태그들을 쉼표로 구분하여 전달 (체크 표시 제외)
      const tagString = newSelectedTags.join(', ');
      onTagSelect(tagString);
    } else {
      const newSelectedTags = [...selectedTags, tag];
      setSelectedTags(newSelectedTags);
      // 선택된 태그들을 쉼표로 구분하여 전달 (체크 표시 제외)
      const tagString = newSelectedTags.join(', ');
      onTagSelect(tagString);
    }
  };

  return (
    <div className="w-full flex flex-col gap-[14px]">
      {tagCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="flex items-center gap-[3px]">
          {category.map((tag, tagIndex) => (
            <button
              key={tagIndex}
              onClick={() => handleTagClick(tag)}
              className={`px-[12px] py-[12px] rounded-[100px] border text-[16px] font-medium leading-[100%] tracking-[-0.025em] transition-colors text-[#111111] ${
                selectedTags.includes(tag)
                  ? 'relative overflow-hidden bg-[#FDFDFD] border-[#00BBFF] before:content-[""] before:absolute before:inset-0 before:rounded-[100px] before:bg-[rgba(149,227,255,0.4)]'
                  : 'bg-[#FAFAFA] border-[#E0E0E0]'
              }`}
            >
              <span aria-hidden className="inline-block text-center relative z-[1]">{selectedTags.includes(tag) ? '✓' : '+'}</span>
              <span className="relative z-[1]">{tag}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
