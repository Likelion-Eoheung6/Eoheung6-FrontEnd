import React from 'react';
import MoneyIcon from '../../assets/class/money.svg';

interface PriceComponentProps {
  price: number;
  onPriceChange?: (newPrice: number) => void;
  disabled?: boolean; // Optional disabled prop
}

export default function PriceComponent({
  price,
  onPriceChange,
  disabled = false,
}: PriceComponentProps) {
  const formatPrice = (value: number) => {
    return value.toLocaleString();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const numberValue = parseInt(value, 10);
    if (!isNaN(numberValue)) {
      onPriceChange?.(numberValue);
    } else if (value === '') {
      onPriceChange?.(0);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-[1.25rem] bg-[#FDFDFD] px-[14px] py-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-[8px]">
        <img src={MoneyIcon} alt="결제금액" className="w-[20px] h-[20px]" />
        <span className="text-[12px] font-semibold text-[#5A4B45]">
          결제 금액
        </span>
        <span className="text-[12px] text-[#B3B3B3]">| 1인당</span>
      </div>
      <div className="flex items-center gap-[2px]">
        <input
          type="text"
          value={price === 0 ? '' : formatPrice(price)}
          onChange={handleChange}
          placeholder="0"
          disabled={disabled}
          className={`
            w-[70px] bg-transparent text-right outline-none border-none
            placeholder:text-[#D0D0D0]
            ${disabled ? 'text-[#5A4B45] cursor-not-allowed' : 'text-[#5A4B45]'}
          `}
        />
        <span
          className={`text-[14px] font-semibold ${
            disabled ? 'text-[#5A4B45]' : 'text-[#5A4B45]'
          }`}
        >
          원
        </span>
      </div>
    </div>
  );
}
