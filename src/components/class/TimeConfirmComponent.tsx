import React from 'react';
import TimeIcon from '../../assets/class/time.svg'; // Your icon path

interface TimeConfirmationProps {
  startTime: string;
  endTime: string;
  duration: string;
  onConfirm: () => void;
}

const TimeConfirmComponent: React.FC<TimeConfirmationProps> = ({
  startTime,
  endTime,
  duration,
  onConfirm,
}) => {
  return (
    <div className="flex max-w-[420px] items-center justify-between rounded-[1.3rem] border-[1px] border-[#009DFF] bg-white p-[12px] px-[23px] shadow-lg">
      <div className="flex items-center gap-[12px]r">
        <div className="flex flex-col justify-center items-center ">
          <div className="flex gap-[5px]">
            <img
              src={TimeIcon}
              alt="Time"
              className="h-[32px] w-[32px] flex-shrink-0"
            />
            <div className="flex flex-col justify-center items-center">
              <div className="text-[14px] font-semibold text-[#545454]">
                총 사용시간 | {duration}
              </div>
              <div className="text-[17px] font-bold text-[#545454]">
                {startTime} ~ {endTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onConfirm}
        className="flex-shrink-0 rounded-[9999px] bg-[#009DFF] px-[24px] py-[10px] text-[16px] font-bold text-[white] border-none"
      >
        확인
      </button>
    </div>
  );
};

export default TimeConfirmComponent;
