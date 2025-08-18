import React from 'react';

interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  radius?: string;
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function ButtonComponent({
  size = 'medium',
  radius = '9999px',
  text,
  isActive = true,
  onClick,
}: ButtonProps) {
  let sizeClasses = '';
  switch (size) {
    case 'small':
      sizeClasses = 'px-[16px] py-[8px] text-[14px]';
      break;
    case 'large':
      sizeClasses = 'px-[32px] py-[16px] text-[18px]';
      break;
    case 'medium':
    default:
      sizeClasses = 'px-[24px] py-[12px] text-[16px]';
      break;
  }

  const activeClasses = isActive
    ? 'bg-[#009DFF] text-[#ffffff] border-none'
    : 'bg-[#B3B3B3] text-[#ffffff] border-none';

  return (
    <button
      onClick={onClick}
      disabled={!isActive}
      className={`
        w-full font-bold transition-colors duration-200
        ${sizeClasses}
        ${activeClasses}
        rounded-[${radius}]

      `}
    >
      {text}
    </button>
  );
}
