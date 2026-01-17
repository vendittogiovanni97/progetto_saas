import React from 'react';

interface LineChartProps {
  data: number[];
  height?: number;
  color?: string;
  className?: string;
}

export function MiniLineChart({ 
  data, 
  height = 60, 
  color = '#2BE4CE',
  className = '' 
}: LineChartProps) {
  if (!data || data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`w-full ${className}`}
      style={{ height: `${height}px` }}
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

interface BarChartProps {
  data: number[];
  height?: number;
  color?: string;
  className?: string;
}

export function MiniBarChart({ 
  data, 
  height = 60, 
  color = '#3A6BFF',
  className = '' 
}: BarChartProps) {
  if (!data || data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  return (
    <div 
      className={`flex items-end gap-1 ${className}`}
      style={{ height: `${height}px` }}
    >
      {data.map((value, index) => {
        const barHeight = ((value - min) / range) * 100;
        return (
          <div
            key={index}
            className="flex-1 rounded-t-sm transition-all"
            style={{ 
              height: `${barHeight}%`, 
              backgroundColor: color,
              minHeight: '4px'
            }}
          />
        );
      })}
    </div>
  );
}
