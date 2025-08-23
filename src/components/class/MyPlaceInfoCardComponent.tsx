import React from 'react';
import SelectedRadioButtonIcon from '../../assets/class/radio-btn.svg';
import type { MyPlace } from '../../pages/Class/MyPlacePage';
import DeleteIcon from '../../assets/class/delete.svg';

interface MyPlaceInfoCardProps {
  place: MyPlace;
  isSelected: boolean;
  onSelect: (id: Number) => void;
  onDelete: (id: number) => void;
}

const MyPlaceInfoCardComponent: React.FC<MyPlaceInfoCardProps> = ({
  place,
  isSelected,
  onSelect,
  onDelete,
}) => {
  const { id, roadAddress, detailAddress, zipCode } = place;
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onDelete(id);
  };

  return (
    <div className="relative">
      <label
        htmlFor={id.toString()}
        className={`
        flex w-full max-w-[420px] items-center gap-[12px] rounded-[24px] bg-white p-[12px]
        border-[2px] transition-all duration-200 cursor-pointer
        ${
          isSelected
            ? 'border-[#0BF] shadow-[0_0_0_4px_rgba(0, 187, 255, 0.16)]'
            : 'border-transparent shadow-[0_4px_12px_rgba(0,0,0,0.05)]'
        }
      `}
      >
        <input
          type="radio"
          id={id.toString()}
          name="my-place-selection"
          checked={isSelected}
          onChange={() => onSelect(id)}
          className="sr-only"
        />

        <div className="flex flex-shrink-0 items-center gap-[8px]">
          {isSelected ? (
            <img
              src={SelectedRadioButtonIcon}
              alt="Selected"
              className="h-[24px] w-[24px]"
            />
          ) : (
            <div className="h-[24px] w-[24px] rounded-full border-[6px] border-[#ced4da] bg-white" />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-[8px] rounded-[1.3rem] border-[1px] border-[#e9ecef] bg-[white] py-[4px]">
          <div className="flex items-center justify-between  p-[8px] text-[12px] border-b-[1px] border-[#e9ecef]">
            <span className="w-[50px] flex-shrink-0 font-semibold text-[#868e96] border-r-[1px] border-[#e9ecef]">
              주소
            </span>
            <span className="truncate pl-[8px] text-right text-[#495057]">
              {roadAddress}
            </span>
          </div>
          <div className="flex items-center justify-between p-[8px] text-[12px] border-b-[1px] border-[#e9ecef]">
            <span className="w-[50px] flex-shrink-0 font-semibold text-[#868e96] border-r-[1px] border-[#e9ecef]">
              우편번호
            </span>
            <span className="pl-[8px] text-right text-[#495057]">
              {zipCode}
            </span>
          </div>
          <div className="flex items-center justify-between p-[8px] text-[12px]">
            <span className="w-[50px] flex-shrink-0 font-semibold text-[#868e96] border-r-[1px] border-[#e9ecef]">
              상세주소
            </span>
            <span className="pl-[8px] text-right text-[#495057]">
              {detailAddress}
            </span>
          </div>
        </div>
      </label>
      <button
        onClick={handleDeleteClick}
        className="absolute top-2 right-2 z-10 bg-white rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        aria-label="Delete place"
      >
        <img src={DeleteIcon} />
      </button>
    </div>
  );
};

export default MyPlaceInfoCardComponent;
