import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ isOpen, onClose, title, children, footer, size = 'md' }: ModalProps) {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-[#1C1D1F] border border-[#2A2B2E] rounded-lg shadow-2xl w-full ${sizes[size]} mx-4`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2B2E]">
          <h3 className="text-[#E6E6E6]">{title}</h3>
          <button 
            onClick={onClose}
            className="text-[#A0A0A0] hover:text-[#E6E6E6] transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="px-6 py-6">
          {children}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-[#2A2B2E] flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmText = 'Conferma',
  cancelText = 'Annulla',
  variant = 'info'
}: ConfirmModalProps) {
  const variantStyles = {
    danger: 'bg-[#FF5D5D] hover:bg-[#e64e4e]',
    warning: 'bg-[#F5C542] hover:bg-[#e6b635] text-[#111215]',
    info: 'bg-[#3A6BFF] hover:bg-[#2f5ce6]'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-[#E6E6E6] mb-6">{message}</p>
      <div className="flex items-center justify-end gap-3">
        <button 
          onClick={onClose}
          className="px-4 py-2 text-[#E6E6E6] hover:bg-[#2A2B2E] rounded-lg transition-colors"
        >
          {cancelText}
        </button>
        <button 
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className={`px-4 py-2 rounded-lg text-white transition-colors ${variantStyles[variant]}`}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}
