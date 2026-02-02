"use client";

import React from "react";
import {
  TextField,
  TextFieldProps,
  alpha,
  useTheme,
  InputAdornment,
} from "@mui/material";

export type InputGenericProps = TextFieldProps & {
  /** Icona opzionale da mostrare all'inizio */
  startIcon?: React.ReactNode;
  /** Icona opzionale da mostrare alla fine */
  endIcon?: React.ReactNode;
};

/**
 * InputGeneric - Un componente input standardizzato con stile pulito.
 */
export function InputGeneric({
  startIcon,
  endIcon,
  InputProps,
  sx,
  ...props
}: InputGenericProps) {
  const theme = useTheme();

  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      InputProps={{
        ...InputProps,
        startAdornment: startIcon ? (
          <InputAdornment position="start">
            {startIcon}
          </InputAdornment>
        ) : InputProps?.startAdornment,
        endAdornment: endIcon ? (
          <InputAdornment position="end">
            {endIcon}
          </InputAdornment>
        ) : InputProps?.endAdornment,
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          bgcolor: alpha(theme.palette.background.paper, 0.3),
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            bgcolor: alpha(theme.palette.background.paper, 0.5),
          },
          "&.Mui-focused": {
            bgcolor: alpha(theme.palette.background.paper, 0.8),
            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
          },
        },
        "& .MuiInputLabel-root": {
          color: "text.secondary",
          "&.Mui-focused": {
            color: "primary.main",
          },
        },
        ...sx,
      }}
      {...props}
    />
  );
}
