import React from 'react';
import { Check } from 'lucide-react';

interface StepperProps {
  steps: { label: string; description?: string }[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className = '' }: StepperProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between relative">
        {/* Progress Line Background */}
        <div className="absolute top-4 left-0 w-full h-[2px] bg-[#2A2B2E] -z-0" />
        
        {/* Active Progress Line */}
        <div 
          className="absolute top-4 left-0 h-[2px] bg-[#2BE4CE] transition-all duration-300 -z-0"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={index} className="flex flex-col items-center relative z-10 bg-[#111215] px-2">
              <div 
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300
                  ${isCompleted 
                    ? 'bg-[#2BE4CE] border-[#2BE4CE] text-[#111215]' 
                    : isCurrent 
                      ? 'border-[#2BE4CE] text-[#2BE4CE] bg-[#111215]' 
                      : 'border-[#2A2B2E] text-[#6B6B6B] bg-[#1C1D1F]'
                  }
                `}
              >
                {isCompleted ? <Check size={16} /> : <span>{index + 1}</span>}
              </div>
              <div className="mt-2 text-center w-32">
                <p className={`text-sm font-medium ${isCurrent || isCompleted ? 'text-[#E6E6E6]' : 'text-[#6B6B6B]'}`}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-[#6B6B6B] mt-0.5">{step.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
