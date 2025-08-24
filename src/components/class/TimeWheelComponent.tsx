import React, { useEffect, useState } from 'react';
import { WheelPicker } from './WheelPickerComponent';

interface TimeWheelProps {
  value: string;
  onChange: (newTime: string) => void;
}

export default function TimeWheelComponent({
  value,
  onChange,
}: TimeWheelProps) {
  const hourItems = Array.from({ length: 24 }, (_, i) => ({
    value: i,
    label: `${String(i).padStart(2, '0')}`,
  }));
  const minuteItems = Array.from({ length: 12 }, (_, i) => {
    const minuteValue = i * 5;
    return {
      value: `${String(minuteValue).padStart(2, '0')}`,
      label: String(minuteValue).padStart(2, '0'),
    };
  });

  // 1. 부모로부터 받은 value prop ('00:00')을 ':' 기준으로 분리합니다.
  const initialTimeParts = value.split(':');
  const initialHour = parseInt(initialTimeParts[0], 10);
  const initialMinute = initialTimeParts[1];

  // 2. 분리한 값으로 hour와 minute 상태를 초기화합니다.
  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);

  // 3. 내부 상태가 변경될 때만 부모에게 알립니다.
  useEffect(() => {
    const newTime = `${String(hour).padStart(2, '0')}:${minute}`;
    // 현재 prop 값과 다를 때만 onChange를 호출하여 불필요한 리렌더링을 방지합니다.
    if (newTime !== value) {
      onChange(newTime);
    }
  }, [hour, minute]); // 의존성 배열에서 value와 onChange를 제거하여 내부 상태 변경에만 반응하도록 합니다.

  // 4. 부모의 value prop이 변경될 때 내부 상태를 동기화합니다. (선택적이지만 좋은 습관)
  useEffect(() => {
    const timeParts = value.split(':');
    const newHour = parseInt(timeParts[0], 10);
    const newMinute = timeParts[1];

    if (newHour !== hour) setHour(newHour);
    if (newMinute !== minute) setMinute(newMinute);
  }, [value]);
  return (
    <div className="w-[100%] flex-1 justify-center ">
      <WheelPicker
        hourItems={hourItems}
        hourValue={hour}
        onHourChange={setHour}
        minuteItems={minuteItems}
        minuteValue={minute}
        onMinuteChange={setMinute}
      />
    </div>
  );
}
