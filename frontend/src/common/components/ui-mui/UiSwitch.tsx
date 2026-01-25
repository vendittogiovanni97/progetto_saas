import React from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export interface UiSwitchProps extends SwitchProps {
  label?: string;
}

export function UiSwitch({ label, ...props }: UiSwitchProps) {
  if (label) {
    return <FormControlLabel control={<Switch {...props} />} label={label} />;
  }
  return <Switch {...props} />;
}
