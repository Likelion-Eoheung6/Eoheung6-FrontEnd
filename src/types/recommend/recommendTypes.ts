// AI 추천 클래스 정보 타입
export interface RecommendClass {
  openId: number;
  imageUrl: string;
  title: string;
  roadAddress: string;
  capacity: number;
  appliedCount: number;
  price: number;
  eduGenre: string;
  modeGenre: string[];
}

// AI 추천 응답 타입
export interface RecommendResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: RecommendClass[];
  timeStamp: string;
}
