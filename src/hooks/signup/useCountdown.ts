import { useState, useEffect } from 'react';

export const useCountdown = (initialTime: number = 180) => {
  const [countdown, setCountdown] = useState(0);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  // 카운트다운 시작
  const startCountdown = () => {
    setCountdown(initialTime);
    setIsCountdownActive(true);
  };

  // 카운트다운 리셋
  const resetCountdown = () => {
    setCountdown(initialTime);
    setIsCountdownActive(true);
  };

  // 카운트다운 정지
  const stopCountdown = () => {
    setIsCountdownActive(false);
    setCountdown(0);
  };

  // 시간 포맷팅 (MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // 카운트다운 useEffect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isCountdownActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setIsCountdownActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isCountdownActive, countdown]);

  return {
    countdown,
    isCountdownActive,
    formattedTime: formatTime(countdown),
    startCountdown,
    resetCountdown,
    stopCountdown
  };
};
