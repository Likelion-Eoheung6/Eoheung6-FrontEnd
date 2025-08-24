import type {
  ApplyClassRequest,
  ApplyClassResponse,
  GetClassDetailResponse,
  KakaoPayReadyRequest,
  KakaoPayReadyResponse,
  TossPaymentResponse,
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

interface ConfirmPaymentRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}

/**
 * 토스페이먼츠 결제를 최종 승인하기 위해 백엔드 서버에 GET 요청을 보냅니다.
 * @param data paymentKey, orderId, amount를 포함하는 객체
 */
export const confirmTossPayment = async (
  data: ConfirmPaymentRequest
): Promise<TossPaymentResponse> => {
  // ⭐️ API.get의 두 번째 인자로 { params: data } 객체를 전달합니다.
  const response = await API.get('/toss-payment/confirm', {
    params: data,
  });

  console.log('토스페이 결제 결과: ', response.data);
  return response.data;
};
