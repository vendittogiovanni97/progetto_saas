"use client";

import {
  Box,
  Typography,
  LinearProgress,
  Chip,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Project } from "../../types/types";
import { TableGenericColumn, TableGeneric } from "@/components/ui/table";

interface ProjectsTableProps {
  projects: Project[];
  onEditProject: (project: Project) => void;
  onViewProject: (project: Project) => void;
}

export function ProjectsTable({
  projects,
  onEditProject,
  onViewProject,
}: ProjectsTableProps) {
  const theme = useTheme();

  const columns: TableGenericColumn<Project>[] = [
    {
      id: "id",
      header: "ID",
      accessorKey: "id",
      width: 100,
    },
    {
      id: "name",
      header: "Project Name",
      accessorKey: "name",
      cell: (value) => (
        <Typography sx={{ fontWeight: 700, color: "primary.main" }}>{value}</Typography>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      width: 120,
      cell: (value, row) => (
        <Chip
          label={String(value || "").toUpperCase()}
          size="small"
          color={row.statusColor as any}
          variant="outlined"
          sx={{
            fontSize: "0.6rem",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            height: 22,
            borderRadius: 1,
            borderWidth: 2,
            bgcolor: alpha(theme.palette[row.statusColor as 'primary' | 'success' | 'error']?.main || theme.palette.primary.main, 0.05),
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
        <Box sx={{ width: "100%", pr: 2 }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5, px: 0.5 }}
          >
            <Typography sx={{ fontSize: "0.6rem", fontWeight: 800, color: "text.secondary", textTransform: "uppercase" }}>
              {value > 0 ? "In Progress" : "Queued"}
            </Typography>
            <Typography sx={{ fontSize: "0.6rem", fontWeight: 900, color: "primary.main" }}>
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
              bgcolor: alpha(theme.palette.common.white, 0.1),
              "& .MuiLinearProgress-bar": { borderRadius: 2 }
            }}
          />
        </Box>
      ),
    },
    {
      id: "time",
      header: "Last Update",
      accessorKey: "time",
      width: 140,
      align: "right",
    },
  ];

  return (
    <TableGeneric
      data={projects}
      columns={columns}
      enableSorting
      onView={onViewProject}
      onEdit={onEditProject}
      emptyMessage="No projects available"
    />
  );
}
