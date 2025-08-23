// 위시리스트 클래스 정보 타입
export interface WishClass {
  openId: number;
  imageUrl: string;
  title: string;
  roadAddress: string;
  openAt: string;
  price: number;
}

// 위시리스트 응답 타입
export interface WishlistResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: {
    WishPage: WishClass[];
  };
  timeStamp: string;
}


