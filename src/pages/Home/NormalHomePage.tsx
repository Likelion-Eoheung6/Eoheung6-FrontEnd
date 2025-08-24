import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/common/logo2.svg';
import ImageSwiperComponent from '../../components/home/HomeImage';
import ClassSearchButton from '../../components/home/ClassSearchButton';
import ClassActionButtons from '../../components/home/ClassActionButtons';
import ClassCardSlider from '../../components/home/ClassCardSlider';
import ClassRequestCard from '../../components/home/ClassRequestCard';
import LoadingScreen from '../../components/common/LoadingScreen';
import { useHomeData } from '../../hooks/home/useHomeData';

export default function NormalHomePage() {
  const navigate = useNavigate();
  const { data: homeData, isLoading, error } = useHomeData();
  const [imageFiles, setImageFiles] = React.useState<string[]>(['', '', '']);

  // 로딩 중이거나 에러가 있을 때 처리
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  const handleClassSearch = () => {
    navigate('/search');
  };

  const handleCreateClass = () => {
    navigate('/open-class');
  };

  const handleRequestClass = () => {
    navigate('/request');
  };

  const handleClassClick = (classId: string) => {
    navigate(`/class/${classId}`);
  };

  const handleWishlistClick = (classId: string) => {
    // 위시리스트 추가 로직
    console.log('위시리스트에 추가:', classId);
  };

  const handleClassRequestClick = (classId: string) => {
    navigate(`/class/${classId}`);
  };

  const handleBannerClick = (index: number) => {
    // 배너 클릭 시 해당 클래스로 이동
    if (Array.isArray(homeData?.data?.ads) && homeData.data.ads[index]) {
      const adData = homeData.data.ads[index];
      navigate(`/class/${adData.openId}`);
    }
  };

  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-center mb-4">
        <img src={logo} alt="로고" className="h-16" />
      </div>
      {/* 이미지 스와이퍼 - 로고 아래 24px 간격 */}
      <div className="mb-[25px]">
        <ImageSwiperComponent
          slides={
            Array.isArray(homeData?.data?.ads)
              ? homeData.data.ads.map(ad => ad.imageUrl)
              : imageFiles
          }
          setImageFiles={setImageFiles}
          onSlideClick={handleBannerClick}
        />
      </div>
      <div className="px-[31px] mb-[18px]">
        <ClassSearchButton onClick={handleClassSearch} />
      </div>

      {/* 클래스 개설 & 클래스 요청 버튼 */}
      <div className="px-[31px] mb-[26px]">
        <ClassActionButtons
          onCreateClass={handleCreateClass}
          onRequestClass={handleRequestClass}
        />
      </div>

      {/* 가로 구분선 */}
      <div className="px-4">
        <div className="w-full h-[1px] bg-[#E0E0E0]"></div>
      </div>

      {/* 인기 수업 안내 텍스트 */}
      <div className="text-center py-[17px] mb-[6px]">
        <p className="text-[#111111] text-[14px] font-medium leading-[120%] tracking-[-0.025em]">
          현재 성북구에서 제일 인기있는 수업은?
        </p>
      </div>

      <ClassCardSlider
        images={
          Array.isArray(homeData?.data?.hots)
            ? homeData.data.hots.map(hot => hot.imageUrl)
            : imageFiles
        }
        classes={
          Array.isArray(homeData?.data?.hots)
            ? homeData.data.hots.map(hot => ({
                id: hot.openId.toString(),
                title: hot.title,
                currentParticipants: hot.appliedCount,
                maxParticipants: hot.capacity,
              }))
            : []
        }
        onClassClick={handleClassClick}
      />

      {/* 클래스 요청 텍스트 */}
      <div className="text-center py-[11px] mt-[14px] mb-[4px]">
        <p className="text-[#111111] text-[14px] font-medium leading-[120%] tracking-[-0.025em]">
          혹시 이런 클래스는 어떠신가요? 클래스를 요청해보세요!
        </p>
      </div>

      {/* 클래스 요청 카드들 */}
      <div className="flex flex-col items-center gap-[14px] pb-[31px] px-[31px] w-full">
        {Array.isArray(homeData?.data?.recruites)
          ? homeData.data.recruites.map(recruit => (
              <ClassRequestCard
                key={recruit.recruitID}
                title={recruit.title}
                currentParticipants={recruit.joinedCount}
                maxParticipants={15}
                recruitId={recruit.recruitID}
                isJoined={recruit.isJoined}
                onWishlistClick={() =>
                  handleWishlistClick(recruit.recruitID.toString())
                }
                onClick={() =>
                  handleClassRequestClick(recruit.recruitID.toString())
                }
              />
            ))
          : []}
      </div>
    </div>
  );
}
