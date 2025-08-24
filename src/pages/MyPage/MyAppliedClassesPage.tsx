import React, { useEffect, useState } from 'react';
import ClassContainer from '../../components/class/ClassContainer';
import BodyContainer from '../../components/common/BodyContainer';
import ClassHeaderBar from '../../components/class/ClassHeaderBar';
import MainCharacter from '../../assets/class/main-character.svg';
import CheckIcon from '../../assets/class/check.svg';
import BackIcon from '../../assets/common/back.svg';
import NextIcon from '../../assets/common/next.svg';
import PeopleIcon from '../../assets/class/people.svg';
import LocationIcon from '../../assets/class/location-black.svg';

import type {
  AppliedClassDetail,
  AppliedClassDetailResponse,
} from '../../types/create/createTypes';
import { getAppliedClasses, getMyPageData } from '../../apis/mypage/mypageApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import PriceComponent from '../../components/class/PriceComponent';
import ClassTimeComponent from '../../components/class/ClassTimeComponent';
import CalendarComponent from '../../components/class/CalendarComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import { useNavigate } from 'react-router-dom';

export default function MyAppliedClassesPage() {
  const [nickname, setNickname] = useState<string>('사용자');
  const [appliedClasses, setAppliedClasses] = useState<AppliedClassDetail[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppliedClasses = async () => {
      try {
        const result = await getAppliedClasses();

        if (result.isSuccess) {
          console.log('신청한 클래스 조회: ', result.data);
          setAppliedClasses(result.data);
        } else {
          throw new Error(result.message || 'API 요청에 실패했습니다.');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppliedClasses();
  }, []);

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const result = await getMyPageData();
        if (result.isSuccess) {
          setNickname(result.data.nickname);
        } else {
          console.error('Failed to fetch nickname:', result.message);
        }
      } catch (error) {
        console.error('An error occurred while fetching nickname:', error);
      }
    };

    fetchNickname();
  }, []);

  if (isLoading) {
    return (
      <ClassContainer>
        <ClassHeaderBar title="신청 관리" />
        <BodyContainer>
          <div>로딩 중...</div>
        </BodyContainer>
      </ClassContainer>
    );
  }

  if (error) {
    return (
      <ClassContainer>
        <ClassHeaderBar title="신청 관리" />
        <BodyContainer>
          <div>에러: {error}</div>
        </BodyContainer>
      </ClassContainer>
    );
  }
  return (
    <ClassContainer>
      <ClassHeaderBar title="신청 관리" />
      <BodyContainer>
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20} // 슬라이드 간 간격
            slidesPerView={1} // 한 번에 보여줄 슬라이드 수
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination-custom',
              renderBullet: (index, className) => {
                return `<span class="${className} bg-gray-300 w-2 h-2 inline-block rounded-full "></span>`;
              },
            }}
            className="mySwiper"
          >
            {/* API로 받은 데이터를 map으로 돌려 각 클래스 정보를 SwiperSlide로 만듭니다. */}
            {appliedClasses.map(item => (
              <SwiperSlide>
                <div className="flex flex-col items-center justify-center text-center pt-2 pb-3">
                  {/* 1. 상단 메시지 */}
                  <div className="mb-4">
                    <p className="text-xl text-gray-800">
                      {nickname} <span className="text-sm">고객님의</span>
                    </p>
                    <p className="text-2xl font-bold text-gray-900 my-1">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-800">
                      클래스가 신청 완료되었습니다.
                    </p>
                  </div>
                  {/* 2. 캐릭터 아이콘 */}
                  <div className="flex flex-col items-center my-4">
                    <img src={CheckIcon} className="x-15 h-15" />

                    <img src={MainCharacter} />
                  </div>
                  {/* 3. 달력 */}
                  <div className="w-full px-4 my-4">
                    <CalendarComponent
                      variant="selectionOnly"
                      selectedDate={item.openAt ? new Date(item.openAt) : null}
                      disabled={true}
                    />
                  </div>
                  <div
                    className={`w-full rounded-[1.25rem] box-border p-[12px] flex flex-col gap-[16px] shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-[30px]`}
                  >
                    {/* 4. 클래스 상세 정보 */}
                    <div className="w-full px-4 space-y-2">
                      <div className="w-full box-border px-3 py-2 flex items-center ">
                        <div className="rounded-full  bg-[#009DFF] text-white text-xs font-semibold px-3.5 py-1.5 mr-3 flex-shrink-0">
                          클래스 제목
                        </div>
                        <p className="flex-1 text-gray-800 text-sm truncate">
                          {item.title}
                        </p>
                      </div>
                      <div className="flex justify-between items-center text-base rounded-full p-3 shadow-md bg-white">
                        <div className="flex items-center s whitespace-nowrap">
                          <img src={LocationIcon} alt="장소 아이콘" />
                          <span className="text-[10px] mr-1 pr-2 font-semibold text-gray-600 border-r-1 border-r-[#E0E0E0]">
                            클래스 장소
                          </span>
                        </div>
                        <span className="text-[14px] text-gray-800">
                          {item.roadAddress} 명
                        </span>
                      </div>
                      {/* 가격 정보 */}
                      <PriceComponent price={item.price || 0} disabled={true} />

                      <div className="flex justify-between items-center text-base rounded-full p-3 shadow-md bg-white">
                        <div className="flex items-center space-x-3">
                          <img
                            src={PeopleIcon}
                            alt="모집 인원 아이콘"
                            className="w-5 h-5"
                          />
                          <span className="text-[12px] mr-1 pr-2 font-semibold text-gray-600 border-r-1 border-r-[#E0E0E0]">
                            모집 인원
                          </span>
                        </div>
                        <span className="font-bold text-gray-800">
                          {item.capacity} 명
                        </span>
                      </div>

                      {/* 클래스 시간 */}
                      <ClassTimeComponent
                        startTime={item.startTime || '00:00'}
                        endTime={item.endTime || '00:00'}
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 커스텀 네비게이션 버튼 및 페이지네이션 */}
          <div className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-[-20px] z-10 cursor-pointer p-2">
            <img src={BackIcon} alt="back" />
          </div>
          <div className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-[-20px] z-10 cursor-pointer p-2">
            <img src={NextIcon} alt="next" />
          </div>
          <div className="swiper-pagination-custom text-center relative bottom-0"></div>
        </div>
        <ButtonComponent text="돌아가기" onClick={() => navigate(-1)} />
      </BodyContainer>
    </ClassContainer>
  );
}
