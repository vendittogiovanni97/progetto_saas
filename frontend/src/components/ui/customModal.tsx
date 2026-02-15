"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import { IconClose } from "@/components/icons/icons";
import { ButtonGeneric } from "./button";

export interface ModalGenericProps {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  content: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  padding?: number | string;
  // --- Nuove props per la logica universale ---
  onConfirm?: () => Promise<void> | void;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
}

export function CustomModal({
  open,
  onClose,
  title,
  content,
  actions,
  maxWidth = "sm",
  fullWidth = true,
  padding = 3,
  onConfirm,
  confirmLabel = "CONFERMA",
  cancelLabel = "ANNULLA",
  confirmColor = "primary",
}: ModalGenericProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (!onConfirm) return;
    setIsSubmitting(true);
    try {
      await onConfirm();
    } catch (err) {
      console.error("CustomModal handleConfirm error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={isSubmitting ? undefined : onClose} 
      maxWidth={maxWidth} 
      fullWidth={fullWidth}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        {!isSubmitting && (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: (theme) => theme.palette.grey[500] }}
          >
            <IconClose />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent dividers sx={{ p: padding }}>
        {content}
      </DialogContent>

      {(actions || onConfirm) && (
        <DialogActions sx={{ p: 2 }}>
          {actions || (
            <>
              <ButtonGeneric.Secondary 
                label={cancelLabel} 
                onClick={onClose} 
                disabled={isSubmitting}
                sx={{ flex: 1 }}
              />
              <ButtonGeneric.Primary 
                label={confirmLabel} 
                onClick={handleConfirm} 
                color={confirmColor} 
                loading={isSubmitting}
                sx={{ flex: 1 }}
              />
            </>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}
