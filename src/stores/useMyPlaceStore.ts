import { create } from 'zustand';

interface MyPlaceData {
  id: number | null;
  roadAddress: string;
  zipCode: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
}

interface MyPlaceState {
  placeData: MyPlaceData | null;
  setMyPlace: (data: MyPlaceData) => void;
  updateMyPlaceDetail: (updates: Partial<MyPlaceData>) => void;
  clearMyPlace: () => void;
}

const initialState = {
  placeData: null,
};

export const useMyPlaceStore = create<MyPlaceState>(set => ({
  ...initialState,

  setMyPlace: data => set({ placeData: data }),

  updateMyPlaceDetail: updates =>
    set(state => ({
      placeData: { ...(state.placeData as MyPlaceData), ...updates },
    })),

  clearMyPlace: () => set(initialState),
}));
