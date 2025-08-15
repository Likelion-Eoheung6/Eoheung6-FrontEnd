import { useCallback, useEffect, useState } from 'react';
import ClassContainer from '../../components/class/ClassContainer';
import ClassHeaderBar from '../../components/class/ClassHeaderBar';
import BodyContainer from '../../components/common/BodyContainer';
import LocationIcon from '../../assets/class/location.svg';
import QestionIcon from '../../assets/class/question.svg';
import CharacterBlue from '../../assets/class/character-blue.svg';
import CharacterYellow from '../../assets/class/character-yellow.svg';
import dayjs from 'dayjs';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import ImageSwiperComponent from '../../components/class/ImageSwiperComponent';
import TimeWheelComponent from '../../components/class/TimeWheelComponent';
import { Drawer } from 'vaul';
import CalendarComponent from '../../components/class/CalendarComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import PriceComponent from '../../components/class/PriceComponent';
import CapacityComponent from '../../components/class/CapacityComponent';
import ClassTimeComponent from '../../components/class/ClassTimeComponent';

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
  const [form, setForm] = useState<CreateClassPayload>({
    infoId: null,
    title: '',
    content: '',
    mentorPlaceId: null,
    govReservationId: 0,
    openAt: '',
    startTime: '15:25', // form의 초기값도 동기화
    endTime: '14:25', // form의 초기값도 동기화
    capacity: 0,
    price: 0,
    tags: [],
  });
  const [imageFiles, setImageFiles] = useState<string[]>([]); // 클래스 사진
  const slides = [
    ...imageFiles,
    ...Array(Math.max(0, 5 - imageFiles.length)).fill(null),
  ];

  // (태그, 이미지, 인원수 관련 로직은 그대로 유지)
  const [tagInput, setTagInput] = useState('');
  const addTag = (raw: string) => {
    const t = raw.trim().replace(/^#/, '');
    if (!t) return;
    if (form.tags.includes(t)) return;
    setForm(f => ({ ...f, tags: [...f.tags, t] }));
    setTagInput('');
  };
  const onTagKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter' || e.key === ',' || e.key === ' ') {
      e.preventDefault();
      addTag(tagInput);
    } else if (
      e.key === 'Backspace' &&
      tagInput === '' &&
      form.tags.length > 0
    ) {
      setForm(f => ({ ...f, tags: f.tags.slice(0, -1) }));
    }
  };
  const removeTag = (t: string) =>
    setForm(f => ({ ...f, tags: f.tags.filter(x => x !== t) }));

  const [capacity, setCapacity] = useState(0);

  // --- Time Picker 관련 로직 (정리된 버전) ---

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');
  const [duration, setDuration] = useState('00시간 00분');

  const handleTogglePicker = () => {
    setIsPickerOpen(!isPickerOpen);
    console.log('toggle picker ->', !isPickerOpen); // 눌렀는지 로그 확인
  };

  // ✅ 주석 처리되었던 총 사용시간 계산 로직을 다시 활성화합니다.
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

  // ✅ startTime, endTime이 변경될 때 form 상태에 반영하는 로직 추가
  useEffect(() => {
    setForm(f => ({ ...f, startTime, endTime }));
  }, [startTime, endTime]);

  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
    console.log('ismodal: ' + isOpenModal);
  }, [isOpenModal]);
  return (
    <>
      <ClassContainer>
        <ClassHeaderBar title="클래스 개설하기" />

        <BodyContainer>
          {/* 사진 등록/수정하기 */}
          <ImageSwiperComponent slides={slides} setImageFiles={setImageFiles} />

          {/* 클래스 제목 */}
          <div
            className={`w-full h-[50px] rounded-[1.25rem] box-border px-[12px] flex items-center shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-[20px]`}
          >
            <div className="rounded-full bg-[#009DFF] text-[white] text-[12px] font-semibold px-[14px] py-[6px] shadow mr-[5px]">
              클래스 제목
            </div>
            <input
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
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
                value={form.content}
                onChange={e =>
                  setForm(f => ({ ...f, content: e.target.value }))
                }
                placeholder="클래스 소개를 적어주세요."
                rows={5}
                className="w-full bg-transparent outline-none border-0 placeholder:text-[#B3B3B3] text-gray-600 px-1 py-2 resize-none"
              />

              <div className="mt-2 border-b border-[#E0E0E0]" />
              <div className="mt-3">
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
              <CalendarComponent />
            </div>
          </div>
          {/* 클래스 장소 선택 */}
          <div className="w-full rounded-[1.25rem] box-border p-[12px] shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-[30px]">
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-[5px]">
                <span className="flex items-center gap-[6px] w-fit px-[14px] py-[6px] text-[12px] rounded-full bg-[#009DFF] text-[white] font-semibold">
                  <img src={LocationIcon} alt="위치" className="h-4 w-4" />
                  클래스 장소
                </span>
                <img src={QestionIcon} alt="도움말" className="h-5 w-5" />
              </div>

              <div className="flex justify-between items-center rounded-[1rem] border border-[#E0E0E0] bg-[#FAFAFA] pt-[22px] pb-[22px]">
                <div className="flex flex-col items-center flex-1">
                  <img
                    src={CharacterBlue}
                    alt="내 장소"
                    className="mb-[25px] w-16 h-16 "
                  />
                  <button className="bg-[#009DFF] text-[white] text-[16px] font-semibold px-[14px] py-[8px] rounded-full border-none outline-none">
                    내 장소
                  </button>
                </div>
                <div className="w-px bg-[#E0E0E0] mx-6 self-stretch" />
                <div className="flex flex-col items-center flex-1">
                  <div className="relative mb-2">
                    <img
                      src={CharacterYellow}
                      alt="빈집 대여하기"
                      className="mb-[25px] w-16 h-16"
                    />
                  </div>
                  <button className="bg-[#009DFF] text-[white] text-[16px] font-semibold px-[14px] py-[8px] rounded-full border-none outline-none">
                    빈집 대여하기
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-[10px]">
                <PriceComponent />
                <CapacityComponent />
                <ClassTimeComponent />
              </div>
            </div>
          </div>
          <ButtonComponent text={'클래스 개설하기'} isActive={false} />
        </BodyContainer>

        <Drawer.Root
          shouldScaleBackground
          open={isOpenModal}
          onOpenChange={setOpenModal}
        >
          <Drawer.Portal>
            <Drawer.Overlay className="fixed top-[0] right-[0] bottom-[0] left-[0] bg-[rgba(0,0,0,0.4)]" />
            <Drawer.Content className="bg-[#f4f4f5] flex flex-col rounded-t-[10px] h-[96%] mt-[6rem] fixed bottom-[0] left-[0] right-[0]">
              <div className="p-[1rem] bg-[#ffffff] rounded-t-[10px] grow shrink basis-0">
                <div className="mx-auto w-[3rem] h-[0.375rem] flex-shrink-0 rounded-full bg-[#d4d4d8] mb-[2rem]" />
                <div className="max-w-[32rem] mx-auto  ">
                  <div className="flex flex-row w-full justify-center items-center ">
                    <div className="flex-1 text-center">시작시간</div>
                    <TimeWheelComponent />
                  </div>
                  <div className="flex flex-row w-full justify-center items-center ">
                    <div className="flex-1 text-center">종료시간</div>
                    <TimeWheelComponent />
                  </div>
                  <div></div>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </ClassContainer>
    </>
  );
}
