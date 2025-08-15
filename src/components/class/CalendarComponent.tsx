import { useState } from 'react';

// Example list of unavailable dates
const unavailableDates = [
  '2025-08-04',
  '2025-08-05',
  '2025-08-06',
  '2025-08-07',
  '2025-08-13',
  '2025-08-14',
  '2025-08-25',
  '2025-08-26',
  '2025-08-27',
  '2025-08-31',
];

const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date('2025-08-15'));
  const [selectedDate, setSelectedDate] = useState(new Date('2025-08-20'));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = [];
  // Add days of the current month
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    daysInMonth.push(new Date(year, month, i));
  }

  // Add days from the previous month to fill the grid
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday
  for (let i = 0; i < startingDayOfWeek; i++) {
    const prevMonthDay = new Date(year, month, 0 - i);
    daysInMonth.unshift(prevMonthDay);
  }

  // Add days from the next month to fill the grid
  const endingDayOfWeek = lastDayOfMonth.getDay();
  for (let i = 1; i < 7 - endingDayOfWeek; i++) {
    const nextMonthDay = new Date(year, month + 1, i);
    daysInMonth.push(nextMonthDay);
  }

  const handleDateClick = day => {
    const dateString = `${day.getFullYear()}-${String(
      day.getMonth() + 1
    ).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
    if (day.getMonth() === month && !unavailableDates.includes(dateString)) {
      setSelectedDate(day);
    }
  };

  const changeMonth = offset => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  const isSameDay = (date1, date2) => {
    return (
      date1 &&
      date2 &&
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg font-sans">
      {/* 월 / 이동버튼 */}
      <div className="flex justify-start items-center gap-[4px] mb-6">
        <button
          onClick={() => changeMonth(-1)}
          className="bg-transparent border-none text-xl text-gray-500 hover:text-gray-800"
        >
          &lt;
        </button>
        <h2 className="text-[14px] font-semibold text-[black]">
          {`${year}년 ${month + 1}월`}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="bg-transparent border-none text-xl text-gray-500 hover:text-gray-800"
        >
          &gt;
        </button>
      </div>
      {/* 요일, 일 */}
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

        <div className="grid grid-cols-7 gap-y-[8px] border-x-[1px] border-b-[1px] border-[#E0E0E0] rounded-b-[8px] p-[12px]">
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

            if (!isCurrentMonth) {
              stateClasses = 'text-[#d1d5db] cursor-default'; // text-gray-300
            } else if (isSelected) {
              stateClasses =
                'bg-[#fefcbf] text-[#b45309] border-[2px] border-[#fcd34d] font-[700]';
            } else if (isUnavailable) {
              stateClasses =
                'bg-[#fee2e2] text-[#f87171] line-through cursor-not-allowed';
            } else {
              stateClasses = 'bg-[#dcfce7] text-[#15803d] hover:bg-[#bbf7d0]';
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
