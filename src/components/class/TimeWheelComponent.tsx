import React, { useState } from 'react';
import { WheelPicker } from './WheelPickerComponent';

export default function TimeWheelComponent() {
  const hourItems = Array.from({ length: 24 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }));
  const minuteItems = Array.from({ length: 60 }, (_, i) => ({
    value: `${String(i).padStart(2, '0')}`,
    label: String(i).padStart(2, '0'),
  }));

  const [hour, setHour] = useState(hourItems[5].value);
  const [minute, setMinute] = useState(minuteItems[2].value);

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
