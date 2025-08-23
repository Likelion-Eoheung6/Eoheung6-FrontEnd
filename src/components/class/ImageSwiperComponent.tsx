import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper';
// import 'swiper/css/navigation';

import BackIcon from '../../assets/common/back.svg';
import NextIcon from '../../assets/common/next.svg';

interface ImageSwiperComponentProps {
  slides: (string | null)[];
  images?: File[];
  setImageFiles?: (files: File[]) => void;
  showEditButton?: boolean;
}

export default function ImageSwiperComponent({
  slides,
  images = [],
  setImageFiles,
  showEditButton = true,
}: ImageSwiperComponentProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const addImageFile = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!setImageFiles || !e.target.files || e.target.files.length === 0)
      return;
    const newFile = e.target.files[0];
    const newFiles = [...images];
    newFiles[idx] = newFile;
    setImageFiles(newFiles.filter(Boolean));
  };

  return (
    <>
      <div className="relative flex w-full items-center justify-center gap-[8px] rounded-[1.25rem] bg-[#e0e0e0] px-[40px] mb-[21px]">
        <img
          src={BackIcon}
          alt="이전"
          className="swiper-button-prev absolute "
        />

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          className="w-full"
          pagination={{ clickable: true, el: '.swiper-button' }}
          allowTouchMove={true}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          onSlideChange={swiper => setCurrentIndex(swiper.activeIndex)}
        >
          {slides.map((imgUrl, idx) => (
            <SwiperSlide key={idx}>
              <div
                className={`relative h-[225px] w-full overflow-hidden bg-cover bg-center ${
                  !imgUrl && 'bg-[#808080]'
                }`}
                style={imgUrl ? { backgroundImage: `url(${imgUrl})` } : {}}
              >
                {showEditButton && (
                  <>
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
                  </>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <img
          src={NextIcon}
          alt="Next"
          className="swiper-button-next h-[24px] w-[24px]"
        />
      </div>
      <div className="swiper-button flex justify-center gap-[10px]"></div>
    </>
  );
}
