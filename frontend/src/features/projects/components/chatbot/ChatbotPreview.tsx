"use client";

import { Box, Typography, alpha, useTheme, Stack } from "@mui/material";

export interface ChatbotConfig {
  welcomeMessage?: string;
  primaryColor?: string;
  name?: string;
  [key: string]: any;
}

interface ChatbotPreviewProps {
  config: ChatbotConfig;
}

export function ChatbotPreview({ config }: ChatbotPreviewProps) {
  const theme = useTheme();
  const primaryColor = config.primaryColor || theme.palette.primary.main;

  return (
    <Box
      sx={{
        width: 320,
        height: 500,
        bgcolor: "#111418",
        borderRadius: 4,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        border: `1px solid ${alpha('#fff', 0.1)}`,
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, bgcolor: primaryColor, color: "#fff" }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 800, textTransform: "uppercase", letterSpacing: 1 }}>
          {config.name || "AI Assistant"}
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.8 }}>Online</Typography>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            alignSelf: "flex-start",
            maxWidth: "80%",
            p: 2,
            bgcolor: alpha('#fff', 0.05),
            borderRadius: "0 12px 12px 12px",
            border: `1px solid ${alpha('#fff', 0.05)}`,
          }}
        >
          <Typography variant="body2" sx={{ color: "#fff" }}>
            {config.welcomeMessage || "Ciao! Come posso aiutarti?"}
          </Typography>
        </Box>
      </Box>

      {/* Input Placeholder */}
      <Box sx={{ p: 2, borderTop: `1px solid ${alpha('#fff', 0.05)}`, bgcolor: alpha('#fff', 0.02) }}>
        <Box
          sx={{
            p: 1.5,
            bgcolor: alpha('#fff', 0.05),
            borderRadius: 2,
            border: `1px solid ${alpha('#fff', 0.1)}`,
          }}
        >
          <Typography variant="caption" color="text.secondary">Scrivi un messaggio...</Typography>
        </Box>
      </Box>
    </Box>
  );
}
