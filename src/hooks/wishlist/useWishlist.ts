import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWishlist, updateWishlist } from '../../apis/wishlist/wishlistApi';
import type { WishlistUpdateRequest } from '../../types/wishlist/wishlistTypes';

// 위시리스트 조회 훅
export const useWishlist = () => {
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
    staleTime: 0, // 캐시 비활성화
    gcTime: 0, // 가비지 컬렉션 시간 0
    retry: (failureCount, error) => {
      // 404 에러는 재시도하지 않음 (위시리스트가 비어있는 경우)
      const is404Error = (error as any)?.response?.status === 404;
      return !is404Error && failureCount < 3;
    },
  });
};

// 위시리스트 일괄 업데이트 훅
export const useUpdateWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWishlist,
    onSuccess: () => {
    },
  });
};
