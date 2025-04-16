
import React, { InputHTMLAttributes } from 'react';

export interface LoginInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: string;
  className?: string;
}

export const LoginInput: React.FC<LoginInputProps> = ({ icon, className = '', ...props }) => {
  return (
    <div className={`w-[546px] h-20 px-6 left-[51.47px] absolute rounded-lg outline outline-1 outline-offset-[-0.46px] outline-neutral-400 inline-flex justify-start items-center gap-2.5 ${className}`}>
      <img src={icon} className="w-6 h-6" alt="" />
      <input
        className="w-full bg-transparent text-white text-2xl opacity-60 font-['Helvetica_Now_Display'] focus:outline-none"
        {...props}
      />
    </div>
  );
}

