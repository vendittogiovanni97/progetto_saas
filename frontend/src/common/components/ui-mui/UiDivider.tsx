import React from 'react';
import Divider, { DividerProps } from '@mui/material/Divider';

export type UiDividerProps = DividerProps;

export function UiDivider(props: UiDividerProps) {
  return <Divider {...props} />;
}
