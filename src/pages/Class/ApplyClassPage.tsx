import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { applyForClass, getClassDetail } from '../../apis/apply/applyApi';
import { getWishlist } from '../../apis/wishlist/wishlistApi';
import { useUpdateWishlist } from '../../hooks/wishlist/useWishlist';
import BodyContainer from '../../components/common/BodyContainer';
import ButtonComponent from '../../components/common/ButtonComponent';
import CalendarComponent from '../../components/class/CalendarComponent';
import CapacityComponent from '../../components/class/CapacityComponent';
import ClassContainer from '../../components/class/ClassContainer';
import ClassHeaderBar from '../../components/class/ClassHeaderBar';
import ImageSwiperComponent from '../../components/class/ImageSwiperComponent';
import MapComponent from '../../components/class/MapComponent';
import { useClassInfoStore } from '../../stores/useClassInfoStore';

// 아이콘 import (필요에 따라 경로 수정)
import HeartIcon from '../../assets/class/heart.svg';
import HeartSelectedIcon from '../../assets/class/heart-red.svg';
import LocationIcon from '../../assets/class/location.svg';
import QestionIcon from '../../assets/class/question.svg';
import PriceComponent from '../../components/class/PriceComponent';
import ClassTimeComponent from '../../components/class/ClassTimeComponent';
import type {
  ApplyClassRequest,
  KakaoPayReadyRequest,
} from '../../types/apply/applyTypes';

