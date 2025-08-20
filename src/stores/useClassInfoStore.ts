import { create } from 'zustand';

export interface ClassInfoData {
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

interface ClassInfoState {
  classInfo: ClassInfoData | null;
  setClassInfo: (data: ClassInfoData) => void;
  toggleWish: () => void;
  clearClassInfo: () => void;
}

export const useClassInfoStore = create<ClassInfoState>(set => ({
  classInfo: null,

  setClassInfo: data => set({ classInfo: data }),

  toggleWish: () =>
    set(state => ({
      classInfo: state.classInfo
        ? { ...state.classInfo, isWished: !state.classInfo.isWished }
        : null,
    })),

  clearClassInfo: () => set({ classInfo: null }),
}));
