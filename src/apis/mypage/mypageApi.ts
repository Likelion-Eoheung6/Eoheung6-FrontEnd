import { API } from '../axios';
import type {
  MyPageResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  ReservedClassesResponse,
  MyClassesResponse,
  TakenClassesResponse,
} from '../../types/mypage/mypageTypes';
import type { AppliedClassDetailResponse } from '../../types/create/createTypes';

export const getMyPageData = async (): Promise<MyPageResponse> => {
  const response = await API.get('/users/me');
  return response.data;
};

export const updateProfile = async (
  data: UpdateProfileRequest,
  imageFile?: File
): Promise<UpdateProfileResponse> => {
  // 항상 FormData로 요청 (API 명세에 따르면 req 필드가 필수)
  console.log('FormData 요청으로 전송');
  const formData = new FormData();

  // req 필드가 항상 먼저 추가되도록 보장
  formData.append('req', JSON.stringify(data));

  // 이미지 파일이 있으면 나중에 추가
  if (imageFile) {
    formData.append('image', imageFile);
  }

  console.log('업데이트 데이터:', data);
  console.log('이미지 파일:', imageFile);
  console.log('FormData 내용:');
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const response = await API.put('/users/me', formData, {
      headers: {
        // Content-Type을 제거하여 브라우저가 자동으로 multipart/form-data로 설정하도록 함
      },
    });

    console.log('응답 성공:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('API 요청 실패:', error.response?.data || error.message);
    console.error('응답 상태:', error.response?.status);
    throw error;
  }
};

export const getReservedClasses =
  async (): Promise<ReservedClassesResponse> => {
    const response = await API.get('/retrieve/reserve');
    return response.data;
  };

export const getTakenClasses = async (): Promise<TakenClassesResponse> => {
  console.log('수강한 클래스 API 호출 시작');
  const response = await API.get('/retrieve/take');
  console.log('수강한 클래스 API 응답:', response.data);
  return response.data;
};

export const getMyClasses = async (): Promise<MyClassesResponse> => {
  console.log('개설한 클래스 API 호출 시작');
  const response = await API.get('/classes/me');
  console.log('개설한 클래스 API 응답:', response.data);
  return response.data;
};

// 리뷰 작성 API
export const createReview = async (
  classId: string,
  score: number
): Promise<any> => {
  console.log('리뷰 작성 API 호출 시작:', { classId, score });
  const response = await API.post('/review', {
    openId: parseInt(classId),
    score: score * 2, // 5점 시스템을 10점 시스템으로 변환
  });
  console.log('리뷰 작성 API 응답:', response.data);
  return response.data;
};

export const getAppliedClasses =
  async (): Promise<AppliedClassDetailResponse> => {
    const response = await API.get('/application/details');
    return response.data;
  };
