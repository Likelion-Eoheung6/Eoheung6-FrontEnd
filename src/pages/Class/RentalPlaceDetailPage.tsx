import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

interface ApiDay {
  date: string;
  full: boolean;
  bookedRanges: { start: string; end: string }[];
}

export default function RentalPlaceDetailPage() {
  const { req, updateReq } = useCreateClassStore();
  const [availability, setAvailability] = useState<ApiDay[]>([]);
  const { placeId } = useParams<{ placeId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { thumbnail } = location.state || {};
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');
  const [duration, setDuration] = useState('00시간 00분');

  // 날짜
  const handleDateChange = (newDate: Date) => {
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(newDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    updateReq({ date: formattedDate });
    console.log('selected date: ' + formattedDate);
  };
  const unavailableDates = useMemo(() => {
    return availability
      .filter(day => day.full) // Filter for days where 'full' is true
      .map(day => day.date); // Extract just the date string
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
      req.date.trim() !== '' &&
      req.price > 0 &&
      req.capacity > 0 &&
      req.startTime !== '00:00' &&
      req.endTime !== '00:00'
    );
  }, [req]);

  const handleSubmit = () => {
    if (isFormComplete) {
      navigate('/open-class');
    }
  };

  useEffect(() => {
    setAvailability(samplePlaceDetailData.data.days);
    console.log(thumbnail);
  }, [placeId]);
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
              selectedDate={req.date ? new Date(req.date) : null}
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
              />{' '}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </ClassContainer>
  );
}
