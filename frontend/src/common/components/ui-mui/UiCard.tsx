import React from 'react';
import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';

export type UiCardProps = CardProps;

export function UiCard(props: UiCardProps) {
  return <Card {...props} />;
}

export const UiCardContent = CardContent;
export const UiCardHeader = CardHeader;
export const UiCardActions = CardActions;
