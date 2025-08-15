import React from 'react';
import MoneyIcon from '../../assets/class/money.svg';

export default function PriceComponent() {
  return (
    <div className="flex items-center justify-between rounded-[1.25rem] bg-[#FAFAFA] px-[14px] py-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-[8px]">
        <img
          src={MoneyIcon}
          alt="결제금액"
          className="w-5 h-5 text-[#5A4B45]"
        />
        <span className="text-[12px] font-semibold text-[#5A4B45]">
          결제 금액
        </span>
        <span className="text-[12px] text-[#B3B3B3]">| 1인당</span>
      </div>
      <div className="flex items-center gap-[2px]">
        <input
          type="text"
          placeholder="00,000"
          className="w-[70px] bg-transparent text-right placeholder:text-[#D0D0D0] text-[#5A4B45] outline-none border-none"
        />
        <span className="text-[14px] font-semibold text-[#5A4B45]">원</span>
      </div>
    </div>
  );
}
