import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

export type UiTypographyProps = TypographyProps;

export function UiTypography(props: UiTypographyProps) {
  return <Typography {...props} />;
}
