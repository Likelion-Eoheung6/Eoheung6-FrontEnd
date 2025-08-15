import PeopleIcon from '../../assets/class/people.svg';
import PlusIcon from '../../assets/class/plus.svg';
import MinusIcon from '../../assets/class/minus.svg';

export default function CapacityComponent() {
  return (
    <div className="flex items-center rounded-[1.25rem] bg-[#FAFAFA] px-[14px] py-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-[8px] pr-[12px] border-r border-[#C0B6B0]">
        <img
          src={PeopleIcon}
          alt="모집 인원"
          className="w-5 h-5 text-[#5A4B45]"
        />
        <span className="text-[12px] font-semibold text-[#5A4B45]">
          모집 인원
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center gap-[12px]">
        {/* <button
          onClick={() => setCapacity(Math.max(0, capacity - 1))}
          className="p-0 bg-transparent border-none"
        >
          <img src={MinusIcon} alt="마이너스" className="w-6 h-6" />
        </button> */}
        <span className="text-[14px] text-[#5A4B45]">{0}</span>
        {/* <button
          onClick={() => setCapacity(capacity + 1)}
          className="p-0 bg-transparent border-none"
        >
          <img src={PlusIcon} alt="플러스" className="w-6 h-6" />
        </button> */}
      </div>
    </div>
  );
}
