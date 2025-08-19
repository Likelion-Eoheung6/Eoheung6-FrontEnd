import React from 'react';
import FormField from './FormField';
import { validatePassword, validateConfirmPassword } from '../../utils/signupValidation';
import type { SignupFormData, SignupErrorMessages } from '../../types/signup/formTypes';

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
  const passwordValidation = validatePassword(formData.password);
  const confirmPasswordValidation = validateConfirmPassword(formData.password, formData.confirmPassword);

  return (
    <>
      {/* 비밀번호 */}
      <FormField 
        title="비밀번호" 
        description="영문 소문자와 숫자의 조합으로 4~12자 이내로 입력해 주세요."
        marginBottom="mb-[6px]"
        errorMessage={errorMessages.password}
      >
        <input
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          value={formData.password}
          onChange={(e) => onInputChange('password', e.target.value)}
          className="w-full h-[34px] bg-[#FDFDFD] border border-[#E0E0E0] rounded-[20px] px-[10px] text-[14px] font-normal leading-[120%] tracking-[-0.025em] text-[#545454] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)]"
        />
      </FormField>

      {/* 비밀번호 확인 */}
      <FormField 
        title="비밀번호 확인" 
        description="영문 소문자와 숫자의 조합으로 4~12자 이내로 입력해 주세요."
        marginBottom="mb-[16px]"
        errorMessage={errorMessages.confirmPassword}
      >
        <input
          type="password"
          placeholder="비밀번호를 다시 입력해 주세요."
          value={formData.confirmPassword}
          onChange={(e) => onInputChange('confirmPassword', e.target.value)}
          className={`w-full h-[34px] bg-[#FDFDFD] border rounded-[20px] px-[10px] text-[14px] font-normal leading-[120%] tracking-[-0.025em] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] ${
            formData.confirmPassword && !confirmPasswordValidation.isValid
              ? 'border-red-500 text-red-500'
              : 'border-[#E0E0E0] text-[#545454]'
          }`}
        />
        {formData.confirmPassword && !confirmPasswordValidation.isValid && (
          <p className="text-red-500 text-[10px] mt-[4px] ml-[10px]">
            비밀번호가 일치하지 않습니다.
          </p>
        )}
      </FormField>
    </>
  );
};

export default PasswordSection;
