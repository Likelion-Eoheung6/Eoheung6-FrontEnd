import React from 'react';
import SelectedRadioButtonIcon from '../../assets/class/radio-btn.svg';

interface PlaceInfoCardProps {
  id: string;
  name: string;
  address: string;
  area: string;
  capacity: number;
  imageUrl?: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const PlaceInfoCardComponent: React.FC<PlaceInfoCardProps> = ({
  id,
  name,
  address,
  area,
  capacity,
  imageUrl,
  isSelected,
  onSelect,
}) => {
  return (
    <label
      htmlFor={id}
      className={`
        flex max-w-[420px] items-stretch gap-[12px] rounded-[24px] bg-white p-[12px]
        border-[2px] transition-all duration-200 cursor-pointer
        ${
          isSelected
            ? 'border-[#0BF] shadow-[0_0_0_4px_rgba(0,187,255,0.16)]'
            : 'border-transparent shadow-[0_4px_12px_rgba(0,0,0,0.05)]'
        }
      `}
    >
      <input
        type="radio"
        id={id}
        name={name}
        checked={isSelected}
        onChange={() => onSelect(id)}
        className="sr-only"
      />

      <div className="flex flex-shrink-0 items-center gap-[8px]">
        <div
          className={`
            flex h-[20px] w-[20px] items-center justify-center 
            ${
              isSelected
                ? ''
                : 'rounded-full border-[2px] transition-all border-[#E0E0E0] bg-[#E0E0E0]'
            }
          `}
        >
          {isSelected ? (
            <img src={SelectedRadioButtonIcon} alt="Selected" className="" />
          ) : (
            <div className="h-[10px] w-[10px] rounded-full bg-white"></div>
          )}
        </div>
        <div className="h-full w-[80px] rounded-[16px] bg-[#e9ecef]">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Place"
              className="h-full w-full object-cover rounded-[16px]"
            />
          )}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-[8px] py-[4px]">
        <div className="flex items-center justify-between rounded-[9999px] border-[1px] border-[#e9ecef] bg-white p-[4px] text-[8px]">
          <span className="flex-shrink-0 font-semibold text-[#868e96]">
            주소 |
          </span>
          <span className="truncate pl-[8px] text-right text-[#495057]">
            {address}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-[9999px] border-[1px] border-[#e9ecef] bg-white p-[4px] text-[8px]">
          <span className="flex-shrink-0 font-semibold text-[#868e96]">
            평수 |
          </span>
          <span className="pl-[8px] text-right text-[#495057]">{area}</span>
        </div>
        <div className="flex items-center justify-between rounded-[9999px] border-[1px] border-[#e9ecef] bg-white p-[4px] text-[8px]">
          <span className="flex-shrink-0 font-semibold text-[#868e96]">
            수용 인원 |
          </span>
          <span className="pl-[8px] text-right text-[#495057]">
            {capacity}명
          </span>
        </div>
      </div>
    </label>
  );
};

export default PlaceInfoCardComponent;
