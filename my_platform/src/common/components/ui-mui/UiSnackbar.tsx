import React from 'react';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';

export type UiSnackbarProps = SnackbarProps;

export function UiSnackbar(props: UiSnackbarProps) {
  return <Snackbar {...props} />;
}
