import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/common/logo2.svg';
import backIcon from '../../assets/common/back.svg';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    emailDomain: '',
    phone: '',
    verificationCode: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = () => {
    return formData.username && 
           formData.password && 
           formData.confirmPassword && 
           formData.email && 
           formData.emailDomain && 
           formData.phone && 
           formData.verificationCode &&
           formData.password === formData.confirmPassword;
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
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
      <div className="flex-1 px-[32px]">
        <h1 className="text-[#111111] text-[16px] font-medium leading-[120%] tracking-[-0.025em] mb-[32px] text-center">
          회원가입
        </h1>
        
      </div>
    </div>
  );
}
