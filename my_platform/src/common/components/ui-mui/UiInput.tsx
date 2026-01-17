import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export type UiInputProps = TextFieldProps;

export function UiInput(props: UiInputProps) {
  return <TextField fullWidth variant="outlined" {...props} />;
}
