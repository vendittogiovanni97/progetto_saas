/**
 * Panel System Log (sidebar)
 */

import { Paper, Box, Typography } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { SystemLog as SystemLogType } from "../types";

interface SystemLogProps {
  logs: SystemLogType[];
}

export function SystemLog({ logs }: SystemLogProps) {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: "background.paper",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: alpha(theme.palette.background.default, 0.5),
        }}
      >
        <Typography variant="h3" sx={{ fontSize: "0.75rem" }}>
          System Log
        </Typography>
      </Box>
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        {logs.map((log, i) => (
          <Box key={i} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
            <Box
              sx={{
                mt: 0.5,
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: log.isPrimary
                  ? "primary.main"
                  : log.isWarning
                    ? "warning.main"
                    : "text.secondary",
                flexShrink: 0,
              }}
            />
            <Box>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: log.isPrimary ? "white" : "text.secondary",
                  lineHeight: 1.4,
                }}
              >
                {log.text}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.625rem",
                  fontFamily: "monospace",
                  color: "text.secondary",
                  mt: 0.25,
                }}
              >
                {log.time}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

