import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

type AlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
  icon?: boolean;
}

export function Alert({ 
  variant = 'default', 
  title, 
  children, 
  className = '',
  icon = true
}: AlertProps) {
  const variants = {
    default: 'bg-[#1C1D1F] border-[#2A2B2E] text-[#E6E6E6]',
    destructive: 'bg-[#FF5D5D]/10 border-[#FF5D5D]/20 text-[#FF5D5D]',
    success: 'bg-[#27D972]/10 border-[#27D972]/20 text-[#27D972]',
    warning: 'bg-[#F5C542]/10 border-[#F5C542]/20 text-[#F5C542]',
    info: 'bg-[#3A6BFF]/10 border-[#3A6BFF]/20 text-[#3A6BFF]',
  };

  const icons = {
    default: <Info size={18} />,
    destructive: <AlertCircle size={18} />,
    success: <CheckCircle size={18} />,
    warning: <AlertCircle size={18} />,
    info: <Info size={18} />,
  };

  return (
    <div className={`relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 ${variants[variant]} ${className}`}>
      {icon && icons[variant]}
      <div className={`${icon ? 'ml-2' : ''}`}>
        {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
        <div className="text-sm opacity-90 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
