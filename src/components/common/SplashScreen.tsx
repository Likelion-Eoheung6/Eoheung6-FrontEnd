import { useEffect, useState } from 'react';
import logo from '../../assets/common/logo.svg';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 3초 후에 로고가 start 페이지 위치로 이동
    const timer = setTimeout(() => {
      setIsTransitioning(true);
      // 이동 애니메이션 완료 후 페이드아웃 시작
      setTimeout(() => {
        setIsFading(true);
        // 페이드아웃 완료 후 콜백 실행
        setTimeout(onComplete, 500);
      }, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[linear-gradient(180deg,_#FDFDFD_28.75%,_#FFF6CC_100%)] transition-opacity duration-500 max-w-[430px] mx-auto ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center max-w-[430px] w-full">
        <img 
          src={logo} 
          alt="Logo" 
          className={`transition-all duration-1000 ease-in-out ${
            isTransitioning 
              ? 'w-[256px] h-[251px] translate-y-[-150px] animate-none' 
              : 'w-[322px] h-[315px] animate-spin'
          }`}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
