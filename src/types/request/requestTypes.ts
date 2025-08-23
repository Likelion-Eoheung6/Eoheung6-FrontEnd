export interface ClassRequest {
  title: string;
  content: string;
}

export interface ClassRequestData {
  title: string;
  content: string;
}

/**
 * AI 클래스 추천 API의 전체 응답 타입
 */
export interface ClassRequestResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: ClassRequestData;
  timeStamp: string;
}
