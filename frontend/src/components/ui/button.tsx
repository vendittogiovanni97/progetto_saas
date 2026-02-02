"use client";

import React from "react";
import {
  Button,
  ButtonProps,
  CircularProgress,
} from "@mui/material";

export interface ButtonGenericProps extends ButtonProps {
  /** Testo del bottone (alternativa a children) */
  label?: string;
  /** Se true, mostra uno spinner e disabilita il bottone */
  loading?: boolean;
}

/**
 * ButtonGeneric - Un componente bottone estremamente semplice e pulito.
 */
export function ButtonGeneric({
  label,
  loading,
  children,
  disabled,
  variant = "contained",
  startIcon,
  ...props
}: ButtonGenericProps) {
  return (
    <Button
      variant={variant}
      disabled={disabled || loading}
      startIcon={
        loading ? (
          <CircularProgress size={16} color="inherit" />
        ) : (
          startIcon
        )
      }
      {...props}
    >
      {label || children}
    </Button>
  );
}

// --- Specialized Wrappers ---

ButtonGeneric.Primary = (props: ButtonGenericProps) => (
  <ButtonGeneric variant="contained" color="primary" {...props} />
);

ButtonGeneric.Secondary = (props: ButtonGenericProps) => (
  <ButtonGeneric variant="outlined" color="primary" {...props} />
);

ButtonGeneric.Danger = (props: ButtonGenericProps) => (
  <ButtonGeneric variant="contained" color="error" {...props} />
);

ButtonGeneric.Ghost = (props: ButtonGenericProps) => (
  <ButtonGeneric variant="text" color="inherit" {...props} />
);

ButtonGeneric.Success = (props: ButtonGenericProps) => (
  <ButtonGeneric variant="contained" color="success" {...props} />
);
