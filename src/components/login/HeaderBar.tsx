import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackIcon from '../../assets/login/back.svg';

type HeaderBarProps = {
  backTo?: string;
};

const HeaderBar: React.FC<HeaderBarProps> = ({ backTo = '/start' }) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={() => navigate(backTo)}
        className="absolute left-[4px] mt-[62px] w-[40px] h-[40px] p-0 m-0 border-0 outline-none focus:outline-none ring-0 bg-transparent cursor-pointer"
      >
        <img src={BackIcon} alt="back" className="w-full h-full" />
      </button>
    </>
  );
};

export default HeaderBar;


