"use client";

import { Box, TextField, alpha, useTheme, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useProjects } from "./hooks/useProjects";
import { ButtonGeneric } from "@/components/ui/button";
import { ProjectsTable } from "./components/list/ProjectsTable";
import { ProjectComposer } from "./components/ProjectComposer";
import { IconAdd } from "@/components/icons/icons";
import { PageHeaderGeneric } from "@/components/layout/page-header";

export function ProjectsPage() {
  const router = useRouter();
  const theme = useTheme();
  
  const {
    search,
    setSearch,
    projects,
    isLoadingList,
    listError,
    fetchProjects,
    selectedProjectForDialog,
    isDialogOpen,
    setIsDialogOpen,
    handleEditProject,
    handleCloseDialog,
  } = useProjects();

  const handleCreateProject = () => {
    setIsDialogOpen(true);
  };

  const handleViewProject = (project: any) => {
    router.push(`/dashboard/projects/${project.id}`);
  };

  const headerActions = (
    <>
      <TextField
        size="small"
        placeholder="SEARCH_PROJECTS..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          width: 300,
          "& .MuiOutlinedInput-root": {
            fontSize: "0.75rem",
            bgcolor: alpha(theme.palette.background.paper, 0.3),
          },
        }}
        autoComplete="off"
      />
      <ButtonGeneric.Primary
        onClick={handleCreateProject}
        startIcon={<IconAdd />}
      >
        New Project
      </ButtonGeneric.Primary>
    </>
  );

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
      <ProjectsTable
        projects={projects}
        onEditProject={handleEditProject}
        onViewProject={handleViewProject}
      />
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <PageHeaderGeneric
        title="Projects Control"
        subtitle="Manage your projects and AI agents"
        actions={headerActions}
      />

      {renderContent()}

      <ProjectComposer
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={() => fetchProjects()}
        initialProject={selectedProjectForDialog}
      />
    </Box>
  );
}
