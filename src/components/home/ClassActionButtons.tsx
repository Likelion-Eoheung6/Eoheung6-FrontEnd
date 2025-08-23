interface ClassActionButtonsProps {
  onCreateClass: () => void;
  onRequestClass: () => void;
  className?: string;
}

export default function ClassActionButtons({ 
  onCreateClass, 
  onRequestClass, 
  className = '' 
}: ClassActionButtonsProps) {
  return (
    <div className={`flex gap-[25px] ${className}`}>
      {/* 클래스 개설 버튼 */}
      <button
        onClick={onCreateClass}
        className="flex-1 bg-[#009DFF] rounded-[20px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] flex items-center justify-center hover:shadow-lg transition-shadow py-[11px] px-4 min-w-0"
      >
        <span className="text-[#FDFDFD] text-[14px] font-semibold leading-[120%] tracking-[-0.025em] text-center">
          클래스 개설
        </span>
      </button>

      {/* 클래스 요청 버튼 */}
      <button
        onClick={onRequestClass}
        className="flex-1 bg-[#009DFF] rounded-[20px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] flex items-center justify-center hover:shadow-lg transition-shadow py-[11px] px-4 min-w-0"
      >
        <span className="text-[#FDFDFD] text-[14px] font-semibold leading-[120%] tracking-[-0.025em] text-center">
          클래스 요청
        </span>
      </button>
    </div>
  );
}
