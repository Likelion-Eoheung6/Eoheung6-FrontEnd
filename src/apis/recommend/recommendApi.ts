import { API } from '../axios';
import type { RecommendResponse } from '../../types/recommend/recommendTypes';

// AI 추천 클래스 조회 API
export const getRecommendClasses = async (): Promise<RecommendResponse> => {
  const response = await API.get('/suggest');
  return response.data;
};
