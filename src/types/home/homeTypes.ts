// 홈화면 광고 데이터
export interface AdData {
  openId: number;
  imageUrl: string;
}

// 홈화면 인기 클래스 데이터
export interface HotClassData {
  openId: number;
  imageUrl: string;
  title: string;
  appliedCount: number;
  capacity: number;
}

// 홈화면 모집 데이터
export interface RecruitData {
  recruitID: number;
  title: string;
  joinedCount: number;
  isJoined: boolean;
}

// 홈화면 API 응답 데이터
export interface HomeData {
  ads: AdData[];
  hots: HotClassData[];
  recruites: RecruitData[];
}

// 홈화면 API 응답
export interface HomeResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: HomeData;
  timeStamp: string;
}
