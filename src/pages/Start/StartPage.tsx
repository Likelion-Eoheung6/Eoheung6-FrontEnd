import { useEffect, useState } from 'react';
import OnLogo from '../../assets/common/logo.svg';

export default function StartPage() {
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [isLogoSpinning, setIsLogoSpinning] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // 0.5초 후에 로고가 서서히 나타남
    const fadeInTimer = setTimeout(() => {
      setIsLogoVisible(true);
    }, 500);

    // 3.5초 후에 로고가 start 페이지 위치로 이동
    const transitionTimer = setTimeout(() => {
      setIsTransitioning(true);
    }, 3500);

    // 5.1초 후에 페이지 내용이 나타남 (로고 이동 완료 후)
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 4500);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(transitionTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div className="relative mx-auto min-h-screen">
      <style>{`
        @keyframes spin-smooth {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse-gentle {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.9;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes float-subtle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .spin-smooth {
          animation: spin-smooth 2s linear infinite;
        }
        
        .pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }
        
        .float-subtle {
          animation: float-subtle 3s ease-in-out infinite;
        }
      `}</style>
      
      <div className="absolute inset-0 w-full min-h-screen bg-[linear-gradient(180deg,_#FDFDFD_28.75%,_#FFF6CC_100%)]" />
      
      {/* 로고 (중앙에서 start 페이지 위치로 이동) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src={OnLogo} 
          alt="start-logo" 
          className={`transition-all duration-1600 ease-in-out ${
            isTransitioning 
              ? 'w-[256px] h-[251px] translate-y-[-150px] scale-100' 
              : 'w-[322px] h-[315px] scale-110'
          } ${!isTransitioning ? 'spin-smooth pulse-gentle float-subtle' : ''} ${
            isLogoVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
      
      {/* 페이지 내용 (로고 안착 완료 후 페이드인) */}
      <div className={`absolute left-0 top-[202px] w-full flex flex-col items-center transition-opacity duration-1600 ease-in-out ${
        showContent ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="w-[256px] h-[251px]"></div>
        <p className="mt-[20px] w-[324px] m-0 text-center text-[rgba(84,84,84,1)] font-medium text-[18px] leading-[1.2] tracking-[-0.025em] whitespace-pre-line">
          {`취미, 배움, 이야기까지 세대를 잇는 하루 클래스\n'이음학당'에서 찾아보세요!`}
        </p>
        <button
          type="button"
          onClick={() => (window.location.href = '/login')}
          className="mt-[30px] w-[301px] h-[34px] rounded-[20px] bg-[#009DFF] flex items-center justify-center border-0 outline-none focus:outline-none ring-0 focus:ring-0 shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] cursor-pointer"
        >
          <span className="text-[#FDFDFD] text-[14px] font-semibold leading-[1.2] tracking-[-0.025em]">
            시작하기
          </span>
        </button>
      </div>
    </div>
  );
}


