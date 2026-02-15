"use client";

import { Box, Typography } from "@mui/material";
import { CustomModal } from "@/components/ui/customModal";
import { ProjectWithRelations } from "../../interfaces/Project.entity";
import { FormConfigurator } from "../FormConfigurator";
import { projectService } from "../../services/services";
import { useThemeContext } from "@/providers/ThemeContext";
import { ButtonGeneric } from "@/components/ui/button";
import { useState } from "react";

interface ProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (project: ProjectWithRelations) => void;
  project: ProjectWithRelations | null;
  mode?: "edit" | "delete";
}

export function ProjectDialog({
  open,
  onClose,
  onSave,
  project,
  mode = "edit",
}: ProjectDialogProps) {
  const { showSnack } = useThemeContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    if (!project) return;
    setIsSubmitting(true);
    try {
      await projectService.deleteProject(project.id);
      showSnack("PROGETTO_ELIMINATO // SUCCESS", "success");
      onSave(project); // Trigger refresh in parent
      onClose();
    } catch (err) {
      console.error("Errore eliminazione:", err);
      showSnack("ERRORE_ELIMINAZIONE // FAIL", "alert");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDeleteMode = mode === "delete";

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={
        isDeleteMode
          ? "Conferma Eliminazione"
          : project
          ? "Modifica Progetto"
          : "Nuovo Progetto"
      }
      maxWidth={isDeleteMode ? "xs" : "xl" }
      padding={0}
      content={
        <Box sx={{ p: 0, pt: project && !isDeleteMode ? 0 : 2 }}>
          {isDeleteMode ? (
            <Box sx={{ p: 4, pt: 2, textAlign: 'center' }}>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                Sicuro di voler eliminare <strong>"{project?.name}"</strong>?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                L'operazione è definitiva e tutti i dati associati andranno persi.
              </Typography>
            </Box>
          ) : (
            <FormConfigurator
              project={project}
              onSuccess={(p) => {
                onSave(p);
                onClose();
              }}
              onCancel={onClose}
              padding={4}
            />
          )}
        </Box>
      }
      actions={isDeleteMode ? (
        <Box sx={{ display: 'flex', gap: 2, width: '100%', p: 2 }}>
          <ButtonGeneric.Secondary 
            label="ANNULLA" 
            onClick={onClose} 
            fullWidth 
            disabled={isSubmitting}
          />
          <ButtonGeneric.Primary 
            label="ELIMINA" 
            onClick={handleDelete} 
            color="error" 
            fullWidth 
            loading={isSubmitting}
          />
        </Box>
      ) : undefined}
    />
  );
}
