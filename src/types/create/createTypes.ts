export interface CreateClassData {
  openId: number;
  infoId: number;
  title: string;
  mentorPlaceId: number | null;
  govReservationId: number;
  openAt: string;
  startTime: string;
  endTime: string;
  capacity: number;
  price: number;
  isFull: boolean;
  thumbnailUrl: string;
}

export interface CreateClassRequest {
  title: string;
  content: string;
  mentorPlaceId: number | null;
  govReservationId: number | null;
  openAt: string; // "YYYY-MM-DD"
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  capacity: number;
  price: number;
  tags: string[];
}

export interface CreateClassResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: CreateClassData;
  timeStamp: string;
}

// 빈집 데이터
export interface GovReservationData {
  id: number;
  roadAddress: string;
  zipCode: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
  areaTotalSqm: number;
  areaUsableSqm: number;
  capacity: number;
  thumbnail: string;
}

export interface GovReservationResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: GovReservationData[];
  timeStamp: string;
}

export interface GetBookedDatesParams {
  month: string;
  tz?: string; // 타임존 (예: "Asia/Seoul")
  slot?: number; // 타임슬롯 (예: 5)
  open?: string; // 시작 운영시간 (예: "00:00")
  close?: string; // 종료 운영시간 (예: "24:00")
}

export interface BookedRange {
  start: string;
  end: string;
}

/**
 * 일별 예약 정보를 나타내는 타입
 */
export interface DailyBookingInfo {
  date: string;
  full: boolean;
  bookedRanges: BookedRange[];
}

export interface BookedDatesData {
  placeId: number;
  month: string;
  timezone: string;
  slotSizeMin: number;
  openTime: string;
  closeTime: string;
  days: DailyBookingInfo[];
}

/**
 * 빈집 예약 날짜/시간 조회 API의 전체 응답 타입
 */
export interface GetBookedDatesResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: BookedDatesData;
  timeStamp: string;
}

export interface ReserveGovPlaceRequest {
  date: string; // "YYYY-MM-DD"
  start: string; // "HH:mm"
  end: string; // "HH:mm"
}

/**
 * 빈집 예약 API 성공 응답의 'data' 필드에 해당하는 타입
 */
export interface ReserveGovPlaceData {
  reservationId: number;
  placeId: number;
  date: string;
  start: string;
  end: string;
  latitude: number;
  longitude: number;
}

/**
 * 빈집 예약 API의 전체 응답 타입
 */
export interface ReserveGovPlaceResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: ReserveGovPlaceData;
  timeStamp: string;
}

export interface AppliedClassDetail {
  openId: number;
  title: string;
  openAt: string;
  roadAddress: string;
  price: number;
  capacity: number;
  startTime: string;
  endTime: string;
}

export interface AppliedClassDetailResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: AppliedClassDetail[]; // data는 ClassDetail 객체들의 배열입니다.
  timeStamp: string;
}
