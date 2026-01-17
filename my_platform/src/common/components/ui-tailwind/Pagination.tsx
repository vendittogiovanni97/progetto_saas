import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps) {
  const pages = [];
  
  // Logic to show limited pages with ellipsis
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-md hover:bg-[#2A2B2E] text-[#A0A0A0] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {typeof page === 'number' ? (
            <button
              onClick={() => onPageChange(page)}
              className={`
                w-8 h-8 flex items-center justify-center rounded-md text-sm transition-colors
                ${currentPage === page 
                  ? 'bg-[#3A6BFF] text-white' 
                  : 'text-[#A0A0A0] hover:bg-[#2A2B2E] hover:text-[#E6E6E6]'
                }
              `}
            >
              {page}
            </button>
          ) : (
            <span className="w-8 h-8 flex items-center justify-center text-[#A0A0A0]">
              <MoreHorizontal size={16} />
            </span>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md hover:bg-[#2A2B2E] text-[#A0A0A0] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
