import { useState, useEffect } from 'react';
import type { SignupFormData, SignupErrorMessages } from '../../types/signup/formTypes';
import type { SignupState } from '../../types/signup/stateTypes';
import { validateForm } from '../../utils/signupValidation';

export const useSignupForm = () => {
  // 폼 데이터 상태
  const [formData, setFormData] = useState<SignupFormData>({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    emailDomain: '',
    phone: '',
    verificationCode: ''
  });

  // 에러 메시지 상태
  const [errorMessages, setErrorMessages] = useState<SignupErrorMessages>({
    username: ' ',
    password: ' ',
    confirmPassword: ' ',
    email: ' ',
    phone: ' ',
    verificationCode: ' '
  });

  // 회원가입 상태
  const [signupState, setSignupState] = useState<SignupState>({
    isIdChecked: false,
    isIdAvailable: false,
    isCodeVerified: false,
    countdown: 0,
    isCountdownActive: false,
    isLoading: false
  });

  // 입력 필드 변경 핸들러
  const handleInputChange = (field: keyof SignupFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 아이디가 변경되면 중복체크 상태 초기화
    if (field === 'username') {
      setSignupState(prev => ({
        ...prev,
        isIdChecked: false,
        isIdAvailable: false
      }));
      clearErrorMessage('username');
    }
    
    // 휴대폰 번호가 변경되면 인증 상태 초기화
    if (field === 'phone') {
      setSignupState(prev => ({
        ...prev,
        isCodeVerified: false
      }));
      clearErrorMessage('verificationCode');
    }
  };

  // 에러 메시지 설정
  const setErrorMessage = (field: keyof SignupErrorMessages, message: string) => {
    setErrorMessages(prev => ({
      ...prev,
      [field]: message
    }));
  };

  // 에러 메시지 제거
  const clearErrorMessage = (field: keyof SignupErrorMessages) => {
    setErrorMessages(prev => ({
      ...prev,
      [field]: ' '
    }));
  };

  // 회원가입 상태 업데이트
  const updateSignupState = (updates: Partial<SignupState>) => {
    setSignupState(prev => ({
      ...prev,
      ...updates
    }));
  };

  // 폼 유효성 검사
  const formValidation = validateForm(formData, errorMessages);

  return {
    formData,
    errorMessages,
    signupState,
    formValidation,
    handleInputChange,
    setErrorMessage,
    clearErrorMessage,
    updateSignupState
  };
};
