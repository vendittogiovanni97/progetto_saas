"use client";

import {
  Box,
  Typography,
  Chip,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Project } from "../../interfaces/Project.entity";
import { ProjectType } from "@/types/shared.types";
import { TableGenericColumn, TableGeneric } from "@/components/ui/table";

interface ProjectsTableProps {
  projects: Project[];
  onEditProject: (project: Project) => void;
  onViewProject: (project: Project) => void;
}

// Helper per formattare la data
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('it-IT', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Helper per ottenere il colore del tipo
const getTypeColor = (type: ProjectType): "primary" | "success" | "warning" | "error" => {
  switch (type) {
    case ProjectType.CHATBOT: return 'primary';
    case ProjectType.FORM: return 'success';
    case ProjectType.WORKFLOW: return 'warning';
    case ProjectType.API: return 'error';
    default: return 'primary';
  }
};

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
      width: 80,
      cell: (value) => (
        <Typography sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
          #{value}
        </Typography>
      ),
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
      id: "type",
      header: "Type",
      accessorKey: "type",
      width: 120,
      cell: (value, row) => (
        <Chip
          label={String(value || "").toUpperCase()}
          size="small"
          color={getTypeColor(row.type)}
          variant="outlined"
          sx={{
            fontSize: "0.6rem",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            height: 22,
            borderRadius: 1,
            borderWidth: 2,
            bgcolor: alpha(theme.palette[getTypeColor(row.type)]?.main || theme.palette.primary.main, 0.05),
          }}
        />
      ),
    },
    {
      id: "description",
      header: "Description",
      accessorKey: "description",
      cell: (value) => (
        <Typography sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
          {value || "-"}
        </Typography>
      ),
    },
    {
      id: "updatedAt",
      header: "Last Update",
      accessorKey: "updatedAt",
      width: 160,
      align: "right",
      cell: (value) => (
        <Typography sx={{ fontSize: "0.75rem", fontFamily: 'monospace' }}>
          {formatDate(String(value))}
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
