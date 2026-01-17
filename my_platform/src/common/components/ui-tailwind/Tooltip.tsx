import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function Tooltip({ content, children, position = 'top', className = '' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  const arrowStyles = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-[#1C1D1F] border-b-transparent border-x-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[#1C1D1F] border-t-transparent border-x-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-[#1C1D1F] border-r-transparent border-y-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-[#1C1D1F] border-l-transparent border-y-transparent'
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`absolute z-50 px-2 py-1 text-xs text-[#E6E6E6] bg-[#1C1D1F] border border-[#2A2B2E] rounded whitespace-nowrap ${positionStyles[position]}`}>
          {content}
          <div className={`absolute w-0 h-0 border-4 ${arrowStyles[position]}`} />
        </div>
      )}
    </div>
  );
}
