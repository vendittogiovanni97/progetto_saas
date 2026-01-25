import React from 'react';
import Chip, { ChipProps } from '@mui/material/Chip';

export type UiChipProps = ChipProps;

export function UiChip(props: UiChipProps) {
  return <Chip {...props} />;
}
