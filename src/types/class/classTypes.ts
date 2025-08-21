export interface CreateClassRequest {
  infoId: number | null;
  title: string;
  content: string;
  tags: string[];
  mentorPlaceId: number | null;
  govReservationId: number | null;
  openAt: string; // "YYYY-MM-DD"
  price: number;
  capacity: number;
  startTime: string; // "HH:mm:ss"
  endTime: string; // "HH:mm:ss"
}

export interface ClassDetailData {
  openId: number;
  infoId: number;
  isWished: boolean;
  title: string;
  content: string;
  mentorPlaceId: number | null;
  govReservationId: number | null;
  openAt: string;
  startTime: string;
  endTime: string;
  capacity: number;
  price: number;
  isFull: boolean;
  educationTag: string;
  moodTags: string[];
  createdAt: string;
  updatedAt: string;
  imageUrls: string[];
  roadAddress: string;
  zipCode: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
  mentorProfileImageUrl: string;
  mentorIntro: string;
}

export interface GetClassDetailResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: ClassDetailData;
  timeStamp: string;
}

export interface ApplyClassRequest {
  toggleWished: boolean;
  count: number;
}

export interface ApplyClassData {
  applicationId: number;
  status: string;
  message: string;
}

export interface ApplyClassResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: ApplyClassData | null;
  timeStamp: string;
}

// 카카오페이 준비(ready) API 요청 타입
export interface KakaoPayReadyRequest {
  orderId: string;
  itemName: string;
  quantity: number;
  totalPrice: number;
}

// 카카오페이 준비(ready) API 응답 데이터 타입
export interface KakaoPayReadyData {
  tid: string;
  next_redirect_pc_url: string;
  next_redirect_mobile_url: string;
}

// 카카오페이 준비(ready) API 전체 응답 타입
export interface KakaoPayReadyResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: KakaoPayReadyData;
  timeStamp: string;
}
