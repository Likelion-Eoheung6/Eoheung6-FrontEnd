import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { selectVersion } from '../../apis/version/versionApi';
import type { VersionRequest } from '../../types/version/versionTypes';

export const useVersionMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: VersionRequest) => selectVersion(data),
    onSuccess: (data, variables) => {
      if (data.isSuccess) {
        // 선택된 버전에 따라 다른 페이지로 이동
        if (variables.chooseEasyVer) {
          // 쉬운 버전 선택 시
          navigate('/tags?version=easy');
        } else {
          // 기본 버전 선택 시
          navigate('/tags');
        }
      }
    },
    onError: (error: any) => {
      console.error('버전 선택 에러:', error);
      
      // 401 에러인 경우 로그인 페이지로 이동
      if (error.response?.status === 401) {
        navigate('/login');
        return;
      }
      
      // 에러 메시지 변환
      error.userMessage = error?.response?.data?.message || '버전 선택에 실패했습니다.';
    }
  });
};
