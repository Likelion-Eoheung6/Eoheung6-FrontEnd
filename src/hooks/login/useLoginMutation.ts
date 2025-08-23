import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login } from '../../apis/login/loginApi';
import { setAccessToken } from '../../utils/cookieUtils';
import type { LoginRequest } from '../../types/login/loginTypes';

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (data) => {
      // 로그인 성공 시 accessToken을 쿠키에 암호화하여 저장
      if (data.isSuccess && data.data.accessToken) {
        setAccessToken(data.data.accessToken);
        // 로그인 성공 후 홈페이지로 이동
        navigate('/version');
      }
    },
    onError: (error: any) => {
      // 에러 메시지 변환
      if (error?.response?.data?.code === 'SIGNIN_400_1' || error?.response?.data?.code === 'SIGNIN_400_2') {
        error.userMessage = '아이디 또는 비밀번호가 잘못되었습니다.';
      } else {
        error.userMessage = error?.response?.data?.message || '로그인에 실패했습니다.';
      }
    }
  });
};
