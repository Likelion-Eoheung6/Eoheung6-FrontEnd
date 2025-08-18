import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/common/logo2.svg';
import backIcon from '../../assets/common/back.svg';
import timeIcon from '../../assets/signup/time.svg';
import downIcon from '../../assets/signup/down.svg';
import cautionIcon from '../../assets/signup/caution.svg';
import FormField from '../../components/signup/FormField';
import InputWithButton from '../../components/common/InputWithButton';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    emailDomain: '',
    phone: '',
    verificationCode: ''
  });

  const [errorMessages, setErrorMessages] = useState({
    username: ' ',
    password: ' ',
    confirmPassword: ' ',
    email: ' ',
    phone: ' ',
    verificationCode: ' '
  });

  const [countdown, setCountdown] = useState(0);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = () => {
    return formData.username && 
           formData.password && 
           formData.confirmPassword && 
           formData.email && 
           formData.emailDomain && 
           formData.phone && 
           formData.verificationCode &&
           formData.password === formData.confirmPassword;
  };

  const hasErrors = () => {
    return Object.values(errorMessages).some(error => error && error.trim() !== '');
  };

  const canSubmit = () => {
    return isFormValid() && !hasErrors();
  };

  const handleSubmit = () => {
    if (!canSubmit()) {
      return; // 조건이 만족되지 않으면 아무것도 하지 않음
    }
    
    // 가입 처리 로직
    console.log('가입 처리:', formData);
    // 여기에 실제 가입 API 호출 로직 추가
  };

  const isUsernameValid = () => {
    const usernameRegex = /^[a-z0-9]{4,12}$/;
    return usernameRegex.test(formData.username);
  };

  const isPhoneValid = () => {
    // 휴대폰 번호가 완벽한 형식(010-1234-5678)이고 에러가 없으면 유효
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    return phoneRegex.test(formData.phone) && !errorMessages.phone.trim();
  };

  const isVerificationCodeValid = () => {
    // 인증번호가 6자리 숫자이고 에러가 없으면 유효
    const codeRegex = /^\d{6}$/;
    return codeRegex.test(formData.verificationCode) && !errorMessages.verificationCode.trim();
  };

  const setErrorMessage = (field: string, message: string) => {
    setErrorMessages(prev => ({
      ...prev,
      [field]: message
    }));
  };

  const clearErrorMessage = (field: string) => {
    setErrorMessages(prev => ({
      ...prev,
      [field]: ''
    }));
  };

  const startCountdown = () => {
    setCountdown(180); // 3분 = 180초
    setIsCountdownActive(true);
  };

  const resetCountdown = () => {
    setCountdown(180); // 3분 = 180초
    setIsCountdownActive(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // 카운트다운 useEffect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isCountdownActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setIsCountdownActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isCountdownActive, countdown]);
  
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      {/* 헤더 */}
      <div className="flex items-center justify-center mb-4 relative">
        <img 
          src={backIcon} 
          alt="뒤로가기" 
          className="absolute left-[8px] w-[30px] h-[30px] cursor-pointer" 
          onClick={() => navigate('/login')}
        />
        <img src={logo} alt="로고" className="h-16" />
      </div>

      {/* 회원가입 폼 */}
      <div className="flex-1 px-[32px] pb-[30px]">
        <h1 className="text-[#111111] text-[16px] font-medium leading-[120%] tracking-[-0.025em] mb-[26px] text-center">
          회원가입
        </h1>

        {/* 아이디 */}
        <FormField 
          title="아이디" 
          description="영문 소문자와 숫자의 조합으로 4~12자 이내로 입력해 주세요."
          marginBottom="mb-[16px]"
          errorMessage={errorMessages.username}
        >
          <InputWithButton
            type="text"
            placeholder="아이디를 입력해 주세요."
            value={formData.username}
            onChange={(value) => handleInputChange('username', value)}
            buttonText="중복확인"
            inputClassName="text-[#545454]"
            isValid={isUsernameValid()}
          />
        </FormField>

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
            onChange={(e) => handleInputChange('password', e.target.value)}
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
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className={`w-full h-[34px] bg-[#FDFDFD] border rounded-[20px] px-[10px] text-[14px] font-normal leading-[120%] tracking-[-0.025em] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] ${
              formData.confirmPassword && formData.password !== formData.confirmPassword
                ? 'border-red-500 text-red-500'
                : 'border-[#E0E0E0] text-[#545454]'
            }`}
          />
          {formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <p className="text-red-500 text-[10px] mt-[4px] ml-[10px]">
              비밀번호가 일치하지 않습니다.
            </p>
          )}
                </FormField>

        {/* 이메일 */}
        <FormField 
          title="이메일" 
          description="영문 소문자와 숫자의 조합으로 4~12자 이내로 입력해 주세요."
          marginBottom="mb-[18px]"
          errorMessage={errorMessages.email}
        >
          <div className="flex gap-[8px]">
            <input
              type="email"
              placeholder="이메일을 입력해 주세요."
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="flex-1 h-[34px] bg-[#FDFDFD] border border-[#E0E0E0] rounded-[20px] px-[10px] text-[14px] font-normal leading-[120%] tracking-[-0.025em] text-[#545454] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)]"
            />
            <span className="text-[#545454] text-[14px] font-normal leading-[120%] tracking-[-0.025em] self-center">@</span>
            <div className="relative">
              <select
                value={formData.emailDomain}
                onChange={(e) => handleInputChange('emailDomain', e.target.value)}
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

        {/* 휴대폰 인증 */}
        <FormField 
          title="휴대폰 인증" 
          description="영문 소문자와 숫자의 조합으로 4~12자 이내로 입력해 주세요."
          marginBottom="mb-[0px]"
          errorMessage={errorMessages.phone || errorMessages.verificationCode}
        >
          <div className="space-y-[20px]">
            <InputWithButton
              type="tel"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={(value) => handleInputChange('phone', value)}
              buttonText={isCountdownActive ? "다시받기" : "인증 요청"}
              buttonPadding={isCountdownActive ? "px-[14px] py-[9px]" : "px-[13px] py-[9px]"}
              inputPattern="^[0-9-]*$"
              isValid={isPhoneValid()}
              onButtonClick={isCountdownActive ? resetCountdown : startCountdown}
            />
            <InputWithButton
              type="text"
              placeholder="인증 번호를 입력해 주세요."
              value={formData.verificationCode}
              onChange={(value) => handleInputChange('verificationCode', value)}
              buttonText="인증"
              buttonPadding="px-[26px] py-[9px]"
              inputPattern="^[0-9]*$"
              isValid={isVerificationCodeValid()}
            >
              <div className="absolute right-[10px] top-[7px] flex items-center gap-[1px]">
                <img src={timeIcon} alt="시간" className="w-[20px] h-[20px]" />
                <span className="text-[#545454] text-[14px] font-normal leading-[120%] tracking-[-0.025em]">
                  {isCountdownActive ? formatTime(countdown) : '03:00'}
                </span>
              </div>
            </InputWithButton>
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
        
        {/* 가입하기 버튼 */}
        <div className="mt-[30px]">
          <button 
            className={`w-full text-[#FDFDFD] text-[14px] font-semibold leading-[120%] tracking-[-0.025em] py-[11px] rounded-[20px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] ${canSubmit() ? 'bg-[#009DFF] cursor-pointer' : 'bg-[#B3B3B3] cursor-not-allowed'}`}
            disabled={!canSubmit()}
            onClick={handleSubmit}
          >
            가입하기
          </button>
        </div>
        
        </div>
      </div>
  );
}
