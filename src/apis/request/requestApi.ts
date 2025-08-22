import axios from 'axios';
import { getAccessToken } from '../../utils/cookieUtils';
import type {
  ClassRequest,
  ClassRequestResponse,
} from '../../types/request/requestTypes';

// 환경변수에서 API URL 가져오기
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/';

export const requestClass = async (
  requestData: ClassRequest,
  images: File[]
): Promise<ClassRequestResponse> => {
  const formData = new FormData();

  // 1. JSON 데이터를 Blob으로 변환하여 FormData에 추가합니다.
  const requestBlob = new Blob([JSON.stringify(requestData)], {
    type: 'application/json',
  });
  formData.append('req', requestBlob);

  // 2. 이미지 파일들을 FormData에 추가합니다.
  images.forEach(file => {
    formData.append('images', file);
  });

  // 3. 인증 토큰을 가져옵니다.
  const token = getAccessToken();
  if (!token) {
    // 토큰이 없으면 에러를 발생시켜 요청을 중단합니다.
    throw new Error('Authentication token not found.');
  }

  // 4. axios를 직접 사용하여 POST 요청을 보냅니다.
  // FormData를 전송할 때 Content-Type 헤더는 axios가 자동으로
  // 'multipart/form-data'와 올바른 boundary 값으로 설정해줍니다.
  const response = await axios.post(
    `${BASE_URL}request`, // 전체 API 엔드포인트 URL
    formData, // 요청 본문
    {
      headers: {
        // 인증 헤더만 직접 설정해줍니다.
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
