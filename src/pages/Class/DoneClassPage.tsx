import ClassContainer from '../../components/class/ClassContainer';
import ClassHeaderBar from '../../components/class/ClassHeaderBar';
import BodyContainer from '../../components/common/BodyContainer';
import PriceComponent from '../../components/class/PriceComponent';
import CapacityComponent from '../../components/class/CapacityComponent';
import ClassTimeComponent from '../../components/class/ClassTimeComponent';
import { useCreateClassStore } from '../../stores/useCreateClassStore';
import CalendarIcon from '../../assets/class/calendar.svg';
import WonIcon from '../../assets/class/money.svg';
import PeopleIcon from '../../assets/class/people.svg';

import ButtonComponent from '../../components/common/ButtonComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useClassInfoStore } from '../../stores/useClassInfoStore';
import { useEffect, useState } from 'react';
import { getClassDetail } from '../../apis/apply/applyApi';
import type { ClassDetailData } from '../../types/apply/applyTypes';

export default function DoneClassPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const pageType = location.state?.type || 'application';

  const { req, images } = useCreateClassStore();
  const { classInfo } = useClassInfoStore();

  const [applicationDetails, setApplicationDetails] =
    useState<ClassDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // '신청 완료' 페이지일 경우에만 API를 호출합니다.
    if (pageType === 'application') {
      const openId = sessionStorage.getItem('openId');
      if (openId) {
        const fetchDetails = async () => {
          try {
            const response = await getClassDetail(openId);
            if (response.isSuccess) {
              setApplicationDetails(response.data);
            }
          } catch (error) {
            console.error('Failed to fetch class details', error);
            // TODO: 에러 처리 UI
          } finally {
            setLoading(false);
            // 확인 후에는 sessionStorage에서 키를 삭제해주는 것이 좋습니다.
            sessionStorage.removeItem('openId');
          }
        };
        fetchDetails();
      } else {
        // openId가 없는 경우 (잘못된 접근)
        setLoading(false);
      }
    } else {
      // '개설 완료' 페이지의 경우
      setLoading(false);
    }
  }, [pageType]);

  const displayData =
    pageType === 'application'
      ? {
          // '신청 완료' 시 classInfo 스토어의 데이터를 사용
          imageUrl: applicationDetails?.imageUrls?.[0],
          title: applicationDetails?.title,
          price: applicationDetails?.price,
          capacity: location.state?.quantity || applicationDetails?.capacity,
          openAt: applicationDetails?.openAt,
          startTime: applicationDetails?.startTime,
          endTime: applicationDetails?.endTime,
        }
      : {
          // '개설 완료' 시 createClass 스토어의 데이터를 사용
          imageUrl:
            images.length > 0 ? URL.createObjectURL(images[0]) : undefined,
          title: req.title,
          price: req.price,
          capacity: req.capacity,
          openAt: req.openAt,
          startTime: req.startTime,
          endTime: req.endTime,
        };

  const title =
    pageType === 'application' ? '클래스 신청 완료!' : '클래스 개설 완료!';

  // 날짜 포맷팅 함수 (예: 2025-08-20 -> 2025년 8월 20일 수요일)
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    }).format(new Date(dateString));
  };

  useEffect(() => {
    console.log('저장된 데이터: ', applicationDetails);
  }, []);

  return (
    <ClassContainer>
      <ClassHeaderBar title={title} />
      <BodyContainer>
        <div className="flex flex-col gap-4 mt-4 mb-5">
          {/* 대표 이미지 */}
          <div className="w-full h-56 rounded-2xl bg-gray-200 overflow-hidden">
            {displayData.imageUrl && (
              <img
                src={displayData.imageUrl}
                alt="클래스 대표 이미지"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* 클래스 제목 */}
          <div className="w-full rounded-full box-border px-3 py-2 flex items-center shadow-md bg-[#FAFAFA]">
            <div className="bg-white rounded-full border-1 border-[#E0E0E0] text-[#009DFF] text-xs font-semibold px-3.5 py-1.5 mr-3 flex-shrink-0">
              클래스 제목
            </div>
            <p className="flex-1 text-gray-800 text-sm truncate">
              {displayData.title}
            </p>
          </div>

          <div
            className={`w-full rounded-[1.25rem] box-border p-[12px] flex flex-col gap-[16px] shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-[30px]`}
          >
            {/* 가격 정보 */}
            <PriceComponent price={displayData.price || 0} disabled={true} />

            {/* 모집 인원 */}
            <div className="flex justify-between items-center text-base rounded-full p-3 shadow-md bg-white">
              <div className="flex items-center space-x-3">
                <img
                  src={PeopleIcon}
                  alt="모집 인원 아이콘"
                  className="w-5 h-5"
                />
                <span className="text-sm font-semibold text-gray-600">
                  {pageType === 'application' ? '신청 인원' : '모집 인원'}
                </span>
              </div>
              <span className="font-bold text-gray-800">
                {displayData.capacity} 명
              </span>
            </div>

            {/* 클래스 날짜 */}
            <div className="flex items-center rounded-full bg-white p-3 shadow-md">
              <div className="flex items-center gap-2 pr-3 border-r border-gray-200">
                <img src={CalendarIcon} alt="달력" className="w-5 h-5" />
                <span className="text-sm font-semibold text-gray-600">
                  클래스 날짜
                </span>
              </div>
              <div className="flex-1 text-center font-bold text-sm text-gray-800">
                {formatDate(displayData.openAt)}
              </div>
            </div>

            {/* 클래스 시간 */}
            <ClassTimeComponent
              startTime={displayData.startTime || '00:00'}
              endTime={displayData.endTime || '00:00'}
              disabled={true}
            />
          </div>
        </div>
        <div className="flex gap-[35px]">
          <ButtonComponent
            text="홈으로 이동"
            size="small"
            bgColor="#B3B3B3"
            onClick={() => navigate('/')}
          />
          <ButtonComponent text="신청관리로 이동" />
        </div>
      </BodyContainer>
    </ClassContainer>
  );
}
