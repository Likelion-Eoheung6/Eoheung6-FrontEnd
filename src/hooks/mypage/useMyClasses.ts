import { useQuery } from '@tanstack/react-query';
import { getMyClasses } from '../../apis/mypage/mypageApi';

interface UseMyClassesOptions {
  enabled?: boolean;
}

export const useMyClasses = (options: UseMyClassesOptions = {}) => {
  return useQuery({
    queryKey: ['mypage', 'myClasses'],
    queryFn: async () => {
      try {
        return await getMyClasses();
      } catch (error: any) {
        // 404 에러는 "개설한 클래스가 없음"을 의미하므로 빈 데이터로 처리
        if (error?.response?.status === 404) {
          console.log('개설한 클래스가 없습니다.');
          return { data: [] };
        }
        throw error;
      }
    },
    enabled: options.enabled ?? true,
    retry: false, // 404 에러 시 재시도하지 않음
  });
};
