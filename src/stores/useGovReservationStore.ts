import { create } from 'zustand';

interface GovReservationData {
  placeId: number;
  latitude: number;
  longitude: number;
}

interface GovReservationState {
  reservation: GovReservationData | null;
  setReservation: (data: GovReservationData) => void;
  clearReservation: () => void;
}

export const useGovReservationStore = create<GovReservationState>(set => ({
  reservation: null,
  setReservation: data => set({ reservation: data }),
  clearReservation: () => set({ reservation: null }),
}));
