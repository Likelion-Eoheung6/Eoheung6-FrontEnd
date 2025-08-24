import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/common/logo2.svg';
import EasyClassCard from '../../components/common/EasyClassCard';
import ClassActionButtons from '../../components/home/ClassActionButtons';
import ClassSearchButton from '../../components/home/ClassSearchButton';
import LoadingScreen from '../../components/common/LoadingScreen';
import { useHomeData } from '../../hooks/home/useHomeData';

export default function EasyHomePage() {
  const navigate = useNavigate();
  const { data: homeData, isLoading, error } = useHomeData();

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
    navigate('/request');
  };

  const handleClassClick = (classId: string) => {
    navigate(`/class/${classId}`);
  };

  // API 데이터를 EasyClassCard 형식으로 변환
  const classData = Array.isArray(homeData?.data)
    ? homeData.data.map(item => ({
        id: item.openId.toString(),
        title: item.title,
        image: item.imageUrl,
        participants: { current: item.appliedCount, max: item.capacity },
      }))
    : [];

  return (
    <div className="flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-center mb-4">
        <img src={logo} alt="로고" className="h-16" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col">
        {/* 클래스 검색하기 버튼 - 로고 아래 24px 간격 */}
        <div className="mb-4 px-8">
          <ClassSearchButton onClick={handleClassSearch} />
        </div>

        {/* 클래스 개설 & 클래스 요청 버튼 */}
        <div className="px-8 mb-[21px]">
          <ClassActionButtons
            onCreateClass={handleCreateClass}
            onRequestClass={handleRequestClass}
          />
        </div>

        {/* 인기 수업 안내 텍스트 */}
        <div className="px-8 text-center mb-[18px]">
          <p className="text-[#111111] text-[18px] font-medium leading-[120%] tracking-[-0.025em] text-center">
            현재 성북구에서 제일 인기있는 수업은?
          </p>
        </div>

        {/* 쉬운 버전용 클래스 카드들 */}
        <div>
          <div className="space-y-[19px] flex flex-col items-center pb-[28px] px-[23px]">
            {classData.map(classItem => (
              <EasyClassCard
                key={classItem.id}
                title={classItem.title}
                image={classItem.image}
                participants={classItem.participants}
                onClick={() => handleClassClick(classItem.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
