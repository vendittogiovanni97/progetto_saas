import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  color?: string;
}

export function Switch({ checked, onChange, label, disabled = false, color }: SwitchProps) {
  const theme = useTheme();
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div 
        className={`
          relative w-12 h-6 rounded-full transition-colors duration-200
          ${checked ? 'bg-[#27D972]' : 'bg-[#2A2B2E]'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={() => !disabled && onChange(!checked)}
      >
        <div 
          className={`
            absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full 
            transition-transform duration-200
            ${checked ? 'translate-x-6' : 'translate-x-0'}
          `}
        />
      </div>
      {label && (
        <Typography
          component="span"
          sx={{
            color: theme.palette.text.primary,
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          {label}
        </Typography>
      )}
    </label>
  );
}

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Checkbox({ checked, onChange, label, disabled = false }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div 
        className={`
          w-5 h-5 rounded border-2 flex items-center justify-center transition-all
          ${checked 
            ? 'bg-[#27D972] border-[#27D972]' 
            : 'bg-transparent border-[#2A2B2E]'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={() => !disabled && onChange(!checked)}
      >
        {checked && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path 
              d="M1 5L4.5 8.5L11 1" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {label && <span className="text-sm text-[#E6E6E6]">{label}</span>}
    </label>
  );
}

interface ToggleOption {
  value: string;
  label: string;
}

interface SegmentedControlProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
}

export function SegmentedControl({ options, value, onChange }: SegmentedControlProps) {
  return (
    <div className="inline-flex bg-[#1C1D1F] border border-[#2A2B2E] rounded-lg p-1">
      {options.map(option => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`
            px-4 py-1.5 rounded-md text-sm transition-all duration-200
            ${value === option.value 
              ? 'bg-[#2BE4CE] text-[#111215]' 
              : 'text-[#A0A0A0] hover:text-[#E6E6E6]'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
