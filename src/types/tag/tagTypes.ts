export interface TagRequest {
  tag: string[];
}

export interface TagResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: {
    genre: string[];
  };
  timeStamp: string;
}

// 태그 검색용 요청/응답 타입
export interface TagRetrieveRequest {
  tag: string[];
}

export interface ClassData {
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

export interface TagRetrieveResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: ClassData[];
  timeStamp: string;
}
