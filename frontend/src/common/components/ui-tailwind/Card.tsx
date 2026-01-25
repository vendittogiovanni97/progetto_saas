import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-[#1C1D1F] border border-[#2A2B2E] rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
}

interface SectionCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function SectionCard({ title, subtitle, children, action, className = '' }: SectionCardProps) {
  return (
    <div className={`bg-[#1C1D1F] border border-[#2A2B2E] rounded-lg ${className}`}>
      <div className="border-b border-[#2A2B2E] px-6 py-4 flex items-center justify-between">
        <div>
          <h3 className="text-[#E6E6E6]">{title}</h3>
          {subtitle && <p className="text-sm text-[#A0A0A0] mt-1">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

interface KPICardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  chartData?: number[];
  className?: string;
}

export function KPICard({ title, value, change, chartData, className = '' }: KPICardProps) {
  const max = chartData ? Math.max(...chartData) : 0;
  const min = chartData ? Math.min(...chartData) : 0;
  const range = max - min || 1;

  return (
    <div className={`bg-[#1C1D1F] border border-[#2A2B2E] rounded-lg p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-[#A0A0A0] mb-1">{title}</p>
          <p className="text-[#E6E6E6]">{value}</p>
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm ${change.isPositive ? 'text-[#27D972]' : 'text-[#FF5D5D]'}`}>
            <span>{change.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(change.value)}%</span>
          </div>
        )}
      </div>
      
      {chartData && chartData.length > 0 && (
        <div className="h-12 flex items-end gap-1">
          {chartData.map((value, index) => {
            const height = ((value - min) / range) * 100;
            return (
              <div
                key={index}
                className="flex-1 bg-[#2BE4CE] rounded-sm opacity-60"
                style={{ height: `${height}%`, minHeight: '4px' }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
