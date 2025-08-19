// 회원가입 폼 데이터 타입
export interface SignupFormData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  emailDomain: string;
  phone: string;
  verificationCode: string;
}

// 에러 메시지 타입
export interface SignupErrorMessages {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone: string;
  verificationCode: string;
}

// 폼 필드 타입
export interface FormFieldProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  marginBottom?: string;
  errorMessage?: string;
}

// 입력 필드 타입
export interface InputFieldProps {
  type?: 'text' | 'tel' | 'password' | 'email';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  inputPattern?: string;
  disabled?: boolean;
}

// 버튼 필드 타입
export interface ButtonFieldProps {
  buttonText: string;
  onButtonClick: () => void;
  buttonPadding?: string;
  isValid?: boolean;
  disabled?: boolean;
  loading?: boolean;
}
