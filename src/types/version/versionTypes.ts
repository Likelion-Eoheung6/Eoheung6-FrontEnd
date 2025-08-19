// 버전 선택 요청 타입
export interface VersionRequest {
  chooseEasyVer: boolean;
}

// 버전 선택 응답 타입
export interface VersionResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: null;
  timeStamp: string;
}
