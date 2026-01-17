import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ src, alt, fallback, size = 'md', className = '' }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  };

  return (
    <div className={`relative inline-flex shrink-0 overflow-hidden rounded-full ${sizes[size]} ${className}`}>
      {src ? (
        <img 
          src={src} 
          alt={alt || fallback} 
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-[#2A2B2E] text-[#E6E6E6]">
          {fallback.substring(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
}
