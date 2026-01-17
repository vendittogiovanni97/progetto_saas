import React from 'react';
import Stack, { StackProps } from '@mui/material/Stack';

export type UiStackProps = StackProps;

export function UiStack(props: UiStackProps) {
  return <Stack {...props} />;
}
