import { API } from '../axios';
import type { PopularTagsResponse, SearchRequest, SearchResponse } from '../../types/search/searchTypes';

// 인기 상위 10개 클래스 태그 조회 API
export const getPopularTags = async (): Promise<PopularTagsResponse> => {
  const response = await API.get('/retrieve');
  return response.data;
};

// 클래스 검색 API
export const searchClasses = async (request: SearchRequest): Promise<SearchResponse> => {
  const response = await API.post('/retrieve', request);
  return response.data;
};
