import type {
  ApplyClassRequest,
  ApplyClassResponse,
  GetClassDetailResponse,
  KakaoPayReadyRequest,
  KakaoPayReadyResponse,
} from '../../types/apply/applyTypes';
import { API } from '../axios';

// 클래스 상세조회
export const getClassDetail = async (
  openId: string
): Promise<GetClassDetailResponse> => {
  const response = await API.get(`/classes/${openId}`);
  console.log('클래스 상세조회 : ', response.data);
  return response.data;
};

// 클래스 신청하기
export const applyForClass = async (
  openId: string,
  requestData: ApplyClassRequest
): Promise<ApplyClassResponse> => {
  const response = await API.post(`/application/${openId}`, requestData);
  console.log('클래스 신청하기 결과 : ', response.data);
  return response.data;
};

// 클래스 결제하기
export const requestKakaoPayReady = async (
  paymentData: KakaoPayReadyRequest
): Promise<KakaoPayReadyResponse> => {
  const response = await API.post('/kakao-pay/ready', paymentData);
  console.log('카카오페이 준비 결과: ', response.data);
  return response.data;
};
