"use client";

import React from "react";
import { TextField, TextFieldProps, InputAdornment } from "@mui/material";

export type InputGenericProps = TextFieldProps & {
  endIcon?: React.ReactNode;
};

/**
 * InputGeneric - Wrapper basilare di TextField MUI.
 */
export function InputGeneric({
  endIcon,
  InputProps,
  ...props
}: InputGenericProps) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      InputProps={{
        ...InputProps,
        endAdornment: endIcon ? (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ) : InputProps?.endAdornment,
      }}
      {...props}
    />
  );
}
