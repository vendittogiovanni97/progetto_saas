"use client";

import { useState } from "react";
import { ProjectWithRelations } from "../interfaces/Project.entity";

export function useProjectsPage() {
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectWithRelations | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateProject = () => {
    setSelectedProject(null);
    setIsDialogOpen(true);
  };

  const handleEditProject = (project: ProjectWithRelations) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProject(null);
  };

  return {
    search,
    setSearch,
    selectedProject,
    isDialogOpen,
    handleCreateProject,
    handleEditProject,
    handleCloseDialog,
  };
}

