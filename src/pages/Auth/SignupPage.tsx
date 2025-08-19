import { useNavigate } from 'react-router-dom';
import logo from '../../assets/common/logo2.svg';
import backIcon from '../../assets/common/back.svg';
import UsernameSection from '../../components/signup/UsernameSection';
import PasswordSection from '../../components/signup/PasswordSection';
import EmailSection from '../../components/signup/EmailSection';
import PhoneVerificationSection from '../../components/signup/PhoneVerificationSection';
import { useSignupMutation } from '../../hooks/signup/useSignupMutation';
import { useCheckIdMutation } from '../../hooks/signup/useCheckIdMutation';
import { useSendCodeMutation } from '../../hooks/signup/useSendCodeMutation';
import { useVerifyCodeMutation } from '../../hooks/signup/useVerifyCodeMutation';
import { useSignupForm } from '../../hooks/signup/useSignupForm';
import { useCountdown } from '../../hooks/signup/useCountdown';
import { formatPhoneForAPI, formatEmail } from '../../utils/signupValidation';

export default function SignupPage() {
  const navigate = useNavigate();
  
  // 뮤테이션 훅들
  const signupMutation = useSignupMutation();
  const checkIdMutation = useCheckIdMutation();
  const sendCodeMutation = useSendCodeMutation();
  const verifyCodeMutation = useVerifyCodeMutation();
  
  // 폼 상태 관리 훅
  const {
    formData,
    errorMessages,
    signupState,
    formValidation,
    handleInputChange,
    setErrorMessage,
    clearErrorMessage,
    updateSignupState
  } = useSignupForm();
  
  // 카운트다운 훅
  const {
    countdown,
    isCountdownActive,
    formattedTime,
    startCountdown,
    resetCountdown
  } = useCountdown();

  // 아이디 중복체크 핸들러
  const handleCheckId = () => {
    checkIdMutation.mutate(
      { id: formData.username },
      {
        onSuccess: (data) => {
          if (data.data) {
            updateSignupState({
              isIdChecked: true,
              isIdAvailable: true
            });
            clearErrorMessage('username');
          } else {
            updateSignupState({
              isIdChecked: true,
              isIdAvailable: false
            });
            setErrorMessage('username', '이미 사용 중인 아이디입니다.');
          }
        },
        onError: () => {
          updateSignupState({
            isIdChecked: false,
            isIdAvailable: false
          });
          setErrorMessage('username', '중복체크 중 오류가 발생했습니다.');
        }
      }
    );
  };

  // 휴대폰 인증 요청 핸들러
  const handleSendCode = () => {
    sendCodeMutation.mutate(
      { phone: formatPhoneForAPI(formData.phone) },
      {
        onSuccess: () => {
          startCountdown();
          clearErrorMessage('phone');
        },
        onError: () => {
          setErrorMessage('phone', '인증 요청 중 오류가 발생했습니다.');
        }
      }
    );
  };

  // 휴대폰 인증 재요청 핸들러
  const handleResetCode = () => {
    sendCodeMutation.mutate(
      { phone: formatPhoneForAPI(formData.phone) },
      {
        onSuccess: () => {
          resetCountdown();
          clearErrorMessage('phone');
        },
        onError: () => {
          setErrorMessage('phone', '인증 요청 중 오류가 발생했습니다.');
        }
      }
    );
  };

  // 인증번호 확인 핸들러
  const handleVerifyCode = () => {
    verifyCodeMutation.mutate(
      { 
        phone: formatPhoneForAPI(formData.phone), 
        code: formData.verificationCode 
      },
      {
        onSuccess: (data) => {
          if (data.data) {
            updateSignupState({ isCodeVerified: true });
            clearErrorMessage('verificationCode');
          } else {
            updateSignupState({ isCodeVerified: false });
            setErrorMessage('verificationCode', '인증번호가 일치하지 않습니다.');
          }
        },
        onError: () => {
          updateSignupState({ isCodeVerified: false });
          setErrorMessage('verificationCode', '인증번호 확인 중 오류가 발생했습니다.');
        }
      }
    );
  };

  // 회원가입 제출 핸들러
  const handleSubmit = () => {
    if (!formValidation.canSubmit) {
      return;
    }
    
    if (!signupState.isIdChecked || !signupState.isIdAvailable) {
      setErrorMessage('username', '아이디 중복체크를 완료해 주세요.');
      return;
    }
    
    if (!signupState.isCodeVerified) {
      setErrorMessage('verificationCode', '휴대폰 인증을 완료해 주세요.');
      return;
    }
    
    // API 요청 데이터 형식에 맞게 변환
    const signupData = {
      id: formData.username,
      password: formData.password,
      email: formatEmail(formData.email, formData.emailDomain),
      phone: formatPhoneForAPI(formData.phone)
    };
    
    // 회원가입 API 호출
    signupMutation.mutate(signupData);
  };
  
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

        {/* 아이디 섹션 */}
        <UsernameSection
          formData={formData}
          errorMessages={errorMessages}
          isIdChecked={signupState.isIdChecked}
          isIdAvailable={signupState.isIdAvailable}
          isCheckIdLoading={checkIdMutation.isPending}
          onInputChange={handleInputChange}
          onCheckId={handleCheckId}
        />

        {/* 비밀번호 섹션 */}
        <PasswordSection
          formData={formData}
          errorMessages={errorMessages}
          onInputChange={handleInputChange}
        />

        {/* 이메일 섹션 */}
        <EmailSection
          formData={formData}
          errorMessages={errorMessages}
          onInputChange={handleInputChange}
        />

                 {/* 휴대폰 인증 섹션 */}
         <PhoneVerificationSection
           formData={formData}
           errorMessages={errorMessages}
           isCountdownActive={isCountdownActive}
           formattedTime={formattedTime}
           isCodeVerified={signupState.isCodeVerified}
           isSendCodeLoading={sendCodeMutation.isPending}
           isVerifyCodeLoading={verifyCodeMutation.isPending}
           onInputChange={handleInputChange}
           onSendCode={handleSendCode}
           onResetCode={handleResetCode}
           onVerifyCode={handleVerifyCode}
         />
        
        {/* 가입하기 버튼 */}
        <div className="mt-[30px]">
          <button 
            className={`w-full text-[#FDFDFD] text-[14px] font-semibold leading-[120%] tracking-[-0.025em] py-[11px] rounded-[20px] shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] ${formValidation.canSubmit && !signupMutation.isPending ? 'bg-[#009DFF] cursor-pointer' : 'bg-[#B3B3B3] cursor-not-allowed'}`}
            disabled={!formValidation.canSubmit || signupMutation.isPending}
            onClick={handleSubmit}
          >
            {signupMutation.isPending ? '가입 중...' : '가입하기'}
          </button>
        </div>
        
        {/* 에러 메시지 */}
        {signupMutation.isError && (
          <div className="mt-[10px] text-center">
            <p className="text-red-500 text-[12px]">
              회원가입에 실패했습니다. 다시 시도해 주세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}