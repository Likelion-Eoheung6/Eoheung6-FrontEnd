import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnLogo from '../../assets/common/logo.svg';
import IdInput from '../../components/login/IdInput';
import PasswordInput from '../../components/login/PasswordInput';
import KakaoLoginButton from '../../components/login/KakaoLoginButton';
import { useLoginMutation } from '../../hooks/login/useLoginMutation';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [userIdError, setUserIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  
  // 로그인 뮤테이션
  const loginMutation = useLoginMutation();

  const handleLogin = () => {
    // 에러 메시지 초기화
    setUserIdError('');
    setPasswordError('');
    
    // 입력값 검증
    if (!userId.trim()) {
      setUserIdError('아이디를 입력해 주세요.');
      return;
    }
    if (!password.trim()) {
      setPasswordError('비밀번호를 입력해 주세요.');
      return;
    }
    
    // 로그인 API 호출
    loginMutation.mutate(
      { id: userId.trim(), password: password.trim() },
      {
        onError: (error: any) => {
          const errorMessage = error.userMessage || error.message;
          
          // 400_1, 400_2 에러는 모두 비밀번호 필드에 표시
          if (error.response?.data?.code === 'SIGNIN_400_1' || error.response?.data?.code === 'SIGNIN_400_2') {
            setPasswordError(errorMessage);
          } else {
            // 기타 에러는 비밀번호 필드에 표시
            setPasswordError(errorMessage);
          }
        }
      }
    );
  };

  return (
    <div className="relative mx-auto min-h-screen">
        <div className="absolute inset-0 w-full min-h-screen bg-[linear-gradient(180deg,_#FDFDFD_28.75%,_#FFF6CC_100%)]" />
        {/* 로고 */}
      <div className="absolute left-0 top-[137px] w-full flex flex-col items-center">
        <img src={OnLogo} alt="logo" className="w-[180px] h-[176px]" />

        {/* 설명 문구 */}
        <p className="mt-[20px] w-[324px] h-[44px] m-0 text-center text-[18px] font-medium leading-[1.2] tracking-[-0.025em] whitespace-pre-line text-[rgba(84,84,84,1)]">
          {`취미, 배움, 이야기까지 세대를 잇는 하루 클래스\n‘이음학당’에서 찾아보세요!`}
        </p>

        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="flex flex-col items-center">
          {/* 아이디 입력 */}
          <IdInput value={userId} onChange={(v) => setUserId(v)} error={userIdError} />

          {/* 비밀번호 입력 */}
          <PasswordInput
            value={password}
            onChange={(v) => setPassword(v)}
            show={showPassword}
            onToggle={() => setShowPassword(prev => !prev)}
            error={passwordError}
          />

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={!userId.trim() || !password.trim() || loginMutation.isPending}
            className={`mt-[22px] rounded-[20px] text-[#FDFDFD] text-[14px] font-semibold tracking-[-0.025em] px-[133px] py-[10px] transition-colors appearance-none border-0 outline-none focus:outline-none ring-0 focus:ring-0 ${
              userId.trim() && password.trim() && !loginMutation.isPending
                ? 'bg-[rgba(0,157,255,1)] cursor-pointer hover:brightness-105'
                : 'bg-[rgba(179,179,179,1)] cursor-not-allowed'
            }`}
          >
            로그인
          </button>
        </form>

        <div className="mt-[20px] flex items-center justify-center text-[12px] font-medium leading-[1.2] tracking-[-0.025em] text-[rgba(84,84,84,1)]">
          <a href="#" className="align-middle no-underline text-[rgba(84,84,84,1)] visited:text-[rgba(84,84,84,1)] hover:no-underline">아이디 찾기</a>
          <span aria-hidden className="mx-[15px] inline-block align-middle w-px h-[14px] bg-[rgba(255,239,161,1)]"></span>
          <a href="#" className="align-middle no-underline text-[rgba(84,84,84,1)] visited:text-[rgba(84,84,84,1)] hover:no-underline">비밀번호 찾기</a>
          <span aria-hidden className="mx-[15px] inline-block align-middle w-px h-[14px] bg-[rgba(255,239,161,1)]"></span>
          <a 
            href="/signup" 
            onClick={(e) => {
              e.preventDefault();
              navigate('/signup');
            }}
            className="align-middle no-underline text-[rgba(84,84,84,1)] visited:text-[rgba(84,84,84,1)] hover:no-underline cursor-pointer"
          >
            회원가입
          </a>
        </div>

        {/* SNS 안내 텍스트 */}
        <p className="mt-[87px] text-center text-[12px] font-light leading-[1.2] tracking-[-0.025em] text-[#B3B3B3] align-middle">
          SNS계정으로 로그인하기
        </p>

        {/* 카카오톡 로그인 버튼 (안내 텍스트 16px 아래) */}
        <KakaoLoginButton />
      </div>
    </div>
  );
}