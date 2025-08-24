import { useQuery } from '@tanstack/react-query';
import { getTakenClasses } from '../../apis/mypage/mypageApi';

interface UseTakenClassesOptions {
  enabled?: boolean;
}

export const useTakenClasses = (options: UseTakenClassesOptions = {}) => {
  return useQuery({
    queryKey: ['mypage', 'takenClasses'],
    queryFn: async () => {
      try {
        return await getTakenClasses();
      } catch (error: any) {
        // 404 에러는 "수강한 클래스가 없음"을 의미하므로 빈 데이터로 처리
        if (error?.response?.status === 404) {
          console.log('수강한 클래스가 없습니다.');
          return { data: [] };
        }
        throw error;
      }
    },
    enabled: options.enabled ?? true,
    retry: false, // 404 에러 시 재시도하지 않음
  });
};
