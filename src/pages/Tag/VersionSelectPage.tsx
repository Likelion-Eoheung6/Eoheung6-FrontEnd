import Logo from '../../assets/common/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useVersionMutation } from '../../hooks/version/useVersionMutation';

export default function VersionSelectPage() {
  const navigate = useNavigate();
  const versionMutation = useVersionMutation();
  return (
    <div className="relative mx-auto">
      <div className="absolute inset-0 w-full min-h-screen bg-[linear-gradient(180deg,_#FDFDFD_28.75%,_#FFF6CC_100%)]" />

      {/* 본문 */}
      <div className="absolute left-0 top-[158px] w-full flex flex-col items-center">
        {/* 로고 */}
        <img src={Logo} alt="logo" className="w-[256px]" />

        <p className="mt-[20px] m-0 px-[20px] text-center font-sans text-[18px] font-medium leading-[1.2] tracking-[-0.025em] text-[#545454] whitespace-pre-line">
          {`지금부터 이음학당과 함께\n세대를 잇는 즐거운 배움의 시간이 시작됩니다!`}
        </p>

        <div className="mt-[45px] flex items-center gap-[13px]">
          <button
            type="button"
            disabled={versionMutation.isPending}
            onClick={() => {
              console.log('쉬운 버전 버튼 클릭');
              versionMutation.mutate({ chooseEasyVer: true });
            }}
            className={`rounded-[20px] shadow-[0_4px_4px_2px_rgba(0,0,0,0.04)] text-[#FDFDFD] text-[22px] font-semibold leading-[1.2] tracking-[-0.025em] px-[40px] py-[8px] appearance-none border-0 outline-none focus:outline-none ring-0 focus:ring-0 ${
              versionMutation.isPending ? 'bg-[#B3B3B3] cursor-not-allowed' : 'bg-[#009DFF] cursor-pointer'
            }`}
          >
            쉬운 버전
          </button>
          <button
            type="button"
            disabled={versionMutation.isPending}
            className={`rounded-[20px] shadow-[0_4px_4px_2px_rgba(0,0,0,0.04)] text-[#FDFDFD] text-[22px] font-semibold leading-[1.2] tracking-[-0.025em] px-[40px] py-[8px] appearance-none border-0 outline-none focus:outline-none ring-0 focus:ring-0 ${
              versionMutation.isPending ? 'bg-[#B3B3B3] cursor-not-allowed' : 'bg-[#009DFF] cursor-pointer'
            }`}
            onClick={() => {
              versionMutation.mutate({ chooseEasyVer: false });
            }}
          >
            기본 버전
          </button>
        </div>

        <div className="mt-[45px] rounded-[20px] bg-[#FDFDFD] shadow-[0_4px_4px_4px_rgba(0,0,0,0.04)] px-[16px] pt-[24px] flex flex-col items-center">
          <div className="text-center font-sans text-[18px] font-semibold leading-[1.2] tracking-[-0.025em] text-[#009DFF]">
            쉬운 버전이란?
          </div>
          <div className="mt-[18px] h-0 w-full border-t-2 w-full border-[#E0E0E0]" />
          <p className="mt-[18px] mb-[24px] px-[24px] text-center font-sans text-[18px] font-normal leading-[1.2] tracking-[-0.025em] text-[#545454] whitespace-pre-line">
            {`누구나 편하게, 쉽게 사용하실 수 있도록\n준비한 간단한 화면이에요!`}
          </p>
        </div>
      </div>
    </div>
  );
}


