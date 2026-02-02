"use client";

import { Box, Typography, alpha, useTheme } from "@mui/material";
import { CardGeneric } from "./CardGeneric";
import { DynamicIcon } from "@/common/icons/DynamicIcon";

export interface StatCardGenericProps {
  label: string;
  value: string | number;
  icon?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "success" | "error" | "info" | "warning";
  description?: string;
  loading?: boolean;
}

export function StatCardGeneric({
  label,
  value,
  icon,
  trend,
  color = "primary",
  description,
  loading = false,
}: StatCardGenericProps) {
  const theme = useTheme();
  const mainColor = theme.palette[color]?.main || theme.palette.primary.main;

  return (
    <CardGeneric
      loading={loading}
      sx={{
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "4px",
          height: "100%",
          bgcolor: mainColor,
          boxShadow: `0 0 10px ${alpha(mainColor, 0.5)}`,
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1, px: 0.5 }}>
        <Box>
          <Typography
            sx={{
              fontSize: "0.65rem",
              fontWeight: 800,
              color: "text.secondary",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              mb: 0.5,
            }}
          >
            {label}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: "1.75rem",
              color: mainColor,
              textShadow: `0 0 20px ${alpha(mainColor, 0.3)}`,
            }}
          >
            {value}
          </Typography>
        </Box>
        {icon && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: alpha(mainColor, 0.1),
              color: mainColor,
            }}
          >
            <DynamicIcon name={icon} sx={{ fontSize: 24 }} />
          </Box>
        )}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 0.5 }}>
        {trend && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: trend.isPositive ? "success.main" : "error.main",
              bgcolor: alpha(trend.isPositive ? theme.palette.success.main : theme.palette.error.main, 0.1),
              px: 0.8,
              py: 0.2,
              borderRadius: 1,
            }}
          >
            <DynamicIcon 
              name={trend.isPositive ? "trending_up" : "trending_down"} 
              sx={{ fontSize: 14, fontWeight: 900 }} 
            />
            <Typography sx={{ fontSize: "0.7rem", fontWeight: 900 }}>
              {trend.isPositive ? "+" : "-"}{trend.value}%
            </Typography>
          </Box>
        )}
        {description && (
          <Typography
            sx={{
              fontSize: "0.65rem",
              color: "text.secondary",
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            {description}
          </Typography>
        )}
      </Box>

      {/* Decorative background element */}
      <Box
        sx={{
          position: "absolute",
          bottom: -10,
          right: -10,
          opacity: 0.03,
          transform: "rotate(-10deg)",
          pointerEvents: "none",
        }}
      >
        <DynamicIcon 
          name={icon || "analytics"} 
          sx={{ fontSize: 80 }} 
        />
      </Box>
    </CardGeneric>
  );
}
