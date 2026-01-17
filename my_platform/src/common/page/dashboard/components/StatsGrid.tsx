/**
 * Grid delle statistiche
 */

import { Box, Typography, Paper } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { Stat } from "../types";

interface StatsGridProps {
  stats: Stat[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
        gap: 2,
      }}
    >
      {stats.map((stat) => (
        <Paper
          key={stat.label}
          sx={{
            p: 2,
            bgcolor: alpha(theme.palette.background.paper, 0.5),
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            sx={{
              fontSize: "0.625rem",
              color: "text.secondary",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              mb: 0.5,
            }}
          >
            {stat.label}
          </Typography>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: stat.isPrimary ? "primary.main" : stat.isSuccess ? "success.main" : "white",
            }}
          >
            {stat.value}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}

