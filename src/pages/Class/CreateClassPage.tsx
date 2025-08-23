import { useEffect, useMemo, useState } from 'react';
import ClassContainer from '../../components/class/ClassContainer';
import ClassHeaderBar from '../../components/class/ClassHeaderBar';
import BodyContainer from '../../components/common/BodyContainer';
import LocationIcon from '../../assets/class/location.svg';
import QestionIcon from '../../assets/class/question.svg';
import CharacterBlue from '../../assets/class/character-blue.svg';
import CharacterYellow from '../../assets/class/character-yellow.svg';

import ImageSwiperComponent from '../../components/class/ImageSwiperComponent';
import CalendarComponent from '../../components/class/CalendarComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import PriceComponent from '../../components/class/PriceComponent';
import CapacityComponent from '../../components/class/CapacityComponent';
import ClassTimeComponent from '../../components/class/ClassTimeComponent';
import { useCreateClassStore } from '../../stores/useCreateClassStore';
import { useNavigate } from 'react-router-dom';
import { useGovReservationStore } from '../../stores/useGovReservationStore';
import MapComponent from '../../components/class/MapComponent';
import { getAccessToken } from '../../utils/cookieUtils';
import { createClass, reserveGovPlace } from '../../apis/create/createApi';
import type {
  CreateClassRequest,
  ReserveGovPlaceRequest,
} from '../../types/create/createTypes';

export interface CreateClassPayload {
  infoId: number | null;
  title: string;
  content: string;
  mentorPlaceId: number | null;
  govReservationId: number;
  openAt: string;
  startTime: string;
  endTime: string;
  capacity: number;
  price: number;
  tags: string[];
}

