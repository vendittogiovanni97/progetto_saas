import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
  separator?: React.ReactNode;
  className?: string;
}

export function Breadcrumb({ items, separator, className = '' }: BreadcrumbProps) {
  const DefaultSeparator = <ChevronRight size={14} className="text-[#6B6B6B]" />;

  return (
    <nav className={`flex items-center text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <React.Fragment key={index}>
              <li className={`inline-flex items-center ${isLast ? 'font-medium text-[#E6E6E6]' : 'text-[#A0A0A0] hover:text-[#E6E6E6] transition-colors'}`}>
                {item.href && !isLast ? (
                  <a href={item.href}>{item.label}</a>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" className="flex items-center">
                  {separator || DefaultSeparator}
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
