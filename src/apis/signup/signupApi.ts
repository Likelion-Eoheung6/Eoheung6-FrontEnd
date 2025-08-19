import { API } from '../axios';
import type { 
  SignupRequest, 
  SignupResponse,
  CheckIdRequest,
  CheckIdResponse,
  SendCodeRequest,
  SendCodeResponse,
  VerifyCodeRequest,
  VerifyCodeResponse
} from '../../types/signup/signupTypes';

// 회원가입 API
export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await API.post('/auth/signup', data);
  return response.data;
};

// 아이디 중복체크 API
export const checkId = async (data: CheckIdRequest): Promise<CheckIdResponse> => {
  const response = await API.get(`/users/signup/checkId?id=${data.id}`);
  return response.data;
};

// 휴대폰 인증 요청 API
export const sendCode = async (data: SendCodeRequest): Promise<SendCodeResponse> => {
  const response = await API.post('/auth/send-code', data);
  return response.data;
};

// 인증번호 확인 API
export const verifyCode = async (data: VerifyCodeRequest): Promise<VerifyCodeResponse> => {
  const response = await API.post('/auth/verify-code', data);
  return response.data;
};