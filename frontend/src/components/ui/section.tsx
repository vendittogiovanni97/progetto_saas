"use client";

import React from "react";
import { Box, Typography, Divider } from "@mui/material";

interface SectionGenericProps {
  title: string;
  children: React.ReactNode;
  showDivider?: boolean;
}

export function SectionGeneric({ title, children, showDivider = true }: SectionGenericProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography 
        variant="h5" 
        sx={{ 
            mb: 2, 
            fontWeight: 600, 
            textTransform: "uppercase", 
            letterSpacing: "0.05em",
            fontSize: "1.1rem"
        }}
      >
        {title}
      </Typography>
      {showDivider && <Divider sx={{ mb: 3 }} />}
      {children}
    </Box>
  );
}
