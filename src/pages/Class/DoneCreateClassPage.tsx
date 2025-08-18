import React from 'react';
import ClassContainer from '../../components/class/ClassContainer';
import ClassHeaderBar from '../../components/class/ClassHeaderBar';
import BodyContainer from '../../components/common/BodyContainer';
import PriceComponent from '../../components/class/PriceComponent';
import CapacityComponent from '../../components/class/CapacityComponent';
import ClassTimeComponent from '../../components/class/ClassTimeComponent';
import { useCreateClassStore } from '../../stores/useCreateClassStore';
import CalendarIcon from '../../assets/class/calendar.svg';
import ButtonComponent from '../../components/common/ButtonComponent';
import { useNavigate } from 'react-router-dom';

export default function DoneCreateClassPage() {
  const navigate = useNavigate();
  const { req, images, updateReq, setImages } = useCreateClassStore();

  return (
    <ClassContainer>
      <ClassHeaderBar title="클래스 개설 완료!" />
      <BodyContainer>
        {/* 추후에 버튼 위치 수정필요!!! */}
        <div className="flex flex-col gap-[10px] mt-4 mb-[20px]">
          <div className="w-full h-[225px] rounded-[16px] bg-[#b3b3b3]"></div>
          <div
            className={`w-full h-[50px] rounded-[1.25rem] box-border px-[12px] flex items-center shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] mb-[20px]`}
          >
            <div className="rounded-full bg-[white] border-[1px] border-[#E0E0E0] text-[#009DFF] text-[12px] font-semibold px-[14px] py-[6px] shadow mr-[5px]">
              클래스 제목
            </div>
            <input
              value={req.title}
              onChange={e => updateReq({ title: e.target.value })}
              className="flex-1 bg-transparent outline-none border-0 placeholder:text-[#B3B3B3] text-gray-500 px-1 py-2"
            />
          </div>

          <PriceComponent
            price={req.price}
            onPriceChange={newPrice => updateReq({ price: newPrice })}
            disabled={true}
          />
          <CapacityComponent
            capacity={req.capacity}
            onCapacityChange={newCapacity =>
              updateReq({ capacity: newCapacity })
            }
            disabled={true}
          />
          <div
            className={`flex items-center rounded-[1.25rem] bg-[#FDFDFD] px-[14px] py-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.04)]`}
          >
            <div className="flex items-center gap-[8px] pr-[12px] border-r border-[#C0B6B0]">
              <img
                src={CalendarIcon}
                alt="달력"
                className="w-[20px] h-[20px]"
              />
              <span className="text-[12px] font-semibold text-[#5A4B45]">
                클래스 날짜
              </span>
            </div>

            <div className="flex flex-1 items-center justify-center gap-[12px]">
              {req.openAt}
            </div>
          </div>

          <ClassTimeComponent
            startTime={req.startTime}
            endTime={req.endTime}
            onStartTimeChange={newTime => updateReq({ startTime: newTime })}
            onEndTimeChange={newTime => updateReq({ endTime: newTime })}
            disabled={true}
          />
        </div>
        <ButtonComponent text="홈으로 이동하기" onClick={() => navigate('/')} />
      </BodyContainer>
    </ClassContainer>
  );
}
