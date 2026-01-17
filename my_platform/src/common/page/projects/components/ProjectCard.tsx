/**
 * Componente Card singola per il progetto
 */

import { Card, CardMedia, CardContent, Box, Typography } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { ProjectCard as ProjectCardType } from "../types";

interface ProjectCardProps {
  card: ProjectCardType;
  onClick: () => void;
}

export function ProjectCard({ card, onClick }: ProjectCardProps) {
  const theme = useTheme();

  return (
    <Card
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        border: card.isActive
          ? `1px solid ${theme.palette.primary.main}`
          : `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.2s",
        boxShadow: card.isActive ? `0 0 20px ${alpha(theme.palette.primary.main, 0.1)}` : "none",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.05)}`,
          borderColor: "primary.main",
        },
      }}
    >
      <Box sx={{ position: "relative", height: 128 }}>
        <CardMedia
          image={card.img}
          sx={{
            height: "100%",
            opacity: card.isActive ? 0.8 : 0.6,
            filter: card.isActive ? "none" : "grayscale(100%)",
            transition: "all 0.5s",
            mixBlendMode: card.isActive ? "luminosity" : "normal",
            ".MuiCard-root:hover &": {
              opacity: 1,
              filter: "grayscale(0%)",
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to top, ${theme.palette.background.paper} 0%, transparent 100%)`,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            p: 0.75,
            borderRadius: 1,
            backdropFilter: "blur(8px)",
            border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
            bgcolor: card.isActive ? "primary.main" : alpha(theme.palette.common.black, 0.5),
            boxShadow: card.isActive ? `0 4px 8px ${alpha(theme.palette.primary.main, 0.2)}` : "none",
          }}
        >
          <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 20, color: "white" }}>
            {card.icon}
          </Box>
        </Box>
      </Box>
      <CardContent
        sx={{
          p: 2.5,
          borderTop: card.isActive
            ? `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
            : `1px solid ${theme.palette.divider}`,
          bgcolor: card.isActive ? alpha(theme.palette.primary.main, 0.05) : "transparent",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "1.125rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: card.isActive ? "primary.main" : "white",
            mb: 0.5,
            transition: "color 0.2s",
            ".MuiCard-root:hover &": {
              color: "primary.main",
            },
          }}
        >
          {card.title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: card.isError ? "warning.main" : "success.main",
              animation: card.isError ? "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" : "none",
              "@keyframes pulse": {
                "0%, 100%": { opacity: 1 },
                "50%": { opacity: 0.5 },
              },
            }}
          />
          <Typography
            sx={{
              fontSize: "0.875rem",
              fontFamily: "monospace",
              color: card.isError ? "warning.main" : "text.secondary",
            }}
          >
            {card.status}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

