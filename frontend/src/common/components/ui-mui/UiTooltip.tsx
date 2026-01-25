import React from 'react';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

export type UiTooltipProps = TooltipProps;

export function UiTooltip(props: UiTooltipProps) {
  // MUI Tooltip requires a single child element
  return <Tooltip {...props} />;
}
