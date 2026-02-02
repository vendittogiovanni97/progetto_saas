"use client";

import React from "react";
import { Card, CardMedia, CardContent, CardActions, Typography, Box, alpha, useTheme, SxProps, Theme, Skeleton } from "@mui/material";

interface CardGenericProps {
  title?: string;
  subtitle?: string;
  mediaImage?: string;
  mediaHeight?: string | number;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  isError?: boolean;
  sx?: SxProps<Theme>;
  loading?: boolean;
}

export function CardGeneric({
  title,
  subtitle,
  mediaImage,
  mediaHeight = 160,
  children,
  actions,
  onClick,
  isActive = false,
  isError = false,
  sx,
  loading = false,
}: CardGenericProps) {
  const theme = useTheme();

  return (
    <Card
      onClick={onClick}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        border: isActive 
          ? `1px solid ${theme.palette.primary.main}` 
          : `1px solid ${alpha(theme.palette.divider, 0.5)}`,
        bgcolor: alpha(theme.palette.common.white, 0.02),
        "&:hover": onClick ? {
          transform: "translateY(-8px)",
          borderColor: "primary.main",
          boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
          bgcolor: alpha(theme.palette.primary.main, 0.03),
        } : {},
        ...(Array.isArray(sx) ? sx : [sx]),
      }}
    >
      {mediaImage && (
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height={mediaHeight}
            image={mediaImage}
            alt={title}
            sx={{ 
                filter: isActive ? "none" : "grayscale(20%) brightness(80%)",
                transition: "filter 0.3s"
            }}
          />
          {isActive && (
             <Box
               sx={{
                 position: "absolute",
                 inset: 0,
                 background: `linear-gradient(to top, ${theme.palette.background.paper} 0%, transparent 100%)`,
                 opacity: 0.5,
               }}
             />
          )}
        </Box>
      )}

      {loading ? (
        <CardContent sx={{ p: 3 }}>
          <Skeleton variant="text" width="60%" height={30} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="40%" height={20} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 1 }} />
        </CardContent>
      ) : (
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          {title && (
            <Typography variant="h5" sx={{ fontWeight: 700, mb: subtitle ? 0.5 : 2, color: isActive ? "primary.main" : "text.primary" }}>
              {title}
            </Typography>
          )}
          
          {subtitle && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: isError ? "error.main" : "success.main",
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            </Box>
          )}

          {children}
        </CardContent>
      )}

      {actions && (
        <CardActions sx={{ p: 2, pt: 0 }}>
          {actions}
        </CardActions>
      )}
    </Card>
  );
}
