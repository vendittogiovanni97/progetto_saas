"use client";

import {
  Box,
  Typography,
  Chip,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Project, ProjectWithRelations, ProjectStatus } from "../../interfaces/Project.entity";
import { TableGenericColumn, TableGeneric } from "@/components/ui/table";

interface ProjectsTableProps {
  projects: ProjectWithRelations[];
  onEditProject: (project: ProjectWithRelations) => void;
  onViewProject: (project: ProjectWithRelations) => void;
}

// Helper per formattare la data
const formatDate = (date: Date | string) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('it-IT', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Helper per ottenere il colore dello stato
const getStatusColor = (status: ProjectStatus): "success" | "warning" | "error" | "default" => {
  switch (status) {
    case 'ATTIVO': return 'success';
    case 'DISATTIVATO': return 'warning';
    case 'ARCHIVIATO': return 'error';
    default: return 'default';
  }
};

export function ProjectsTable({
  projects,
  onEditProject,
  onViewProject,
}: ProjectsTableProps) {
  const theme = useTheme();

  const columns: TableGenericColumn<ProjectWithRelations>[] = [
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
      id: "category",
      header: "Category",
      accessorKey: "category",
      width: 150,
      cell: (value) => (
        <Typography sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
          {value?.name || "Generic"}
        </Typography>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      width: 120,
      cell: (value) => {
        const status = value as ProjectStatus;
        const color = getStatusColor(status);
        
        // Helper per estrarre il colore esadecimale dalla palette
        const getHexColor = () => {
          if (color === 'default') return theme.palette.grey[500];
          const paletteColor = theme.palette[color];
          return 'main' in paletteColor ? paletteColor.main : theme.palette.primary.main;
        };

        const hexColor = getHexColor();

        return (
          <Chip
            label={status}
            size="small"
            color={color}
            variant="outlined"
            sx={{
              fontSize: "0.6rem",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              height: 22,
              borderRadius: 1,
              borderWidth: 2,
              bgcolor: alpha(hexColor, 0.05),
            }}
          />
        );
      },
    },

    {
      id: "updatedAt",
      header: "Last Update",
      accessorKey: "updatedAt",
      width: 160,
      align: "right",
      cell: (value) => (
        <Typography sx={{ fontSize: "0.75rem", fontFamily: 'monospace' }}>
          {formatDate(value as string)}
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

