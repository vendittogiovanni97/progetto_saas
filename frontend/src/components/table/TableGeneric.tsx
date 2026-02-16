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
      p: 2.5, 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 2.5,
      background: `linear-gradient(90deg, ${alpha(theme.palette.common.black, 0.4)} 0%, ${alpha(theme.palette.common.black, 0.1)} 100%)`,
      borderBottom: `1px solid ${alpha("#fff", 0.08)}`
    }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        {title && (
          <Typography variant="h6" sx={{ 
            fontSize: "0.85rem", 
            fontWeight: 900, 
            color: "primary.main", 
            letterSpacing: "0.2em",
            textShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.3)}`
          }}>
            {title.toUpperCase()}
          </Typography>
        )}
        <TextField
          size="small"
          placeholder="SEARCH RECORDS..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          autoComplete="off"
          sx={{ 
            width: 280,
            "& .MuiOutlinedInput-root": {
              fontSize: "0.8rem",
              bgcolor: alpha("#fff", 0.03),
              borderRadius: 3,
              transition: "all 0.2s",
              border: `1px solid ${alpha("#fff", 0.1)}`,
              "&:hover": { bgcolor: alpha("#fff", 0.06), borderColor: alpha("#fff", 0.2) },
              "&.Mui-focused": { bgcolor: alpha("#fff", 0.08), borderColor: theme.palette.primary.main, boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}` },
              "& fieldset": { border: "none" }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch sx={{ fontSize: 18, color: "primary.main", opacity: 0.8 }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {onAdd && (
          <ButtonGeneric.Primary
            onClick={onAdd}
            startIcon={<IconAdd />}
            sx={{ 
              px: 3, 
              borderRadius: 2.5,
              boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.3)}`,
              "&:hover": { boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}` }
            }}
          >
            {addLabel}
          </ButtonGeneric.Primary>
        )}
        {renderTopToolbarCustomActions?.()}
        
        {onRefresh && (
          <Tooltip title="REFRESH">
            <IconButton 
              size="small" 
              onClick={onRefresh}
              sx={{ 
                bgcolor: alpha("#fff", 0.05),
                "&:hover": { bgcolor: alpha("#fff", 0.1), transform: "rotate(180deg)" },
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
              }}
            >
              <IconRefresh sx={{ fontSize: 18, opacity: 0.7 }} />
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
        bgcolor: alpha("#111418", 0.4),
        backdropFilter: "blur(40px) saturate(150%)",
        border: `1px solid ${alpha("#fff", 0.08)}`,
        borderRadius: 5,
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        "&::-webkit-scrollbar": { width: 6, height: 6 },
        "&::-webkit-scrollbar-thumb": { 
          bgcolor: alpha(theme.palette.primary.main, 0.15), 
          borderRadius: 10,
          "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.3) }
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
          bgcolor: alpha("#000", 0.6),
          backdropFilter: "blur(4px)"
        }}>
          <CircularProgress size={32} thickness={5} sx={{ color: "primary.main" }} />
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
                  bgcolor: alpha(theme.palette.common.black, 0.5),
                  borderBottom: `1px solid ${alpha("#fff", 0.1)}`,
                  py: 3,
                  fontSize: "0.65rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: alpha("#fff", 0.5),
                  width: col.width,
                  transition: "all 0.2s",
                }}
              >
                {col.enableSorting !== false && enableSorting ? (
                  <TableSortLabel
                    active={sortConfig?.key === col.id}
                    direction={sortConfig?.key === col.id ? sortConfig.direction : "asc"}
                    onClick={() => handleSort(col.id)}
                    sx={{
                      "&.Mui-active": { color: "primary.main" },
                      "& .MuiTableSortLabel-icon": { color: "primary.main !important", opacity: 0.8 },
                      "&:hover": { color: alpha("#fff", 0.8) }
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
                  bgcolor: alpha(theme.palette.common.black, 0.5),
                  borderBottom: `1px solid ${alpha("#fff", 0.1)}`,
                  py: 3,
                  fontSize: "0.65rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: alpha("#fff", 0.5),
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
              <TableCell colSpan={columns.length + (hasActions ? 1 : 0)} sx={{ py: 12, textAlign: "center" }}>
                <Typography variant="body2" sx={{ opacity: 0.3, letterSpacing: "0.2em", fontWeight: 700 }}>
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
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  borderBottom: { xs: `1px solid ${alpha(theme.palette.divider, 0.1)}`, sm: "none" },
                  mb: { xs: 2.5, sm: 0 },
                  mx: { xs: 1.5, sm: 0 },
                  borderRadius: { xs: 3, sm: 0 },
                  bgcolor: { 
                    xs: alpha(theme.palette.background.paper, 0.2), 
                    sm: index % 2 === 0 ? alpha("#fff", 0.01) : "transparent" 
                  },
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.06),
                    transform: { sm: "scale(1.002) translateZ(0)" },
                    boxShadow: { sm: `inset 4px 0 0 ${theme.palette.primary.main}, 0 4px 20px rgba(0,0,0,0.15)` },
                    "& td": { 
                      color: "#fff",
                      borderColor: alpha(theme.palette.primary.main, 0.15) 
                    }
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
                      borderBottom: { xs: "none", sm: `1px solid ${alpha("#fff", 0.04)}` },
                      py: { xs: 1.5, sm: 2.5 },
                      px: { xs: 2.5, sm: 2.5 },
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      color: alpha("#fff", 0.7),
                      transition: "all 0.2s",
                      "&::before": {
                        content: `"${col.header}"`,
                        display: { xs: "block", sm: "none" },
                        fontSize: "0.6rem",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        color: "primary.main",
                        opacity: 0.7,
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
                      borderBottom: { xs: "none", sm: `1px solid ${alpha("#fff", 0.04)}` },
                      py: { xs: 1.5, sm: 2.5 },
                      px: { xs: 2.5, sm: 2.5 },
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                      {onView && (
                        <IconButton 
                          size="small" 
                          onClick={(e) => { e.stopPropagation(); onView(row); }} 
                          sx={{ 
                            color: "primary.main",
                            bgcolor: alpha(theme.palette.primary.main, 0.08),
                            "&:hover": { 
                              bgcolor: alpha(theme.palette.primary.main, 0.15),
                              transform: "scale(1.1)"
                            },
                            transition: "all 0.2s"
                          }}
                        >
                          <IconVisibility sx={{ fontSize: 18 }} />
                        </IconButton>
                      )}
                      {onEdit && (
                        <IconButton 
                          size="small" 
                          onClick={(e) => { e.stopPropagation(); onEdit(row); }} 
                          sx={{ 
                            color: "info.main",
                            bgcolor: alpha(theme.palette.info.main, 0.08),
                            "&:hover": { 
                              bgcolor: alpha(theme.palette.info.main, 0.15),
                              transform: "scale(1.1)"
                            },
                            transition: "all 0.2s"
                          }}
                        >
                          <IconEdit sx={{ fontSize: 18 }} />
                        </IconButton>
                      )}
                      {onDelete && (
                        <IconButton 
                          size="small" 
                          onClick={(e) => { e.stopPropagation(); onDelete(row); }} 
                          sx={{ 
                            color: "error.main",
                            bgcolor: alpha(theme.palette.error.main, 0.08),
                            "&:hover": { 
                              bgcolor: alpha(theme.palette.error.main, 0.15),
                              transform: "scale(1.1)"
                            },
                            transition: "all 0.2s"
                          }}
                        >
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
        <Box sx={{ 
          p: 3, 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          borderTop: `1px solid ${alpha("#fff", 0.08)}`, 
          background: `linear-gradient(0deg, ${alpha(theme.palette.common.black, 0.3)} 0%, transparent 100%)`
        }}>
          <Typography variant="caption" sx={{ opacity: 0.4, fontWeight: 700, letterSpacing: 1 }}>
            SHOWING {paginatedData.length} OF {filteredData.length} RECORDS
          </Typography>
          <Pagination 
            count={Math.ceil(filteredData.length / pageSize)} 
            page={page} 
            onChange={(_, val) => setPage(val)}
            size="small"
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                fontWeight: 800,
                borderRadius: 2,
                fontSize: "0.75rem",
                "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.1) },
                "&.Mui-selected": { 
                  boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.3)}`,
                  fontWeight: 900
                }
              }
            }}
          />
        </Box>
      )}
    </TableContainer>
  );

}
