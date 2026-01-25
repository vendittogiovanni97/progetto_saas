"use client";

import { Box, Typography, TextField, Button, alpha, useTheme } from "@mui/material";

interface ProjectsHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  onCreateProject: () => void;
}

export function ProjectsHeader({
  search,
  onSearchChange,
  onCreateProject,
}: ProjectsHeaderProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontSize: "1.5rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Projects Control
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontFamily: "monospace" }}
        >
          SYSTEM_VERSION: 1.0.4 // ACTIVE_PROXIES: 04
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          size="small"
          placeholder="SEARCH_PROJECTS..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            width: 300,
            "& .MuiOutlinedInput-root": {
              fontFamily: "monospace",
              fontSize: "0.75rem",
              bgcolor: alpha(theme.palette.background.paper, 0.3),
            },
          }}
          autoComplete="off"
        />
        <Button
          variant="contained"
          size="medium"
          onClick={onCreateProject}
          startIcon={
            <Box
              component="span"
              className="material-symbols-outlined"
              sx={{ fontSize: 20 }}
            >
              add
            </Box>
          }
          sx={{
            fontWeight: 700,
            px: 3,
          }}
        >
          New Project
        </Button>
      </Box>
    </Box>
  );
}
