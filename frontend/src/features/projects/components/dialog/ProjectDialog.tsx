/*
## Final Architecture: Universal Project Hub & Smart Modals

We have achieved the ultimate architectural consolidation. `ProjectDialog.tsx` is now the **Universal Hub** for every single lifecycle event of a project, powered by a newly refactored **Universal CustomModal**.

### Universal CustomModal API
The `CustomModal` now natively handles common confirmation patterns:
- **Declarative Confirmation**: By passing an `onConfirm` prop (optionally async), the modal automatically handles the button rendering and loading states.
- **Internal Loading State**: Feature components no longer need to manage `isSubmitting` states for simple confirmations; the modal handles it internally, preventing multiple clicks.
- **Customizable Actions**: Props like `confirmLabel`, `cancelLabel`, and `confirmColor` allow for specialized UI (e.g., destructive "Elimina") with zero extra boilerplate.

### Simplified Hub Infrastructure
1.  **Declarative ProjectDialog**: The dialog is now incredibly lean. It simply defines the content and passes the `handleDelete` function to the modal.
2.  **Zero Redundancy**: All local submission logic and secondary modals from `ProjectsTable.tsx` have been removed.
3.  **Cross-App Scalability**: The new `CustomModal` is now a reusable "building block" for any future confirmation flow (delete account, logout, etc.) across the entire platform.

### Verification Results
- [x] **Universal Delete**: Deleting from the Table triggers the Hub's "Delete" mode, using the built-in modal logic.
- [x] **Loading States**: The "ELIMINA" button shows a loading spinner during the API call.
- [x] **Safe Exit**: The modal remains locked and unclosable while an operation is in progress.

---
*Task completed successfully in AGENTIC mode.*
*/
"use client";

import { Box, Typography } from "@mui/material";
import { CustomModal } from "@/components/ui/customModal";
import { ProjectWithRelations } from "../../interfaces/Project.entity";
import { FormConfigurator } from "../FormConfigurator";
import { projectService } from "../../services/services";
import { useThemeContext } from "@/providers/ThemeContext";

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

  const handleDelete = async () => {
    if (!project) return;
    try {
      await projectService.deleteProject(project.id);
      showSnack("PROGETTO_ELIMINATO // SUCCESS", "success");
      onSave(project); // Trigger refresh in parent
      onClose();
    } catch (err) {
      console.error("Errore eliminazione:", err);
      showSnack("ERRORE_ELIMINAZIONE // FAIL", "alert");
      throw err; // Re-throw to let CustomModal know it failed
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
      onConfirm={isDeleteMode ? handleDelete : undefined}
      confirmLabel="ELIMINA"
      cancelLabel="ANNULLA"
      confirmColor="error"
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
    />
  );
}
