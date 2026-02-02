"use client";

import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  SelectProps,
  MenuItem,
  FormHelperText,
  alpha,
  useTheme,
} from "@mui/material";

export interface SelectOption {
  value: string | number;
  label: string;
}

export type SelectGenericProps = SelectProps & {
  /** Etichetta del campo */
  label?: string;
  /** Testo di aiuto o errore */
  helperText?: string;
  /** Opzioni del select */
  options: SelectOption[];
  /** Se true, il campo occupa tutta la larghezza */
  fullWidth?: boolean;
};

/**
 * SelectGeneric - Un componente select standardizzato e facile da usare.
 */
export function SelectGeneric({
  label,
  helperText,
  options,
  fullWidth = true,
  error,
  size = "small",
  sx,
  ...props
}: SelectGenericProps) {
  const theme = useTheme();
  const labelId = props.id ? `${props.id}-label` : undefined;

  return (
    <FormControl 
      fullWidth={fullWidth} 
      error={error} 
      size={size}
      sx={{
        "& .MuiOutlinedInput-root": {
          bgcolor: alpha(theme.palette.background.paper, 0.3),
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            bgcolor: alpha(theme.palette.background.paper, 0.5),
          },
          "&.Mui-focused": {
            bgcolor: alpha(theme.palette.background.paper, 0.8),
          },
        },
        ...sx,
      }}
    >
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <Select
        labelId={labelId}
        label={label}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
