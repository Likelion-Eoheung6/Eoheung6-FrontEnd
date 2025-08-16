import { useState } from 'react';

interface CalendarProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
  variant?: 'selectionOnly' | 'availability';
  unavailableDates?: string[];
  disabled?: boolean;
}

const CalendarComponent: React.FC<CalendarProps> = ({
  selectedDate,
  onDateChange,
  variant = 'availability',
  unavailableDates = [],
  disabled = false,
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(
    selectedDate || new Date()
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth: Date[] = [];
  const startingDayOfWeek = firstDayOfMonth.getDay();
  for (let i = 0; i < startingDayOfWeek; i++) {
    daysInMonth.unshift(new Date(year, month, 0 - i));
  }
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    daysInMonth.push(new Date(year, month, i));
  }
  const endingDayOfWeek = lastDayOfMonth.getDay();
  for (let i = 1; i < 7 - endingDayOfWeek; i++) {
    daysInMonth.push(new Date(year, month + 1, i));
  }

  const handleDateClick = (day: Date) => {
    if (disabled) return; // 클래스 생성 첫화면은 터치 못하게

    const dateString = `${day.getFullYear()}-${String(
      day.getMonth() + 1
    ).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
    if (
      day.getMonth() === month &&
      (variant === 'selectionOnly' || !unavailableDates.includes(dateString))
    ) {
      onDateChange(day);
    }
  };

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
    return !!(
      date1 &&
      date2 &&
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <div className=" max-w-md bg-white  rounded-[16px] shadow-lg font-sans">
      <div className="flex justify-start items-center gap-[4px]">
        <button
          onClick={() => changeMonth(-1)}
          className="bg-transparent border-none text-[20px] text-gray-500 hover:text-gray-800"
        >
          &lt;
        </button>
        <h2 className="text-[14px] font-semibold text-[black] mr-[8px]">
          {`${year}년 ${month + 1}월`}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="bg-transparent border-none text-[20px] text-gray-500 hover:text-gray-800"
        >
          &gt;
        </button>
      </div>
      <div>
        <div className="grid grid-cols-7 divide-x-[1px] border-[1px] border-[#E0E0E0] divide-[#E0E0E0] rounded-t-[8px]">
          {['일', '월', '화', '수', '목', '금', '토'].map(day => (
            <div
              key={day}
              className="p-[13px] text-center font-medium text-[14px] text-[black]"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-[8px] border-x-[1px] border-b-[1px] border-[#E0E0E0] rounded-b-[8px] ">
          {daysInMonth.map((day, index) => {
            const dateString = `${day.getFullYear()}-${String(
              day.getMonth() + 1
            ).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
            const isCurrentMonth = day.getMonth() === month;
            const isSelected = isSameDay(day, selectedDate);
            const isUnavailable = unavailableDates.includes(dateString);

            const baseClasses =
              'flex items-center justify-center w-[40px] h-[40px] rounded-[9999px] cursor-pointer transition-colors mx-auto';
            let stateClasses = '';

            if (variant === 'selectionOnly') {
              if (!isCurrentMonth) {
                stateClasses = 'text-[#d1d5db] cursor-default';
              } else if (isSelected) {
                stateClasses = 'bg-[#fefcbf] text-[#b45309] font-[700]';
              } else {
                stateClasses = 'text-[#111111] hover:bg-[#f3f4f6]';
              }
            } else {
              if (!isCurrentMonth) {
                stateClasses = 'text-[#d1d5db] cursor-default';
              } else if (isSelected) {
                stateClasses =
                  'bg-[#FFEFA1]  border-[2px] border-[#FFD400] font-[500]';
              } else if (isUnavailable) {
                stateClasses = 'bg-[#FFCECE]  cursor-not-allowed';
              } else {
                stateClasses = 'bg-[#DEFFC9] text-[#15803d] hover:bg-[#bbf7d0]';
              }
            }

            return (
              <div
                key={index}
                className={`${baseClasses} ${stateClasses}`}
                onClick={() => handleDateClick(day)}
              >
                {day.getDate()}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
