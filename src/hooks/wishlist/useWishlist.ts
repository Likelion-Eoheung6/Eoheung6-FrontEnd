import { useQuery } from '@tanstack/react-query';
import { getWishlist } from '../../apis/wishlist/wishlistApi';

// 위시리스트 조회 훅
export const useWishlist = () => {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
    staleTime: 5 * 60 * 1000, // 5분
    retry: (failureCount, error) => {
      // 404 에러는 재시도하지 않음 (위시리스트가 비어있는 경우)
      const is404Error = (error as any)?.response?.status === 404;
      return !is404Error && failureCount < 3;
    },
  });
};
