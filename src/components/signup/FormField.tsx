import React from 'react';

interface FormFieldProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  marginBottom?: string;
  errorMessage?: string;
}

const FormField: React.FC<FormFieldProps> = ({ title, description, children, marginBottom = "mb-[20px]", errorMessage = "" }) => {
  return (
    <div className={`${marginBottom} relative pb-[14px]`}>
      <label className="block text-[#00468B] text-[12px] font-medium leading-[120%] tracking-[-0.025em] mb-[8px] pl-[10px]">
        {title}
      </label>
      {description && (
        <p className="text-[#545454] text-[8px] font-normal leading-[120%] tracking-[-0.025em] mb-[8px] pl-[10px]">
          {description}
        </p>
      )}
      {children}
      <div className="absolute bottom-0 left-[10px] h-[12px]">
        <span className={`text-[10px] font-normal leading-[120%] tracking-[-0.025em] ${errorMessage && errorMessage.trim() !== '' ? 'text-[#FF0000]' : 'text-transparent'}`}>
          {errorMessage}
        </span>
      </div>
    </div>
  );
};

export default FormField;
