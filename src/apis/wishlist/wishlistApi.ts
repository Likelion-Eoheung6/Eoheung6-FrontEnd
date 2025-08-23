import { API } from '../axios';
import type { WishlistResponse } from '../../types/wishlist/wishlistTypes';

// 위시리스트 조회 API
export const getWishlist = async (): Promise<WishlistResponse> => {
  const response = await API.get('/wish');
  return response.data;
};
