import React, { useEffect } from 'react';
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
  const { data, loading, error } = useGet<ClassInfoData>(
    `/api/classes/${classId}`
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setClassInfo(data);
    } else if (loading === false || error) {
      setClassInfo(dummyData); // 통신 시 삭제
    }

    return () => {
      clearClassInfo();
    };
  }, [data, setClassInfo, clearClassInfo]);
  return (
    <ClassContainer>
      <ClassHeaderBar title="클래스 신청하기" />
      <BodyContainer>
        <ImageSwiperComponent
          slides={classInfo?.imageUrls || []}
          showEditButton={false}
        />
        {/* 클래스 제목 */}
        <div
          className={`w-full h-[50px] rounded-[1.25rem] box-border px-[12px] flex items-center shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-[20px]`}
        >
          <div className="rounded-full bg-[#009DFF] text-[white] text-[12px] font-semibold px-[14px] py-[6px] shadow mr-[5px]">
            클래스 제목
          </div>
          <input
            value={classInfo?.title || ''}
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
                    <button className="ml-[4px] text-[16px] leading-none text-[#6366f1] hover:text-[#4338ca]">
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <input
                  //   value={tagInput}
                  placeholder="#태그를 입력해주세요."
                  className="w-full bg-transparent outline-none border-0 placeholder:text-[#B3B3B3] text-gray-600 pb-2"
                />
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
