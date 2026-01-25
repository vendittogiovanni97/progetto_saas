"use client";

import { Box } from "@mui/material";
import { ProjectControlGrid } from "./components/ProjectControlGrid";
import { ProjectServicesPanel } from "./components/ProjectServicesPanel";
import { ProjectDetailDialog } from "./components/ProjectDetailDialog";
import { useProjectPage } from "./hooks/useProjectPage";

interface ProjectPageProps {
  projectId: string;
}

export function ProjectPage({ projectId }: ProjectPageProps) {
  const {
    activeTab,
    selectedCardId,
    selectedCard,
    handleTabChange,
    handleCardSelect,
    handleCardDeselect,
  } = useProjectPage();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        height: "calc(100vh - 128px)",
        overflow: "hidden",
        m: -4,
      }}
    >
      <ProjectControlGrid
        projectId={projectId}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onCardClick={handleCardSelect}
      />

      <ProjectServicesPanel />

      <ProjectDetailDialog
        open={!!selectedCardId}
        selectedCard={selectedCard}
        selectedCardId={selectedCardId}
        onClose={handleCardDeselect}
      />
    </Box>
  );
}

