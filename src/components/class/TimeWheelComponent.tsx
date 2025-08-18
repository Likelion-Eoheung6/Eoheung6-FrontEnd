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

  const [hour, setHour] = useState(hourItems[5].value);
  const [minute, setMinute] = useState(minuteItems[2].value);

  useEffect(() => {
    const newTime = `${String(hour).padStart(2, '0')}:${minute}`;
    if (newTime !== value) {
      onChange(newTime);
    }
  }, [hour, minute, onChange, value]);

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
