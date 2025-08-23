import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingScreen from '../common/LoadingScreen';

export default function OAuthRedirect() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      // JWT 토큰을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', token);
      
      // 버전 선택 페이지로 이동
      navigate('/version');
    } else {
      // 토큰이 없으면 로그인 실패로 처리
      navigate('/oauth-fail');
    }
  }, [token, navigate]);

  return <LoadingScreen />;
}
