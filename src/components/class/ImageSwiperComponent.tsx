import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import BackIcon from '../../assets/common/back.svg';
import NextIcon from '../../assets/common/next.svg';

interface ImageSwiperComponentProps {
  slides: string[]; // 이미지 URL 배열
  images: File[];
  setImageFiles: (files: File[]) => void;
}
export default function ImageSwiperComponent({
  slides,
  images,
  setImageFiles,
}: ImageSwiperComponentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevRef = useRef<HTMLImageElement | null>(null);
  const nextRef = useRef<HTMLImageElement | null>(null);

  const addImageFile = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFile = files[0];

    // Create a new array based on the current files from the store
    const newFiles = [...images];
    newFiles[idx] = newFile; // Replace or add the new file at the specified index

    // Call the store's update function with the new array of File objects
    setImageFiles(newFiles);
  };
  return (
    <div className="w-full mb-[20px] relative">
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={10} // 슬라이드 사이 여백
        slidesPerView={1.15} // 한 화면에 1.2개 정도 보이게
        centeredSlides={true} // 현재 슬라이드를 가운데 정렬
        pagination={{ clickable: true }}
        allowTouchMove={true}
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        onSlideChange={swiper => setCurrentIndex(swiper.activeIndex)}
        style={{ width: '100%', paddingBottom: '30px' }}
      >
        {slides.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div
              className={`relative w-full h-[225px] rounded-[1.25rem] overflow-hidden ${
                img ? 'bg-cover bg-center' : 'bg-[#B3B3B3]'
              }`}
              style={img ? { backgroundImage: `url(${img})` } : {}}
            >
              <input
                id={`fileInput-${idx}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => addImageFile(idx, e)}
              />
              <label
                htmlFor={`fileInput-${idx}`}
                className="absolute bottom-[10px] left-1/2 -translate-x-1/2 cursor-pointer rounded-full bg-[#FAFAFA] px-[16px] py-[6px] text-[#009DFF] text-[14px] font-semibold shadow"
              >
                사진 등록/수정하기
              </label>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Prev 버튼 */}

      <img
        ref={prevRef}
        src={BackIcon}
        alt="이전"
        className="custom-prev absolute left-[30px] top-1/2 -translate-y-1/2 z-20 h-8 w-8 cursor-pointer select-none"
      />
      {/* Next 버튼 */}
      {currentIndex < slides.length - 1 && (
        <img
          src={NextIcon}
          alt="다음"
          className="custom-next absolute right-[30px] top-1/2 -translate-y-1/2 z-20 h-8 w-8 cursor-pointer select-none"
        />
      )}
    </div>
  );
}
