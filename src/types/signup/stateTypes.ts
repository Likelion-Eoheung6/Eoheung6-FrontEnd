// 회원가입 상태 타입
export interface SignupState {
  // 아이디 중복체크 상태
  isIdChecked: boolean;
  isIdAvailable: boolean;
  
  // 휴대폰 인증 상태
  isCodeVerified: boolean;
  
  // 카운트다운 상태
  countdown: number;
  isCountdownActive: boolean;
  
  // 로딩 상태
  isLoading: boolean;
}

// 유효성 검사 결과 타입
export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

// 폼 유효성 검사 타입
export interface FormValidation {
  isFormValid: boolean;
  hasErrors: boolean;
  canSubmit: boolean;
}
