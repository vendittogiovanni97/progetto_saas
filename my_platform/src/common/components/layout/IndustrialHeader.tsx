"use client";

import { Box, IconButton, Typography } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";

export default function IndustrialHeader() {
  const theme = useTheme();

  return (
    <Box sx={{
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: { xs: 3, sm: 4 },
      borderBottom: `1px solid ${theme.palette.divider}`,
      bgcolor: alpha(theme.palette.background.default, 0.95),
      backdropFilter: 'blur(8px)',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ width: 1, height: 16, bgcolor: theme.palette.divider }} />
        <Typography sx={{
          color: 'text.secondary',
          fontSize: '0.75rem',
          fontFamily: 'monospace',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Workspace: Alpha_Protocol
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          gap: 1,
          px: 1.5,
          py: 0.75,
          borderRadius: 1,
          bgcolor: 'background.paper',
          border: `1px solid ${theme.palette.divider}`,
        }}>
          <Box sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: theme.palette.success.main,
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0.5 },
            },
          }} />
          <Typography sx={{
            fontSize: '0.625rem',
            fontWeight: 700,
            color: theme.palette.success.main,
            letterSpacing: '0.05em',
          }}>
            SYSTEM STATUS: ONLINE
          </Typography>
        </Box>

        <IconButton
          size="small"
          sx={{
            color: 'text.secondary',
            '&:hover': {
              color: 'white',
              bgcolor: 'background.paper',
            },
          }}
        >
          <Box component="span" className="material-symbols-outlined">notifications</Box>
        </IconButton>
      </Box>
    </Box>
  );
}
