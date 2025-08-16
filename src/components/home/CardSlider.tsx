import React, { useState } from 'react';

interface CardSliderProps {
  onPrev?: () => void;
  onNext?: () => void;
  className?: string;
  images?: string[];
}

export default function CardSlider({ 
  onPrev, 
  onNext, 
  className = '',
  images = []
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
    <div className={`mb-[18px] relative ${className}`}>
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

      {/* Prev 버튼 */}
      <div 
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[107px] h-[68px] flex items-center justify-center cursor-pointer"
        onClick={handlePrev}
      >
        <svg width="15" height="20" viewBox="0 0 15 20" fill="none">
          <path d="M12 2L3 10L12 18" stroke="#545454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Next 버튼 */}
      <div 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[107px] h-[68px] flex items-center justify-center cursor-pointer"
        onClick={handleNext}
      >
        <svg width="15" height="20" viewBox="0 0 15 20" fill="none">
          <path d="M3 2L12 10L3 18" stroke="#545454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
