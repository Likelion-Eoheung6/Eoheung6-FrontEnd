import { useCallback, useEffect, useMemo, useState } from 'react';
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
  const { req, images, updateReq, setImages } = useCreateClassStore();
  const { reservation } = useGovReservationStore();

  // 클래스 사진
  const [imageFiles, setImageFiles] = useState<string[]>([]); // 클래스 사진
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

  const addTag = (raw: string) => {
    // 스페이스바 또는 콤마로 여러 태그를 한 번에 분리
    const potentialTags = raw.split(/[\s,]+/).filter(Boolean);

    if (potentialTags.length === 0) return;

    // 중복되지 않은 새 태그만 필터링
    const newTags = potentialTags.filter(
      tag => tag.trim() && !req.tags.includes(tag.trim())
    );

    if (newTags.length > 0) {
      updateReq({ tags: [...req.tags, ...newTags.map(t => t.trim())] });
    }

    setTagInput('');
  };

  // ✅ 태그 삭제를 위한 함수
  const removeTag = (tagToRemove: string) => {
    updateReq({ tags: req.tags.filter(tag => tag !== tagToRemove) });
  };
  const onTagKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter' || e.key === ',' || e.key === ' ') {
      e.preventDefault();
      addTag(tagInput);
    } else if (
      e.key === 'Backspace' &&
      tagInput === '' &&
      req.tags.length > 0
    ) {
      // 가장 마지막 태그를 삭제
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

  useEffect(() => {
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
            className={`w-full h-[50px] rounded-[1.25rem] box-border px-[12px] flex items-center shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-[20px]`}
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
              <div className="mt-3">
                <div className="flex flex-wrap gap-[8px] mb-[8px]">
                  {req.tags.map(tag => (
                    <div
                      key={tag}
                      className="flex items-center bg-[#e0e7ff] rounded-full px-[12px] py-[4px]"
                    >
                      <span className="text-[12px] font-medium text-[#4338ca]">
                        {tag}
                      </span>
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-[4px] text-[16px] leading-none text-[#6366f1] hover:text-[#4338ca]"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <div>
                  <input
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={onTagKeyDown}
                    placeholder="#태그를 입력해주세요."
                    className="w-full bg-transparent outline-none border-0 placeholder:text-[#B3B3B3] text-gray-600 pb-2"
                  />
                </div>
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
              // Otherwise, show the selection buttons
              <div className="flex justify-between items-center rounded-[1rem] border border-[#E0E0E0] bg-[#FAFAFA] pt-[22px] pb-[22px] mt-4">
                <button
                  onClick={() => navigate('/my-place')}
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
            {/* <div className="flex justify-between items-center rounded-[1rem] border border-[#E0E0E0] bg-[#FAFAFA] pt-[22px] pb-[22px]">
              <button
                onClick={() => navigate('/my-place')}
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
              <div className="flex flex-col items-center flex-1 bg-transparent border-none">
                <img
                  src={CharacterYellow}
                  alt="빈집 대여하기"
                  className="mb-[25px] w-16 h-16"
                />
                <div
                  className="bg-[#009DFF] text-[white] text-[16px] font-semibold px-[14px] py-[8px] rounded-full"
                  onClick={() => navigate('/open-class/rent')}
                >
                  빈집 대여하기
                </div>
              </div>
            </div> */}
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
            onClick={() => {
              if (isFormComplete) {
                console.log('Submitting form:', { req, images });
              }
            }}
          />
        </BodyContainer>
      </ClassContainer>
    </>
  );
}
