 
import EyeOff from '../../assets/login/off.svg';
import EyeOn from '../../assets/login/on.svg';

type PasswordInputProps = {
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  error?: string;
};

export default function PasswordInput({ value, onChange, show, onToggle, error = '' }: PasswordInputProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[301px] h-[34px]">
        <input
          type={show ? 'text' : 'password'}
          placeholder="비밀번호를 입력해 주세요."
          className="w-full h-full rounded-[20px] bg-[#FDFDFD] shadow-[0_4px_4px_2px_rgba(0,0,0,0.04)] text-[14px] text-[rgba(84,84,84,1)] appearance-none border-0 outline-none focus:outline-none ring-0 focus:ring-0 focus:border-transparent [text-indent:10px] placeholder:text-[rgba(179,179,179,1)] placeholder:font-normal placeholder:text-[14px] placeholder:leading-[1.2] placeholder:tracking-[-0.025em] placeholder:[text-indent:10px]"
          value={value}
          onChange={e => onChange(e.target.value)}
          autoComplete="current-password"
        />
        <button
          type="button"
          aria-label={show ? '비밀번호 숨기기' : '비밀번호 표시'}
          onClick={onToggle}
          className="absolute right-[13px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] p-0 m-0 border-0 outline-none focus:outline-none ring-0 bg-transparent hover:bg-transparent active:bg-transparent flex items-center justify-center"
        >
          <img src={show ? EyeOn : EyeOff} alt="toggle-password" className="w-[18px] h-[12px]" />
        </button>
      </div>
      <div className="pt-[4px] h-[16px] w-[301px] text-left text-[10px] font-normal leading-[1.2] tracking-[-0.025em] text-[#FF0000] [text-indent:10px] truncate">
        {error}
      </div>
    </div>
  );
}


