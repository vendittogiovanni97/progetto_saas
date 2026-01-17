import React from 'react';

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (value: string) => void;
  activeValue?: string;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  activeValue?: string;
}

// Context removed for simplicity to keep it pure props/state based where possible, 
// but using Context is cleaner for compound components. 
// For "pure" simplicity I'll use a Context here because compound components need it.
const TabsContext = React.createContext<{
  value: string;
  onChange: (value: string) => void;
}>({ value: '', onChange: () => {} });

export function Tabs({ defaultValue, children, className = '' }: TabsProps) {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, onChange: setValue }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = '' }: TabsListProps) {
  return (
    <div className={`inline-flex h-10 items-center justify-center rounded-md bg-[#1C1D1F] p-1 text-[#A0A0A0] ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children, className = '' }: Omit<TabsTriggerProps, 'onClick' | 'activeValue'>) {
  const context = React.useContext(TabsContext);
  const isActive = context.value === value;

  return (
    <button
      className={`
        inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2BE4CE] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
        ${isActive 
          ? 'bg-[#2A2B2E] text-[#E6E6E6] shadow-sm' 
          : 'hover:text-[#E6E6E6] hover:bg-[#2A2B2E]/50'
        }
        ${className}
      `}
      onClick={() => context.onChange(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = '' }: Omit<TabsContentProps, 'activeValue'>) {
  const context = React.useContext(TabsContext);
  if (context.value !== value) return null;

  return (
    <div className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2BE4CE] focus-visible:ring-offset-2 animate-in fade-in-50 zoom-in-95 ${className}`}>
      {children}
    </div>
  );
}
