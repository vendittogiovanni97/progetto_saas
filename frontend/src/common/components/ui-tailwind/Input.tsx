import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm text-[#E6E6E6]">{label}</label>
      )}
      <input
        className={`
          w-full px-4 py-2.5 
          bg-[#1C1D1F] 
          border border-[#2A2B2E] 
          rounded-lg 
          text-[#E6E6E6] 
          placeholder:text-[#6B6B6B]
          focus:outline-none 
          focus:border-[#2BE4CE] 
          focus:ring-1 
          focus:ring-[#2BE4CE]/30
          transition-all
          ${error ? 'border-[#FF5D5D] focus:border-[#FF5D5D] focus:ring-[#FF5D5D]/30' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-xs text-[#FF5D5D]">{error}</span>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm text-[#E6E6E6]">{label}</label>
      )}
      <textarea
        className={`
          w-full px-4 py-2.5 
          bg-[#1C1D1F] 
          border border-[#2A2B2E] 
          rounded-lg 
          text-[#E6E6E6] 
          placeholder:text-[#6B6B6B]
          focus:outline-none 
          focus:border-[#2BE4CE] 
          focus:ring-1 
          focus:ring-[#2BE4CE]/30
          transition-all
          resize-y
          min-h-[100px]
          ${error ? 'border-[#FF5D5D] focus:border-[#FF5D5D] focus:ring-[#FF5D5D]/30' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-xs text-[#FF5D5D]">{error}</span>
      )}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className = '', ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm text-[#E6E6E6]">{label}</label>
      )}
      <select
        className={`
          w-full px-4 py-2.5 
          bg-[#1C1D1F] 
          border border-[#2A2B2E] 
          rounded-lg 
          text-[#E6E6E6] 
          focus:outline-none 
          focus:border-[#2BE4CE] 
          focus:ring-1 
          focus:ring-[#2BE4CE]/30
          transition-all
          cursor-pointer
          ${error ? 'border-[#FF5D5D] focus:border-[#FF5D5D] focus:ring-[#FF5D5D]/30' : ''}
          ${className}
        `}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs text-[#FF5D5D]">{error}</span>
      )}
    </div>
  );
}
