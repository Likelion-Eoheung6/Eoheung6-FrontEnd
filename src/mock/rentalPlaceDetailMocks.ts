interface BookedRange {
  start: string;
  end: string;
}

interface ApiDay {
  date: string;
  full: boolean;
  bookedRanges: BookedRange[];
}

interface ApiData {
  days: ApiDay[];
}

export const samplePlaceDetailData: { data: ApiData } = {
  data: {
    days: [
      { date: '2025-08-01', full: false, bookedRanges: [] },
      { date: '2025-08-02', full: false, bookedRanges: [] },
      { date: '2025-08-03', full: false, bookedRanges: [] },
      { date: '2025-08-04', full: false, bookedRanges: [] },
      { date: '2025-08-05', full: false, bookedRanges: [] },
      { date: '2025-08-06', full: false, bookedRanges: [] },
      { date: '2025-08-07', full: false, bookedRanges: [] },
      { date: '2025-08-08', full: false, bookedRanges: [] },
      { date: '2025-08-09', full: false, bookedRanges: [] },
      { date: '2025-08-10', full: false, bookedRanges: [] },
      { date: '2025-08-11', full: false, bookedRanges: [] },
      { date: '2025-08-12', full: false, bookedRanges: [] },
      {
        date: '2025-08-13',
        full: false,
        bookedRanges: [{ start: '12:00', end: '15:00' }],
      },
      {
        date: '2025-08-14',
        full: false,
        bookedRanges: [{ start: '12:00', end: '23:00' }],
      },
      {
        date: '2025-08-15',
        full: false,
        bookedRanges: [{ start: '12:00', end: '15:00' }],
      },
      {
        date: '2025-08-16',
        full: false,
        bookedRanges: [{ start: '12:00', end: '15:00' }],
      },
      {
        date: '2025-08-17',
        full: false,
        bookedRanges: [
          { start: '15:00', end: '20:00' },
          { start: '21:00', end: '22:00' },
          { start: '23:00', end: '00:00' },
        ],
      },
      { date: '2025-08-18', full: false, bookedRanges: [] },
      { date: '2025-08-19', full: false, bookedRanges: [] },
      { date: '2025-08-20', full: false, bookedRanges: [] },
      { date: '2025-08-21', full: false, bookedRanges: [] },
      {
        date: '2025-08-22',
        full: false,
        bookedRanges: [{ start: '12:00', end: '15:00' }],
      },
      {
        date: '2025-08-23',
        full: false,
        bookedRanges: [{ start: '12:00', end: '15:00' }],
      },
      {
        date: '2025-08-24',
        full: false,
        bookedRanges: [{ start: '12:00', end: '15:00' }],
      },
      {
        date: '2025-08-25',
        full: true,
        bookedRanges: [{ start: '12:00', end: '15:00' }],
      },
      {
        date: '2025-08-26',
        full: true,
        bookedRanges: [{ start: '12:00', end: '15:00' }],
      },
      {
        date: '2025-08-27',
        full: false,
        bookedRanges: [{ start: '12:00', end: '15:00' }],
      },
      {
        date: '2025-08-28',
        full: false,
        bookedRanges: [{ start: '00:00', end: '19:00' }],
      },
      { date: '2025-08-29', full: false, bookedRanges: [] },
      {
        date: '2025-08-30',
        full: false,
        bookedRanges: [{ start: '12:00', end: '15:00' }],
      },
      {
        date: '2025-08-31',
        full: false,
        bookedRanges: [{ start: '00:00', end: '15:00' }],
      },
    ],
  },
};
