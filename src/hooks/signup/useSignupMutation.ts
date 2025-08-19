import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../apis/signup/signupApi';
import type { SignupRequest } from '../../types/signup/signupTypes';

export const useSignupMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SignupRequest) => signup(data),
    onSuccess: (data) => {
      // 성공 시 로그인 페이지로 이동
      navigate('/login');
    },
    onError: (error: any) => {
      console.error('회원가입 실패:', error);
      console.error('에러 상세 정보:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url
      });
      throw error;
    }
  });
};
