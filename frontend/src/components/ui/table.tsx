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
  Pagination,
} from "@mui/material";
import { 
  IconVisibility, 
  IconEdit, 
  IconDelete 
} from "@/components/icons/icons";
import { useState, useMemo } from "react";

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
  pageSize?: number;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  stickyHeader?: boolean;
}

export function TableGeneric<T extends Record<string, any>>({
  data,
  columns,
  enableSorting = true,
  enablePagination = false,
  pageSize = 10,
  emptyMessage = "No data available",
  onRowClick,
  onView,
  onEdit,
  onDelete,
  stickyHeader = false,
}: TableGenericProps<T>) {
  const theme = useTheme();
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [page, setPage] = useState(1);

  // Sorting Logic
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);

  // Pagination Logic
  const paginatedData = useMemo(() => {
    if (!enablePagination) return sortedData;
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, enablePagination, page, pageSize]);

  const handleSort = (columnId: string) => {
    if (!enableSorting) return;
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === columnId && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: columnId, direction });
  };

  const hasActions = !!(onView || onEdit || onDelete);

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        bgcolor: alpha(theme.palette.background.paper, 0.4),
        backdropFilter: "blur(20px)",
        border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
        borderRadius: 4,
        overflow: "hidden",
        "&::-webkit-scrollbar": { width: 8, height: 8 },
        "&::-webkit-scrollbar-thumb": { 
          bgcolor: alpha(theme.palette.primary.main, 0.2), 
          borderRadius: 4 
        },
      }}
    >
      <Table stickyHeader={stickyHeader} sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.id}
                align={col.align || "left"}
                sortDirection={sortConfig?.key === col.id ? sortConfig.direction : false}
                sx={{
                  bgcolor: alpha(theme.palette.common.black, 0.3),
                  borderBottom: `2px solid ${alpha(theme.palette.divider, 0.5)}`,
                  py: 2.5,
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "text.secondary",
                  width: col.width,
                }}
              >
                {col.enableSorting !== false && enableSorting ? (
                  <TableSortLabel
                    active={sortConfig?.key === col.id}
                    direction={sortConfig?.key === col.id ? sortConfig.direction : "asc"}
                    onClick={() => handleSort(col.id)}
                    sx={{
                      "&.Mui-active": { color: "primary.main" },
                      "& .MuiTableSortLabel-icon": { color: "primary.main !important" },
                    }}
                  >
                    {col.header}
                  </TableSortLabel>
                ) : (
                  col.header
                )}
              </TableCell>
            ))}
            {hasActions && (
              <TableCell 
                align="right" 
                sx={{ 
                  bgcolor: alpha(theme.palette.common.black, 0.3),
                  borderBottom: `2px solid ${alpha(theme.palette.divider, 0.5)}`,
                  py: 2.5,
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "text.secondary",
                }}
              >
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (hasActions ? 1 : 0)} sx={{ py: 10, textAlign: "center" }}>
                <Typography variant="body2" sx={{ opacity: 0.5, letterSpacing: "0.1em" }}>
                  {emptyMessage.toUpperCase()}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row, index) => (
              <TableRow
                key={row.id || index}
                onClick={() => onRowClick?.(row)}
                sx={{
                  cursor: onRowClick ? "pointer" : "default",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                    "& td": { color: "primary.main" }
                  },
                  "& td": { 
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                    py: 2,
                    fontSize: "0.85rem",
                  }
                }}
              >
                {columns.map((col) => (
                  <TableCell key={col.id} align={col.align || "left"}>
                    {col.cell 
                      ? col.cell(row[col.accessorKey as string || col.id], row) 
                      : (row[col.accessorKey as string || col.id] ?? "-")}
                  </TableCell>
                ))}
                {hasActions && (
                  <TableCell align="right">
                    <Box sx={{ display: "flex", gap: 0.5, justifyContent: "flex-end" }}>
                      {onView && (
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); onView(row); }} sx={{ "&:hover": { color: "primary.main" } }}>
                          <IconVisibility sx={{ fontSize: 18 }} />
                        </IconButton>
                      )}
                      {onEdit && (
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); onEdit(row); }} sx={{ "&:hover": { color: "info.main" } }}>
                          <IconEdit sx={{ fontSize: 18 }} />
                        </IconButton>
                      )}
                      {onDelete && (
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); onDelete(row); }} sx={{ "&:hover": { color: "error.main" } }}>
                          <IconDelete sx={{ fontSize: 18 }} />
                        </IconButton>
                      )}
                    </Box>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {enablePagination && sortedData.length > pageSize && (
        <Box sx={{ p: 2.5, display: "flex", justifyContent: "center", borderTop: `1px solid ${alpha(theme.palette.divider, 0.2)}`, bgcolor: alpha(theme.palette.common.black, 0.1) }}>
          <Pagination 
            count={Math.ceil(sortedData.length / pageSize)} 
            page={page} 
            onChange={(_, val) => setPage(val)}
            size="small"
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                fontWeight: 700,
                borderRadius: 1,
              }
            }}
          />
        </Box>
      )}
    </TableContainer>
  );
}
