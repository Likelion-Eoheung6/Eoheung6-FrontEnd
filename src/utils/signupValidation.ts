import type { SignupFormData, SignupErrorMessages } from '../types/signup/formTypes';
import type { ValidationResult } from '../types/signup/stateTypes';

// 아이디 유효성 검사
export const validateUsername = (username: string): ValidationResult => {
  const usernameRegex = /^[a-z0-9]{4,12}$/;
  const isValid = usernameRegex.test(username);
  
  return {
    isValid,
    errorMessage: isValid ? undefined : '영문 소문자와 숫자의 조합으로 4~12자 이내로 입력해 주세요.'
  };
};

// 비밀번호 유효성 검사
export const validatePassword = (password: string): ValidationResult => {
  const passwordRegex = /^[a-z0-9]{4,12}$/;
  const isValid = passwordRegex.test(password);
  
  return {
    isValid,
    errorMessage: isValid ? undefined : '영문 소문자와 숫자의 조합으로 4~12자 이내로 입력해 주세요.'
  };
};

// 비밀번호 확인 유효성 검사
export const validateConfirmPassword = (password: string, confirmPassword: string): ValidationResult => {
  const isValid = password === confirmPassword && confirmPassword.length > 0;
  
  return {
    isValid,
    errorMessage: isValid ? undefined : '비밀번호가 일치하지 않습니다.'
  };
};

// 이메일 유효성 검사
export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);
  
  return {
    isValid,
    errorMessage: isValid ? undefined : '올바른 이메일 형식을 입력해 주세요.'
  };
};

// 휴대폰 번호 유효성 검사
export const validatePhone = (phone: string): ValidationResult => {
  const phoneRegex = /^010-\d{4}-\d{4}$/;
  const isValid = phoneRegex.test(phone);
  
  return {
    isValid,
    errorMessage: isValid ? undefined : '올바른 휴대폰 번호 형식을 입력해 주세요. (010-0000-0000)'
  };
};

// 인증번호 유효성 검사
export const validateVerificationCode = (code: string): ValidationResult => {
  const codeRegex = /^\d{6}$/;
  const isValid = codeRegex.test(code);
  
  return {
    isValid,
    errorMessage: isValid ? undefined : '6자리 숫자를 입력해 주세요.'
  };
};

// 전체 폼 유효성 검사
export const validateForm = (formData: SignupFormData, errorMessages: SignupErrorMessages) => {
  const isFormValid = !!(
    formData.username && 
    formData.password && 
    formData.confirmPassword && 
    formData.email && 
    formData.emailDomain && 
    formData.phone && 
    formData.verificationCode &&
    formData.password === formData.confirmPassword
  );

  const hasErrors = Object.values(errorMessages).some(error => error && error.trim() !== '');

  return {
    isFormValid,
    hasErrors,
    canSubmit: isFormValid && !hasErrors
  };
};

// 휴대폰 번호 입력 시 하이픈 자동 추가
export const formatPhoneInput = (value: string): string => {
  // 숫자만 추출
  const numbers = value.replace(/[^0-9]/g, '');
  
  // 11자리 제한
  const limitedNumbers = numbers.slice(0, 11);
  
  // 하이픈 추가
  if (limitedNumbers.length <= 3) {
    return limitedNumbers;
  } else if (limitedNumbers.length <= 7) {
    return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}`;
  } else {
    return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3, 7)}-${limitedNumbers.slice(7)}`;
  }
};

// 휴대폰 번호 API 형식 변환 (하이픈 제거)
export const formatPhoneForAPI = (phone: string): string => {
  return phone.replace(/-/g, '');
};

// 이메일 완성
export const formatEmail = (email: string, domain: string): string => {
  return `${email}@${domain}`;
};
