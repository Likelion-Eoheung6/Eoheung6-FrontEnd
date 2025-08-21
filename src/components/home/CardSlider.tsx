import { useState} from 'react';
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
      {/* 회색 배경 카드들 */}
      <div className="flex justify-center items-center gap-[5px]">
        <div 
          className={`w-[107px] h-[68px] rounded-[20px] transition-all duration-300 ease-in-out ${
            images[(currentIndex - 1 + images.length) % images.length] ? 'bg-cover bg-center' : 'bg-[#B3B3B3]'
          }`}
          style={images[(currentIndex - 1 + images.length) % images.length] ? { backgroundImage: `url(${images[(currentIndex - 1 + images.length) % images.length]})` } : undefined}
        ></div>
        <div 
          className={`w-[137px] h-[86px] rounded-[20px] transition-all duration-300 ease-in-out ${
            currentImage ? 'bg-cover bg-center' : 'bg-[#B3B3B3]'
          } ${
            isRotating ? 'transform scale-95 rotate-3' : 'transform scale-100 rotate-0'
          }`}
          style={currentImage ? { backgroundImage: `url(${currentImage})` } : undefined}
        ></div>
        <div 
          className={`w-[107px] h-[68px] rounded-[20px] transition-all duration-300 ease-in-out ${
            images[(currentIndex + 1) % images.length] ? 'bg-cover bg-center' : 'bg-[#B3B3B3]'
          }`}
          style={images[(currentIndex + 1) % images.length] ? { backgroundImage: `url(${images[(currentIndex + 1) % images.length]})` } : undefined}
        ></div>
      </div>

      {/* 클래스 카드들 - 각 카드 아래 5px 간격 */}
      <div className="flex justify-center items-center gap-[2px] mt-[5px]">
        {/* 왼쪽 클래스 카드 (작은 크기) */}
        <div className="w-[107px] flex justify-center">
          {classes[(currentIndex - 1 + classes.length) % classes.length] && (
            <ClassCard 
              title={classes[(currentIndex - 1 + classes.length) % classes.length].title}
              currentParticipants={classes[(currentIndex - 1 + classes.length) % classes.length].currentParticipants}
              maxParticipants={classes[(currentIndex - 1 + classes.length) % classes.length].maxParticipants}
              size="small"
              onClick={() => onClassClick?.(classes[(currentIndex - 1 + classes.length) % classes.length].id)}
            />
          )}
        </div>
        
        {/* 가운데 클래스 카드 (큰 크기) */}
        <div className="w-[137px] flex justify-center">
          {classes[currentIndex] && (
            <ClassCard 
              title={classes[currentIndex].title}
              currentParticipants={classes[currentIndex].currentParticipants}
              maxParticipants={classes[currentIndex].maxParticipants}
              size="medium"
              onClick={() => onClassClick?.(classes[currentIndex].id)}
            />
          )}
        </div>
        
        {/* 오른쪽 클래스 카드 (작은 크기) */}
        <div className="w-[107px] flex justify-center">
          {classes[(currentIndex + 1) % classes.length] && (
            <ClassCard 
              title={classes[(currentIndex + 1) % classes.length].title}
              currentParticipants={classes[(currentIndex + 1) % classes.length].currentParticipants}
              maxParticipants={classes[(currentIndex + 1) % classes.length].maxParticipants}
              size="small"
              onClick={() => onClassClick?.(classes[(currentIndex + 1) % classes.length].id)}
            />
          )}
        </div>
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
