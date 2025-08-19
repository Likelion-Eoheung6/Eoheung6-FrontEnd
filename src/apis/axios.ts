import axios from 'axios';
import { getAccessToken } from '../utils/cookieUtils';

// 환경변수에서 API URL 가져오기
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/";


export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false,
});

// 요청 인터셉터: 토큰을 자동으로 헤더에 추가
API.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 에러 시 토큰 삭제
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 토큰이 만료되었거나 유효하지 않은 경우 쿠키에서 삭제
      import('../utils/cookieUtils').then(({ removeAccessToken }) => {
        removeAccessToken();
      });
    }
    return Promise.reject(error);
  }
);
