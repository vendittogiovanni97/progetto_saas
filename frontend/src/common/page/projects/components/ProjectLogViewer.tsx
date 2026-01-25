"use client";

import { Box, Typography, alpha, useTheme, IconButton, Tooltip } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { mockLogs } from "../types/projectMocks";

interface LogEntry {
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR" | "DEBUG";
  message: string;
}

export function ProjectLogViewer() {
  const theme = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [autoScroll]);

  const getLevelColor = (level: LogEntry["level"]) => {
    switch (level) {
      case "ERROR": return "#ff5f57";
      case "WARN": return "#ffbd2e";
      case "INFO": return "#27c93f";
      case "DEBUG": return theme.palette.info.main;
      default: return "inherit";
    }
  };

  return (
    <Box sx={{ position: "relative", height: "100%", display: "flex", flexDirection: "column" }}>
      <Box 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          bgcolor: alpha(theme.palette.common.black, 0.4),
          p: 1,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#ff5f57" }} />
          <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#ffbd2e" }} />
          <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: "#27c93f" }} />
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Clear logs">
            <IconButton size="small">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete_sweep</span>
            </IconButton>
          </Tooltip>
          <Tooltip title={autoScroll ? "Pause auto-scroll" : "Resume auto-scroll"}>
            <IconButton size="small" onClick={() => setAutoScroll(!autoScroll)} color={autoScroll ? "primary" : "default"}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                {autoScroll ? "pause_circle" : "play_circle"}
              </span>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box
        ref={scrollRef}
        sx={{
          flex: 1,
          bgcolor: "#0D0D0D",
          p: 2,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          fontFamily: "'Fira Code', 'Roboto Mono', monospace",
          fontSize: "0.8rem",
          overflow: "auto",
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": { bgcolor: alpha(theme.palette.common.white, 0.1), borderRadius: 3 }
        }}
      >
  {(mockLogs as LogEntry[]).map((log, i) => (
          <Box key={i} sx={{ display: "flex", gap: 2, mb: 0.5, "&:hover": { bgcolor: alpha(theme.palette.common.white, 0.05) } }}>
            <Typography variant="caption" sx={{ color: alpha(theme.palette.common.white, 0.3), minWidth: 65, userSelect: "none" }}>
              {log.timestamp}
            </Typography>
            <Typography variant="caption" sx={{ color: getLevelColor(log.level), fontWeight: 700, minWidth: 45, userSelect: "none" }}>
              [{log.level}]
            </Typography>
            <Typography variant="caption" sx={{ color: alpha(theme.palette.common.white, 0.85), whiteSpace: "pre-wrap" }}>
              {log.message}
            </Typography>
          </Box>
        ))}
        {autoScroll && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: theme.palette.primary.main, animation: "pulse 1.5s infinite" }} />
            <Typography variant="caption" sx={{ color: "primary.main", fontStyle: "italic" }}>Awaiting logs...</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
