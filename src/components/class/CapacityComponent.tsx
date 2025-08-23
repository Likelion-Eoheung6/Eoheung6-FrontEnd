import PeopleIcon from '../../assets/class/people.svg';
import PlusIcon from '../../assets/class/plus.svg';
import MinusIcon from '../../assets/class/minus.svg';
import MinusBoldIcon from '../../assets/class/minus-bold.svg';

// Props 인터페이스 정의
interface CapacityComponentProps {
  capacity: number;
  onCapacityChange: (newCapacity: number) => void;
  disabled?: boolean;
}

export default function CapacityComponent({
  capacity,
  onCapacityChange,
  disabled = false,
}: CapacityComponentProps) {
  const handleDecrement = () => {
    onCapacityChange(Math.max(0, capacity - 1));
  };

  const handleIncrement = () => {
    onCapacityChange(capacity + 1);
  };

  // 비활성화 상태에 따른 스타일
  const disabledClasses = disabled ? 'cursor-not-allowed' : '';

  return (
    <div
      className={`flex items-center rounded-[1.25rem] bg-[#FDFDFD] px-[14px] py-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.04)] ${disabledClasses}`}
    >
      <div className="flex items-center gap-[8px] pr-[12px] border-r border-[#C0B6B0]">
        <img src={PeopleIcon} alt="모집 인원" className="w-[20px] h-[20px]" />
        <span className="text-[12px] font-semibold text-[#5A4B45]">
          모집 인원
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center gap-[12px]">
        <button
          onClick={handleDecrement}
          disabled={disabled}
          className="p-0 bg-transparent border-none"
        >
          {capacity > 0 ? (
            <img src={MinusBoldIcon} alt="마이너스" />
          ) : (
            <img src={MinusIcon} alt="마이너스" />
          )}
        </button>
        <span className="text-[14px] text-[#5A4B45] w-[20px] text-center">
          {capacity}
        </span>
        <button
          onClick={handleIncrement}
          disabled={disabled}
          className="p-0 bg-transparent border-none"
        >
          <img src={PlusIcon} alt="플러스" />
        </button>
      </div>
    </div>
  );
}
