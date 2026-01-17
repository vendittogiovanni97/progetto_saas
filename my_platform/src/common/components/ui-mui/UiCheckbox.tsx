import React from 'react';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export interface UiCheckboxProps extends CheckboxProps {
  label?: string;
}

export function UiCheckbox({ label, ...props }: UiCheckboxProps) {
  if (label) {
    return <FormControlLabel control={<Checkbox {...props} />} label={label} />;
  }
  return <Checkbox {...props} />;
}
