import axios from 'axios';
import type {
  CreateClassRequest,
  CreateClassResponse,
  GetBookedDatesParams,
  GetBookedDatesResponse,
  GovReservationResponse,
  ReserveGovPlaceRequest,
  ReserveGovPlaceResponse,
} from '../../types/create/createTypes';
import { getAccessToken } from '../../utils/cookieUtils';
import { API } from '../axios';

// 환경변수에서 API URL 가져오기
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/';

export const createClass = async (
  requestData: CreateClassRequest,
  images: File[],
  orders?: number[]
): Promise<CreateClassResponse> => {
  const formData = new FormData();

  const requestBlob = new Blob([JSON.stringify(requestData)], {
    type: 'application/json',
  });
  formData.append('req', requestBlob);

  images.forEach(file => {
    formData.append('images', file);
  });

  if (orders) {
    formData.append('orders', JSON.stringify(orders));
  }

  const token = getAccessToken();
  if (!token) {
    throw new Error('Authentication token not found.');
  }

  const response = await axios.post(
    `${BASE_URL}classes`, // 전체 API 엔드포인트 URL
    formData, // 요청 본문
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// 빈집 장소 조회
export const getGovReservation = async (): Promise<GovReservationResponse> => {
  const response = await API.get(`/classes/gov-places`);
  console.log('빈집 장소 조회: ', response.data);
  return response.data;
};

// 빈집 예약된 날짜/시간 조회
export const getGovPlaceBookedDates = async (
  placeId: number,
  params: GetBookedDatesParams
): Promise<GetBookedDatesResponse> => {
  const response = await API.get(`/classes/gov-places/${placeId}/occupancy`, {
    params: params,
  });
  console.log('빈집 예약된 날짜/시간 조회: ', response.data);

  return response.data;
};

export const reserveGovPlace = async (
  placeId: number,
  reservationData: ReserveGovPlaceRequest
): Promise<ReserveGovPlaceResponse> => {
  const response = await API.post(
    `classes/gov-places/${placeId}/reservations`,
    reservationData
  );

  console.log('예약 성공: ', response.data);
  return response.data;
};

// 멘토 장소 삭제 함수
export const deleteMyPlace = async (placeId: number): Promise<any> => {
  const response = await API.delete(`/classes/mentor-places/${placeId}`);
  return response.data;
};
