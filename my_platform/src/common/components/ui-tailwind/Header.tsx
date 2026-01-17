import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export function Header({ title, subtitle, action, className = '' }: HeaderProps) {
  return (
    <header className={`border-b border-[#2A2B2E] bg-[#111215] px-8 py-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[#E6E6E6] mb-1">{title}</h1>
          {subtitle && (
            <p className="text-[#A0A0A0]">{subtitle}</p>
          )}
        </div>
        {action && (
          <div>{action}</div>
        )}
      </div>
    </header>
  );
}
