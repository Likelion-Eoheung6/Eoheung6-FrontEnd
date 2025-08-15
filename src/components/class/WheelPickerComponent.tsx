import React, { useEffect, useMemo, useRef } from 'react';
import './style.css';

// Helper interface for items in the wheel
interface WheelItem<T> {
  value: T;
  label: string | number;
}

// Interface defining the props for our component (date and ampm removed)
interface WheelPickerProps {
  hourItems: WheelItem<number>[];
  hourValue: number;
  onHourChange: (newValue: number) => void;
  minuteItems: WheelItem<string>[];
  minuteValue: string;
  onMinuteChange: (newValue: string) => void;
  containerHeight?: number;
  itemHeight?: number;
}

const WheelPickerComponent = ({
  hourItems,
  hourValue,
  onHourChange,
  minuteItems,
  minuteValue,
  onMinuteChange,
  containerHeight = 210,
  itemHeight = 32,
}: WheelPickerProps) => {
  // --- Refs now have explicit types ---
  const hourItemsContRef = useRef<HTMLUListElement>(null);
  const minuteItemsContRef = useRef<HTMLUListElement>(null);
  const isScrolling = useRef<NodeJS.Timeout | null>(null);
  const hourRefs = useRef<(HTMLLIElement | null)[]>([]);
  const minuteRefs = useRef<(HTMLLIElement | null)[]>([]);

  // --- Maps and current value refs ---
  const hourItemsMap = useMemo(
    () =>
      hourItems.reduce(
        (map, item, index) => map.set(item.value, index),
        new Map<number, number>()
      ),
    [hourItems]
  );
  const currentHourValue = useRef(hourItemsMap.get(hourValue) ?? 0);

  const minuteItemsMap = useMemo(
    () =>
      minuteItems.reduce(
        (map, item, index) => map.set(item.value, index),
        new Map<string, number>()
      ),
    [minuteItems]
  );
  const currentMinuteValue = useRef(minuteItemsMap.get(minuteValue) ?? 0);

  // --- Calculation variables ---
  const visibleItemsCount = Math.floor(containerHeight / itemHeight);
  const offset = Math.round((visibleItemsCount - 1) / 2);
  const maxScrollOffset = (containerHeight - itemHeight) / 2;

  // --- Rerender functions for 3D effect (date and ampm versions removed) ---
  function rerenderHourElements(selectedElement: number, scrollTop: number) {
    const firstItemIndex = Math.max(selectedElement - offset - 2, 0);
    const lastItemIndex = Math.min(
      selectedElement + offset + 2,
      hourItems.length
    );

    hourRefs.current
      .slice(firstItemIndex, lastItemIndex)
      .forEach((item, index) => {
        if (!item) return;
        const realIndex = index + firstItemIndex;
        const scrollOffset = Math.abs(scrollTop - realIndex * itemHeight);
        const sin = Math.min(scrollOffset / maxScrollOffset, 1);
        const cos = Math.sqrt(1 - sin ** 2);
        const div = item.getElementsByTagName('div')[0];
        if (div) {
          div.style.transform = `rotateX(${Math.asin(sin)}rad) scale(${cos})`;
          div.style.transformOrigin = 'center';
        }
      });
  }

  function rerenderMinuteElements(selectedElement: number, scrollTop: number) {
    const firstItemIndex = Math.max(selectedElement - offset - 2, 0);
    const lastItemIndex = Math.min(
      selectedElement + offset + 2,
      minuteItems.length
    );

    minuteRefs.current
      .slice(firstItemIndex, lastItemIndex)
      .forEach((item, index) => {
        if (!item) return;
        const realIndex = index + firstItemIndex;
        const scrollOffset = Math.abs(scrollTop - realIndex * itemHeight);
        const sin = Math.min(scrollOffset / maxScrollOffset, 1);
        const cos = Math.sqrt(1 - sin ** 2);
        const div = item.getElementsByTagName('div')[0];
        if (div) {
          div.style.transform = `rotateX(${Math.asin(sin)}rad) scale(${cos})`;
          div.style.transformOrigin = 'left';
        }
      });
  }

  // --- useEffects for scroll handling (date and ampm versions removed) ---
  useEffect(() => {
    const scrollContainer = hourItemsContRef.current;
    if (!scrollContainer) return;

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const selectedIndex = Math.round(scrollTop / itemHeight);
      rerenderHourElements(selectedIndex, scrollTop);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (hourItems[selectedIndex]) {
          onHourChange(hourItems[selectedIndex].value);
        }
      }, 150);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    scrollContainer.scrollTop = currentHourValue.current * itemHeight;
    rerenderHourElements(currentHourValue.current, scrollContainer.scrollTop);

    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [hourItems, onHourChange, itemHeight]);

  useEffect(() => {
    const scrollContainer = minuteItemsContRef.current;
    if (!scrollContainer) return;

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const selectedIndex = Math.round(scrollTop / itemHeight);
      rerenderMinuteElements(selectedIndex, scrollTop);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (minuteItems[selectedIndex]) {
          onMinuteChange(minuteItems[selectedIndex].value);
        }
      }, 150);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    scrollContainer.scrollTop = currentMinuteValue.current * itemHeight;
    rerenderMinuteElements(
      currentMinuteValue.current,
      scrollContainer.scrollTop
    );

    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [minuteItems, onMinuteChange, itemHeight]);

  // --- useEffects for value changes (date and ampm versions removed) ---
  useEffect(() => {
    const index = hourItemsMap.get(hourValue);
    if (
      index !== undefined &&
      index !==
        Math.round((hourItemsContRef.current?.scrollTop || 0) / itemHeight)
    ) {
      hourItemsContRef.current?.scrollTo({
        top: index * itemHeight,
        behavior: 'smooth',
      });
    }
  }, [hourValue, hourItemsMap, itemHeight]);

  useEffect(() => {
    const index = minuteItemsMap.get(minuteValue);
    if (
      index !== undefined &&
      index !==
        Math.round((minuteItemsContRef.current?.scrollTop || 0) / itemHeight)
    ) {
      minuteItemsContRef.current?.scrollTo({
        top: index * itemHeight,
        behavior: 'smooth',
      });
    }
  }, [minuteValue, minuteItemsMap, itemHeight]);

  // --- JSX rendering (date and ampm versions removed) ---
  return (
    <div className="container" style={{ height: `${containerHeight}px` }}>
      <ul className="items hour-items" ref={hourItemsContRef}>
        {Array.from({ length: offset }).map((_, i) => (
          <li
            key={`start-${i}`}
            className="item"
            style={{ height: `${itemHeight}px` }}
          />
        ))}
        {hourItems.map((item, index) => (
          <li
            key={item.value}
            ref={node => (hourRefs.current[index] = node)}
            className="item"
            style={{ height: `${itemHeight}px`, lineHeight: `${itemHeight}px` }}
          >
            <div>{item.label}</div>
          </li>
        ))}
        {Array.from({ length: offset }).map((_, i) => (
          <li
            key={`end-${i}`}
            className="item"
            style={{ height: `${itemHeight}px` }}
          />
        ))}
      </ul>
      <ul className="items minute-items" ref={minuteItemsContRef}>
        {Array.from({ length: offset }).map((_, i) => (
          <li
            key={`start-${i}`}
            className="item"
            style={{ height: `${itemHeight}px` }}
          />
        ))}
        {minuteItems.map((item, index) => (
          <li
            key={item.value}
            ref={node => (minuteRefs.current[index] = node)}
            className="item"
            style={{ height: `${itemHeight}px`, lineHeight: `${itemHeight}px` }}
          >
            <div>{item.label}</div>
          </li>
        ))}
        {Array.from({ length: offset }).map((_, i) => (
          <li
            key={`end-${i}`}
            className="item"
            style={{ height: `${itemHeight}px` }}
          />
        ))}
      </ul>
    </div>
  );
};

export const WheelPicker = React.memo(WheelPickerComponent);
