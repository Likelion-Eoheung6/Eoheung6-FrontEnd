import { useQuery, useMutation } from '@tanstack/react-query';
import { getPopularTags, searchClasses } from '../../apis/search/searchApi';
import type { SearchRequest } from '../../types/search/searchTypes';

// 인기 태그 조회 훅
export const usePopularTags = () => {
  return useQuery({
    queryKey: ['popularTags'],
    queryFn: getPopularTags,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    gcTime: 10 * 60 * 1000, // 10분간 가비지 컬렉션 지연
  });
};

// 클래스 검색 훅
export const useSearchClasses = () => {
  return useMutation({
    mutationFn: (request: SearchRequest) => searchClasses(request),
  });
};
