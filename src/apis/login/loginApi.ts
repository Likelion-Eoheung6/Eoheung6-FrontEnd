import { API } from '../axios';
import type { LoginRequest, LoginResponse } from '../../types/login/loginTypes';

// 로그인 API
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await API.post('/users/signin', data);
  return response.data;
};
