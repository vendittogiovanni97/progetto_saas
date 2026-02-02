/**
 * Componente per il contenuto delle tab
 */

import { Box, Typography, Paper } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { TabValue } from "../../types/types";
import { projectCards } from "../../services/mockData";

import { ProjectEnvVariables } from "./ProjectEnvVariables";
import { ProjectDeploymentTimeline } from "./ProjectDeploymentTimeline";
import { CardGeneric } from "@/components/ui/card";

interface ProjectTabContentProps {
  activeTab: TabValue;
  onCardClick: (cardId: string) => void;
}

export function ProjectTabContent({ activeTab, onCardClick }: ProjectTabContentProps) {
  const theme = useTheme();

  if (activeTab === 0) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
          gap: 2,
          pb: 5,
        }}
      >
        {projectCards.map((card) => (
          <CardGeneric
            key={card.id}
            title={card.title}
            subtitle={card.status}
            mediaImage={card.img}
            onClick={() => onCardClick(card.id)}
            isActive={card.isActive}
            isError={card.isError}
          />
        ))}
      </Box>
    );
  }

  if (activeTab === 1) {
    return (
      <Box sx={{ py: 2 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Project Settings
        </Typography>
        <Paper 
          sx={{ 
            p: 3, 
            bgcolor: alpha(theme.palette.background.paper, 0.4), 
            border: `1px solid ${theme.palette.divider}`,
            backdropFilter: "blur(10px)",
          }}
        >
          <ProjectEnvVariables />
        </Paper>
      </Box>
    );
  }

  if (activeTab === 2) {
    return (
      <Box sx={{ py: 2 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Deployments
        </Typography>
        <Paper 
          sx={{ 
            p: 3, 
            bgcolor: alpha(theme.palette.background.paper, 0.4), 
            border: `1px solid ${theme.palette.divider}`,
            backdropFilter: "blur(10px)",
          }}
        >
          <ProjectDeploymentTimeline />
        </Paper>
      </Box>
    );
  }

  if (activeTab === 3) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Analytics
        </Typography>
        <Paper sx={{ p: 4, bgcolor: "background.paper", border: `1px solid ${theme.palette.divider}` }}>
          <Typography color="text.secondary">
            Grafici e statistiche avanzate sull&apos;utilizzo delle risorse del progetto.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return null;
}

