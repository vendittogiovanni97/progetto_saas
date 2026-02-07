"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useProjectsPage } from "./hooks/useProjectsPage";
import { TextField, alpha, useTheme, CircularProgress, Typography } from "@mui/material";
import { ButtonGeneric } from "@/components/ui/button";
import { ProjectsTable } from "./components/list/ProjectsTable";
import { ProjectDialog } from "./components/dialogs/ProjectDialog";
import { TemplateGallery } from "./components/list/TemplateGallery";
import { useState, useEffect } from "react";
import { ChatbotWizard } from "./components/chatbot/ChatbotWizard";
import { IconAdd } from "@/components/icons/icons";
import { PageHeaderGeneric } from "@/components/layout/page-header";
import { useThemeContext } from "@/providers/ThemeContext";
import { CreateProjectDTO, ProjectWithRelations } from "./interfaces/Project.entity";
import { projectService } from "./services/services";

export function ProjectsPage() {
  const router = useRouter();
  const theme = useTheme();
  const { showSnack } = useThemeContext();
  const [isTemplateGalleryOpen, setIsTemplateGalleryOpen] = useState(false);
  const [isChatbotWizardOpen, setIsChatbotWizardOpen] = useState(false);
  const [projects, setProjects] = useState<ProjectWithRelations[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const {
    search,
    setSearch,
    selectedProject,
    isDialogOpen,
    handleCreateProject,
    handleEditProject,
    handleCloseDialog,
  } = useProjectsPage();

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await projectService.getProjects(1); // TODO: Get accountId from auth
      if (response.data) {
        setProjects(response.data);
      }
    } catch (err) {
      console.error("Errore nel recupero dei progetti:", err);
      setError("Impossibile caricare i progetti");
      showSnack("Errore nel caricamento dei progetti // SYSTEM_FAIL", "alert");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toString().toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveProject = (data: CreateProjectDTO) => {
    // TODO: Integrare con API
    console.log("Save project:", data);
    handleCloseDialog();
  };
  
  const handleViewProject = (project: ProjectWithRelations) => {
    router.push(`/dashboard/projects/${project.id}`);
  };

  const handleTemplateSelect = (categoryId: number) => {
    setIsTemplateGalleryOpen(false);
    // Supponendo che la categoria con ID 1 sia "Chatbot AI" come indicato dall'utente
    if (categoryId === 1) {
      setIsChatbotWizardOpen(true);
    } else {
      handleCreateProject();
    }
  };

  const handleChatbotSave = (project: ProjectWithRelations) => {
    setIsChatbotWizardOpen(false);
    // Ricarica la lista progetti
    fetchProjects();
    // Reindirizza l'utente alla pagina del progetto appena creato
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
        onClick={() => setIsTemplateGalleryOpen(true)}
        startIcon={<IconAdd />}
      >
        New Project
      </ButtonGeneric.Primary>
    </>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      );
    }

    return (
      <ProjectsTable
        projects={filteredProjects}
        onEditProject={handleEditProject}
        onViewProject={handleViewProject}
      />
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <PageHeaderGeneric
        title="Projects Control"
        subtitle="SYSTEM_VERSION: 1.0.4 // ACTIVE_PROXIES: 04"
        actions={headerActions}
      />

      {renderContent()}

      <TemplateGallery
        open={isTemplateGalleryOpen}
        onClose={() => setIsTemplateGalleryOpen(false)}
        onSelect={handleTemplateSelect}
      />


      <ChatbotWizard
        open={isChatbotWizardOpen}
        onClose={() => setIsChatbotWizardOpen(false)}
        onSave={handleChatbotSave}
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
