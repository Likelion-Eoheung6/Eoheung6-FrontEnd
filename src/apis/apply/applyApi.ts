import type { GetClassDetailResponse } from '../../types/class/classTypes';
import { API } from '../axios';

export const getClassDetail = async (
  openId: string
): Promise<GetClassDetailResponse> => {
  const response = await API.get(`/classes/${openId}`);
  console.log('클래스 상세조회 : ', response.data);
  return response.data;
};
