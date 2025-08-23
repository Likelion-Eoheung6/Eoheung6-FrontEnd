import { useState, useEffect } from 'react';
import logo from '../../assets/common/logo2.svg';
import loading1 from '../../assets/loading/loadigin-1.svg';
import loading2 from '../../assets/loading/loading-2.svg';

interface LoadingScreenProps {
  isVisible?: boolean;
}

export default function LoadingScreen({ isVisible = true }: LoadingScreenProps) {
  const [currentImage, setCurrentImage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentImage(prev => prev === 1 ? 2 : 1);
        setIsTransitioning(false);
      }, 600);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="max-w-[430px] mx-auto fixed inset-0 bg-[#FDFDFD] z-50 flex flex-col">
      {/* 로고 - 최상단 */}
      <div className="w-full h-[64px] flex items-center justify-center">
        <img src={logo} alt="이음학당" className="h-[64px]" />
      </div>

      {/* 로딩 콘텐츠 */}
      <div className="flex-1 flex flex-col items-center mt-[120px] sm:mt-[160px] md:mt-[180px] lg:mt-[210px]">
        {/* 로딩 애니메이션 */}
        <div className="relative w-[300px] h-[300px] mb-[24px]">
          {currentImage === 1 ? (
            <img 
              src={loading1} 
              alt="로딩" 
              className={`w-full h-full transition-all duration-600 ease-in-out ${
                isTransitioning ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
              }`}
            />
          ) : (
            <img 
              src={loading2} 
              alt="로딩" 
              className={`w-full h-full transition-all duration-600 ease-in-out ${
                isTransitioning ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
              }`}
            />
          )}
        </div>
          {/* 로딩 텍스트 */}
          <div className="text-center">
            <p className="text-[#545454] text-[18px] font-medium leading-[120%] tracking-[-0.025em]">
              세대를 잇는 하루의 순간, 지금 챙겨오는 중이에요!
            </p>
          </div>
        </div>
      </div>
    );
  }
