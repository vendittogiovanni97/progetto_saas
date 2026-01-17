/**
 * Componente principale per il pannello di controllo sinistro
 */

import { Box, Typography, IconButton } from "@mui/material";
import { ProjectTabs } from "./ProjectTabs";
import { ProjectTabContent } from "./ProjectTabContent";
import { TabValue } from "../types";

interface ProjectControlGridProps {
  projectId: string;
  activeTab: TabValue;
  onTabChange: (event: React.SyntheticEvent, newValue: TabValue) => void;
  onCardClick: (cardId: string) => void;
}

export function ProjectControlGrid({ projectId, activeTab, onTabChange, onCardClick }: ProjectControlGridProps) {
  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        p: { xs: 3, lg: 5 },
        position: "relative",
      }}
    >
      {/* Background Grid Pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          pointerEvents: "none",
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 1200, mx: "auto", width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", pt: 1, mb: 1 }}>
          <Box>
            <Typography variant="h2" sx={{ fontSize: "1.875rem", mb: 0.5 }}>
              Control Grid
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.875rem",
                fontFamily: "monospace",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Project ID: {projectId}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton size="small" sx={{ color: "text.secondary", "&:hover": { color: "white" } }}>
              <Box component="span" className="material-symbols-outlined">
                view_module
              </Box>
            </IconButton>
            <IconButton size="small" sx={{ color: "text.secondary", "&:hover": { color: "white" } }}>
              <Box component="span" className="material-symbols-outlined">
                list
              </Box>
            </IconButton>
          </Box>
        </Box>

        <ProjectTabs activeTab={activeTab} onChange={onTabChange} />

        <ProjectTabContent activeTab={activeTab} onCardClick={onCardClick} />
      </Box>
    </Box>
  );
}

