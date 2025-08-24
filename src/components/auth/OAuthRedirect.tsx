import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingScreen from '../common/LoadingScreen';
import { setAccessToken, getAccessToken, debugCookies } from '../../utils/cookieUtils';

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
    
    // 디버깅 정보 출력
    debugCookies();
    
    if (token && token.trim() !== '') {
      try {
        // JWT 토큰을 쿠키에 저장
        setAccessToken(token);
        console.log('Token saved to cookie');
        
        // 쿠키 저장 확인
        setTimeout(() => {
          const savedToken = getAccessToken();
          console.log('쿠키에서 읽은 토큰:', savedToken ? '저장됨' : '저장되지 않음');
          
          // 저장 후 디버깅 정보 다시 출력
          debugCookies();
          
          if (savedToken) {
            console.log('토큰 저장 성공, 태그 선택 페이지로 이동');
            navigate('/version');
          } else {
            console.error('토큰 저장 실패, 로그인 실패 페이지로 이동');
            navigate('/oauth-fail');
          }
        }, 100); // 100ms 후 쿠키 저장 확인
        
      } catch (error) {
        console.error('토큰 저장 중 오류 발생:', error);
        navigate('/oauth-fail');
      }
    } else {
      console.log('No valid token found, redirecting to oauth-fail');
      // 토큰이 없으면 로그인 실패로 처리
      navigate('/oauth-fail');
    }
  }, [searchParams, navigate]);

  return <LoadingScreen />;
}
