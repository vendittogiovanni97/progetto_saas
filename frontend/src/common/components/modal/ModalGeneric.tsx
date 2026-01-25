/**
 * ModalGeneric - Componente dialog/modale generico e stilizzato
 * Basato su MUI Dialog con styling premium/industrial
 */

"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Typography,
  useTheme,
  alpha,
  DialogProps,
} from "@mui/material";

export interface ModalGenericProps extends Omit<DialogProps, "title" | "content"> {
  title: React.ReactNode;
  content: React.ReactNode;
  actions?: React.ReactNode;
  onClose: () => void;
  showCloseButton?: boolean;
}

export function ModalGeneric({
  open,
  onClose,
  title,
  content,
  actions,
  showCloseButton = true,
  maxWidth = "sm",
  fullWidth = true,
  ...props
}: ModalGenericProps) {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          bgcolor: "background.paper",
          backgroundImage: "none",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          boxShadow: theme.shadows[10],
          ...props.PaperProps?.sx,
        },
      }}
      {...props}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontWeight: 700,
          fontSize: "0.9rem",
          color: "text.primary",
        }}
      >
        <Typography
          variant="inherit"
          component="span"
          sx={{ fontWeight: "inherit" }}
        >
          {title}
        </Typography>
        {showCloseButton && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: "text.secondary",
              "&:hover": {
                color: "text.primary",
                bgcolor: alpha(theme.palette.text.primary, 0.05),
              },
            }}
            size="small"
          >
            <Box
              component="span"
              className="material-symbols-outlined"
              sx={{ fontSize: 20 }}
            >
              close
            </Box>
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          p: 3,
          borderColor: theme.palette.divider,
          bgcolor: alpha(theme.palette.background.default, 0.2),
        }}
      >
        {content}
      </DialogContent>

      {actions && (
        <DialogActions
          sx={{
            p: 2,
            px: 3,
            bgcolor: alpha(theme.palette.background.default, 0.5),
            borderTop: `1px solid ${theme.palette.divider}`,
            gap: 1,
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
}
