"use client";

import { Box, Paper, Typography } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { IconSecurity } from "@/components/icons/icons";
import { LoginForm } from "./components/LoginForm";

export function LoginPage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.05
          )} 0%, transparent 100%)`,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 440,
          px: 3,
        }}
      >
        {/* Logo/Brand Section */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 2,
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          >
            <IconSecurity sx={{ fontSize: 32, color: "white" }} />
          </Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: "1.875rem",
              fontWeight: 700,
              mb: 0.5,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            NEXUS_OS
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "0.875rem",
            }}
          >
            ACCESS CONTROL SYSTEM
          </Typography>
        </Box>

        {/* Login Card */}
        <Paper
          sx={{
            p: 4,
            bgcolor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: "blur(10px)",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.3)}`,
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: "1.25rem",
                fontWeight: 700,
                mb: 0.5,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Sign In
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
              Enter your credentials to access the platform
            </Typography>
          </Box>

          <LoginForm />
        </Paper>

        {/* Footer */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "text.secondary",
            }}
          >
            v3.0.0 // 2024
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
