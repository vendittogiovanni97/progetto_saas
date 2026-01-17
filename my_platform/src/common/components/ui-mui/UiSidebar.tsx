import React from 'react';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Box from '@mui/material/Box';

export interface UiSidebarProps extends DrawerProps {
  width?: number;
}

export function UiSidebar({ width = 240, children, variant = 'permanent', sx, ...props }: UiSidebarProps) {
  return (
    <Drawer
      variant={variant}
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
          ...(sx as any), 
        },
      }}
      {...props}
    >
      {children}
    </Drawer>
  );
}
