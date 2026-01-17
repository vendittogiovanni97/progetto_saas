import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  barColor?: string;
}

export function Progress({ value, max = 100, className = '', barColor = 'bg-[#2BE4CE]' }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-[#2A2B2E] ${className}`}>
      <div
        className={`h-full w-full flex-1 transition-all duration-300 ease-in-out ${barColor}`}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  );
}
