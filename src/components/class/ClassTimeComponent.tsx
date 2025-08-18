import React, { useEffect, useState } from 'react';
import TimeIcon from '../../assets/class/time.svg';

// Props 인터페이스 정의
interface ClassTimeComponentProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (newTime: string) => void;
  onEndTimeChange: (newTime: string) => void;
  onClick?: () => void;
  disabled?: boolean;
}

export default function ClassTimeComponent({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  onClick,
  disabled = false,
}: ClassTimeComponentProps) {
  const [tempStartTime, setTempStartTime] = useState(startTime);
  const [tempEndTime, setTempEndTime] = useState(endTime);

  useEffect(() => {
    setTempStartTime(startTime);
    setTempEndTime(endTime);
  }, [startTime, endTime]);

  const handleConfirm = () => {
    onStartTimeChange(tempStartTime);
    onEndTimeChange(tempEndTime);
  };
  // 비활성화 상태에 따른 스타일
  const disabledClasses = disabled ? 'cursor-not-allowed' : 'cursor-pointer';

  return (
    <div
      className={`flex items-center bg-[#FDFDFD] rounded-[9999px] p-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${disabledClasses}`}
    >
      <div className="flex items-center gap-[8px]">
        <img
          src={TimeIcon}
          alt="클래스 시간"
          className="w-[20px] h-[20px] text-[#5A4B45]"
        />
        <span className="text-[12px] font-semibold text-[#5A4B45] whitespace-nowrap">
          클래스 시간
        </span>
      </div>
      <div className="h-[24px] w-[1px] bg-[#e0e0e0] mx-[16px]"></div>
      <div className="flex-1 text-center">
        <span className="text-[16px] text-[#b3b3b3] tracking-wider">
          {startTime} ~ {endTime}
        </span>
      </div>
      <button
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
        className={`
          flex-shrink-0 text-[white] bg-[#545454] text-[12px] font-bold 
          px-[7px] py-[5px] border-none rounded-[9999px] cursor-pointer
        `}
      >
        시간 등록
      </button>
    </div>
  );
}
