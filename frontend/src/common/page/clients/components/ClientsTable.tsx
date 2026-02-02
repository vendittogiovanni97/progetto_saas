/**
 * Tabella clients con TableGeneric
 */

import { Box, Chip, Typography, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  TableGeneric,
  TableGenericColumn,
} from "@/common/components/table/TableGeneric";
import { Client } from "../types/types";

interface ClientsTableProps {
  clients: Client[];
  onEditClient: (client: Client) => void;
}

export function ClientsTable({ clients, onEditClient }: ClientsTableProps) {
  const theme = useTheme();

  const formatCurrency = (value?: number) => {
    if (!value) return "-";
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("it-IT", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: Client["status"]) => {
    switch (status) {
      case "active": return "success";
      case "pending": return "warning";
      case "inactive": return "error";
      default: return "default";
    }
  };

  const getPlanColor = (plan: Client["plan"]) => {
    switch (plan) {
      case "enterprise": return "primary";
      case "professional": return "info";
      default: return "default";
    }
  };

  const columns: TableGenericColumn<Client>[] = [
    {
      id: "name",
      header: "Client Entity",
      accessorKey: "name",
      cell: (value, row) => (
        <Box>
          <Typography sx={{ fontWeight: 700, color: "primary.main" }}>{value}</Typography>
          {row.company && (
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.7rem",
                color: "text.secondary",
                opacity: 0.7,
                display: "block",
                mt: -0.5
              }}
            >
              {row.company.toUpperCase()}
            </Typography>
          )}
        </Box>
      ),
    },
    {
      id: "email",
      header: "Contact",
      accessorKey: "email",
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      width: 120,
      cell: (value) => (
        <Chip
          label={String(value || "").toUpperCase()}
          size="small"
          color={getStatusColor(value as Client["status"]) as any}
          variant="outlined"
          sx={{
            fontSize: "0.6rem",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            height: 22,
            borderRadius: 1,
            borderWidth: 2,
            bgcolor: alpha(theme.palette[getStatusColor(value as Client["status"]) as 'primary' | 'success' | 'error']?.main || theme.palette.primary.main, 0.05),
          }}
        />
      ),
    },
    {
      id: "plan",
      header: "System Plan",
      accessorKey: "plan",
      width: 120,
      cell: (value) => (
        <Chip
          label={String(value || "").toUpperCase()}
          size="small"
          color={getPlanColor(value as Client["plan"]) as any}
          variant="outlined"
          sx={{
            fontSize: "0.6rem",
            fontWeight: 800,
            height: 22,
            borderRadius: 1,
            borderColor: alpha(theme.palette.divider, 1),
            color: "text.secondary"
          }}
        />
      ),
    },
    {
      id: "projects",
      header: "Nodes",
      accessorKey: "projects",
      width: 100,
      align: "center",
      cell: (value) => (
        <Typography sx={{ fontWeight: 800, color: "primary.main" }}>{value}</Typography>
      ),
    },
    {
      id: "revenue",
      header: "Revenue",
      accessorKey: "revenue",
      width: 140,
      align: "right",
      cell: (value) => (
        <Typography
          sx={{
            fontWeight: 800,
            color: "success.main",
          }}
        >
          {formatCurrency(value)}
        </Typography>
      ),
    },
    {
      id: "createdAt",
      header: "Registered",
      accessorKey: "createdAt",
      width: 140,
      cell: (value) => formatDate(value),
    },
  ];

  return (
    <TableGeneric
      data={clients}
      columns={columns}
      enableSorting
      enablePagination
      onEdit={onEditClient}
      emptyMessage="No clients found in system"
    />
  );
}
