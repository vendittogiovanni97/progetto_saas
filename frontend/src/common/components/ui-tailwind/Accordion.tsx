import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onClick?: () => void;
  className?: string;
}

export function AccordionItem({ title, children, isOpen, onClick, className = '' }: AccordionItemProps) {
  return (
    <div className={`border-b border-[#2A2B2E] last:border-0 ${className}`}>
      <button
        className="flex items-center justify-between w-full py-4 text-left transition-colors hover:text-[#2BE4CE]"
        onClick={onClick}
      >
        <span className="font-medium text-[#E6E6E6]">{title}</span>
        <ChevronDown 
          size={16} 
          className={`text-[#A0A0A0] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
      >
        <div className="text-[#A0A0A0] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { title: string; content: React.ReactNode }[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({ items, allowMultiple = false, className = '' }: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndices(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index) 
          : [...prev, index]
      );
    } else {
      setOpenIndices(prev => prev.includes(index) ? [] : [index]);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndices.includes(index)}
          onClick={() => toggleItem(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
