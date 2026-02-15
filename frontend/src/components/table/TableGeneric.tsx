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
  TextField,
  InputAdornment,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { 
  IconVisibility, 
  IconEdit, 
  IconDelete,
  IconSearch,
  IconRefresh,
  IconAdd,
} from "@/components/icons/icons";
import { ButtonGeneric } from "@/components/ui/button";
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
  title?: string;
  loading?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
  pageSize?: number;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onRefresh?: () => void;
  onExport?: () => void;
  onAdd?: () => void;
  addLabel?: string;
  stickyHeader?: boolean;
  renderTopToolbarCustomActions?: () => React.ReactNode;
}

export function TableGeneric<T extends Record<string, any>>({
  data,
  columns,
  title,
  loading = false,
  enableSorting = true,
  enablePagination = false,
  pageSize = 10,
  emptyMessage = "No data available",
  onRowClick,
  onView,
  onEdit,
  onDelete,
  onRefresh,
  //onExport,
  onAdd,
  addLabel = "Nuovo",
  stickyHeader = false,
  renderTopToolbarCustomActions,
}: TableGenericProps<T>) {
  const theme = useTheme();
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [page, setPage] = useState(1);
  const [globalFilter, setGlobalFilter] = useState("");

  // Filtering Logic (Local)
  const filteredData = useMemo(() => {
    if (!globalFilter) return data;
    const filter = globalFilter.toLowerCase();
    return data.filter((row) => {
      return Object.values(row).some((val) => 
        String(val).toLowerCase().includes(filter)
      );
    });
  }, [data, globalFilter]);

  // Sorting Logic
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredData, sortConfig]);

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
  const renderTopToolbar = () => (
    <Box sx={{ 
      p: 2, 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 2,
      bgcolor: alpha(theme.palette.common.black, 0.2),
      borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`
    }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {title && (
          <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 800, color: "primary.main", letterSpacing: "0.05em" }}>
            {title.toUpperCase()}
          </Typography>
        )}
        <TextField
          size="small"
          placeholder="SEARCH..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          autoComplete="off"
          sx={{ 
            width: 250,
            "& .MuiOutlinedInput-root": {
              fontSize: "0.75rem",
              bgcolor: alpha(theme.palette.background.paper, 0.3),
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch sx={{ fontSize: 18, opacity: 0.5 }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {onAdd && (
          <ButtonGeneric.Primary
            onClick={onAdd}
            startIcon={<IconAdd />}
          >
            {addLabel}
          </ButtonGeneric.Primary>
        )}
        {renderTopToolbarCustomActions?.()}
        
        {onRefresh && (
          <Tooltip title="REFRESH">
            <IconButton size="small" onClick={onRefresh}>
              <IconRefresh sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        bgcolor: alpha(theme.palette.background.paper, 0.1),
        backdropFilter: "blur(20px)",
        border: `1px solid white}`,
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        "&::-webkit-scrollbar": { width: 8, height: 8 },
        "&::-webkit-scrollbar-thumb": { 
          bgcolor: alpha(theme.palette.primary.main, 0.2), 
          borderRadius: 4 
        },
      }}
    >
      {renderTopToolbar()}

      {loading && (
        <Box sx={{ 
          position: "absolute", 
          top: 0, left: 0, right: 0, bottom: 0, 
          zIndex: 10, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          bgcolor: alpha(theme.palette.background.default, 0.5),
          backdropFilter: "blur(2px)"
        }}>
          <CircularProgress size={40} />
        </Box>
      )}

      <Table stickyHeader={stickyHeader} sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ display: { xs: "none", sm: "table-row" } }}>
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
                ACTIONS
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
                  display: { xs: "flex", sm: "table-row" },
                  flexDirection: "column",
                  cursor: onRowClick ? "pointer" : "default",
                  transition: "all 0.2s",
                  borderBottom: { xs: `1px solid ${alpha(theme.palette.divider, 0.2)}`, sm: "none" },
                  mb: { xs: 2, sm: 0 },
                  mx: { xs: 1, sm: 0 },
                  borderRadius: { xs: 2, sm: 0 },
                  bgcolor: { 
                    xs: alpha(theme.palette.background.paper, 0.3), 
                    sm: index % 2 === 0 ? alpha(theme.palette.common.white, 0.02) : "transparent" 
                  },
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                    "& td": { color: "primary.main" }
                  },
                }}
              >
                {columns.map((col) => (
                  <TableCell 
                    key={col.id} 
                    align={col.align || "left"}
                    sx={{
                      display: { xs: "flex", sm: "table-cell" },
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: { xs: "none", sm: `1px solid ${alpha(theme.palette.divider, 0.1)}` },
                      py: { xs: 1, sm: 2 },
                      px: { xs: 2, sm: 2 },
                      fontSize: "0.85rem",
                      "&::before": {
                        content: `"${col.header}"`,
                        display: { xs: "block", sm: "none" },
                        fontSize: "0.65rem",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        color: "text.secondary",
                        mr: 2,
                        width: "40%",
                        textAlign: "left"
                      }
                    }}
                  >
                    <Box sx={{ width: { xs: "60%", sm: "100%" }, textAlign: { xs: "right", sm: col.align || "left" } }}>
                      {col.cell 
                        ? col.cell(row[col.accessorKey as string || col.id], row) 
                        : (row[col.accessorKey as string || col.id] ?? "-")}
                    </Box>
                  </TableCell>
                ))}
                {hasActions && (
                  <TableCell 
                    align="right"
                    sx={{
                      display: { xs: "flex", sm: "table-cell" },
                      justifyContent: "flex-end",
                      borderBottom: { xs: "none", sm: `1px solid ${alpha(theme.palette.divider, 0.1)}` },
                      py: { xs: 1, sm: 2 },
                      px: { xs: 2, sm: 2 },
                    }}
                  >
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

      {enablePagination && filteredData.length > pageSize && (
        <Box sx={{ p: 2, display: "flex", justifyContent: "center", borderTop: `1px solid ${alpha(theme.palette.divider, 0.2)}`, bgcolor: alpha(theme.palette.common.black, 0.2) }}>
          <Pagination 
            count={Math.ceil(filteredData.length / pageSize)} 
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
