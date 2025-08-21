import { useMutation } from '@tanstack/react-query';
import { postTags, retrieveTags } from '../../apis/tag/tagApi';
import type { TagRequest, TagResponse, TagRetrieveRequest, TagRetrieveResponse } from '../../types/tag/tagTypes';

export const useTagMutation = () => {
  return useMutation<TagResponse, Error, TagRequest>({
    mutationFn: postTags,
    onError: (error) => {
      console.error('태그 API 호출 중 오류 발생:', error);
    },
  });
};

// 태그로 클래스 검색 훅
export const useTagRetrieveMutation = () => {
  return useMutation<TagRetrieveResponse, Error, TagRetrieveRequest>({
    mutationFn: retrieveTags,
    onError: (error) => {
      console.error('태그 검색 API 호출 중 오류 발생:', error);
    },
  });
};
