import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../common/LoadingScreen';

export default function OAuthFailRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // 잠시 후 버전 선택 페이지로 이동
    const timer = setTimeout(() => {
      navigate('/version');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-[18px] font-semibold text-[#545454] mb-[8px]">
          로그인에 실패했습니다
        </div>
        <div className="text-[14px] text-[#666666]">
          버전 선택 페이지로 이동합니다...
        </div>
      </div>
    </div>
  );
}
