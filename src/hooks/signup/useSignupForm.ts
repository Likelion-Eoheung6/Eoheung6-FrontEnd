import { useState, useEffect, useCallback } from 'react';
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
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    verificationCode: ''
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
  const handleInputChange = useCallback((field: keyof SignupFormData, value: string) => {
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
  }, []);

  // 에러 메시지 설정
  const setErrorMessage = useCallback((field: keyof SignupErrorMessages, message: string) => {
    setErrorMessages(prev => ({
      ...prev,
      [field]: message
    }));
  }, []);

  // 에러 메시지 제거
  const clearErrorMessage = useCallback((field: keyof SignupErrorMessages) => {
    setErrorMessages(prev => ({
      ...prev,
      [field]: ''
    }));
  }, []);

  // 회원가입 상태 업데이트
  const updateSignupState = useCallback((updates: Partial<SignupState>) => {
    setSignupState(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  // 비밀번호 확인 에러 자동 설정
  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('confirmPassword', '비밀번호가 일치하지 않습니다.');
      } else {
        clearErrorMessage('confirmPassword');
      }
    }
  }, [formData.password, formData.confirmPassword, setErrorMessage, clearErrorMessage]);

  // 폼 유효성 검사
  const formValidation = validateForm(formData, errorMessages, signupState);

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
