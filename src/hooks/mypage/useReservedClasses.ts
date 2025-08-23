import { useQuery } from '@tanstack/react-query';
import { getReservedClasses } from '../../apis/mypage/mypageApi';

interface UseReservedClassesOptions {
  enabled?: boolean;
}

export const useReservedClasses = (options: UseReservedClassesOptions = {}) => {
  return useQuery({
    queryKey: ['mypage', 'reservedClasses'],
    queryFn: async () => {
      try {
        return await getReservedClasses();
      } catch (error: any) {
        // 404 에러는 "예약한 클래스가 없음"을 의미하므로 빈 데이터로 처리
        if (error?.response?.status === 404) {
          return { data: [] };
        }
        throw error;
      }
    },
    enabled: options.enabled ?? true,
    retry: false, // 404 에러 시 재시도하지 않음
  });
};
