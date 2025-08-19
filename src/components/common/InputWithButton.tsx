import React from 'react';

interface InputWithButtonProps {
  type?: 'text' | 'tel' | 'password';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  buttonText: string;
  onButtonClick?: () => void;
  buttonPadding?: string;
  inputClassName?: string;
  buttonClassName?: string;
  disabled?: boolean;
  buttonDisabled?: boolean; // 버튼만 비활성화
  children?: React.ReactNode; // 타이머 등 추가 요소를 위한 children
  isValid?: boolean; // 유효성 검사 결과
  inputPattern?: string; // 입력 패턴 (정규식)
}

const InputWithButton: React.FC<InputWithButtonProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  buttonText,
  onButtonClick,
  buttonPadding = 'px-[14px] py-[9px]',
  inputClassName = '',
  buttonClassName = '',
  disabled = false,
  buttonDisabled = false,
  children,
  isValid = false,
  inputPattern
}) => {
  return (
    <div className="flex gap-[5px]">
      <div className="relative flex-1">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            if (inputPattern) {
              const regex = new RegExp(inputPattern);
              // 하이픈이 두 개 연속으로 있는지 확인
              const hasConsecutiveHyphens = e.target.value.includes('--');
              if ((regex.test(e.target.value) || e.target.value === '') && !hasConsecutiveHyphens) {
                onChange(e.target.value);
              }
            } else {
              onChange(e.target.value);
            }
          }}
          className={`w-full h-[34px] bg-[#FDFDFD] border border-[#E0E0E0] rounded-[20px] px-[10px] text-[14px] font-normal leading-[120%] tracking-[-0.025em] text-[#545454] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] placeholder:text-[#B3B3B3] ${inputClassName}`}
        />
        {children}
      </div>
      <button 
        onClick={onButtonClick}
        disabled={disabled || buttonDisabled}
        className={`${isValid && !buttonDisabled ? 'bg-[#009DFF]' : 'bg-[#B3B3B3]'} text-[#FDFDFD] text-[14px] font-medium leading-[120%] tracking-[-0.025em] ${buttonPadding} rounded-[20px] whitespace-nowrap ${buttonClassName}`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default InputWithButton;
