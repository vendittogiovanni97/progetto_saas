import React from 'react';
import Divider, { DividerProps } from '@mui/material/Divider';

export function UiSeparator({ sx, ...props }: DividerProps) {
  return (
    <Divider
      sx={{
        borderColor: '#2A2B2E',
        ...sx,
      }}
      {...props}
    />
  );
}
