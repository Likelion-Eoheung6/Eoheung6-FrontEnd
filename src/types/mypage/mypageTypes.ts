export interface PreferredTag {
  tagId: number;
  genre: string;
}

export interface RecentReservation {
  applicationId: number;
  openId: number;
  title: string;
  openAt: string;
  startTime: string;
  endTime: string;
}

export interface MyPageData {
  userId: number;
  nickname: string;
  intro: string;
  profileImageUrl: string;
  preferredTags: PreferredTag[];
  recentReservation: RecentReservation;
}

export interface MyPageResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: MyPageData;
  timeStamp: string;
}

// 프로필 수정 요청 타입
export interface UpdateProfileRequest {
  nickname: string;
  intro: string;
  preferredTagIds: number[];
}

// 프로필 수정 응답 타입 (MyPageResponse와 동일)
export interface UpdateProfileResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: MyPageData;
  timeStamp: string;
}

// 예약한 클래스 정보 타입
export interface ReservedClass {
  openId: number;
  imageUrl: string;
  title: string;
  roadAddress: string;
  capacity: number;
  appliedCount: number;
  price: number;
}

// 예약한 클래스 목록 조회 응답 타입
export interface ReservedClassesResponse {
  isSuccess: boolean;
  code: string;
  httpStatus: number;
  message: string;
  data: ReservedClass[];
  timeStamp: string;
}
