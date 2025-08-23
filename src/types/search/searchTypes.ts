// 인기 태그 응답 타입
export interface PopularTagsResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: {
    tags: string[];
  };
  timeStamp: string;
}

// 검색 클래스 정보 타입
export interface SearchClass {
  openId: number;
  image: string;
  title: string;
  capacity: number;
  count: number;
  price: number;
  educationTagGenre: string;
  moodTagsJson: string[];
  roadAddress: string;
}

// 검색 요청 타입
export interface SearchRequest {
  retrieve: string | string[];
}

// 검색 응답 타입
export interface SearchResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: {
    normal: SearchClass[];
    Advertisement: SearchClass[];
  };
  timeStamp: string;
}
