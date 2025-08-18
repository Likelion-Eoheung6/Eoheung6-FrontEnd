import React from 'react';

interface InfoCardProps {
  label: string;
  value: string;
}

export default function InfoCard({ label, value }: InfoCardProps) {
  return (
    <div className="w-full h-[18px] bg-[#FDFDFD] border border-[#E0E0E0] rounded-[10px] flex items-center">
      <span className="text-[#545454] text-[8px] font-normal leading-[120%] tracking-[-0.025em] pl-[10px] pr-[3px]">
        {label} |
      </span>
      <span className="text-[#545454] text-[8px] font-normal leading-[120%] tracking-[-0.025em] truncate">
        {value}
      </span>
    </div>
  );
}
