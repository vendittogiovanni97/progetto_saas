/**
 * Panel Component Repository (sidebar)
 */

import { Paper, Box, Typography, Button } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import { ComponentLibraryItem } from "../types";

interface ComponentRepositoryProps {
  items: ComponentLibraryItem[];
}

export function ComponentRepository({ items }: ComponentRepositoryProps) {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontSize: "0.75rem" }}>
          Component Repository
        </Typography>
        <Box
          component="span"
          className="material-symbols-outlined"
          sx={{ fontSize: 18, color: "text.secondary" }}
        >
          widgets
        </Box>
      </Box>
      <Box sx={{ p: 1 }}>
        {items.map((item) => (
          <Box
            key={item.title}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 1.5,
              borderRadius: 1,
              cursor: "pointer",
              "&:hover": {
                bgcolor: alpha(theme.palette.common.white, 0.05),
                "& .icon-box": {
                  color: "primary.main",
                  borderColor: alpha(theme.palette.primary.main, 0.5),
                },
                "& .title": {
                  color: "primary.main",
                },
              },
            }}
          >
            <Box
              className="icon-box"
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                bgcolor: "background.default",
                border: `1px solid ${theme.palette.divider}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.secondary",
                transition: "all 0.2s",
              }}
            >
              <Box component="span" className="material-symbols-outlined" sx={{ fontSize: 18 }}>
                {item.icon}
              </Box>
            </Box>
            <Box>
              <Typography
                className="title"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
              >
                {item.title}
              </Typography>
              <Typography sx={{ fontSize: "0.625rem", color: "text.secondary" }}>
                {item.desc}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          p: 1.5,
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: alpha(theme.palette.background.default, 0.3),
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          size="small"
          sx={{
            borderColor: theme.palette.divider,
            color: "text.secondary",
            "&:hover": {
              color: "white",
              bgcolor: alpha(theme.palette.common.white, 0.05),
            },
          }}
        >
          Browse Full Library
        </Button>
      </Box>
    </Paper>
  );
}

