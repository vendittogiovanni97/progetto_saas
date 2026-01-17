import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function H1({ children, className = '' }: TypographyProps) {
  return <h1 className={className}>{children}</h1>;
}

export function H2({ children, className = '' }: TypographyProps) {
  return <h2 className={className}>{children}</h2>;
}

export function H3({ children, className = '' }: TypographyProps) {
  return <h3 className={className}>{children}</h3>;
}

export function Text({ children, className = '' }: TypographyProps) {
  return <p className={className}>{children}</p>;
}

export function Caption({ children, className = '' }: TypographyProps) {
  return <small className={className}>{children}</small>;
}
