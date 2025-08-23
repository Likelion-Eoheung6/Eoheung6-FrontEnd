import { useCallback, useEffect, useMemo, useState } from 'react';
import ClassContainer from '../../components/class/ClassContainer';
import BodyContainer from '../../components/common/BodyContainer';
import ClassHeaderBar from '../../components/class/ClassHeaderBar';
import CalendarComponent from '../../components/class/CalendarComponent';
import { useCreateClassStore } from '../../stores/useCreateClassStore';
import { samplePlaceDetailData } from '../../mock/rentalPlaceDetailMocks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PriceComponent from '../../components/class/PriceComponent';
import CapacityComponent from '../../components/class/CapacityComponent';
import ClassTimeComponent from '../../components/class/ClassTimeComponent';
import { Drawer } from 'vaul';
import TimeWheelComponent from '../../components/class/TimeWheelComponent';
import TimeConfirmComponent from '../../components/class/TimeConfirmComponent';
import dayjs from 'dayjs';
import ButtonComponent from '../../components/common/ButtonComponent';
import {
  getGovPlaceBookedDates,
  reserveGovPlace,
} from '../../apis/create/createApi';
import type {
  DailyBookingInfo,
  ReserveGovPlaceRequest,
} from '../../types/create/createTypes';
import { useGovReservationStore } from '../../stores/useGovReservationStore';

useGovReservationStore;
interface ApiDay {
  date: string;
  full: boolean;
  bookedRanges: { start: string; end: string }[];
}

