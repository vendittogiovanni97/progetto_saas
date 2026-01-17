import React from 'react';
import Select, { SelectProps } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export interface UiSelectProps {
  label?: string;
  children?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  defaultValue?: string;
}

export function UiSelect({ label, children, fullWidth = true, ...props }: UiSelectProps) {
  return (
    <FormControl fullWidth={fullWidth}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select label={label} {...props}>
        {children}
      </Select>
    </FormControl>
  );
}
