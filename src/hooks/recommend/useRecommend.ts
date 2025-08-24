import { useQuery } from '@tanstack/react-query';
import { getRecommendClasses } from '../../apis/recommend/recommendApi';

// AI 추천 클래스 조회 훅
export const useRecommendClasses = () => {
  return useQuery({
    queryKey: ['recommend'],
    queryFn: async () => {
      try {
        return await getRecommendClasses();
      } catch (error: any) {
        // 404 에러는 "추천 클래스가 없음"을 의미하므로 빈 데이터로 처리
        if (error?.response?.status === 404) {
          return { data: [] };
        }
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분간 가비지 컬렉션 지연
    retry: (failureCount, error) => {
      // 404 에러는 재시도하지 않음 (추천 클래스가 없는 경우)
      const is404Error = (error as any)?.response?.status === 404;
      return !is404Error && failureCount < 3;
    },
  });
};
