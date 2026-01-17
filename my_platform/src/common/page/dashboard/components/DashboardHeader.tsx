/**
 * Header della dashboard con titolo e azioni
 */

import { Box, Typography, Button } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";

interface DashboardHeaderProps {
  onRefresh: () => void;
  onNewProject: () => void;
}

export function DashboardHeader({
  onRefresh,
  onNewProject,
}: DashboardHeaderProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        pb: 3,
      }}
    >
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "1.875rem", md: "2.25rem" },
            mb: 1,
          }}
        >
          Control Center{" "}
          <Box component="span" sx={{ color: "primary.main" }}>
            //
          </Box>{" "}
          v.3.0
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: "0.875rem", md: "1rem" },
            letterSpacing: "0.05em",
          }}
        >
          OVERVIEW OF ACTIVE OPERATIONS AND RESOURCES
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1.5 }}>
        <Button
          variant="outlined"
          onClick={onRefresh}
          startIcon={
            <Box
              component="span"
              className="material-symbols-outlined"
              sx={{ fontSize: 18 }}
            >
              refresh
            </Box>
          }
          sx={{
            color: "text.secondary",
            borderColor: theme.palette.divider,
            "&:hover": {
              color: "white",
              borderColor: alpha(theme.palette.common.white, 0.2),
              bgcolor: "background.paper",
            },
          }}
        >
          REFRESH
        </Button>
        <Button
          variant="contained"
          onClick={onNewProject}
          startIcon={
            <Box
              component="span"
              className="material-symbols-outlined"
              sx={{ fontSize: 18 }}
            >
              add
            </Box>
          }
          sx={{
            boxShadow: `0 0 15px ${alpha(theme.palette.primary.main, 0.3)}`,
          }}
        >
          INIT NEW PROJECT
        </Button>
      </Box>
    </Box>
  );
}
