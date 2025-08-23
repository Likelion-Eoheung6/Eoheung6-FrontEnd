import React, { useMemo, useCallback } from 'react';
import FormField from './FormField';
import InputWithButton from '../common/InputWithButton';
import timeIcon from '../../assets/signup/time.svg';
import cautionIcon from '../../assets/signup/caution.svg';
import { validatePhone, validateVerificationCode, formatPhoneInput } from '../../utils/signupValidation';
import type { SignupFormData, SignupErrorMessages } from '../../types/signup/formTypes';

interface PhoneVerificationSectionProps {
  formData: SignupFormData;
  errorMessages: SignupErrorMessages;
  isCountdownActive: boolean;
  formattedTime: string;
  isCodeVerified: boolean;
  isSendCodeLoading: boolean;
  isVerifyCodeLoading: boolean;
  onInputChange: (field: keyof SignupFormData, value: string) => void;
  onSendCode: () => void;
  onResetCode: () => void;
  onVerifyCode: () => void;
}

const PhoneVerificationSection: React.FC<PhoneVerificationSectionProps> = ({
  formData,
  errorMessages,
  isCountdownActive,
  formattedTime,
  isCodeVerified,
  isSendCodeLoading,
  isVerifyCodeLoading,
  onInputChange,
  onSendCode,
  onResetCode,
  onVerifyCode
}) => {
  const phoneValidation = useMemo(() => validatePhone(formData.phone), [formData.phone]);
  const verificationCodeValidation = useMemo(() => validateVerificationCode(formData.verificationCode), [formData.verificationCode]);

  return (
    <FormField 
      title="휴대폰 인증" 
      marginBottom="mb-[0px]"
      errorMessage={errorMessages.phone || errorMessages.verificationCode}
    >
      <div className="">
        <InputWithButton
          type="tel"
          placeholder="010-0000-0000"
          value={formData.phone}
          onChange={useCallback((value) => onInputChange('phone', formatPhoneInput(value)), [onInputChange])}
          buttonText={
            isSendCodeLoading 
              ? "요청 중..." 
              : isCountdownActive 
                ? "다시받기" 
                : "인증 요청"
          }
          buttonPadding={
            isSendCodeLoading 
              ? "px-[14px] py-[9px]" 
              : isCountdownActive 
                ? "px-[14px] py-[9px]" 
                : "px-[13px] py-[9px]"
          }
          inputPattern="^[0-9-]*$"
          isValid={phoneValidation.isValid}
          onButtonClick={useCallback(() => isCountdownActive ? onResetCode() : onSendCode(), [isCountdownActive, onResetCode, onSendCode])}
          buttonDisabled={!phoneValidation.isValid || isSendCodeLoading}
        />
        <div className="mt-[20px]">
          <InputWithButton
            type="text"
            placeholder="인증 번호를 입력해 주세요."
            value={formData.verificationCode}
            onChange={useCallback((value) => onInputChange('verificationCode', value), [onInputChange])}
            buttonText={isVerifyCodeLoading ? "확인 중..." : "인증"}
            buttonPadding={isVerifyCodeLoading ? "px-[20px] py-[9px]" : "px-[26px] py-[9px]"}
            inputPattern="^[0-9]*$"
            isValid={verificationCodeValidation.isValid}
            onButtonClick={useCallback(onVerifyCode, [onVerifyCode])}
            buttonDisabled={formData.verificationCode.length !== 6 || isVerifyCodeLoading}
          >
            <div className="absolute right-[10px] top-[7px] flex items-center gap-[1px]">
              <img src={timeIcon} alt="시간" className="w-[20px] h-[20px]" />
              <span className="text-[#545454] text-[14px] font-normal leading-[120%] tracking-[-0.025em]">
                {isCountdownActive ? formattedTime : '03:00'}
              </span>
            </div>
          </InputWithButton>
        </div>
        {isCodeVerified && (
          <p className="text-[#009DFF] text-[10px] mt-[2px] ml-[10px]">
            인증이 완료되었습니다.
          </p>
        )}
      </div>
      
      {/* 주의사항 */}
      <div className="mt-[25px] flex items-start gap-[15px] py-[10px] pl-[23px] pr-[21px] bg-[#FDFDFD] border border-[#E0E0E0] rounded-[20px]">
        <img src={cautionIcon} alt="주의사항" className="w-[30px] h-[30px] flex-shrink-0 mt-[18px]" />
        <div className="flex flex-col gap-[8px] text-[#545454] text-[12px] font-light leading-[120%] tracking-[-0.025em]">
          <p>{'>'} 인증번호가 일정 시간 내에 도착하지 않는 경우<br />다시 받기 버튼을 눌러 주세요.</p>
          <p>{'>'} 3분 이내에 인증번호를 입력해 주세요.</p>
          <p>{'>'} 입력시간 초과시 인증요청 버튼을 다시 눌러 주세요.</p>
        </div>
      </div>
    </FormField>
  );
};

export default PhoneVerificationSection;
