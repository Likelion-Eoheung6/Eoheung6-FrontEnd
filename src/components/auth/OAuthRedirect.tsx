import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingScreen from '../common/LoadingScreen';
import { setAccessToken } from '../../utils/cookieUtils';

export default function OAuthRedirect() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // URL에서 토큰 추출
    const token = searchParams.get('token');
    const currentUrl = window.location.href;
    
    console.log('OAuth Redirect URL:', currentUrl);
    console.log('Token from searchParams:', token);
    console.log('All search params:', Object.fromEntries(searchParams.entries()));
    
    if (token && token.trim() !== '') {
      // JWT 토큰을 쿠키에 저장
      setAccessToken(token);
      console.log('Token saved to cookie');
      
      // 버전 선택 페이지로 이동
      navigate('/version');
    } else {
      console.log('No valid token found, redirecting to oauth-fail');
      // 토큰이 없으면 로그인 실패로 처리
      navigate('/oauth-fail');
    }
  }, [searchParams, navigate]);

  return <LoadingScreen />;
}
