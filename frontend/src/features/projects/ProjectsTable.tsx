"use client";

import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { projectService } from "./services/services";
import { useThemeContext } from "@/providers/ThemeContext";
import { ProjectWithRelations, ProjectStatus } from "./interfaces/Project.entity";
import { TableGenericColumn, TableGeneric } from "@/components/table/TableGeneric";
import { PageHeaderGeneric } from "@/components/layout/page-header";
import { ProjectDialog } from "./components/dialog/ProjectDialog";
import { CustomModal } from "@/components/ui/customModal";
import { ButtonGeneric } from "@/components/ui/button";
import { formatDate } from "@/utils/dateUtils";
import { getStatusColor } from "@/utils/projectUtils";

export function ProjectsPage() {
  const theme = useTheme();
  const router = useRouter();
  const { showSnack } = useThemeContext();

  const [projects, setProjects] = useState<ProjectWithRelations[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  const [selectedProjectForDialog, setSelectedProjectForDialog] = useState<ProjectWithRelations | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"edit" | "delete">("edit");

  const fetchProjects = useCallback(async () => {
    setIsLoadingList(true);
    setListError(null);
    try {
      const response = await projectService.getProjects(1); // TODO: Get accountId from auth
      if (response.data) {
        setProjects(response.data);
      }
    } catch (err) {
      console.error("Errore nel recupero dei progetti:", err);
      showSnack("Errore nel caricamento dei progetti // SYSTEM_FAIL", "alert");
    } finally {
      setIsLoadingList(false);
    }
  }, [showSnack]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleEditProject = (p: ProjectWithRelations) => {
    setSelectedProjectForDialog(p);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProjectForDialog(null);
  };

  const handleCreateProject = () => {
    setSelectedProjectForDialog(null);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };

  const handleViewProject = (project: ProjectWithRelations) => {
    router.push(`/dashboard/projects/${project.id}`);
  };

  const handleDeleteClick = (project: ProjectWithRelations) => {
    setSelectedProjectForDialog(project);
    setDialogMode("delete");
    setIsDialogOpen(true);
  };

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
        
        const getHexColor = () => {
          if (color === 'default') return theme.palette.grey[500];
          const paletteColor = theme.palette[color as 'success' | 'warning' | 'error' | 'primary'];
          return (paletteColor as any).main || theme.palette.primary.main;
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

  const renderContent = () => {
    if (isLoadingList) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (listError) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
          <Typography color="error">{listError}</Typography>
        </Box>
      );
    }

    return (
      <TableGeneric
        data={projects}
        columns={columns}
        enableSorting
        onView={handleViewProject}
        onEdit={handleEditProject}
        onDelete={handleDeleteClick}
        emptyMessage="No projects available"
        onAdd={handleCreateProject}
        addLabel="New Project"
      />
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <PageHeaderGeneric
        title="Projects Control"
        subtitle="Manage your projects and AI agents"
      />

      {renderContent()}

      <ProjectDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={() => fetchProjects()}
        project={selectedProjectForDialog}
        mode={dialogMode}
      />
    </Box>
  );
}
