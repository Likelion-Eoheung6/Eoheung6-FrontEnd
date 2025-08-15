import placeIcon from '../../assets/common/place.svg';
import moneyIcon from '../../assets/common/money.svg';
import peopleIcon from '../../assets/common/people.svg';

type ClassCardProps = {
  title: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  tags: string[];
  isRecommended?: boolean;
  imageUrl?: string;
};

export default function ClassCard({
  title,
  location,
  maxParticipants,
  currentParticipants,
  price,
  tags,
  isRecommended = false,
  imageUrl
}: ClassCardProps) {
  return (
          <div className="rounded-[16px] bg-white pt-[12px] pr-[12px] pb-[12px] relative">
      <div className="flex gap-[5px]">
        <div className="w-[130px] h-[130px] bg-[#B3B3B3] rounded-[20px]">
          {imageUrl && <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded-[20px]" />}
        </div>
        <div className="flex-1">
          <div className="text-[#111111] text-[12px] font-medium leading-[120%] tracking-[-0.025em] mb-[4px] bg-[#FDFDFD] border border-[#E0E0E0] rounded-[10px] px-[8px] py-[4px] h-[24px] flex items-center justify-between">
            <span>{title}</span>
            {isRecommended && (
              <div className="bg-[#009DFF] text-[#FDFDFD] text-[10px] font-bold px-[2px] py-[2px] rounded-[6px] leading-[120%] tracking-[-0.025em]">
                추천!
              </div>
            )}
          </div>
          <div className="bg-[#FDFDFD] border-t border-l border-r border-b border-[#E0E0E0] rounded-[10px] pl-[5px] pt-[2px] space-y-[2px]">
            <div className="flex items-center gap-[4px] text-[10px] text-[#545454]">
              <span className="bg-[#FAFAFA] rounded flex items-center gap-[4px] justify-center text-[10px] font-medium leading-[120%] tracking-[-0.025em]">
                <img src={placeIcon} alt="장소" className="w-[20px] h-[20px] " />
                장소
              </span>
              <div className="w-[1px] h-[12px] bg-[#E0E0E0]"></div>
              <span className="text-[#111111] text-[10px] font-medium leading-[120%] tracking-[-0.025em]">{location}</span>
            </div>
            <div className="w-full h-[1px] bg-[#E0E0E0]"></div>
            <div className="flex items-center gap-[4px] text-[10px] text-[#545454]">
              <span className="bg-[#FAFAFA] rounded flex items-center justify-center">
                <img src={peopleIcon} alt="모집인원" className="w-[20px] h-[20px]" />
              </span>
              <span className="text-[10px] font-medium leading-[120%] tracking-[-0.025em]">모집 인원</span>
              <div className="w-[1px] h-[12px] bg-[#E0E0E0]"></div>
                             <span className="text-[#111111] text-[10px] font-medium leading-[120%] tracking-[-0.025em] pr-[24px]">{maxParticipants}명</span>
              <span className="text-[10px] font-medium leading-[120%] tracking-[-0.025em]">참여 인원</span>
              <div className="w-[1px] h-[12px] bg-[#E0E0E0]"></div>
                             <span className="text-[#111111] text-[10px] font-medium leading-[120%] tracking-[-0.025em]">{currentParticipants}명</span>
            </div>
            <div className="w-full h-[1px] bg-[#E0E0E0]"></div>
            <div className="flex items-center gap-[4px] text-[10px] text-[#545454]">
              <span className="bg-[#FAFAFA] rounded flex items-center justify-center">
                <img src={moneyIcon} alt="비용" className="w-[20px] h-[20px]" />
              </span>
              <span className="text-[10px] font-medium leading-[120%] tracking-[-0.025em]">비용</span>
              <div className="w-[1px] h-[12px] bg-[#E0E0E0]"></div>
                             <span className="text-[#111111] text-[10px] font-medium leading-[120%] tracking-[-0.025em]">인당 <span className="pl-[13px]">{price.toLocaleString()}원</span></span>
              <button className="ml-auto self-center bg-[#009DFF] text-[#FDFDFD] text-[10px] font-semibold px-[8px] py-[2px] rounded-[10px] leading-[120%] tracking-[-0.025em] mr-[4px]">
                  상세보기 &gt;
                </button>
            </div>
          </div>
          <div className="mt-[4px] flex gap-[8px]">
            {tags.map((tag, index) => (
              <span key={index} className="px-[8px] py-[8px] text-[10px] font-medium leading-[100%] tracking-[-0.025em] rounded-full bg-[#FAFAFA] text-[#545454] border border-[#E0E0E0]">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
