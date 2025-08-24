import { API } from '../axios';
import type { WishlistResponse, WishlistUpdateRequest, WishlistUpdateResponse } from '../../types/wishlist/wishlistTypes';

// 위시리스트 조회 API
export const getWishlist = async (): Promise<WishlistResponse> => {
  const response = await API.get('/wish');
  return response.data;
};

// 위시리스트 일괄 업데이트 API
export const updateWishlist = async (request: WishlistUpdateRequest): Promise<WishlistUpdateResponse> => {
  const response = await API.post('/wish', request);
  return response.data;
};
