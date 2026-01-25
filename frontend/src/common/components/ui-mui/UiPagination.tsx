import React from 'react';
import Pagination, { PaginationProps } from '@mui/material/Pagination';
import PaginationItem, { PaginationItemProps } from '@mui/material/PaginationItem';

export type UiPaginationProps = PaginationProps;

export function UiPagination(props: UiPaginationProps) {
  return <Pagination {...props} />;
}

export function UiPaginationItem(props: PaginationItemProps) {
  return <PaginationItem {...props} />;
}
