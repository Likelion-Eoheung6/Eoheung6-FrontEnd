import React from 'react';

interface FormFieldProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  marginBottom?: string;
  errorMessage?: string;
  successMessage?: string;
}

const FormField: React.FC<FormFieldProps> = ({ 
  title, 
  description, 
  children, 
  marginBottom = "mb-[20px]", 
  errorMessage = "",
  successMessage = ""
}) => {
  return (
    <div className={`${marginBottom} min-h-[12px]`}>
      <label className="block text-[#00468B] text-[12px] font-medium leading-[120%] tracking-[-0.025em] mb-[3px] pl-[10px]">
        {title}
      </label>
      {description && (
        <p className="text-[#545454] text-[8px] font-normal leading-[120%] tracking-[-0.025em] mb-[1px] pl-[10px]">
          {description}
        </p>
      )}
      {children}
      <div className="h-[12px] mt-[2px] ml-[10px] flex items-center">
        <span className={`text-[10px] font-normal leading-[120%] tracking-[-0.025em] ${
          errorMessage && errorMessage.trim() !== '' 
            ? 'text-[#FF0000]' 
            : successMessage && successMessage.trim() !== '' 
            ? 'text-[#009DFF]' 
            : 'text-transparent'
        }`}>
          {errorMessage && errorMessage.trim() !== '' 
            ? errorMessage 
            : successMessage && successMessage.trim() !== '' 
            ? successMessage 
            : '\u00A0'
          }
        </span>
      </div>
    </div>
  );
};

export default FormField;
