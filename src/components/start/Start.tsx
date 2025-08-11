import React from 'react';
import OnLogo from '../../assets/start/on.svg';


const Start: React.FC = () => {
  return (
    <div className="relative mx-auto">
      <div className="absolute left-0 top-[202px] w-full flex flex-col items-center">
        <img src={OnLogo} alt="start-logo" className="w-[256px] h-[251px]" />
        <p className="mt-[30px] w-[324px] m-0 text-center text-[rgba(84,84,84,1)] font-medium text-[18px] leading-[1.2] tracking-[-0.025em] whitespace-pre-line">
          {`취미, 배움, 이야기까지 세대를 잇는 하루 클래스\n‘이음학당’에서 찾아보세요!`}
        </p>
        <button
          type="button"
          onClick={() => (window.location.href = '/login')}
          className="mt-[12px] w-[301px] h-[34px] rounded-[20px] bg-[#009DFF] flex items-center justify-center border-0 outline-none focus:outline-none ring-0 focus:ring-0 shadow-[0px_4px_4px_2px_rgba(0,0,0,0.04)] cursor-pointer"
        >
          <span className="text-[#FDFDFD] text-[14px] font-semibold leading-[1.2] tracking-[-0.025em]">
            시작하기
          </span>
        </button>
      </div>
    </div>
  );
};

export default Start;


