import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/common/logo2.svg';
import ImageSwiperComponent from '../../components/home/HomeImage';
import ClassSearchButton from '../../components/home/ClassSearchButton';
import ClassActionButtons from '../../components/home/ClassActionButtons';
import CardSlider from '../../components/home/CardSlider';

export default function NormalHomePage() {
  const navigate = useNavigate();
  const [imageFiles, setImageFiles] = React.useState<string[]>(['', '', '']);

  const handleStartEasy = () => {
    navigate('/tag/basic?version=easy');
  };

  const handleStartNormal = () => {
    navigate('/tag/basic');
  };

  const handleClassSearch = () => {
    navigate('/search');
  };

  const handleCreateClass = () => {
    navigate('/class/create');
  };

  const handleRequestClass = () => {
    navigate('/class/request');
  };

  const handleClassClick = (classId: string) => {
    navigate(`/class/${classId}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더 */}
      <div className="flex items-center justify-center mb-[24px]">
        <img src={logo} alt="로고" className="h-[38px]" />
      </div>
    {/* 이미지 스와이퍼 - 로고 아래 24px 간격 */}
    <div className="mb-[25px]">
        <ImageSwiperComponent slides={imageFiles} setImageFiles={setImageFiles} />
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
      <div className="mt-[11px] text-center mb-[17px]">
        <p className="text-[#111111] text-[14px] font-medium leading-[120%] tracking-[-0.025em]">
          현재 성북구에서 제일 인기있는 수업은?
        </p>
      </div>

      <CardSlider images={imageFiles} />
    </div>
    

  );
}
