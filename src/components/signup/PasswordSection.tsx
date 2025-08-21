import React, { useState } from 'react';
import FormField from './FormField';
import { validatePassword, validateConfirmPassword } from '../../utils/signupValidation';
import type { SignupFormData, SignupErrorMessages } from '../../types/signup/formTypes';
import EyeOn from '../../assets/login/on.svg';
import EyeOff from '../../assets/login/off.svg';

interface PasswordSectionProps {
  formData: SignupFormData;
  errorMessages: SignupErrorMessages;
  onInputChange: (field: keyof SignupFormData, value: string) => void;
}

const PasswordSection: React.FC<PasswordSectionProps> = ({
  formData,
  errorMessages,
  onInputChange
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const passwordValidation = validatePassword(formData.password);
  const confirmPasswordValidation = validateConfirmPassword(formData.password, formData.confirmPassword);

  return (
    <>
      {/* 비밀번호 */}
      <FormField 
        title="비밀번호" 
        description="영문과 숫자의 조합으로 4~12자 이내로 입력해 주세요."
        marginBottom="mb-[6px]"
        errorMessage={errorMessages.password}
      >
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력해 주세요."
            value={formData.password}
            onChange={(e) => onInputChange('password', e.target.value)}
            className="w-full h-[34px] bg-[#FDFDFD] border border-[#E0E0E0] rounded-[20px] px-[10px] text-[14px] font-normal leading-[120%] tracking-[-0.025em] text-[#545454] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)]"
            autoComplete="new-password"
          />
          <button
            type="button"
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-[13px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] p-0 m-0 border-0 outline-none focus:outline-none ring-0 bg-transparent hover:bg-transparent active:bg-transparent flex items-center justify-center"
          >
            <img src={showPassword ? EyeOn : EyeOff} alt="toggle-password" className="w-[18px] h-[12px]" />
          </button>
        </div>
      </FormField>

      {/* 비밀번호 확인 */}
      <FormField 
        title="비밀번호 확인" 
        description="영문과 숫자의 조합으로 4~12자 이내로 입력해 주세요."
        marginBottom="mb-[16px]"
        errorMessage={errorMessages.confirmPassword}
      >
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="비밀번호를 다시 입력해 주세요."
            value={formData.confirmPassword}
            onChange={(e) => onInputChange('confirmPassword', e.target.value)}
            className={`w-full h-[34px] bg-[#FDFDFD] border rounded-[20px] px-[10px] text-[14px] font-normal leading-[120%] tracking-[-0.025em] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] ${
              formData.confirmPassword && !confirmPasswordValidation.isValid
                ? 'border-[#FF0000] text-[#FF0000]'
                : 'border-[#E0E0E0] text-[#545454]'
            }`}
            autoComplete="new-password"
          />
          <button
            type="button"
            aria-label={showConfirmPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-[13px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] p-0 m-0 border-0 outline-none focus:outline-none ring-0 bg-transparent hover:bg-transparent active:bg-transparent flex items-center justify-center"
          >
            <img src={showConfirmPassword ? EyeOn : EyeOff} alt="toggle-password" className="w-[18px] h-[12px]" />
          </button>
        </div>
        {formData.confirmPassword && confirmPasswordValidation.isValid && (
          <p className="text-[#009DFF] text-[10px] mt-[4px] ml-[10px]">
            비밀번호가 일치합니다.
          </p>
        )}
      </FormField>
    </>
  );
};

export default PasswordSection;
