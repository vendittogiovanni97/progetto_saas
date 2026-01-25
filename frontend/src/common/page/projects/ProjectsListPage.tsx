"use client";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useProjectsPage } from "./hooks/useProjectsPage";
import { ProjectsHeader } from "./components/ProjectsHeader";
import { ProjectsTable } from "./components/ProjectsTable";
import { ProjectDialog } from "./components/ProjectDialog";
import { TemplateGallery } from "./components/TemplateGallery";
import { projects } from "./services/mockData";
import { Project, ProjectFormData } from "./types";
import { useState } from "react";
import { ChatbotWizard } from "./chatbot/ChatbotWizard";

export function ProjectsPage() {
  const router = useRouter();
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <ProjectsHeader
        search={search}
        onSearchChange={setSearch}
        onCreateProject={() => setIsTemplateGalleryOpen(true)}
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
