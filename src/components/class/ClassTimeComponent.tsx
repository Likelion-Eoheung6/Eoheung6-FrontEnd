import React from 'react';
import TimeIcon from '../../assets/class/time.svg';

export default function ClassTimeComponent() {
  return (
    <div className="flex items-center bg-[#ffffff] rounded-[9999px] p-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-[8px]">
        <img src={TimeIcon} alt="결제금액" className="w-5 h-5 text-[#5A4B45]" />
        <span className="text-[12px] font-semibold text-[#5A4B45] whitespace-nowrap">
          클래스 시간
        </span>
      </div>
      <div className="h-[24px] w-[1px] bg-[#e0e0e0] mx-[16px]"></div>
      <div className="flex-1 text-center">
        <span className="text-[16px] text-[#b3b3b3] tracking-wider">
          00:00 ~ 00:00
        </span>
      </div>
    </div>

    // <div
    //   className="flex items-center bg-[#ffffff] rounded-[9999px] p-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
    //   onClick={onClickToggleModal}
    // >
    //   <div className="flex items-center gap-[8px]">
    //     <img src={TimeIcon} alt="결제금액" className="w-5 h-5 text-[#5A4B45]" />
    //     <span className="text-[12px] font-semibold text-[#5A4B45] whitespace-nowrap">
    //       클래스 시간
    //     </span>
    //   </div>
    //   <div className="h-[24px] w-[1px] bg-[#e0e0e0] mx-[16px]"></div>
    //   <div className="flex-1 text-center">
    //     <span className="text-[16px] text-[#b3b3b3] tracking-wider">
    //       {startTime} ~ {endTime}
    //     </span>
    //   </div>
    // </div>
  );
}
