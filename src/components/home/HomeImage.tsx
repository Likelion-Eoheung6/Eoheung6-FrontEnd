import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import BackIcon from '../../assets/common/back.svg';
import NextIcon from '../../assets/common/next.svg';

interface HomeImageProps {
  slides: string[]; // 이미지 URL 배열
  setImageFiles: React.Dispatch<React.SetStateAction<string[]>>;
}
export default function HomeImage({ slides, setImageFiles }: HomeImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevRef = useRef<HTMLImageElement | null>(null);
  const nextRef = useRef<HTMLImageElement | null>(null);

  const addImageFile = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) {
        setImageFiles(prev => {
          const newFiles = [...prev];
          newFiles[idx] = reader.result as string; // 해당 인덱스 이미지 교체
          return newFiles.filter(Boolean); // 빈 값 제거
        });
      }
    };
  };
  return (
    <div>
      <div className="w-full mb-[15px] relative flex items-center">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10} // 슬라이드 사이 여백
          slidesPerView={1.15} // 한 화면에 1.2개 정도 보이게
          centeredSlides={true} // 현재 슬라이드를 가운데 정렬
          initialSlide={Math.floor(slides.length / 2)} // 가운데 슬라이드부터 시작
          allowTouchMove={true}
          loop={slides.length >= 3} // 슬라이드가 3개 이상일 때만 loop 활성화
          navigation={{
            prevEl: '.custom-prev',
            nextEl: '.custom-next',
          }}
          onSlideChange={swiper => setCurrentIndex(swiper.realIndex)}
          className="w-full"
        >
          {slides.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div
                className={`relative w-full h-[225px] rounded-[1.25rem] overflow-hidden ${
                  img ? 'bg-cover bg-center' : 'bg-[#B3B3B3]'
                }`}
                style={img ? { backgroundImage: `url(${img})` } : undefined}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev 버튼 */}

        <img
          ref={prevRef}
          src={BackIcon}
          alt="이전"
          className="custom-prev absolute left-[30px] z-20 h-8 w-8 cursor-pointer select-none"
        />
        {/* Next 버튼 */}
        <img
          src={NextIcon}
          alt="다음"
          className="custom-next absolute right-[30px] z-20 h-8 w-8 cursor-pointer select-none"
        />
      </div>

      {/* 커스텀 페이지네이션 */}
      <div className="flex justify-center gap-2">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx === currentIndex ? 'bg-[#00BBFF]' : 'bg-[#D9D9D9]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
