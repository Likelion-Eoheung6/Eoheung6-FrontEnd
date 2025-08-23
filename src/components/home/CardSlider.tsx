import React, { useState } from 'react';
import ClassCard from './ClassCard';

interface ClassInfo {
  title: string;
  currentParticipants: number;
  maxParticipants: number;
  id: string;
}

interface CardSliderProps {
  onPrev?: () => void;
  onNext?: () => void;
  className?: string;
  images?: string[];
  classes?: ClassInfo[];
  onClassClick?: (classId: string) => void;
}

export default function CardSlider({ 
  onPrev, 
  onNext, 
  className = '',
  images = [],
  classes = [],
  onClassClick
}: CardSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const handlePrev = () => {
    if (images.length > 0 && !isRotating) {
      setIsRotating(true);
      setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
      setTimeout(() => setIsRotating(false), 500);
    }
    onPrev?.();
  };

  const handleNext = () => {
    if (images.length > 0 && !isRotating) {
      setIsRotating(true);
      setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
      setTimeout(() => setIsRotating(false), 500);
    }
    onNext?.();
  };

  const currentImage = images.length > 0 ? images[currentIndex] : '';

  return (
    <div className={`relative ${className}`}>
      {/* 회색 배경 카드들 */}
      <div className="flex justify-center items-center gap-[5px]">
        <div className="w-[107px] h-[68px] bg-[#B3B3B3] rounded-[20px]"></div>
        <div 
          className={`w-[137px] h-[86px] rounded-[20px] transition-all duration-500 ease-in-out ${
            currentImage ? 'bg-cover bg-center' : 'bg-[#B3B3B3]'
          } ${
            isRotating ? 'transform scale-95 rotate-3' : 'transform scale-100 rotate-0'
          }`}
          style={currentImage ? { backgroundImage: `url(${currentImage})` } : undefined}
        ></div>
        <div className="w-[107px] h-[68px] bg-[#B3B3B3] rounded-[20px]"></div>
      </div>

      {/* 클래스 카드들 - 각 카드 아래 5px 간격 */}
      <div className="flex justify-center items-center gap-[2px] mt-[5px]">
        {/* 왼쪽 클래스 카드 (작은 크기) */}
        <div className="w-[107px] flex justify-center">
          {classes[0] && (
            <ClassCard 
              title={classes[0].title}
              currentParticipants={classes[0].currentParticipants}
              maxParticipants={classes[0].maxParticipants}
              size="small"
              onClick={() => onClassClick?.(classes[0].id)}
            />
          )}
        </div>
        
        {/* 가운데 클래스 카드 (큰 크기) */}
        <div className="w-[137px] flex justify-center">
          {classes[1] && (
            <ClassCard 
              title={classes[1].title}
              currentParticipants={classes[1].currentParticipants}
              maxParticipants={classes[1].maxParticipants}
              size="medium"
              onClick={() => onClassClick?.(classes[1].id)}
            />
          )}
        </div>
        
        {/* 오른쪽 클래스 카드 (작은 크기) */}
        <div className="w-[107px] flex justify-center">
          {classes[2] && (
            <ClassCard 
              title={classes[2].title}
              currentParticipants={classes[2].currentParticipants}
              maxParticipants={classes[2].maxParticipants}
              size="small"
              onClick={() => onClassClick?.(classes[2].id)}
            />
          )}
        </div>
      </div>

      {/* 페이지네이션 점들 - 클래스 카드 아래 15px 간격 */}
      <div className="flex justify-center gap-2 pt-[15px]">
        {Array.from({ length: Math.min(Math.max(classes.length, images.length), 5) }, (_, idx) => (
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
