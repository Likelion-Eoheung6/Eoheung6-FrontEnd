// 로그인 요청 타입
export interface LoginRequest {
  id: string;
  password: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: {
    accessToken: string;
  };
  timeStamp: string;
}
