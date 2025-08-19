import axios from 'axios';

// 개발 환경에서는 프록시 사용, 프로덕션에서는 실제 URL 사용
const BASE_URL = import.meta.env.DEV 
  ? '/api' 
  : 'https://api.13th.shop/api';

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false,
});
