"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useProjectsPage } from "./hooks/useProjectsPage";
import { TextField, alpha, useTheme } from "@mui/material";
import { ButtonGeneric } from "@/components/ui/button";
import { ProjectsTable } from "./components/list/ProjectsTable";
import { ProjectDialog } from "./components/dialogs/ProjectDialog";
import { TemplateGallery } from "./components/list/TemplateGallery";
import { projects } from "./services/mockData";
import { Project, ProjectFormData } from "./types/types";
import { useState } from "react";
import { ChatbotWizard } from "../chatbots/components/ChatbotWizard";
import { IconAdd } from "@/components/icons/icons";
import { PageHeaderGeneric } from "@/components/layout/page-header";

export function ProjectsPage() {
  const router = useRouter();
  const theme = useTheme();
  const [isTemplateGalleryOpen, setIsTemplateGalleryOpen] = useState(false);
  const [isChatbotWizardOpen, setIsChatbotWizardOpen] = useState(false);
  
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
    handleCloseDialog();
  };
  
  const handleViewProject = (project: Project) => {
    router.push(`/dashboard/projects/${project.id}`);
  };

  const handleTemplateSelect = (templateId: string) => {
    setIsTemplateGalleryOpen(false);
    if (templateId === "chatbot") {
      setIsChatbotWizardOpen(true);
    } else {
      handleCreateProject();
    }
  };

  const handleChatbotSave = (chatbot: any) => {
    setIsChatbotWizardOpen(false);
    // Reindirizza l'utente alla pagina del chatbot appena creato
    router.push(`/dashboard/chatbots/${chatbot.id}`);
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <PageHeaderGeneric
        title="Projects Control"
        subtitle="SYSTEM_VERSION: 1.0.4 // ACTIVE_PROXIES: 04"
        actions={headerActions}
      />

      <ProjectsTable
        projects={filteredProjects}
        onEditProject={handleEditProject}
        onViewProject={handleViewProject}
      />

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
