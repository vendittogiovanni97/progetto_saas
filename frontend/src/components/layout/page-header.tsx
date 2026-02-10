"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

interface PageHeaderGenericProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function PageHeaderGeneric({
  title,
  subtitle,
  actions,
}: PageHeaderGenericProps) {
  const renderStyledText = (text: string) => {
    if (!text.includes("//")) return text;
    const parts = text.split("//");
    return (
      <>
        {parts[0]}
        <Box component="span" sx={{ color: "primary.main", mx: 1 }}>
          {}
        </Box>
        {parts[1]}
      </>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "flex-end" },
        gap: 2,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        pb: 3,
        mb: 4,
      }}
    >
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "1.875rem", md: "2.25rem" },
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            mb: 0.5,
          }}
        >
          {renderStyledText(title)}
        </Typography>
        {subtitle && (
          <Typography
            variant="body2"
            sx={{ 
              color: "text.secondary",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {renderStyledText(subtitle)}
          </Typography>
        )}
      </Box>

      {actions && (
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {actions}
        </Box>
      )}
    </Box>
  );
}
