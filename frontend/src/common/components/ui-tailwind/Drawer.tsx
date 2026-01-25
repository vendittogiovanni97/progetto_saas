import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export function Drawer({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  position = 'right', 
  size = 'md',
  className = '' 
}: DrawerProps) {
  
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sizes = {
    sm: 'w-64',
    md: 'w-96',
    lg: 'w-[32rem]', // 512px
    xl: 'w-[48rem]', // 768px
    full: 'w-full'
  };

  const positions = {
    left: `left-0 top-0 h-full border-r ${isOpen ? 'translate-x-0' : '-translate-x-full'}`,
    right: `right-0 top-0 h-full border-l ${isOpen ? 'translate-x-0' : 'translate-x-full'}`
  };

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      
      {/* Drawer Content */}
      <div 
        className={`
          absolute bg-[#1C1D1F] border-[#2A2B2E] shadow-2xl transition-transform duration-300 ease-in-out
          ${positions[position]} 
          ${sizes[size]} 
          ${className}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2B2E]">
            <h3 className="text-lg font-semibold text-[#E6E6E6]">{title}</h3>
            <button 
              onClick={onClose}
              className="p-2 -mr-2 text-[#A0A0A0] hover:text-[#E6E6E6] hover:bg-[#2A2B2E] rounded-md transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
