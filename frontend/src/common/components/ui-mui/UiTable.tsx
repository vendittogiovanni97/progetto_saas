import React from 'react';
import Table, { TableProps } from '@mui/material/Table';
import TableBody, { TableBodyProps } from '@mui/material/TableBody';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableContainer, { TableContainerProps } from '@mui/material/TableContainer';
import TableHead, { TableHeadProps } from '@mui/material/TableHead';
import TableRow, { TableRowProps } from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function UiTable(props: TableProps) {
  return <Table {...props} />;
}

export function UiTableContainer({ children, ...props }: TableContainerProps) {
  return (
    <TableContainer component={Paper} elevation={0} {...props}>
      {children}
    </TableContainer>
  );
}

export function UiTableBody(props: TableBodyProps) { return <TableBody {...props} />; }
export function UiTableCell(props: TableCellProps) { return <TableCell {...props} />; }
export function UiTableHead(props: TableHeadProps) { return <TableHead {...props} />; }
export function UiTableRow(props: TableRowProps) { return <TableRow {...props} />; }
