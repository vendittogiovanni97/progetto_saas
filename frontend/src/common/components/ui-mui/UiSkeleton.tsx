import React from 'react';
import Skeleton, { SkeletonProps } from '@mui/material/Skeleton';

export type UiSkeletonProps = SkeletonProps;

export function UiSkeleton(props: UiSkeletonProps) {
  return <Skeleton {...props} />;
}
