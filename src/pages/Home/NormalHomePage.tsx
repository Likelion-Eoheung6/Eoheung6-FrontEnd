import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/common/logo2.svg';
import ImageSwiperComponent from '../../components/home/HomeImage';
import ClassSearchButton from '../../components/home/ClassSearchButton';
import ClassActionButtons from '../../components/home/ClassActionButtons';
import CardSlider from '../../components/home/CardSlider';
import ClassCard from '../../components/home/ClassCard';
import ClassRequestCard from '../../components/home/ClassRequestCard';

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
    navigate('/open-class');
  };

  const handleRequestClass = () => {
    navigate('/class/request');
  };

  const handleClassClick = (classId: string) => {
    navigate(`/class/${classId}`);
  };

  const handleWishlistClick = (classId: string) => {
    // 위시리스트 추가 로직
    console.log('위시리스트에 추가:', classId);
  };

  const handleClassRequestClick = (classId: string) => {
    navigate(`/class/request/${classId}`);
  };

  return (
    <div className="flex flex-col">
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
      <div className="text-center py-[17px] mb-[6px]">
        <p className="text-[#111111] text-[14px] font-medium leading-[120%] tracking-[-0.025em]">
          현재 성북구에서 제일 인기있는 수업은?
        </p>
      </div>

      <CardSlider 
        images={imageFiles} 
        classes={[
          {
            id: '1',
            title: '마카롱 만들기기기',
            currentParticipants: 5,
            maxParticipants: 12
          },
          {
            id: '2', 
            title: '수채화 그리기 기초기초기초기초기초기초',
            currentParticipants: 8,
            maxParticipants: 15
          },
          {
            id: '3',
            title: '요가 클래스',
            currentParticipants: 12,
            maxParticipants: 20
          }
        ]}
        onClassClick={handleClassClick}
      />

      {/* 클래스 요청 텍스트 */}
      <div className="text-center py-[11px] mt-[14px] mb-[4px]">
        <p className="text-[#111111] text-[14px] font-medium leading-[120%] tracking-[-0.025em]">
          혹시 이런 클래스는 어떠신가요? 클래스를 요청해보세요!
        </p>
      </div>

      {/* 클래스 요청 카드들 */}
      <div className="flex flex-col items-center gap-[14px] px-[31px] w-full">
        <ClassRequestCard 
          title="마카롱만들기마카롱만들기만들기만들기만들기"
          currentParticipants={30}
          maxParticipants={15}
          onWishlistClick={() => handleWishlistClick('1')}
          onClick={() => handleClassRequestClick('1')}
        />
        <ClassRequestCard 
          title="수채화 그리기 기초"
          currentParticipants={5}
          maxParticipants={12}
          onWishlistClick={() => handleWishlistClick('2')}
          onClick={() => handleClassRequestClick('2')}
        />
      </div>
    </div>
    

  );
}
