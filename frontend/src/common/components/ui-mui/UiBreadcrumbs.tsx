import React from 'react';
import Breadcrumbs, { BreadcrumbsProps } from '@mui/material/Breadcrumbs';

export type UiBreadcrumbsProps = BreadcrumbsProps;

export function UiBreadcrumbs(props: UiBreadcrumbsProps) {
  return <Breadcrumbs {...props} />;
}
