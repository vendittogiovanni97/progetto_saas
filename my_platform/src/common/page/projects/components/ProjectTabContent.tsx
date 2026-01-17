/**
 * Componente per il contenuto delle tab
 */

import { Box, Typography, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { TabValue } from "../types";
import { ProjectCard } from "./ProjectCard";
import { projectCards } from "../services/mockData";

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
          <ProjectCard key={card.id} card={card} onClick={() => onCardClick(card.id)} />
        ))}
      </Box>
    );
  }

  if (activeTab === 1) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Project Settings
        </Typography>
        <Paper sx={{ p: 4, bgcolor: "background.paper", border: `1px solid ${theme.palette.divider}` }}>
          <Typography color="text.secondary">
            Le impostazioni del progetto saranno disponibili qui. Potrai gestire nomi, domini e variabili di ambiente.
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (activeTab === 2) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Deployments
        </Typography>
        <Paper sx={{ p: 4, bgcolor: "background.paper", border: `1px solid ${theme.palette.divider}` }}>
          <Typography color="text.secondary">
            Qui vedrai la lista di tutti i deployment effettuati per questo progetto.
          </Typography>
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

