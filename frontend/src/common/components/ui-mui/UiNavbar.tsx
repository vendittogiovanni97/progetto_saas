
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { UiButton } from './UiButton';

export interface UiNavbarProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

export function UiNavbar({ title, className = '', children }: UiNavbarProps) {
  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={0}
      className={`bg-white dark:bg-[#141517] border-b border-gray-200 dark:border-[#2A2B2E] ${className}`}
    >
      <Toolbar>
        {title && (
          <Typography variant="h6" component="div" className="flex-grow text-black dark:text-[#E6E6E6]">
            {title}
          </Typography>
        )}
        <div className="flex gap-4">
            {children}
        </div>
      </Toolbar>
    </AppBar>
  );
}
