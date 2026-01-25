import React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

export type UiLinearProgressProps = LinearProgressProps;

export function UiLinearProgress(props: UiLinearProgressProps) {
  return <LinearProgress {...props} />;
}
