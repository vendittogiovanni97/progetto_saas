import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'minimal' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#27D972] text-[#111215] hover:bg-[#22c765] active:bg-[#1eb559]',
    secondary: 'bg-[#3A6BFF] text-white hover:bg-[#2f5ce6] active:bg-[#2650cc]',
    minimal: 'bg-transparent border-2 border-[#2BE4CE] text-[#2BE4CE] hover:bg-[#2BE4CE]/10 active:bg-[#2BE4CE]/20',
    danger: 'bg-[#FF5D5D] text-white hover:bg-[#e64e4e] active:bg-[#cc4444]'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2.5 text-base rounded-lg',
    lg: 'px-6 py-3.5 text-lg rounded-lg'
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
