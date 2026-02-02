"use client";

import { Box, Typography, TextField, IconButton, alpha, useTheme, InputAdornment } from "@mui/material";
import { ButtonGeneric } from "@/common/components/button/ButtonGeneric";
import { 
  IconAdd, 
  IconVisibility, 
  IconVisibilityOff, 
  IconDelete, 
  IconInfo 
} from "@/common/icons/icons";
import { useState } from "react";

interface EnvVar {
  key: string;
  value: string;
  isSecret: boolean;
}

const mockEnvVars: EnvVar[] = [
  { key: "DATABASE_URL", value: "mysql://user:pass@localhost:3306/db", isSecret: true },
  { key: "API_KEY", value: "sk_live_51M...", isSecret: true },
  { key: "NODE_ENV", value: "production", isSecret: false },
];

export function ProjectEnvVariables() {
  const theme = useTheme();
  const [vars, setVars] = useState<EnvVar[]>(mockEnvVars);
  const [showValues, setShowValues] = useState<Record<string, boolean>>({});

  const toggleShow = (key: string) => {
    setShowValues((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const onAdd = () => {
    // Placeholder for add functionality
    console.log("Add new variable");
  };

  return (
    <Box sx={{ py: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="subtitle2" sx={{ color: "text.secondary", fontWeight: 600 }}>
          Environment Variables ({vars.length})
        </Typography>
        <ButtonGeneric.Primary
          onClick={onAdd}
          startIcon={<IconAdd />}
          label="Add Variable"
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {vars.map((v) => (
          <Box
            key={v.key}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 1.5,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.common.white, 0.02),
              border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  color: "primary.main",
                  fontWeight: 700,
                  mb: 0.5,
                }}
              >
                {v.key}
              </Typography>
              <TextField
                fullWidth
                size="small"
                variant="standard"
                type={v.isSecret && !showValues[v.key] ? "password" : "text"}
                value={v.value}
                InputProps={{
                  disableUnderline: true,
                  readOnly: true,
                  sx: {
                    fontSize: "0.875rem",
                    color: "text.primary",
                  },
                  endAdornment: v.isSecret && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => toggleShow(v.key)}>
                        {showValues[v.key] ? (
                          <IconVisibilityOff sx={{ fontSize: 18 }} />
                        ) : (
                          <IconVisibility sx={{ fontSize: 18 }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <IconButton size="small" sx={{ color: "text.secondary" }}>
              <IconDelete sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 4, p: 2, borderRadius: 2, bgcolor: alpha(theme.palette.info.main, 0.05), border: `1px solid ${alpha(theme.palette.info.main, 0.2)}` }}>
        <Typography variant="caption" sx={{ color: "info.main", display: "flex", alignItems: "center", gap: 1 }}>
          <IconInfo sx={{ fontSize: 16 }} />
          Secrets are encrypted at rest and only readable by the runtime engine.
        </Typography>
      </Box>
    </Box>
  );
}
