import React from 'react';
import { LayoutDashboard, Users, FileText, Settings, ChevronRight } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  badge?: string | number;
}

interface SidebarProps {
  items?: NavItem[];
  logo?: React.ReactNode;
  className?: string;
}

const defaultItems: NavItem[] = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/', active: true },
  { icon: <Users size={20} />, label: 'Tenants', href: '/tenants', badge: '12' },
  { icon: <FileText size={20} />, label: 'Templates', href: '/templates' },
  { icon: <Settings size={20} />, label: 'Impostazioni', href: '/settings' }
];

export function Sidebar({ items = defaultItems, logo, className = '' }: SidebarProps) {
  return (
    <aside className={`w-64 bg-[#141517] border-r border-[#2A2B2E] flex flex-col ${className}`}>
      {/* Logo */}
      <div className="px-6 py-6 border-b border-[#2A2B2E]">
        {logo || (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#2BE4CE] to-[#3A6BFF] rounded-lg" />
            <span className="text-[#E6E6E6]">SaaS Platform</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`
              flex items-center justify-between px-3 py-2.5 mb-1 rounded-lg 
              transition-colors group
              ${item.active 
                ? 'bg-[#2BE4CE]/10 text-[#2BE4CE]' 
                : 'text-[#A0A0A0] hover:bg-[#1C1D1F] hover:text-[#E6E6E6]'
              }
            `}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </div>
            {item.badge && (
              <span className="text-xs px-2 py-0.5 bg-[#3A6BFF] text-white rounded-full">
                {item.badge}
              </span>
            )}
          </a>
        ))}
      </nav>

      {/* User Section */}
      <div className="px-3 py-4 border-t border-[#2A2B2E]">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1C1D1F] cursor-pointer transition-colors">
          <div className="w-9 h-9 bg-gradient-to-br from-[#3A6BFF] to-[#2BE4CE] rounded-full flex items-center justify-center text-sm text-white">
            SA
          </div>
          <div className="flex-1">
            <p className="text-sm text-[#E6E6E6]">Super Admin</p>
            <p className="text-xs text-[#6B6B6B]">admin@platform.com</p>
          </div>
          <ChevronRight size={16} className="text-[#6B6B6B]" />
        </div>
      </div>
    </aside>
  );
}
