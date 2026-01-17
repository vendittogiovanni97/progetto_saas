import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'active' | 'inactive' | 'warning' | 'info' | 'success' | 'danger';
  className?: string;
}

export function Badge({ children, variant = 'info', className = '' }: BadgeProps) {
  const variants = {
    active: 'bg-[#27D972]/10 text-[#27D972] border-[#27D972]/30',
    inactive: 'bg-[#6B6B6B]/10 text-[#A0A0A0] border-[#6B6B6B]/30',
    warning: 'bg-[#F5C542]/10 text-[#F5C542] border-[#F5C542]/30',
    info: 'bg-[#3A6BFF]/10 text-[#3A6BFF] border-[#3A6BFF]/30',
    success: 'bg-[#27D972]/10 text-[#27D972] border-[#27D972]/30',
    danger: 'bg-[#FF5D5D]/10 text-[#FF5D5D] border-[#FF5D5D]/30'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

interface StatusPillProps {
  status: 'active' | 'inactive' | 'warning';
  label: string;
  showDot?: boolean;
}

export function StatusPill({ status, label, showDot = true }: StatusPillProps) {
  const colors = {
    active: 'bg-[#27D972]',
    inactive: 'bg-[#6B6B6B]',
    warning: 'bg-[#F5C542]'
  };

  return (
    <div className="inline-flex items-center gap-2">
      {showDot && (
        <div className={`w-2 h-2 rounded-full ${colors[status]}`} />
      )}
      <span className="text-sm text-[#E6E6E6]">{label}</span>
    </div>
  );
}
