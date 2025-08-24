import React from 'react';
import FormField from './FormField';
import InputWithButton from '../common/InputWithButton';
import { validateUsername } from '../../utils/signupValidation';
import type { SignupFormData, SignupErrorMessages } from '../../types/signup/formTypes';

interface UsernameSectionProps {
  formData: SignupFormData;
  errorMessages: SignupErrorMessages;
  isIdChecked: boolean;
  isIdAvailable: boolean;
  isCheckIdLoading: boolean;
  onInputChange: (field: keyof SignupFormData, value: string) => void;
  onCheckId: () => void;
}

const UsernameSection: React.FC<UsernameSectionProps> = ({
  formData,
  errorMessages,
  isIdChecked,
  isIdAvailable,
  isCheckIdLoading,
  onInputChange,
  onCheckId
}) => {
  const usernameValidation = validateUsername(formData.username);
  
  // 성공메시지 생성
  const successMessage = isIdChecked && isIdAvailable ? "사용할 수 있는 아이디입니다." : "";

  return (
    <FormField 
      title="아이디" 
      description="영문 소문자와 숫자의 조합으로 4~12자 이내로 입력해 주세요."
      marginBottom="mb-[16px]"
      errorMessage={errorMessages.username}
      successMessage={successMessage}
    >
      <InputWithButton
        type="text"
        placeholder="아이디를 입력해 주세요."
        value={formData.username}
        onChange={(value) => onInputChange('username', value)}
        buttonText={isCheckIdLoading ? "확인 중..." : "중복확인"}
        buttonPadding={isCheckIdLoading ? "px-[14px] py-[9px]" : "px-[13px] py-[9px]"}
        inputClassName="text-[#545454]"
        isValid={usernameValidation.isValid}
        onButtonClick={onCheckId}
        buttonDisabled={!usernameValidation.isValid || isCheckIdLoading}
      />
    </FormField>
  );
};

export default UsernameSection;
