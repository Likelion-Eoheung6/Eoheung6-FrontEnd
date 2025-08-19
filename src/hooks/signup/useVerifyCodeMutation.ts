import { useMutation } from '@tanstack/react-query';
import { verifyCode } from '../../apis/signup/signupApi';
import type { VerifyCodeRequest } from '../../types/signup/signupTypes';

export const useVerifyCodeMutation = () => {
  return useMutation({
    mutationFn: (data: VerifyCodeRequest) => verifyCode(data),
    onSuccess: (data) => {
      console.log('인증번호 확인 성공:', data);
    },
    onError: (error: any) => {
      console.error('인증번호 확인 실패:', error);
      throw error;
    }
  });
};
