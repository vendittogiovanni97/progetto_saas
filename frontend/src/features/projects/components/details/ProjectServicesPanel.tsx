/**
 * Panel laterale destro con informazioni sui servizi
 */

import { Paper, Box, Typography, Chip, Icon } from "@mui/material";
import { ButtonGeneric } from "@/components/ui/button";
import { useTheme, alpha } from "@mui/material/styles";
import { services } from "../../services/services";
import { DynamicIcon } from "@/components/icons/DynamicIcon";
import { IconRefresh, IconBug } from "@/components/icons/icons";

export function ProjectServicesPanel() {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        display: { xs: "none", lg: "flex" },
        width: 384,
        flexDirection: "column",
        flexShrink: 0,
        borderLeft: `1px solid ${theme.palette.divider}`,
        bgcolor: "#111418",
        boxShadow: theme.shadows[24],
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Panel Header */}
        <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}`, bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "primary.main",
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />
            <Typography
              sx={{
                color: "primary.main",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Live Inspector
            </Typography>
          </Box>
          <Typography variant="h2" sx={{ fontSize: "1.5rem", mb: 0.5 }}>
            Services
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
            Running on us-east-1
          </Typography>
        </Box>

        {/* Scrollable Content */}
        <Box sx={{ flex: 1, overflow: "auto" }}>
          <Box
            sx={{
              px: 3,
              py: 1.5,
              bgcolor: alpha(theme.palette.divider, 0.3),
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.75rem",
                color: "text.secondary",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Service Name
            </Typography>
            <Typography
              sx={{
                fontSize: "0.75rem",
                color: "text.secondary",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Status
            </Typography>
          </Box>
          {services.map((s: any) => (
            <Box
              key={s.name}
              sx={{
                px: 3,
                py: 2,
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                "&:hover": { bgcolor: alpha(theme.palette.common.white, 0.05) },
                transition: "background-color 0.2s",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                <Typography sx={{ fontWeight: 500 }}>{s.name}</Typography>
                <Chip
                  label={s.status}
                  size="small"
                  variant="outlined"
                  color={s.status === "RUNNING" ? "success" : "default"}
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    height: 20,
                    bgcolor: s.status === "RUNNING" ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.grey[700], 0.2),
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontSize: "0.7rem",
                  color: "text.secondary",
                }}
              >
                <DynamicIcon name={s.icon} sx={{ fontSize: 14 }} />
                {s.cpu && <span>CPU: {s.cpu}</span>}
                {s.mem && <span>MEM: {s.mem}</span>}
                {s.keys && <span>Keys: {s.keys}</span>}
                {s.hit && <span>Hit: {s.hit}</span>}
                {s.reqs && <span>Req/s: {s.reqs}</span>}
                {s.lat && <span>Lat: {s.lat}</span>}
                {s.uptime && <span>Uptime: {s.uptime}</span>}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Bottom Actions */}
        <Box
          sx={{
            p: 3,
            borderTop: `1px solid ${theme.palette.divider}`,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <ButtonGeneric.Primary
            fullWidth
            startIcon={<IconRefresh />}
            label="Restart Services"
          />
          <ButtonGeneric.Secondary
            fullWidth
            startIcon={<IconBug />}
            label="View Logs"
          />
        </Box>
      </Box>
    </Paper>
  );
}

