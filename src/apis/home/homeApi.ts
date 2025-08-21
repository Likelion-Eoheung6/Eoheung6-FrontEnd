import { API } from '../axios';
import type { HomeResponse } from '../../types/home/homeTypes';

// 홈화면 메인 데이터 조회 API
export const getMainData = async (): Promise<HomeResponse> => {
  const response = await API.get<HomeResponse>('/main');
  return response.data;
};

// 위시리스트 추가/제거 API
export const toggleWishlist = async (recruitId: number): Promise<any> => {
  const response = await API.post('/main', { recruitId });
  return response.data;
};