export default function CreateClassPage() {
  const navigate = useNavigate();
  const { req, images, updateReq, setImages, resetStore } =
    useCreateClassStore();
  const { reservation, clearReservation } = useGovReservationStore();

  // 클래스 사진
  const imageUrls = useMemo(() => {
    return images.map(file => URL.createObjectURL(file));
  }, [images]);
  useEffect(() => {
    return () => {
      imageUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imageUrls]); // This effect depends on the imageUrls array

  const slides = [
    ...imageUrls,
    ...Array(Math.max(0, 5 - imageUrls.length)).fill(null),
  ];

  // 태그
  const [tagInput, setTagInput] = useState('');
  const removeTag = (tagToRemove: string) => {
    const newTags = req.tags.filter((tag: string) => tag !== tagToRemove);
    updateReq({ tags: newTags });
  };

  const addTag = (raw: string) => {
    const potentialTags = raw.split(/[\s,]+/).filter(Boolean);
    if (potentialTags.length === 0) return;

    const newTags = potentialTags.filter(
      (tag: string) => tag.trim() && !req.tags.includes(tag.trim())
    );

    if (newTags.length > 0) {
      updateReq({ tags: [...req.tags, ...newTags.map(t => t.trim())] });
    }
    setTagInput('');
  };

  const onTagKeyUp: React.KeyboardEventHandler<HTMLInputElement> = e => {
    // onKeyUp은 한글 조합이 끝난 후 발생하므로 isComposing 체크가 필요 없습니다.
    if (e.key === 'Enter' || e.key === ',' || e.key === ' ') {
      e.preventDefault();
      addTag(tagInput);
    } else if (
      e.key === 'Backspace' &&
      tagInput === '' &&
      req.tags.length > 0
    ) {
      removeTag(req.tags[req.tags.length - 1]);
    }
  };

  const isFormComplete = useMemo(() => {
    return (
      (images.length > 0 &&
        req.title.trim() !== '' &&
        req.content.trim() !== '' &&
        req.openAt !== '' &&
        req.mentorPlaceId !== null) ||
      (req.govReservationId !== null && req.price > 0 && req.capacity > 0)
    );
  }, [req, images]);

  const handleSubmit = async () => {
    if (!isFormComplete) {
      alert('Please fill out all required fields and add at least one image.');
      return;
    }

    const requestData: CreateClassRequest = {
      title: req.title,
      content: req.content,
      mentorPlaceId: req.mentorPlaceId,
      govReservationId: reservation?.reservationId || 0,
      openAt: req.openAt,
      startTime: req.startTime,
      endTime: req.endTime,
      capacity: req.capacity,
      price: req.price,
      tags: ['인형만들기', '유머스러운', '편안한'],
      // tags: req.tags.map(tag => tag.replace('#', '')),
    };

    // API에 보낼 요청 데이터를 구성합니다.
    const reservationData: ReserveGovPlaceRequest = {
      date: req.openAt,
      start: req.startTime + ':00',
      end: req.endTime + ':00',
    };

    try {
      // 3. 클래스 개설 API를 호출하고 응답을 기다립니다.
      const createClassResponse = await createClass(requestData, images);

      // 4. 클래스 개설이 성공했을 경우
      if (createClassResponse.isSuccess) {
        console.log('클래스 개설 성공!:', createClassResponse.data);
        alert('클래스가 성공적으로 개설되었습니다!');

        // 5. 완료 페이지로 이동합니다.
        navigate('/class/done', {
          state: {
            type: 'create', // '개설' 완료임을 명시
          },
        });
      } else {
        // 클래스 개설 자체가 실패한 경우
        alert(`클래스 개설에 실패했습니다: ${createClassResponse.message}`);
      }
    } catch (error) {
      // 네트워크 오류 등 API 호출 중 예외가 발생한 경우
      console.error('Submission failed:', error);
      alert('클래스 개설 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    const token = getAccessToken();
    console.log(req);
  }, [req]);

  // 날짜
  const handleDateChange = (newDate: Date) => {
    const formattedDate = newDate.toISOString().split('T')[0];
    updateReq({ openAt: formattedDate });
  };
  return (
    <>
      <ClassContainer>
        <ClassHeaderBar title="클래스 개설하기" />

        <BodyContainer>
          {/* 사진 등록/수정하기 */}
          <ImageSwiperComponent
            slides={slides}
            images={images}
            setImageFiles={setImages}
          />
          {/* 클래스 제목 */}
          <div
            className={`w-full h-[50px] rounded-[1.25rem] box-border px-[12px] flex items-center shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] my-[20px] `}
          >
            <div className="rounded-full bg-[#009DFF] text-[white] text-[12px] font-semibold px-[14px] py-[6px] shadow mr-[5px]">
              클래스 제목
            </div>
            <input
              value={req.title}
              onChange={e => updateReq({ title: e.target.value })}
              placeholder="클래스 제목을 적어주세요."
              className="flex-1 bg-transparent outline-none border-0 placeholder:text-[#B3B3B3] text-gray-500 px-1 py-2"
            />
          </div>
          {/* 클래스 소개 */}
          <div
            className={`w-full rounded-[1.25rem] box-border p-[12px]   shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-[30px]`}
          >
            <div className="flex flex-col">
              <span className="w-fit px-[14px] py-[6px] text-[12px] rounded-full bg-[#009DFF] text-[white] font-semibold mb-[5px]">
                클래스 소개
              </span>
              <textarea
                value={req.content}
                onChange={e => updateReq({ content: e.target.value })}
                placeholder="클래스 소개를 적어주세요."
                rows={5}
                className="w-full bg-transparent outline-none border-0 placeholder:text-[#B3B3B3] text-gray-600 px-1 py-2 resize-none"
              />

              <div className="mt-2 border-b border-[#E0E0E0]" />
              <div className="flex flex-wrap items-center gap-2 p-2 rounded-lg bg-gray-50">
                {req.tags.map((tag: string) => (
                  <div
                    key={tag}
                    className="flex items-center text-sm font-medium rounded-full px-3 py-1"
                  >
                    <span>{tag}</span>
                  </div>
                ))}
                <input
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyUp={onTagKeyUp}
                  placeholder="#태그를 입력해주세요"
                  className="flex-1 bg-transparent outline-none border-none p-1 text-sm"
                />
              </div>
            </div>
          </div>
          {/* 날짜 선택 */}
          <div
            className={`w-full rounded-[1.25rem] box-border p-[12px]   shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-[30px]`}
          >
            <div className="flex flex-col">
              <span className="w-fit px-[14px] py-[6px] text-[12px] rounded-full bg-[#009DFF] text-[white] font-semibold mb-[5px]">
                클래스 일정
              </span>
              <CalendarComponent
                variant="selectionOnly"
                selectedDate={req.openAt ? new Date(req.openAt) : null}
                onDateChange={handleDateChange}
                disabled={true}
              />{' '}
            </div>
          </div>
          {/* 클래스 장소 선택 */}
          <div className="w-full rounded-[1.25rem] box-border p-[12px] shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-[30px]">
            <div className="flex justify-between items-center mb-[5px]">
              <span className="flex items-center gap-[6px] w-fit px-[14px] py-[6px] text-[12px] rounded-full bg-[#009DFF] text-[white] font-semibold">
                <img src={LocationIcon} alt="위치" className="h-4 w-4" />
                클래스 장소
              </span>
              <img src={QestionIcon} alt="도움말" className="h-5 w-5" />
            </div>
            {reservation ? (
              // If a reservation exists, show the map
              <div className="mt-4">
                <MapComponent
                  selectedPlaceId={req.govReservationId || req.mentorPlaceId}
                  places={[
                    {
                      id: reservation.placeId,
                      latitude: reservation.latitude,
                      longitude: reservation.longitude,
                      detailAddress: '선택된 장소',
                    },
                  ]}
                />
              </div>
            ) : (
              <div className="flex justify-between items-center rounded-[1rem] border border-[#E0E0E0] bg-[#FAFAFA] pt-[22px] pb-[22px] mt-4">
                <button
                  onClick={() => navigate('/open-class/myplace')}
                  className="flex flex-col items-center flex-1 bg-transparent border-none"
                >
                  <img
                    src={CharacterBlue}
                    alt="내 장소"
                    className="mb-[25px] w-16 h-16"
                  />
                  <div className="bg-[#009DFF] text-[white] text-[16px] font-semibold px-[14px] py-[8px] rounded-full">
                    내 장소
                  </div>
                </button>
                <div className="w-px bg-[#E0E0E0] mx-6 self-stretch" />
                <button
                  onClick={() => navigate('/open-class/rent')}
                  className="flex flex-col items-center flex-1 bg-transparent border-none"
                >
                  <img
                    src={CharacterYellow}
                    alt="빈집 대여하기"
                    className="mb-[25px] w-16 h-16"
                  />
                  <div className="bg-[#009DFF] text-[white] text-[16px] font-semibold px-[14px] py-[8px] rounded-full">
                    빈집 대여하기
                  </div>
                </button>
              </div>
            )}
            <div className="flex flex-col gap-[10px] mt-4">
              <PriceComponent
                price={req.price}
                onPriceChange={newPrice => updateReq({ price: newPrice })}
                disabled={true}
              />
              <CapacityComponent
                capacity={req.capacity}
                onCapacityChange={newCapacity =>
                  updateReq({ capacity: newCapacity })
                }
                disabled={true}
              />
              <ClassTimeComponent
                startTime={req.startTime}
                endTime={req.endTime}
                onStartTimeChange={newTime => updateReq({ startTime: newTime })}
                onEndTimeChange={newTime => updateReq({ endTime: newTime })}
                disabled={true}
              />
            </div>
          </div>
          <ButtonComponent
            text={'클래스 개설하기'}
            isActive={isFormComplete}
            onClick={handleSubmit}
          />
        </BodyContainer>
      </ClassContainer>
    </>
  );
}
