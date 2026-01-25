import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`flex-1 overflow-auto bg-[#111215] ${className}`}>
      <div className="w-full p-8">
        {children}
      </div>
    </div>
  );
}
