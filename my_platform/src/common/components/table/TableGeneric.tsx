/**
 * TableGeneric - Componente tabella generico e completo
 * Basato su TanStack Table con styling MUI
 *
 * Usage:
 * ```tsx
 * <TableGeneric
 *   data={users}
 *   columns={[
 *     { id: 'name', header: 'Name', accessorKey: 'name' },
 *     { id: 'email', header: 'Email', accessorKey: 'email' },
 *   ]}
 *   enableSorting
 *   enablePagination
 * />
 * ```
 */

"use client";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  IconButton,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { useState } from "react";

export interface TableGenericColumn<T = any> {
  id: string;
  header: string;
  accessorKey?: keyof T | string;
  cell?: (value: any, row: T) => React.ReactNode;
  enableSorting?: boolean;
  align?: "left" | "center" | "right";
  width?: string | number;
}

export interface TableGenericProps<T = any> {
  data: T[];
  columns: TableGenericColumn<T>[];
  enableSorting?: boolean;
  enablePagination?: boolean;
  enableFiltering?: boolean;
  pageSize?: number;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  stickyHeader?: boolean;
}

export function TableGeneric<T extends Record<string, any>>({
  data,
  columns,
  enableSorting = true,
  enablePagination = false,
  enableFiltering = false,
  pageSize = 10,
  emptyMessage = "No data available",
  onRowClick,
  stickyHeader = false,
}: TableGenericProps<T>) {
  const theme = useTheme();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Converti le colonne custom in formato TanStack Table
  const tableColumns: ColumnDef<T>[] = columns.map((col) => ({
    id: col.id,
    accessorKey: col.accessorKey as string,
    header: col.header,
    enableSorting: col.enableSorting ?? enableSorting,
    cell: ({ getValue, row }) => {
      const value = getValue();
      if (col.cell) {
        return col.cell(value, row.original);
      }
      return value ?? "-";
    },
    size: typeof col.width === "number" ? col.width : undefined,
    minSize: typeof col.width === "number" ? col.width : undefined,
    maxSize: typeof col.width === "number" ? col.width : undefined,
  }));

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  const rows = table.getRowModel().rows;

  return (
    <TableContainer
      component={Paper}
      sx={{
        bgcolor: "background.paper",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        overflow: "auto",
        maxHeight: stickyHeader ? "calc(100vh - 200px)" : "none",
      }}
    >
      <Table stickyHeader={stickyHeader} sx={{ minWidth: 650 }}>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              sx={{
                bgcolor: alpha(theme.palette.background.default, 0.5),
                "& th": {
                  borderBottom: `1px solid ${theme.palette.divider}`,
                },
              }}
            >
              {headerGroup.headers.map((header) => {
                const column = columns.find((c) => c.id === header.id);
                const canSort = header.column.getCanSort();
                const sortDirection = header.column.getIsSorted();

                return (
                  <TableCell
                    key={header.id}
                    align={column?.align || "left"}
                    sx={{
                      fontSize: "0.75rem",
                      fontFamily: "monospace",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: "text.secondary",
                      fontWeight: 700,
                      width: column?.width,
                      cursor: canSort ? "pointer" : "default",
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {canSort ? (
                      <TableSortLabel
                        active={!!sortDirection}
                        direction={sortDirection === "desc" ? "desc" : "asc"}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableSortLabel>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                sx={{
                  textAlign: "center",
                  py: 6,
                  color: "text.secondary",
                }}
              >
                <Typography variant="body2">{emptyMessage}</Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => onRowClick?.(row.original)}
                hover
                sx={{
                  cursor: onRowClick ? "pointer" : "default",
                  "&:hover": {
                    bgcolor: onRowClick
                      ? alpha(theme.palette.common.white, 0.05)
                      : "transparent",
                  },
                  "& td": {
                    borderBottom: `1px solid ${alpha(
                      theme.palette.divider,
                      0.5
                    )}`,
                  },
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  const column = columns.find((c) => c.id === cell.column.id);
                  return (
                    <TableCell
                      key={cell.id}
                      align={column?.align || "left"}
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "0.875rem",
                        color: "text.primary",
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {enablePagination && rows.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
            py: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            bgcolor: alpha(theme.palette.background.default, 0.3),
          }}
        >
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "text.secondary",
              fontFamily: "monospace",
            }}
          >
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              sx={{ color: "text.secondary" }}
            >
              <Box
                component="span"
                className="material-symbols-outlined"
                sx={{ fontSize: 20 }}
              >
                chevron_left
              </Box>
            </IconButton>
            <IconButton
              size="small"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              sx={{ color: "text.secondary" }}
            >
              <Box
                component="span"
                className="material-symbols-outlined"
                sx={{ fontSize: 20 }}
              >
                chevron_right
              </Box>
            </IconButton>
          </Box>
        </Box>
      )}
    </TableContainer>
  );
}
