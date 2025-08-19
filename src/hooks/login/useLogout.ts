import { useNavigate } from 'react-router-dom';
import { removeAccessToken } from '../../utils/cookieUtils';

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // 쿠키에서 액세스 토큰 제거
    removeAccessToken();
    
    // 로그인 페이지로 이동
    navigate('/login');
  };

  return { logout };
};
