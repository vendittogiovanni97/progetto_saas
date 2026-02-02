"use client";

import { Box, Typography, alpha, useTheme } from "@mui/material";
import { Timer as TimerIcon } from "@mui/icons-material";

interface Deployment {
  id: string;
  version: string;
  status: "SUCCESS" | "FAILED" | "BUILDING";
  timestamp: string;
  author: string;
  duration?: string;
}

const mockDeployments: Deployment[] = [
  {
    id: "dep_1",
    version: "v1.2.4",
    status: "BUILDING",
    timestamp: "2 mins ago",
    author: "giovanni",
  },
  {
    id: "dep_2",
    version: "v1.2.3",
    status: "SUCCESS",
    timestamp: "2 hours ago",
    author: "giovanni",
    duration: "45s",
  },
  {
    id: "dep_3",
    version: "v1.2.2",
    status: "FAILED",
    timestamp: "5 hours ago",
    author: "admin",
    duration: "12s",
  },
];

export function ProjectDeploymentTimeline() {
  const theme = useTheme();

  const getStatusColor = (status: Deployment["status"]) => {
    switch (status) {
      case "SUCCESS":
        return theme.palette.success.main;
      case "FAILED":
        return theme.palette.error.main;
      case "BUILDING":
        return theme.palette.primary.main;
      default:
        return theme.palette.grey[500];
    }
  };

  return (
    <Box sx={{ position: "relative", pl: 4, py: 2 }}>
      {/* Vertical Line */}
      <Box
        sx={{
          position: "absolute",
          left: 11,
          top: 0,
          bottom: 0,
          width: 2,
          bgcolor: alpha(theme.palette.divider, 0.5),
        }}
      />

      {mockDeployments.map((dep, index) => (
        <Box key={dep.id} sx={{ position: "relative", mb: 4, "&:last-child": { mb: 0 } }}>
          {/* Dot */}
          <Box
            sx={{
              position: "absolute",
              left: -29,
              top: 4,
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: getStatusColor(dep.status),
              border: `4px solid ${theme.palette.background.paper}`,
              zIndex: 1,
              animation: dep.status === "BUILDING" ? "pulse 2s infinite" : "none",
            }}
          />

          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.common.white, 0.03),
              border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
              transition: "transform 0.2s, background-color 0.2s",
              "&:hover": {
                bgcolor: alpha(theme.palette.common.white, 0.05),
                transform: "translateX(4px)",
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {dep.version}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {dep.timestamp} by <b>{dep.author}</b>
                </Typography>
              </Box>
              <Box
                sx={{
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  bgcolor: alpha(getStatusColor(dep.status), 0.1),
                  color: getStatusColor(dep.status),
                  textTransform: "uppercase",
                }}
              >
                {dep.status}
              </Box>
            </Box>
            {dep.duration && (
              <Typography variant="caption" sx={{ color: "text.secondary", display: "flex", alignItems: "center", gap: 0.5 }}>
                <TimerIcon sx={{ fontSize: 14 }} />
                Built in {dep.duration}
              </Typography>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
