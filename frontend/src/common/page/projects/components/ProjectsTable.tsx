"use client";

import {
  Box,
  Typography,
  LinearProgress,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  TableGeneric,
  TableGenericColumn,
} from "@/common/components/table/TableGeneric";
import { Project } from "../types";

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
