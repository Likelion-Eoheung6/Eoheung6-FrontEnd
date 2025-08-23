import { useNavigate } from 'react-router-dom';

type HeaderBarProps = {
  backTo?: string;
};

export default function HeaderBar({ backTo = '/start' }: HeaderBarProps) {
  const navigate = useNavigate();
  return (
    <>
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={() => navigate(backTo)}
        className="absolute left-[4px] mt-[62px] w-[30px] h-[30px] p-0 m-0 border-0 outline-none focus:outline-none ring-0 bg-transparent cursor-pointer flex items-center justify-center text-[18px] leading-none text-[#545454]"
      >
        {'<'}
      </button>
    </>
  );
}


