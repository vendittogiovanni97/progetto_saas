"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useProjectsPage } from "./hooks/useProjectsPage";
import { ProjectsHeader } from "./components/ProjectsHeader";
import { ProjectsTable } from "./components/ProjectsTable";
import { ProjectDialog } from "./components/ProjectDialog";
import { projects } from "./services/mockData";
import { Project, ProjectFormData } from "./types";

export function ProjectsPage() {
  const router = useRouter();
  const {
    search,
    setSearch,
    selectedProject,
    isDialogOpen,
    handleCreateProject,
    handleEditProject,
    handleCloseDialog,
  } = useProjectsPage();

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveProject = (data: ProjectFormData) => {
    // TODO: Integrare con API
    console.log("Save project:", data);
    if (selectedProject) {
      console.log("Update existing project:", selectedProject.id);
    } else {
      console.log("Create new project");
    }
  };
  
  const handleViewProject = (project: Project) => {
    router.push(`/dashboard/projects/${project.id}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <ProjectsHeader
        search={search}
        onSearchChange={setSearch}
        onCreateProject={handleCreateProject}
      />

      <ProjectsTable
        projects={filteredProjects}
        onEditProject={handleEditProject}
        onViewProject={handleViewProject}
      />

      <ProjectDialog
        open={isDialogOpen}
        project={selectedProject}
        onClose={handleCloseDialog}
        onSave={handleSaveProject}
      />
    </Box>
  );
}