export default function ApplyClassPage() {
  const { classInfo, setClassInfo } = useClassInfoStore();
  const { classId } = useParams();
  const navigate = useNavigate();
  const updateWishlist = useUpdateWishlist();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // '결제하기(신청)' 버튼 클릭 여부를 관리하는 상태
  const [isApplying, setIsApplying] = useState(false);
  // 찜하기 상태
  const [isWished, setIsWished] = useState(classInfo?.isWished || false);
  // 신청 인원 상태
  const [capacity, setCapacity] = useState(1);
  // 선택된 날짜 상태
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (!classId) return;

    const fetchClassData = async () => {
      try {
        setLoading(true);
        const response = await getClassDetail(classId);
        if (response.isSuccess) {
          setClassInfo(response.data);
          setIsWished(response.data.isWished); // API 응답으로 찜 상태 초기화
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Failed to fetch class details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, [classId, setClassInfo]);

  useEffect(() => {
    if (classInfo && classInfo.openAt) {
      const initialDate = new Date(classInfo.openAt);
      setSelectedDate(initialDate);
    }
  }, [classInfo]);

  useEffect(() => {
    console.log('class info: ', classInfo);
  }, [classInfo]);

  // 찜하기 토글 함수
  const toggleWish = async () => {
    if (!classInfo?.openId || updateWishlist.isPending) return;

    const newWishState = !isWished;

    // 낙관적 업데이트: UI를 즉시 업데이트
    setIsWished(newWishState);

    try {
      // 현재 위시리스트 조회 (404 오류 처리 포함)
      let currentWishIds: number[] = [];

      try {
        const currentWishlist = await getWishlist();
        currentWishIds = currentWishlist.data.WishPage.map(wish => wish.openId);
      } catch (wishError: any) {
        // 404 오류는 위시리스트가 비어있는 것을 의미
        if (wishError?.response?.status === 404) {
          currentWishIds = [];
        } else {
          throw wishError;
        }
      }

      // 현재 클래스 ID만 포함하여 요청
      // 백엔드에서 찜이 된건지 찜 해제된건지를 처리
      const updatedWishIds = [classInfo.openId];

      // 위시리스트 업데이트
      await updateWishlist.mutateAsync({ ids: updatedWishIds });
    } catch (error) {
      console.error('위시리스트 업데이트 실패:', error);
      // 실패 시 원래 상태로 롤백
      setIsWished(!newWishState);
    }
  };
  const handleApply = async (): Promise<KakaoPayReadyRequest | null> => {
    if (!classId) {
      console.error('클래스 ID가 없습니다.');
      alert('오류: 클래스 정보를 찾을 수 없습니다.');
      return null;
    }
    const applicationData: ApplyClassRequest = {
      toggleWished: classInfo?.isWished || false, // 찜하기 버튼을 눌렀는지 여부
      count: capacity, // 신청 인원
    };

    try {
      const response = await applyForClass(classId, applicationData);

      if (response.isSuccess && response.data) {
        // 1. response.data에서 필요한 값들을 추출합니다.
        // 2. KakaoPayReadyRequest 타입에 맞는 새 객체를 생성합니다.
        const paymentData: KakaoPayReadyRequest = {
          orderId: response.data.orderId,
          itemName: response.data.itemName,
          quantity: Number(response.data.quantity), // API 응답이 문자열일 수 있으므로 숫자로 변환
          totalPrice: Number(response.data.totalPrice), // API 응답이 문자열일 수 있으므로 숫자로 변환
        };

        // 3. 새로 생성한 객체를 반환합니다.
        return paymentData;
      } else {
        alert(`신청 실패: ${response.message}`);
        return null;
      }
    } catch (error) {
      console.error('클래스 신청 중 오류 발생:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
      return null;
    }
  };

  // 메인 버튼 클릭 핸들러
  const handleMainButtonClick = async () => {
    if (isApplying) {
      const applicationResult = await handleApply();
      if (classInfo?.openId) {
        sessionStorage.setItem('openId', classInfo.openId.toString());
      }

      if (applicationResult) {
        navigate('payment', {
          state: {
            orderId: applicationResult.orderId,
            itemName: applicationResult.itemName,
            quantity: Number(applicationResult.quantity),
            totalPrice: Number(applicationResult.totalPrice),
          },
        });
      }
    } else {
      setIsApplying(true);
    }
  };
  // 날짜 선택 핸들러
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };
  // 클래스 소개 및 장소 섹션
  const ClassDetailsSection = () => (
    <>
      {/* 클래스 소개 */}
      <div className="w-full rounded-[1.25rem] box-border p-3 bg-[#FAFAFA] shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-8">
        <div className="flex flex-col">
          <span className="w-fit px-3.5 py-1.5 text-xs rounded-full bg-[#009DFF] text-white font-semibold mb-2">
            클래스 소개
          </span>
          <p className="w-full bg-transparent text-gray-600 px-1 py-2 text-sm leading-relaxed">
            {classInfo?.content || '클래스 소개가 없습니다.'}
          </p>
          <div className="my-2 border-t border-gray-200" />
          <div className="mt-1">
            <div className="flex flex-wrap gap-2">
              {classInfo?.moodTags?.map(tag => (
                <div
                  key={tag}
                  className="flex items-center rounded-full px-3 py-1"
                >
                  <span className="text-xs font-medium">#{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* 클래스 장소 선택 */}
      <div className="w-full rounded-[1.25rem] box-border p-3 bg-[#FAFAFA] shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="flex items-center gap-2 w-fit px-3.5 py-1.5 text-xs rounded-full bg-[#009DFF] text-white font-semibold">
            <img src={LocationIcon} alt="위치" className="h-4 w-4" />
            클래스 장소
          </span>
          <button aria-label="도움말">
            <img src={QestionIcon} alt="도움말" className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4">
          <MapComponent
            selectedPlaceId={
              classInfo?.govReservationId || classInfo?.mentorPlaceId
            }
            places={
              classInfo
                ? [
                    {
                      id:
                        classInfo.mentorPlaceId ||
                        classInfo.govReservationId ||
                        0,
                      latitude: classInfo.latitude,
                      longitude: classInfo.longitude,
                      detailAddress: classInfo.detailAddress,
                    },
                  ]
                : []
            }
          />
        </div>
      </div>
    </>
  );

  // 클래스 신청 정보 섹션 (날짜, 인원 등)
  const ApplicationSection = () => (
    <>
      {/* 클래스 신청 정보 */}
      <div className="w-full rounded-[1.25rem] bg-white shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] p-4 mb-8 flex flex-col gap-y-4">
        {/* 장소 */}
        <div className="flex items-center text-sm">
          <img src={LocationIcon} alt="장소" className="w-5 h-5 mr-3" />
          <span className="text-gray-500 font-medium w-20">클래스 장소</span>
          <span className="text-gray-800">{classInfo?.detailAddress}</span>
        </div>
        {/* 금액 */}
        {/* <div className="flex items-center text-sm">
          <img src={PriceIcon} alt="금액" className="w-5 h-5 mr-3" />
          <span className="text-gray-500 font-medium w-20">결제 금액</span>
          <span className="text-gray-800 font-bold">
            {classInfo?.price.toLocaleString() || 0}원
          </span>
          <span className="text-gray-500 text-xs ml-1">/ 1인당</span>
        </div> */}
        <PriceComponent price={classInfo?.price || 0} disabled={true} />
        {/* 인원 */}
        <CapacityComponent capacity={capacity} onCapacityChange={setCapacity} />
        {/* 시간 */}
        <ClassTimeComponent
          startTime={classInfo?.startTime || '00:00'}
          endTime={classInfo?.endTime || '00:00'}
          disabled={true}
        />
      </div>

      {/* 클래스 일정 */}
      <div className="w-full rounded-[1.25rem] box-border p-3 shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-8">
        <div className="flex flex-col">
          <span className="w-fit px-3.5 py-1.5 text-xs rounded-full bg-[#009DFF] text-white font-semibold mb-4">
            클래스 일정
          </span>
          <CalendarComponent
            variant="selectionOnly"
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            disabled={true}
          />
        </div>
      </div>
    </>
  );

  return (
    <ClassContainer>
      <ClassHeaderBar title="클래스 신청하기" />
      <BodyContainer>
        <div className="relative">
          <ImageSwiperComponent
            slides={classInfo?.imageUrls || []}
            showEditButton={false}
          />
          <button
            onClick={toggleWish}
            disabled={updateWishlist.isPending}
            className="absolute -bottom-4 right-4 flex items-center justify-center"
            aria-label="찜하기"
          >
            <img
              src={isWished ? HeartSelectedIcon : HeartIcon}
              alt="찜하기 아이콘"
              className="w-7 h-7"
            />
          </button>
        </div>

        {/* 클래스 제목 */}
        <div className="w-full rounded-[1.25rem] bg-[#FAFAFA] shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mt-8 mb-5 p-3">
          <div className="flex items-center">
            <div className="rounded-full bg-[#009DFF] text-white text-xs font-semibold px-3.5 py-1.5 shadow mr-2 flex-shrink-0">
              클래스 제목
            </div>
            <div className="text-gray-800 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
              {classInfo?.title || ''}
            </div>
          </div>
          <div className="w-full h-px bg-gray-200 my-2.5" />
          <div className="flex items-center gap-3">
            <img
              src={classInfo?.mentorProfileImageUrl}
              alt="Mentor Profile"
              className="h-10 w-10 rounded-full object-cover bg-gray-200 flex-shrink-0"
            />
            <div className="text-sm text-gray-700 break-words">
              {classInfo?.mentorIntro}
            </div>
          </div>
        </div>

        {isApplying ? <ApplicationSection /> : <ClassDetailsSection />}

        <ButtonComponent
          text={isApplying ? '결제하기' : '클래스 신청하기'}
          onClick={handleMainButtonClick}
          // 결제하기 버튼은 날짜가 선택되어야 활성화
          isActive={isApplying ? selectedDate !== null : true}
        />
      </BodyContainer>
    </ClassContainer>
  );
}
