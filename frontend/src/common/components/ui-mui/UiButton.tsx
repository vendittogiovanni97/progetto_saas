import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export interface UiButtonProps extends ButtonProps {
  loading?: boolean;
}

export function UiButton({ loading, children, disabled, startIcon, ...props }: UiButtonProps) {
  return (
    <Button
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : startIcon}
      {...props}
    >
      {children}
    </Button>
  );
}
