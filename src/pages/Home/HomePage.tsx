import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/common/logo2.svg';
import EasyClassCard from '../../components/common/EasyClassCard';

export default function HomePage() {
  const navigate = useNavigate();

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

  // 샘플 클래스 데이터
  const sampleClasses = [
    {
      id: '1',
      title: '키오스크 사용방법 키오스크 사용방법 키오스크 사용방법 배우기키오스크',
      participants: { current: 5, max: 12 }
    },
    {
      id: '2',
      title: '키오스크 사용방법 키오스크 사용방법 키오스크 사용방법 배우기키오스크키오스크키오스크',
      participants: { current: 5, max: 12 }
    },
    {
      id: '3',
      title: '키오스크 사용방법 키오스크 사용방법 키오스크 사용방법 배우기키오스크',
      participants: { current: 5, max: 12 }
    },
    {
      id: '4',
      title: '키오스크 사용방법 키오스크 사용방법 키오스크 사용방법 배우기키오스크',
      participants: { current: 5, max: 12 }
    },
    {
      id: '5',
      title: '키오스크 사용방법 키오스크 사용방법 키오스크 사용방법 배우기키오스크',
      participants: { current: 5, max: 12 }
    }
  ];

  return (
    <div className="bg-[#FDFDFD] flex flex-col min-h-screen">
      {/* 헤더 */}
      <div className="flex items-center justify-center py-2">
        <img src={logo} alt="로고" className="h-[38px]" />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col">
        {/* 클래스 검색하기 버튼 - 로고 아래 24px 간격 */}
        <div className="mt-6 mb-4 px-8">
          <button
            onClick={handleClassSearch}
            className="w-full h-[38px] bg-[#FDFDFD] rounded-[20px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] flex items-center justify-between pl-[14px] pr-[10px] border border-[#E5E5E5] hover:shadow-lg transition-shadow"
          >
            <span className="text-[#111111] text-[14px] font-medium leading-[120%] tracking-[-0.025em]">
              클래스 검색하기
            </span>
            <div className="w-[30px] h-[30px] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="7.37" cy="7.37" r="6.37" stroke="#545454" strokeWidth="2"/>
                <path d="M12.63 12.63L19 19" stroke="#545454" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
          </button>
        </div>

        {/* 클래스 개설 & 클래스 요청 버튼 */}
        <div className="px-8 mb-[21px]">
          <div className="flex gap-[25px]">
            {/* 클래스 개설 버튼 */}
            <button
              onClick={handleCreateClass}
              className="flex-1 min-w-[152px] bg-[#009DFF] rounded-[20px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] flex items-center justify-center hover:shadow-lg transition-shadow pt-[11px] pb-[10px] pl-[44px] pr-[45px]"
            >
              <span className="text-[#FDFDFD] text-[14px] font-semibold leading-[120%] tracking-[-0.025em] whitespace-nowrap">
                클래스 개설
              </span>
            </button>

            {/* 클래스 요청 버튼 */}
            <button
              onClick={handleRequestClass}
              className="flex-1 min-w-[152px] bg-[#009DFF] rounded-[20px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] flex items-center justify-center hover:shadow-lg transition-shadow pt-[11px] pb-[10px] pl-[44px] pr-[45px]"
            >
              <span className="text-[#FDFDFD] text-[14px] font-semibold leading-[120%] tracking-[-0.025em] whitespace-nowrap">
                클래스 요청
              </span>
            </button>
          </div>
        </div>

        {/* 인기 수업 안내 텍스트 */}
        <div className="px-8 text-center mb-[18px]">
          <p className="text-[#111111] text-[18px] font-medium leading-[120%] tracking-[-0.025em] text-center">
            현재 성북구에서 제일 인기있는 수업은?
          </p>
        </div>

        {/* 쉬운 버전용 클래스 카드들 */}
        <div>
          <div className="space-y-[19px] flex flex-col items-center">
            {sampleClasses.map((classItem) => (
              <EasyClassCard
                key={classItem.id}
                title={classItem.title}
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