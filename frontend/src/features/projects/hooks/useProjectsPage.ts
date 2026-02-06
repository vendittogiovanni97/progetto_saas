"use client";

import { useState } from "react";
import { Project } from "@/types/shared.types";

export function useProjectsPage() {
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateProject = () => {
    setSelectedProject(null);
    setIsDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
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
