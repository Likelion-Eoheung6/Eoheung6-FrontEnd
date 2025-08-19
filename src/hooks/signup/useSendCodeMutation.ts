import { useMutation } from '@tanstack/react-query';
import { sendCode } from '../../apis/signup/signupApi';
import type { SendCodeRequest } from '../../types/signup/signupTypes';

export const useSendCodeMutation = () => {
  return useMutation({
    mutationFn: (data: SendCodeRequest) => sendCode(data),
    onSuccess: (data) => {
      console.log('휴대폰 인증 요청 성공:', data);
    },
    onError: (error: any) => {
      console.error('휴대폰 인증 요청 실패:', error);
      throw error;
    }
  });
};
