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
