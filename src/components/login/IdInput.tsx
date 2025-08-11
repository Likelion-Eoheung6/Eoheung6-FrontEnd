import React from 'react';

type IdInputProps = {
  value: string;
  onChange: (v: string) => void;
  error?: string;
};

const IdInput: React.FC<IdInputProps> = ({ value, onChange, error }) => {
  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="아이디을 입력해 주세요."
        className="mt-[45px] w-[301px] h-[34px] rounded-[20px] bg-[#FDFDFD] shadow-[0_4px_4px_2px_rgba(0,0,0,0.04)] pr-4 text-[14px] text-[rgba(84,84,84,1)] appearance-none border-0 outline-none focus:outline-none ring-0 focus:ring-0 focus:border-transparent [text-indent:10px] placeholder:text-[rgba(179,179,179,1)] placeholder:font-normal placeholder:text-[14px] placeholder:leading-[1.2] placeholder:tracking-[-0.025em] placeholder:[text-indent:10px]"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <div className="pt-[4px] w-[285px] text-left text-[10px] font-normal leading-[1.2] tracking-[-0.025em] text-[#FF0000] pl-[10px] min-h-[12px] pb-[4px]">
        {error || ''}
      </div>
    </div>
  );
};

export default IdInput;


