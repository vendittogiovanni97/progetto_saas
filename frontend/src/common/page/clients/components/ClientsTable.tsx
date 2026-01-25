/**
 * Tabella clients con TableGeneric
 */

import { Box, Chip, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  TableGeneric,
  TableGenericColumn,
} from "@/common/components/table/TableGeneric";
import { Client } from "../types";

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
      case "active":
        return "success";
      case "pending":
        return "warning";
      case "inactive":
        return "default";
      default:
        return "default";
    }
  };

  const getPlanColor = (plan: Client["plan"]) => {
    switch (plan) {
      case "enterprise":
        return "primary";
      case "professional":
        return "info";
      case "basic":
        return "default";
      default:
        return "default";
    }
  };

  const columns: TableGenericColumn<Client>[] = [
    {
      id: "name",
      header: "Client Name",
      accessorKey: "name",
      cell: (value, row) => (
        <Box>
          <Box sx={{ fontWeight: 500 }}>{value}</Box>
          {row.company && (
            <Box
              sx={{
                fontSize: "0.75rem",
                color: "text.secondary",
                fontFamily: "monospace",
              }}
            >
              {row.company}
            </Box>
          )}
        </Box>
      ),
    },
    {
      id: "email",
      header: "Email",
      accessorKey: "email",
      cell: (value) => (
        <Box
          sx={{
            fontSize: "0.875rem",
            fontFamily: "monospace",
            color: "text.secondary",
          }}
        >
          {value}
        </Box>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      width: 120,
      cell: (value) => (
        <Chip
          label={value.toUpperCase()}
          size="small"
          color={getStatusColor(value as Client["status"])}
          variant="outlined"
          sx={{
            fontSize: "0.625rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            height: 24,
          }}
        />
      ),
    },
    {
      id: "plan",
      header: "Plan",
      accessorKey: "plan",
      width: 120,
      cell: (value) => (
        <Chip
          label={value}
          size="small"
          color={getPlanColor(value as Client["plan"])}
          variant="outlined"
          sx={{
            fontSize: "0.625rem",
            fontWeight: 700,
            textTransform: "capitalize",
            height: 24,
          }}
        />
      ),
    },
    {
      id: "projects",
      header: "Projects",
      accessorKey: "projects",
      width: 100,
      align: "center",
      cell: (value) => (
        <Box sx={{ fontFamily: "monospace", fontWeight: 500 }}>{value}</Box>
      ),
    },
    {
      id: "revenue",
      header: "Revenue",
      accessorKey: "revenue",
      width: 120,
      align: "right",
      cell: (value) => (
        <Box
          sx={{
            fontFamily: "monospace",
            fontWeight: 500,
            color: "success.main",
          }}
        >
          {formatCurrency(value)}
        </Box>
      ),
    },
    {
      id: "createdAt",
      header: "Created",
      accessorKey: "createdAt",
      width: 120,
      cell: (value) => (
        <Box
          sx={{
            fontSize: "0.75rem",
            fontFamily: "monospace",
            color: "text.secondary",
          }}
        >
          {formatDate(value)}
        </Box>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      accessorKey: "id",
      width: 120,
      align: "right",
      enableSorting: false,
      cell: (value, row) => (
        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <Button
            size="small"
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
              onEditClient(row);
            }}
            sx={{
              fontSize: "0.75rem",
              px: 1.5,
              minWidth: "auto",
              borderColor: theme.palette.divider,
              color: "text.secondary",
              "&:hover": {
                borderColor: "primary.main",
                color: "primary.main",
              },
            }}
          >
            Edit
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <TableGeneric
        data={clients}
        columns={columns}
        enableSorting
        enablePagination
        pageSize={10}
        emptyMessage="No clients found"
      />
    </Box>
  );
}
