import React, { useState } from 'react';
import CenterCard from './CenterCard';
import SideCard from './SideCard';

interface ClassInfo {
  title: string;
  currentParticipants: number;
  maxParticipants: number;
  id: string;
}

interface ClassCardSliderProps {
  onPrev?: () => void;
  onNext?: () => void;
  className?: string;
  images?: string[];
  classes?: ClassInfo[];
  onClassClick?: (classId: string) => void;
}

// 메인 ClassCardSlider 컴포넌트
export default function ClassCardSlider({ 
  onPrev, 
  onNext, 
  className = '',
  images = [],
  classes = [],
  onClassClick
}: ClassCardSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const handlePrev = () => {
    if (images.length > 0 && !isRotating) {
      setIsRotating(true);
      setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
      setTimeout(() => setIsRotating(false), 300);
    }
    onPrev?.();
  };

  const handleNext = () => {
    if (images.length > 0 && !isRotating) {
      setIsRotating(true);
      setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
      setTimeout(() => setIsRotating(false), 300);
    }
    onNext?.();
  };

  const currentImage = images.length > 0 ? images[currentIndex] : '';

  return (
    <div className={`relative ${className}`}>
      {/* 카드들 */}
      <div className="flex justify-center items-center gap-[5px]">
        {/* 왼쪽 카드 */}
        <SideCard 
          image={images[(currentIndex - 1 + images.length) % images.length]}
          classInfo={classes[(currentIndex - 1 + classes.length) % classes.length]}
          onClassClick={onClassClick}
        />
        
        {/* 가운데 카드 */}
        <CenterCard 
          image={currentImage}
          classInfo={classes[currentIndex]}
          isRotating={isRotating}
          onClassClick={onClassClick}
        />
        
        {/* 오른쪽 카드 */}
        <SideCard 
          image={images[(currentIndex + 1) % images.length]}
          classInfo={classes[(currentIndex + 1) % classes.length]}
          onClassClick={onClassClick}
        />
      </div>

      {/* 페이지네이션 점들 - 클래스 카드 아래 15px 간격 */}
      <div className="flex justify-center gap-2 pt-[15px]">
        {Array.from({ length: Math.max(classes.length, images.length) }, (_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx === currentIndex ? 'bg-[#00BBFF]' : 'bg-[#D9D9D9]'
            }`}
          />
        ))}
      </div>

      {/* Prev 버튼 */}
      <div 
        className="absolute left-0 top-[43px] -translate-y-1/2 w-[107px] h-[68px] flex items-center justify-center cursor-pointer"
        onClick={handlePrev}
      >
        <svg width="15" height="20" viewBox="0 0 15 20" fill="none">
          <path d="M12 2L3 10L12 18" stroke="#545454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Next 버튼 */}
      <div 
        className="absolute right-0 top-[43px] -translate-y-1/2 w-[107px] h-[68px] flex items-center justify-center cursor-pointer"
        onClick={handleNext}
      >
        <svg width="15" height="20" viewBox="0 0 15 20" fill="none">
          <path d="M3 2L12 10L3 18" stroke="#545454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
