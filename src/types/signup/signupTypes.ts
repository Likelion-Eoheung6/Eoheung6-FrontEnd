export interface SignupRequest {
  id: string;
  password: string;
  email: string;
  phone: string;
}

export interface SignupResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: {
    accessToken: string;
  };
  timeStamp: string;
}

export interface CheckIdRequest {
  id: string;
}

export interface CheckIdResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: boolean;
  timeStamp: string;
}

export interface SendCodeRequest {
  phone: string;
}

export interface SendCodeResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: null;
  timeStamp: string;
}

export interface VerifyCodeRequest {
  phone: string;
  code: string;
}

export interface VerifyCodeResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: boolean;
  timeStamp: string;
}
