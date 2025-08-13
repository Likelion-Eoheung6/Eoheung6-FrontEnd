import { useState } from 'react';
import ClassContainer from '../../components/class/ClassContainer';
import ClassHeaderBar from '../../components/class/ClassHeaderBar';
import BodyContainer from '../../components/common/BodyContainer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import BackIcon from '../../assets/common/back.svg';
import NextIcon from '../../assets/common/next.svg';
import LocationIcon from '../../assets/class/location.svg';
import QestionIcon from '../../assets/class/question.svg';
import CharacterBlue from '../../assets/class/character-blue.svg';
import CharacterYellow from '../../assets/class/character-yellow.svg';
import MoneyIcon from '../../assets/class/money.svg';
import PeopleIcon from '../../assets/class/people.svg';
import TimeIcon from '../../assets/class/time.svg';
import PlusIcon from '../../assets/class/plus.svg';
import MinusIcon from '../../assets/class/minus.svg';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
    startTime: '',
    endTime: '',
    capacity: 0,
    price: 0,
    tags: [],
  });

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

  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const addImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (reader.result) {
            setImageFiles(prev => [...prev, reader.result as string]);
          }
        };
      });
    }
  };

  // 항상 최소 5개의 슬라이드 유지
  const slides = [
    ...imageFiles,
    ...Array(Math.max(0, 5 - imageFiles.length)).fill(null),
  ];
  const [capacity, setCapacity] = useState(0);

  return (
    <ClassContainer>
      <ClassHeaderBar title="클래스 개설하기" />
      <BodyContainer>
        {/* 사진선택 */}
        <div className="w-full mb-[20px] relative">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={16}
            slidesPerView={1}
            pagination={{ clickable: true }} // 동그라미 클릭 허용
            allowTouchMove={false} // 스와이프 금지 -> back/next 버튼 눌러야만 넘어가도록 설정
            navigation={{
              prevEl: '.custom-prev',
              nextEl: '.custom-next',
            }}
            style={{ width: '100%', paddingBottom: '30px' }} // 인디케이터 공간 확보
          >
            {slides.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className={`relative w-full h-[225px] rounded-[1.25rem] overflow-hidden ${
                    img ? 'bg-cover bg-center' : 'bg-[#545454]'
                  }`}
                  style={img ? { backgroundImage: `url(${img})` } : {}}
                >
                  <input
                    id={`fileInput-${idx}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={addImageFile}
                  />
                  <label
                    htmlFor={`fileInput-${idx}`}
                    className="absolute bottom-[10px] left-1/2 -translate-x-1/2 cursor-pointer rounded-full bg-[#FAFAFA] px-[16px] py-[6px] text-[#009DFF] text-[14px] font-semibold shadow"
                  >
                    {img ? '사진 수정하기' : '사진 등록하기'}
                  </label>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* 화살표 아이콘: Swiper 바깥에서 절대 배치 (처음부터 보임) */}
          <img
            src={BackIcon}
            alt="이전"
            className="custom-prev absolute left-[7px] top-1/2 -translate-y-1/2 z-20 h-8 w-8 cursor-pointer select-none"
          />
          <img
            src={NextIcon}
            alt="다음"
            className="custom-next absolute right-[7px] top-1/2 -translate-y-1/2 z-20 h-8 w-8 cursor-pointer select-none"
          />{' '}
        </div>

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
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              placeholder="클래스 소개를 적어주세요."
              rows={5}
              className="w-full bg-transparent outline-none border-0 placeholder:text-[#B3B3B3] text-gray-600 px-1 py-2 resize-none"
            />

            {/* 소개 영역 하단에만 보더(구분선) */}
            <div className="mt-2 border-b border-[#E0E0E0]" />
            {/* 태그 입력 칸 */}
            <div className="mt-3">
              {/* 밑줄 스타일 입력 */}
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
        {/* 달력 */}
        <div className="w-full h-[250px] bg-[red] mb-[10px]"></div>
        {/* 클래스 장소 */}
        <div className="w-full rounded-[1.25rem] box-border p-[12px] shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-[30px]">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-[5px]">
              <span className="flex items-center gap-[6px] w-fit px-[14px] py-[6px] text-[12px] rounded-full bg-[#009DFF] text-[white] font-semibold">
                <img src={LocationIcon} alt="위치" className="h-4 w-4" />
                클래스 장소
              </span>

              {/* 오른쪽: 물음표 아이콘 */}
              <img src={QestionIcon} alt="도움말" className="h-5 w-5" />
            </div>

            {/* 아래쪽 내용 */}
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
              {/* 결제 금액 */}
              <div className="flex items-center justify-between rounded-[1.25rem] bg-[#FAFAFA] px-[14px] py-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-[8px]">
                  <img
                    src={MoneyIcon}
                    alt="결제금액"
                    className="w-5 h-5 text-[#5A4B45]"
                  />
                  <span className="text-[12px] font-semibold text-[#5A4B45]">
                    결제 금액
                  </span>
                  <span className="text-[12px] text-[#B3B3B3]">| 1인당</span>
                </div>
                <div className="flex items-center gap-[2px]">
                  <input
                    type="text"
                    placeholder="00,000"
                    className="w-[70px] bg-transparent text-right placeholder:text-[#D0D0D0] text-[#5A4B45] outline-none border-none"
                  />
                  <span className="text-[14px] font-semibold text-[#5A4B45]">
                    원
                  </span>
                </div>
              </div>

              {/* 모집 인원 */}
              <div className="flex items-center rounded-[1.25rem] bg-[#FAFAFA] px-[14px] py-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.04)]">
                {/* 왼쪽 아이콘 + 텍스트 + 구분선 */}
                <div className="flex items-center gap-[8px] pr-[12px] border-r border-[#C0B6B0]">
                  <img
                    src={PeopleIcon}
                    alt="모집 인원"
                    className="w-5 h-5 text-[#5A4B45]"
                  />
                  <span className="text-[12px] font-semibold text-[#5A4B45]">
                    모집 인원
                  </span>
                </div>

                {/* 오른쪽 증감 버튼 영역 */}
                <div className="flex flex-1 items-center justify-center gap-[12px]">
                  <button
                    onClick={() => setCapacity(Math.max(0, capacity - 1))}
                    className="p-0 bg-transparent border-none"
                  >
                    <img src={MinusIcon} alt="마이너스" className="w-6 h-6" />
                  </button>
                  <span className="text-[14px] text-[#5A4B45]">{capacity}</span>
                  <button
                    onClick={() => setCapacity(capacity + 1)}
                    className="p-0 bg-transparent border-none"
                  >
                    <img src={PlusIcon} alt="플러스" className="w-6 h-6" />
                  </button>
                </div>
              </div>
              {/* 클래스 시간 */}
              <div className="flex items-center w-full rounded-[1.25rem] bg-[#FAFAFA] px-[14px] py-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.04)]">
                {/* 왼쪽 아이콘 + 텍스트 */}
                <div className="flex items-center gap-[8px] border-r border-[#C0B6B0] pr-[14px]">
                  <img
                    src={TimeIcon}
                    alt="시간"
                    className="w-5 h-5 text-[#5A4B45]"
                  />
                  <span className="text-[14px] font-semibold text-[#5A4B45] whitespace-nowrap">
                    클래스 시간
                  </span>
                </div>

                {/* 오른쪽 입력 영역 */}
                <div className="flex flex-1 items-center justify-center gap-[6px] pl-[14px]">
                  <input
                    type="time"
                    className="bg-transparent text-[#5A4B45] outline-none border-none focus:outline-none focus:ring-0"
                  />
                  <span className="text-[#B3B3B3]">~</span>
                  <input
                    type="time"
                    className="bg-transparent text-[#5A4B45] outline-none border-none focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </BodyContainer>
    </ClassContainer>
  );
}
