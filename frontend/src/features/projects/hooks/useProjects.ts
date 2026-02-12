"use client";

import { useState, useCallback, useEffect } from "react";
import { projectService } from "../services/services";
import { ProjectWithRelations } from "../interfaces/Project.entity";
import { useThemeContext } from "@/providers/ThemeContext";

export function useProjects(projectId?: string) {
  const { showSnack } = useThemeContext();
  
  // List State
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<ProjectWithRelations[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  // Dialog State
  const [selectedProjectForDialog, setSelectedProjectForDialog] = useState<ProjectWithRelations | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Detail State
  const [project, setProject] = useState<ProjectWithRelations | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

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

  const fetchProjectDetail = useCallback(async (id: string) => {
    setIsLoadingDetail(true);
    try {
      const response = await projectService.getProject(Number(id));
      if (response.data) {
        setProject(response.data);
      }
    } catch (err) {
      console.error("Error fetching project:", err);
      showSnack("Errore nel caricamento dei dettagli progetto", "alert");
    } finally {
      setIsLoadingDetail(false);
    }
  }, [showSnack]);

  useEffect(() => {
    if (!projectId) {
      fetchProjects();
    } else {
      fetchProjectDetail(projectId);
    }
  }, [projectId, fetchProjects, fetchProjectDetail]);

  const handleEditProject = (p: ProjectWithRelations) => {
    setSelectedProjectForDialog(p);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProjectForDialog(null);
  };

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toString().toLowerCase().includes(search.toLowerCase())
  );

  return {
    search,
    setSearch,
    projects: filteredProjects,
    isLoadingList,
    listError,
    fetchProjects,
    selectedProjectForDialog,
    isDialogOpen,
    setIsDialogOpen,
    handleEditProject,
    handleCloseDialog,
    project,
    isLoadingDetail,
  };
}
