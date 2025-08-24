import KakaoIcon from '../../assets/login/kakao2.svg';

export default function KakaoLoginButton() {
  return (
    <div className="mt-[16px] flex items-center justify-center">
      <button
        type="button"
        className="relative rounded-[30px] bg-[#FEE102] shadow-[0_4px_4px_2px_rgba(0,0,0,0.04)] flex items-center justify-center gap-[5px] appearance-none border-0 outline-none focus:outline-none ring-0 focus:ring-0 cursor-pointer px-[66px] py-[6px]"
      >
        <img src={KakaoIcon} alt="kakao" className="w-[28px] h-[28px]" />
        <span className="text-[#545454] text-[14px] font-medium leading-[1.2] tracking-[-0.025em]">
          카카오톡으로 로그인하기
        </span>
      </button>
    </div>
  );
}
