import LocationIcon from '../../assets/class/location.svg';
import QestionIcon from '../../assets/class/question.svg';
import CharacterBlue from '../../assets/class/character-blue.svg';
import CharacterYellow from '../../assets/class/character-yellow.svg';
import MoneyIcon from '../../assets/class/money.svg';
import PeopleIcon from '../../assets/class/people.svg';
import TimeIcon from '../../assets/class/time.svg';
import PlusIcon from '../../assets/class/plus.svg';
import MinusIcon from '../../assets/class/minus.svg';

export default function SelectClassPlaceComponent() {
  return (
    <div className="w-full rounded-[1.25rem] box-border p-[12px] shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-[30px]">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-[5px]">
          <span className="flex items-center gap-[6px] w-fit px-[14px] py-[6px] text-[12px] rounded-full bg-[#009DFF] text-[white] font-semibold">
            <img src={LocationIcon} alt="위치" className="h-4 w-4" />
            클래스 장소
          </span>
          <img src={QestionIcon} alt="도움말" className="h-5 w-5" />
        </div>

        <div className="flex justify-between items-center rounded-[1rem] border border-[#E0E0E0] bg-[#FAFAFA] pt-[22px] pb-[22px]">
          <div className="flex flex-col items-center flex-1">
            <img
              src={CharacterBlue}
              alt="내 장소"
              className="mb-[25px] w-16 h-16 "
            />
            <button className="bg-[#009DFF] text-[white] text-[16px] font-semibold px-[14px] py-[8px] rounded-full border-none outline-none">
              내 장소
            </button>
          </div>
          <div className="w-px bg-[#E0E0E0] mx-6 self-stretch" />
          <div className="flex flex-col items-center flex-1">
            <div className="relative mb-2">
              <img
                src={CharacterYellow}
                alt="빈집 대여하기"
                className="mb-[25px] w-16 h-16"
              />
            </div>
            <button className="bg-[#009DFF] text-[white] text-[16px] font-semibold px-[14px] py-[8px] rounded-full border-none outline-none">
              빈집 대여하기
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
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
              <span className="text-[14px] font-semibold text-[#5A4B45]">
                원
              </span>
            </div>
          </div>

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
              <button
                // onClick={() => setCapacity(Math.max(0, capacity - 1))}
                className="p-0 bg-transparent border-none"
              >
                <img src={MinusIcon} alt="마이너스" className="w-6 h-6" />
              </button>
              <span className="text-[14px] text-[#5A4B45]">{}</span>
              <button
                // onClick={() => setCapacity(capacity + 1)}
                className="p-0 bg-transparent border-none"
              >
                <img src={PlusIcon} alt="플러스" className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="flex items-center w-full rounded-[1.25rem] bg-[#FAFAFA] px-[14px] py-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-[8px] border-r border-[#C0B6B0] pr-[14px]">
              <img
                src={TimeIcon}
                alt="시간"
                className="w-5 h-5 text-[#5A4B45]"
              />
              <span className="text-[14px] font-semibold text-[#5A4B45] whitespace-nowrap">
                클래스 시간
              </span>
            </div>
            <div
              className="flex flex-1 items-center justify-center gap-[6px] pl-[14px] cursor-pointer"
              // onClick={handleTogglePicker}
            >
              <input
                type="text"
                // value={startTime}
                readOnly
                className="w-12 bg-transparent text-[#5A4B45] outline-none border-none focus:outline-none focus:ring-0 text-center"
              />
              <span className="text-[#B3B3B3]">~</span>
              <input
                type="text"
                // value={endTime}
                readOnly
                className="w-12 bg-transparent text-[#5A4B45] outline-none border-none focus:outline-none focus:ring-0 text-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
