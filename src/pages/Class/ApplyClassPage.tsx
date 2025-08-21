import React, { useEffect, useState } from 'react';
import ClassContainer from '../../components/class/ClassContainer';
import ClassHeaderBar from '../../components/class/ClassHeaderBar';
import BodyContainer from '../../components/common/BodyContainer';
import LocationIcon from '../../assets/class/location.svg';
import QestionIcon from '../../assets/class/question.svg';
import ImageSwiperComponent from '../../components/class/ImageSwiperComponent';
import MapComponent from '../../components/class/MapComponent';
import {
  useClassInfoStore,
  type ClassInfoData,
} from '../../stores/useClassInfoStore';
import useGet from '../../hooks/useGet';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonComponent from '../../components/common/ButtonComponent';
import { getClassDetail } from '../../apis/apply/applyApi';
import HeartIcon from '../../assets/class/heart.svg';
import HeartSelectedIcon from '../../assets/class/heart-red.svg';

const dummyData = {
  title: 'Dummy Class Title',
  content: 'This is a dummy class description.',
  moodTags: ['Relaxed', 'Fun', 'Creative'],
  mentorPlaceId: 1,
  govReservationId: null,
  latitude: 37.5665,
  longitude: 126.978,
  detailAddress: 'Dummy Address, Seoul',
  imageUrls: [
    'https://img.taling.me/Content/Uploads/Cover/s_3cd8315ee2bb4918f5c28e807803de0b697eb48f.jpg',
    'https://img.taling.me/Content/Uploads/Cover/s_3cd8315ee2bb4918f5c28e807803de0b697eb48f.jpg',
  ],
};
export default function ApplyClassPage() {
  const { classInfo, setClassInfo, clearClassInfo } = useClassInfoStore();
  const { classId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  // 찜하기
  const toggleLike = () => {
    setIsLiked(!isLiked);
    // Handle API call to update like status if needed
    console.log('Like toggled:', !isLiked);
  };

  useEffect(() => {
    if (!classId) return;

    const fetchClassData = async () => {
      try {
        setLoading(true);
        const response = await getClassDetail(classId);
        if (response.isSuccess) {
          setClassInfo(response.data);
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
  }, [classId]);

  return (
    <ClassContainer>
      <ClassHeaderBar title="클래스 신청하기" />
      <BodyContainer>
        <div className="relative">
          <ImageSwiperComponent
            slides={classInfo?.imageUrls || []}
            showEditButton={false}
          />
          <button onClick={toggleLike} className="absolute top-52 right-2 ">
            {classInfo?.isWished ? (
              <img src={HeartSelectedIcon} />
            ) : (
              <img src={HeartIcon} />
            )}
          </button>
        </div>

        {/* 클래스 제목 */}
        <div className="w-full rounded-[1.25rem] bg-white shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mt-[20px] mb-[20px] p-[12px]">
          {/* Class Title */}
          <div className="flex items-center ">
            <div className="rounded-full bg-[#009DFF] text-[white] text-[12px] font-semibold px-[14px] py-[6px] shadow mr-[8px] flex-shrink-0">
              클래스 제목
            </div>
            <div className="text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap">
              {classInfo?.title || ''}
            </div>
          </div>
          <div className="w-full h-[1px] border-t-[1px] border-[#E0E0E0] my-[6px]" />
          {/* Mentor Profile */}
          <div className="flex items-center gap-[12px]">
            <img
              src={classInfo?.mentorProfileImageUrl}
              alt="Mentor Profile"
              className="h-[40px] w-[40px] rounded-full object-cover bg-[#e0e0e0] flex-shrink-0"
            />
            <div className="text-[14px] text-gray-700 break-words ">
              {classInfo?.mentorIntro}
            </div>
          </div>
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
              readOnly
              value={classInfo?.content || ''}
              placeholder="클래스 소개를 적어주세요."
              rows={5}
              className="w-full bg-transparent outline-none border-0 placeholder:text-[#B3B3B3] text-gray-600 px-1 py-2 resize-none"
            />

            <div className="mt-2 border-b border-[#E0E0E0]" />
            <div className="mt-3">
              <div className="flex flex-wrap gap-[8px] mb-[8px]">
                {classInfo?.moodTags.map(tag => (
                  <div
                    key={tag}
                    className="flex items-center bg-[#e0e7ff] rounded-full px-[12px] py-[4px]"
                  >
                    <span className="text-[12px] font-medium text-[#4338ca]">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
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
          <div className="mt-4">
            <MapComponent
              selectedPlaceId={
                classInfo?.govReservationId || classInfo?.mentorPlaceId
              }
              places={[
                {
                  id:
                    classInfo?.mentorPlaceId ||
                    classInfo?.govReservationId ||
                    0,
                  latitude: classInfo?.latitude,
                  longitude: classInfo?.longitude,
                  detailAddress: classInfo?.detailAddress,
                },
              ]}
            />
          </div>
        </div>
        <ButtonComponent
          text="클래스 신청하기"
          onClick={() => navigate('payment')}
        />
      </BodyContainer>
    </ClassContainer>
  );
}
