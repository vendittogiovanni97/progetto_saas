/**
 * Tabella dei progetti attivi
 * Utilizza TableGeneric per gestione completa sorting, pagination, filtering
 */

import {
  Box,
  Typography,
  LinearProgress,
  Chip,
  IconButton,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import {
  TableGeneric,
  TableGenericColumn,
} from "@/common/components/table/TableGeneric";
import { Project } from "../types";

interface ProjectsTableProps {
  projects: Project[];
  onProjectClick: (projectId: string) => void;
}

export function ProjectsTable({
  projects,
  onProjectClick,
}: ProjectsTableProps) {
  const theme = useTheme();

  const columns: TableGenericColumn<Project>[] = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      width: 100,
      cell: (value) => (
        <Typography
          sx={{
            fontFamily: "monospace",
            fontSize: "0.875rem",
            color: "text.secondary",
          }}
        >
          {value}
        </Typography>
      ),
    },
    {
      id: "name",
      header: "Project Name",
      accessorKey: "name",
      cell: (value) => (
        <Typography sx={{ fontWeight: 500 }}>{value}</Typography>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      width: 120,
      cell: (value, row) => (
        <Chip
          label={value}
          size="small"
          color={row.statusColor as any}
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
      id: "progress",
      header: "Progress",
      accessorKey: "progress",
      width: 200,
      cell: (value, row) => (
        <Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography sx={{ fontSize: "0.625rem", color: "text.secondary" }}>
              {value > 0 ? "Processing" : "Queued"}
            </Typography>
            <Typography sx={{ fontSize: "0.625rem", color: "white" }}>
              {value}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={value}
            color={row.statusColor as any}
            sx={{
              height: 4,
              borderRadius: 2,
              bgcolor: theme.palette.divider,
            }}
          />
        </Box>
      ),
    },
    {
      id: "time",
      header: "Last Update",
      accessorKey: "time",
      width: 120,
      align: "right",
      cell: (value) => (
        <Typography
          sx={{
            textAlign: "right",
            fontFamily: "monospace",
            fontSize: "0.75rem",
            color: "text.secondary",
          }}
        >
          {value}
        </Typography>
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: "background.paper",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: alpha(theme.palette.background.default, 0.5),
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontSize: "0.875rem" }}>
          Active Projects List
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton size="small" sx={{ color: "text.secondary" }}>
            <Box
              component="span"
              className="material-symbols-outlined"
              sx={{ fontSize: 20 }}
            >
              filter_list
            </Box>
          </IconButton>
          <IconButton size="small" sx={{ color: "text.secondary" }}>
            <Box
              component="span"
              className="material-symbols-outlined"
              sx={{ fontSize: 20 }}
            >
              more_vert
            </Box>
          </IconButton>
        </Box>
      </Box>

      <TableGeneric
        data={projects}
        columns={columns}
        enableSorting
        onRowClick={(row) => onProjectClick(row.id)}
        emptyMessage="No projects available"
      />
    </Box>
  );
}
