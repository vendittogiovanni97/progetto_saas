import React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';

export type UiBadgeProps = BadgeProps;

export function UiBadge(props: UiBadgeProps) {
  return <Badge {...props} />;
}
