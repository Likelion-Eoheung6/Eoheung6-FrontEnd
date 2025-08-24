import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ClassContainer from '../../components/class/ClassContainer';
import BodyContainer from '../../components/common/BodyContainer';
import ClassHeaderBar from '../../components/class/ClassHeaderBar';
import CalendarComponent from '../../components/class/CalendarComponent';
import { useCreateClassStore } from '../../stores/useCreateClassStore';
import { useNavigate } from 'react-router-dom';
import PriceComponent from '../../components/class/PriceComponent';
import CapacityComponent from '../../components/class/CapacityComponent';
import ClassTimeComponent from '../../components/class/ClassTimeComponent';
import { Drawer } from 'vaul';
import TimeWheelComponent from '../../components/class/TimeWheelComponent';
import TimeConfirmComponent from '../../components/class/TimeConfirmComponent';
import dayjs from 'dayjs';
import ButtonComponent from '../../components/common/ButtonComponent';
import MyPlaceInfoCardComponent from '../../components/class/MyPlaceInfoCardComponent';
import useGet from '../../hooks/useGet';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import BackIcon from '../../assets/common/back.svg';
import NextIcon from '../../assets/common/next.svg';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useMyPlaceStore } from '../../stores/useMyPlaceStore';
import { useGovReservationStore } from '../../stores/useGovReservationStore';
import { deleteMyPlace } from '../../apis/create/createApi';
import ModalContainer from '../../components/common/ModalContainer';

interface ApiDay {
  date: string;
  full: boolean;
  bookedRanges: { start: string; end: string }[];
}

export interface MyPlace {
  id: number;
  roadAddress: string;
  detailAddress: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

interface MyPlacesData {
  count: number;
  items: MyPlace[];
}

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  data: T;
}
export default function MyPlacePage() {
  const { req, updateReq } = useCreateClassStore();
  const { setReservation } = useGovReservationStore();
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');
  const [duration, setDuration] = useState('00시간 00분');
  const {
    data: response,
    loading,
    error,
  } = useGet<ApiResponse<MyPlacesData>>('/classes/mentor-places/me');
  const apiData = response?.data;
  const [selectedPlaceId, setSelectedPlaceId] = useState<Number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [placeToDeleteId, setPlaceToDeleteId] = useState<number | null>(null);

  // 삭제 모달 열기
  const openDeleteModal = (id: number) => {
    setPlaceToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  // 삭제 모달 닫기
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPlaceToDeleteId(null);
  };

  // 날짜
  const handleDateChange = (newDate: Date) => {
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(newDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    updateReq({ openAt: formattedDate });
    console.log('selected date: ' + formattedDate);
  };

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

  const handleSelectPlace = (id: number) => {
    setSelectedPlaceId(id);

    const selectedPlace = apiData?.items.find(p => p.id === id);

    if (selectedPlace) {
      updateReq({ mentorPlaceId: selectedPlace.id });

      setReservation({
        placeId: selectedPlace.id,
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
      });
    }
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

  const handleSubmit = () => {
    if (isFormComplete) {
      navigate('/open-class');
    }
  };

  const handleDeletePlace = async (id: number) => {
    try {
      const response = await deleteMyPlace(id);
      if (response.isSuccess) {
        window.location.reload();
      } else {
        alert(`삭제에 실패했습니다: ${response.message}`);
      }
    } catch (err) {
      console.error('Failed to delete place:', err);
      alert('장소 삭제 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    console.log(apiData);
  }, [apiData]);
  return (
    <ClassContainer>
      <ClassHeaderBar title="내 장소 선택하기" />
      <BodyContainer>
        {/* 내 장소 등록 */}
        <div className="mb-[10px] w-full">
          {apiData && apiData.count > 0 ? (
            <div className="relative h-[]">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={16}
                slidesPerView={1.2}
                centeredSlides={true}
                navigation={{
                  prevEl: '.swiper-button-prev-custom',
                  nextEl: '.swiper-button-next-custom',
                }}
                pagination={{
                  clickable: true,
                  el: '.swiper-pagination-custom',
                }}
              >
                {apiData.items.map(place => (
                  <SwiperSlide key={place.id}>
                    <MyPlaceInfoCardComponent
                      place={place}
                      isSelected={selectedPlaceId === place.id}
                      onSelect={() => handleSelectPlace(place.id)}
                      onDelete={() => openDeleteModal(place.id)}
                    />
                  </SwiperSlide>
                ))}
                <SwiperSlide>
                  <div className="flex h-full min-h-[150px] w-full items-center justify-center rounded-[1.25rem] shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)]">
                    <button
                      className="border-none bg-transparent text-[#B3B3B3] underline"
                      onClick={() => navigate('/open-class/myplace/register')}
                    >
                      내 장소 등록하기 &gt;
                    </button>
                  </div>
                </SwiperSlide>
              </Swiper>
              <img
                src={BackIcon}
                alt="Previous"
                className="swiper-button-prev-custom absolute left-[-8px] top-[50%] z-10 h-[24px] w-[24px] -translate-y-1/2 cursor-pointer"
              />
              <img
                src={NextIcon}
                alt="Next"
                className="swiper-button-next-custom absolute right-[-8px] top-[50%] z-10 h-[24px] w-[24px] -translate-y-1/2 cursor-pointer"
              />
            </div>
          ) : (
            <div className="flex h-full min-h-[132px] w-full items-center justify-center rounded-[1.25rem]  shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)]">
              <button
                className="border-none bg-transparent text-[#B3B3B3] underline"
                onClick={() => navigate('/open-class/myplace/register')}
              >
                내 장소 등록하기 &gt;
              </button>
            </div>
          )}
        </div>
        <div className="swiper-pagination-custom flex justify-center gap-[10px]"></div>

        {/* 달력 */}
        <div
          className={`w-full rounded-[1.25rem] box-border p-[12px] shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-[20px]`}
        >
          <div className="flex flex-col">
            <span className="w-fit px-[14px] py-[6px] text-[12px] rounded-full bg-[#009DFF] text-[white] font-semibold mb-[5px]">
              클래스 일정
            </span>
            <CalendarComponent
              variant="availability"
              selectedDate={req.openAt ? new Date(req.openAt) : null}
              onDateChange={handleDateChange}
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
      {isDeleteModalOpen && (
        <ModalContainer onClickToggleModal={closeDeleteModal}>
          <div className="rounded-2xl p-8 m-4 max-w-sm text-center ">
            <h3 className="text-sm font-semibold text-gray-500 mb-2"></h3>
            <p className="text-[16px] font-bold text-gray-800 mb-1">
              선택한 내 장소를 삭제하시겠습니까?
            </p>
            <div className="flex gap-3">
              <button
                onClick={closeDeleteModal}
                className="flex-1 bg-[#EAEAEA] text-gray-600 font-bold py-3 rounded-full transition-colors hover:bg-gray-300"
              >
                돌아가기
              </button>
              <button
                onClick={() => handleDeletePlace(Number(selectedPlaceId))}
                className="flex-1 bg-[#555555] text-white font-bold py-3 rounded-full transition-colors hover:bg-black"
              >
                장소 삭제하기
              </button>
            </div>
          </div>{' '}
        </ModalContainer>
      )}
    </ClassContainer>
  );
}
