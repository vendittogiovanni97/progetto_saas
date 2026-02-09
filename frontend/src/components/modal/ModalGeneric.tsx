"use client";

import React, { useState } from "react";
import { Box, Typography, Alert, Grid } from "@mui/material";
import { CustomModal } from "../ui/customModal";
import { ButtonGeneric } from "../ui/button";
import { useThemeContext } from "@/providers/ThemeContext";

export interface EntityFormModalProps<T> {
  open: boolean;
  onClose: () => void;
  onSave: (data: T) => Promise<void> | void;
  action: ActionMode;
  initialData?: T;
  texts?: EntityModalTexts;
  renderForm: (data: T | undefined, action: ActionMode, errors: string[]) => React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";

}
enum ActionMode {
  CREATE = "CREATE",
  EDIT = "EDIT",
  READ = "READ",
  DELETE = "DELETE",
}

export interface EntityModalTexts {
  titleCreate?: string;
  titleEdit?: string;
  titleRead?: string;
  titleDelete?: string;
  confirmDeleteMessage?: string;
  saveButtonLabel?: string;
  cancelButtonLabel?: string;
  deleteButtonLabel?: string;
}

const defaultModalTexts: EntityModalTexts = {
  titleCreate: "Aggiungi...",
  titleEdit: "Modifica...",
  titleRead: "Visualizza...",
  titleDelete: "Elimina...",
  confirmDeleteMessage: "Sei sicuro di voler eliminare l'elemento selezionato?",
  saveButtonLabel: "Salva",
  cancelButtonLabel: "Annulla",
  deleteButtonLabel: "Elimina",
};

export function EntityFormModal<T>({
  open,
  onClose,
  onSave,
  action,
  initialData,
  texts = {},
  renderForm,
  maxWidth = "sm",
}: EntityFormModalProps<T>) {
  const { setLoading, showSnack } = useThemeContext();
  const [errors, setErrors] = useState<string[]>([]);
  
  const modalTexts = { ...defaultModalTexts, ...texts };

  const getTitle = () => {
    switch (action) {
      case ActionMode.CREATE:
        return modalTexts.titleCreate;
      case ActionMode.EDIT:
        return modalTexts.titleEdit;
      case ActionMode.READ:
        return modalTexts.titleRead;
      case ActionMode.DELETE:
        return modalTexts.titleDelete;
      default:
        return "";
    }
  };

  const handleSave = async () => {
    setErrors([]);
    try {
      setLoading(true);
      await onSave(initialData as T);
      showSnack("Operazione completata con successo", "success");
      onClose();
    } catch (err: any) {
      console.error("Error in EntityFormModal handleSave:", err);
      const errorMessage = err.message || "Si è verificato un errore imprevisto";
      setErrors([errorMessage]);
      showSnack(errorMessage, "alert");
    } finally {
      setLoading(false);
    }
  };

  const isReadOnly = action === ActionMode.READ;
  const isDelete = action === ActionMode.DELETE;

  const content = (
    <Box sx={{ p: 1 }}>
      {errors.length > 0 && (
        <Box sx={{ mb: 2 }}>
          {errors.map((err, idx) => (
            <Alert severity="error" key={idx} sx={{ mb: 1 }}>
              {err}
            </Alert>
          ))}
        </Box>
      )}

      {isDelete ? (
        <Typography variant="body1" sx={{ textAlign: "center", py: 2 }}>
          {modalTexts.confirmDeleteMessage}
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {renderForm(initialData, action, errors)}
        </Grid>
      )}
    </Box>
  );

  const actions = (
    <>
      <ButtonGeneric.Secondary 
        onClick={onClose} 
        label={modalTexts.cancelButtonLabel} 
      />
      {!isReadOnly && (
        <ButtonGeneric.Primary
          onClick={handleSave}
          label={isDelete ? modalTexts.deleteButtonLabel : modalTexts.saveButtonLabel}
          color={isDelete ? "error" : "primary"}
        />
      )}
    </>
  );

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={getTitle()}
      content={content}
      actions={actions}
      maxWidth={maxWidth}
    />
  );
}
