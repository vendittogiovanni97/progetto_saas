import React from 'react';
import Alert, { AlertProps } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export type UiAlertProps = AlertProps;

export function UiAlert({ title, children, ...props }: UiAlertProps & { title?: string }) {
  return (
    <Alert {...props}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </Alert>
  );
}
