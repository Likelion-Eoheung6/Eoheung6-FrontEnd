import { create } from 'zustand';

interface ReqData {
  infoId: number | null;
  title: string;
  content: string;
  tags: string[];
  mentorPlaceId: number | null;
  govReservationId: number | null;
  openAt: string;
  price: number;
  capacity: number;
  startTime: string;
  endTime: string;
}

interface CreateClassState {
  req: ReqData; // 텍스트 데이터
  images: File[]; // 이미지 파일 데이터
  orders: number[]; // 이미지 순서 데이터
  updateReq: (newReqData: Partial<ReqData>) => void;
  setImages: (newImages: File[]) => void;
  setOrders: (newOrders: number[]) => void;
  resetStore: () => void;
}

const initialState = {
  req: {
    infoId: null,
    title: '',
    content: '',
    tags: [],
    mentorPlaceId: null,
    govReservationId: null,
    openAt: '',
    price: 0,
    capacity: 0,
    startTime: '00:00',
    endTime: '00:00',
  },
  images: [],
  orders: [],
};

export const useCreateClassStore = create<CreateClassState>(set => ({
  ...initialState,

  // `req` 객체의 일부를 업데이트하는 함수
  updateReq: newReqData =>
    set(state => ({
      req: { ...state.req, ...newReqData },
    })),

  // 이미지 배열을 설정하는 함수
  setImages: newImages => set({ images: newImages }),

  // 이미지 순서 배열을 설정하는 함수
  setOrders: newOrders => set({ orders: newOrders }),

  // 스토어 전체를 초기 상태로 리셋하는 함수
  resetStore: () => set(initialState),
}));
