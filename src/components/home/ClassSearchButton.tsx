interface ClassSearchButtonProps {
  onClick: () => void;
  className?: string;
}

export default function ClassSearchButton({ onClick, className = '' }: ClassSearchButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full h-[38px] bg-[#FDFDFD] rounded-[20px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] flex items-center justify-between pl-[14px] pr-[10px] border border-[#E5E5E5] hover:shadow-lg transition-shadow ${className}`}
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
  );
}
