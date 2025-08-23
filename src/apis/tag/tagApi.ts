import { API } from '../axios';
import type { TagRequest, TagResponse, TagRetrieveRequest, TagRetrieveResponse } from '../../types/tag/tagTypes';

export const postTags = async (request: TagRequest): Promise<TagResponse> => {
  const response = await API.post<TagResponse>('/tag', request);
  return response.data;
};

// 태그로 클래스 검색 API
export const retrieveTags = async (request: TagRetrieveRequest): Promise<TagRetrieveResponse> => {
  const response = await API.post<TagRetrieveResponse>('/tag/retrieve', request);
  return response.data;
};