export default function RentalPlaceDetailPage() {
  const { req, updateReq } = useCreateClassStore();
  const [availability, setAvailability] = useState<DailyBookingInfo[]>([]);
  const { placeId } = useParams<{ placeId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { thumbnail } = location.state || {};
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');
  const [duration, setDuration] = useState('00시간 00분');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date()); // 현재 달력 월 상태
  const { setReservation } = useGovReservationStore();

  // 날짜
  const handleDateChange = (newDate: Date) => {
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(newDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    updateReq({ openAt: formattedDate });
    console.log('selected date: ' + formattedDate);
  };

  // 가능하지 않은 날짜/시간
  const unavailableDates = useMemo(() => {
    // 오늘 날짜를 시간 정보 없이 가져옵니다 (정확한 비교를 위해)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return availability
      .filter(day => {
        const dayDate = new Date(day.date);
        // 예약이 꽉 찼거나(day.full) 또는 과거 날짜일 경우
        return day.full || dayDate < today;
      })
      .map(day => day.date);
  }, [availability]);

  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
    console.log('ismodal: ' + isOpenModal);
  }, [isOpenModal]);

  // 선택한 시간 정보 계산
  useEffect(() => {
    const start = dayjs(`2000-01-01T${startTime}`);
    let end = dayjs(`2000-01-01T${endTime}`);

    if (end.isBefore(start)) {
      end = end.add(1, 'day');
    }

    const diffMinutes = end.diff(start, 'minute');
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    setDuration(
      `${String(hours).padStart(2, '0')}시간 ${String(minutes).padStart(
        2,
        '0'
      )}분`
    );
  }, [startTime, endTime]);

  const handleConfirmClick = () => {
    console.log('Confirmed:', { startTime, endTime, duration });
    updateReq({ startTime: startTime, endTime: endTime });
    setOpenModal(false);
  };

  const isFormComplete = useMemo(() => {
    return (
      req.openAt.trim() !== '' &&
      req.price > 0 &&
      req.capacity > 0 &&
      req.startTime !== '00:00' &&
      req.endTime !== '00:00'
    );
  }, [req]);

  // 빈집 예약 요청
  const handleSubmit = async () => {
    if (!isFormComplete || !placeId) {
      alert('모든 정보를 입력해주세요.');
      return;
    }
    navigate('/open-class');

    // API에 보낼 요청 데이터를 구성합니다.
    const reservationData: ReserveGovPlaceRequest = {
      date: req.openAt,
      start: req.startTime,
      end: req.endTime,
    };

    try {
      // 예약 API를 호출합니다.
      const response = await reserveGovPlace(Number(placeId), reservationData);

      if (response.isSuccess) {
        setReservation({
          reservationId: response.data.reservationId,
          placeId: response.data.placeId,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
        });

        navigate('/open-class');
      } else {
        alert(`예약에 실패했습니다: ${response.message}`);
      }
    } catch (error) {
      console.error('Reservation failed:', error);
      alert('예약 중 오류가 발생했습니다.');
    }
  };

  // 빈집 날짜/시간 조회
  useEffect(() => {
    if (!placeId) return;

    const fetchBookedDates = async () => {
      try {
        setLoading(true);
        setError(null);
        const monthParam = dayjs(currentMonth).format('YYYY-MM');
        const response = await getGovPlaceBookedDates(Number(placeId), {
          month: monthParam,
        });

        if (response.isSuccess) {
          setAvailability(response.data.days);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('예약 정보를 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedDates();
  }, [placeId, currentMonth]);
  return (
    <ClassContainer>
      <ClassHeaderBar title="빈집 대여하기" />
      <BodyContainer>
        {/* 빈집 이미지 */}
        {thumbnail ? (
          <img
            src={thumbnail}
            alt="Place Thumbnail"
            className="w-full h-auto rounded-[16px]"
          />
        ) : (
          <div className="w-full h-[200px] rounded-[16px] bg-[#b3b3b3]"></div>
        )}
        {/* 달력 */}
        <div
          className={`w-full rounded-[1.25rem] box-border p-[12px]   shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-[20px]`}
        >
          <div className="flex flex-col">
            <span className="w-fit px-[14px] py-[6px] text-[12px] rounded-full bg-[#009DFF] text-[white] font-semibold mb-[5px]">
              클래스 일정
            </span>
            <CalendarComponent
              variant="availability"
              selectedDate={req.openAt ? new Date(req.openAt) : null}
              onDateChange={handleDateChange}
              unavailableDates={unavailableDates}
            />
          </div>
        </div>
        {/* 부가 정보 입력 */}
        <div
          className={`w-full rounded-[1.25rem] box-border p-[12px]   shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-[30px]`}
        >
          <div className="flex flex-col gap-[20px]">
            <PriceComponent
              price={req.price}
              onPriceChange={newPrice => updateReq({ price: newPrice })}
            />
            <CapacityComponent
              capacity={req.capacity}
              onCapacityChange={newCapacity =>
                updateReq({ capacity: newCapacity })
              }
            />
            <ClassTimeComponent
              startTime={req.startTime}
              endTime={req.endTime}
              onStartTimeChange={newTime => updateReq({ startTime: newTime })}
              onEndTimeChange={newTime => updateReq({ endTime: newTime })}
              onClick={onClickToggleModal}
            />
          </div>
        </div>
        <ButtonComponent
          text="클래스 장소 등록"
          isActive={isFormComplete}
          onClick={handleSubmit}
        />
      </BodyContainer>
      <Drawer.Root
        shouldScaleBackground
        open={isOpenModal}
        onOpenChange={setOpenModal}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed top-[0] right-[0] bottom-[0] left-[0] bg-[rgba(0,0,0,0.4)]" />
          <Drawer.Content className="bg-[#f4f4f5] flex flex-col rounded-t-[10px] h-[80%] mt-[6rem] fixed bottom-[0] left-[0] right-[0]">
            <div className="p-[1rem] bg-[#ffffff] rounded-t-[10px] grow shrink basis-0">
              <div className="mx-auto w-[3rem] h-[0.375rem] flex-shrink-0 rounded-full bg-[#d4d4d8] mb-[2rem]" />
              <div className="max-w-[32rem] mx-auto ">
                <Drawer.Title className="sr-only">시간 선택</Drawer.Title>
                <div className="flex flex-row w-full justify-center items-center  ">
                  <div className="flex-1 text-center">시작시각</div>
                  <TimeWheelComponent
                    value={startTime}
                    onChange={setStartTime}
                  />
                </div>
                <div className="mx-auto border-[1px] border-[#E0E0E0] my-[3px] " />
                <div className="flex flex-row w-full justify-center items-center ">
                  <div className="flex-1 text-center">종료시각</div>
                  <TimeWheelComponent value={endTime} onChange={setEndTime} />
                </div>
                <div></div>
              </div>
              {/* 선택한 시간 확인 박스 */}
              <TimeConfirmComponent
                startTime={startTime}
                endTime={endTime}
                duration={duration}
                onConfirm={handleConfirmClick}
              />
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </ClassContainer>
  );
}
