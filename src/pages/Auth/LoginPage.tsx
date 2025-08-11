import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnLogo from '../../assets/start/on.svg';
import HeaderBar from '../../components/login/HeaderBar';
import IdInput from '../../components/login/IdInput';
import PasswordInput from '../../components/login/PasswordInput';
import KakaoLoginButton from '../../components/login/KakaoLoginButton';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [userIdError, setUserIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const expectedId = 'wlgms144';
    const expectedPw = 'dnjswnsdud1.';
    let hasError = false;
    setUserIdError('');
    setPasswordError('');
    if (userId.trim() !== expectedId) {
      setUserIdError('아이디가 일치하지 않습니다.');
      hasError = true;
    }
    if (password.trim() !== expectedPw) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      hasError = true;
    }
    if (!hasError) {
      navigate('/');
    }
  };

  return (
    <div className="relative mx-auto">
      {/* 페이지 상단 헤더 */}
      <HeaderBar backTo="/start" />
        {/* 로고 */}
      <div className="absolute left-0 top-[137px] w-full flex flex-col items-center">
        <img src={OnLogo} alt="logo" className="w-[180px] h-[176px]" />

        {/* 설명 문구 */}
        <p className="mt-[20px] w-[324px] h-[44px] m-0 text-center text-[18px] font-medium leading-[1.2] tracking-[-0.025em] whitespace-pre-line text-[rgba(84,84,84,1)]">
          {`취미, 배움, 이야기까지 세대를 잇는 하루 클래스\n‘이음학당’에서 찾아보세요!`}
        </p>

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

        {/* 로그인 버튼 (비활성 예시) */}
        <button
          type="button"
          disabled={!userId.trim() || !password.trim()}
          onClick={handleLogin}
          className={`mt-[25px] rounded-[20px] text-[#FDFDFD] text-[14px] font-semibold tracking-[-0.025em] px-[133px] py-[10px] transition-colors appearance-none border-0 outline-none focus:outline-none ring-0 focus:ring-0 ${
            userId.trim() && password.trim()
              ? 'bg-[rgba(0,157,255,1)] cursor-pointer hover:brightness-105'
              : 'bg-[rgba(179,179,179,1)] cursor-not-allowed'
          }`}
        >
          로그인
        </button>

        <div className="mt-[20px] flex items-center justify-center text-[12px] font-medium leading-[1.2] tracking-[-0.025em] text-[rgba(84,84,84,1)]">
          <a href="#" className="align-middle no-underline text-[rgba(84,84,84,1)] visited:text-[rgba(84,84,84,1)] hover:no-underline">아이디 찾기</a>
          <span aria-hidden className="mx-[15px] inline-block align-middle w-px h-[14px] bg-[rgba(255,239,161,1)]"></span>
          <a href="#" className="align-middle no-underline text-[rgba(84,84,84,1)] visited:text-[rgba(84,84,84,1)] hover:no-underline">비밀번호 찾기</a>
          <span aria-hidden className="mx-[15px] inline-block align-middle w-px h-[14px] bg-[rgba(255,239,161,1)]"></span>
          <a href="#" className="align-middle no-underline text-[rgba(84,84,84,1)] visited:text-[rgba(84,84,84,1)] hover:no-underline">회원가입</a>
        </div>

        {/* SNS 안내 텍스트 */}
        <p className="mt-[87px] text-center text-[12px] font-light leading-[1.2] tracking-[-0.025em] text-[rgba(179,179,179,1)] align-middle">
          SNS계정으로 로그인하기
        </p>

        {/* 카카오톡 로그인 버튼 (안내 텍스트 16px 아래) */}
        <KakaoLoginButton />
      </div>
    </div>
  );
}


