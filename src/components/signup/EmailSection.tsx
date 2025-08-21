import React from 'react';
import FormField from './FormField';
import downIcon from '../../assets/signup/down.svg';
import type { SignupFormData, SignupErrorMessages } from '../../types/signup/formTypes';

interface EmailSectionProps {
  formData: SignupFormData;
  errorMessages: SignupErrorMessages;
  onInputChange: (field: keyof SignupFormData, value: string) => void;
}

const EmailSection: React.FC<EmailSectionProps> = ({
  formData,
  errorMessages,
  onInputChange
}) => {
  return (
    <FormField 
      title="이메일" 
      marginBottom="mb-[18px]"
      errorMessage={errorMessages.email}
    >
      <div className="flex gap-[8px]">
        <input
          type="text"
          placeholder="이메일을 입력해 주세요."
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          className="flex-1 h-[34px] bg-[#FDFDFD] border border-[#E0E0E0] rounded-[20px] px-[10px] text-[14px] font-normal leading-[120%] tracking-[-0.025em] text-[#545454] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)]"
        />
        <span className="text-[#545454] text-[14px] font-normal leading-[120%] tracking-[-0.025em] self-center">@</span>
        <div className="relative">
          <select
            value={formData.emailDomain}
            onChange={(e) => onInputChange('emailDomain', e.target.value)}
            className="w-[123px] h-[34px] bg-[#FAFAFA] border border-[#E0E0E0] rounded-[20px] px-[10px] text-[14px] font-normal leading-[120%] tracking-[-0.025em] text-[#545454] appearance-none cursor-pointer relative z-10"
          >
            <option value="">선택</option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="daum.net">daum.net</option>
            <option value="hanmail.net">hanmail.net</option>
          </select>
          <img src={downIcon} alt="아래 화살표" className="absolute right-[10px] top-[2px] w-[30px] h-[30px] pointer-events-none z-20" />
        </div>
      </div>
    </FormField>
  );
};

export default EmailSection;
