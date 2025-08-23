import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import downIcon from '../../assets/mypage/down.svg';
import upIcon from '../../assets/mypage/up.svg';
import notIcon from '../../assets/common/not-icon.svg';
import ActivityClassCard from './ActivityClassCard';

interface ClassData {
  id: string;
  title: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  imageUrl: string;
}

interface ActivitySectionHeaderProps {
  title: string;
  classes?: ClassData[];
  onToggle?: (isExpanded: boolean) => void;
  isLoading?: boolean;
  error?: string | null;
}

export default function ActivitySectionHeader({ 
  title, 
  classes = [], 
  onToggle,
  isLoading = false,
  error = null
}: ActivitySectionHeaderProps) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onToggle?.(newExpanded);
  };

  // 섹션별 버튼 텍스트 설정
  const getButtonText = () => {
    switch (title) {
      case '예약한 클래스':
        return '취소하기';
      case '개설한 클래스':
        return '취소하기';
      case '수강한 클래스':
        return '리뷰 남기기 >';
      default:
        return '상세보기';
    }
  };

  const handleButtonClick = (classId: string) => {
    console.log(`${title} 버튼 클릭:`, classId);
    
    // 수강한 클래스의 리뷰 남기기 버튼 클릭 시 리뷰 페이지로 이동
    if (title === '수강한 클래스') {
      navigate('/review');
    }
  };

  // 섹션별 빈 상태 메시지
  const getEmptyMessage = () => {
    switch (title) {
      case '예약한 클래스':
        return '앗! 예약한 클래스가 없어요.';
      case '개설한 클래스':
        return '앗! 개설한 클래스가 없어요.';
      case '수강한 클래스':
        return '앗! 수강한 클래스가 없어요.';
      default:
        return '앗! 클래스가 없어요.';
    }
  };

  return (
    <div className="relative">
      <div 
        className="w-full h-[34px] bg-[#FDFDFD] rounded-[20px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] flex items-center justify-between px-[14px] cursor-pointer"
        onClick={toggleExpanded}
      >
        <span className="text-[#111111] text-[14px] font-medium leading-[120%] tracking-[-0.025em]">
          {title}
        </span>
        <div className="flex items-center justify-center">
          <img 
            src={isExpanded ? upIcon : downIcon} 
            alt="화살표" 
            className="w-[30px] h-[30px]" 
          />
        </div>
      </div>
      
      {/* 토글 시 클래스 카드들 또는 빈 상태 */}
      {isExpanded && (
        <div className="mt-[10px] max-h-[280px] overflow-y-auto absolute w-full h-[298px] bg-[#FAFAFA] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] rounded-[20px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-[#545454] text-[14px] font-normal leading-[120%] tracking-[-0.025em] text-center">
                데이터를 불러오는 중...
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-[#545454] text-[14px] font-normal leading-[120%] tracking-[-0.025em] text-center">
                {error}
              </div>
            </div>
          ) : classes.length > 0 ? (
            <div className="space-y-[10px] pl-[5px] pr-[13px] py-[10px]">
              {classes.map((classItem) => (
                <ActivityClassCard
                  key={classItem.id}
                  title={classItem.title}
                  location={classItem.location}
                  maxParticipants={classItem.maxParticipants}
                  currentParticipants={classItem.currentParticipants}
                  price={classItem.price}
                  buttonText={getButtonText()}
                  imageUrl={classItem.imageUrl}
                  onButtonClick={() => handleButtonClick(classItem.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <img 
                src={notIcon} 
                alt="빈 상태 아이콘" 
                className="w-[80px] h-[126px] mb-[20px]" 
              />
              <div className="text-[#545454] text-[18px] font-medium leading-[120%] tracking-[-0.025em] text-center">
                {getEmptyMessage()}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* 박스가 열렸을 때 추가 공간 확보 */}
      {isExpanded && <div className="h-[298px]"></div>}
    </div>
  );
}
