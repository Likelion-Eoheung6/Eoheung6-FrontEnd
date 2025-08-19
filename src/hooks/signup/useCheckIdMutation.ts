import { useMutation } from '@tanstack/react-query';
import { checkId } from '../../apis/signup/signupApi';
import type { CheckIdRequest } from '../../types/signup/signupTypes';

export const useCheckIdMutation = () => {
  return useMutation({
    mutationFn: (data: CheckIdRequest) => checkId(data),
    onSuccess: (data) => {
      console.log('아이디 중복체크 성공:', data);
    },
    onError: (error: any) => {
      console.error('아이디 중복체크 실패:', error);
      throw error;
    }
  });
};
