import { useQuery } from '@tanstack/react-query';
import { getRecommendClasses } from '../../apis/recommend/recommendApi';

// AI 추천 클래스 조회 훅
export const useRecommendClasses = () => {
  return useQuery({
    queryKey: ['recommend'],
    queryFn: getRecommendClasses,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분간 가비지 컬렉션 지연
  });
};
