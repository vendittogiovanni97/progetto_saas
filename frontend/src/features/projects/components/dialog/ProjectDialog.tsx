"use client";

import { Box } from "@mui/material";
import { CustomModal } from "@/components/ui/customModal";
import { ProjectWithRelations } from "../../interfaces/Project.entity";
import { FormConfigurator } from "../FormConfigurator";

interface ProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (project: ProjectWithRelations) => void;
  project: ProjectWithRelations | null;
}

export function ProjectDialog({
  open,
  onClose,
  onSave,
  project,
}: ProjectDialogProps) {
  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={project ? "Modifica Progetto" : "Nuovo Progetto"}
      maxWidth="xl"
      padding={0}
      content={
        <Box sx={{ p: 0, pt: project ? 0 : 2 }}>
          <FormConfigurator
            project={project}
            onSuccess={(p) => {
              onSave(p);
              onClose();
            }}
            onCancel={onClose}
            padding={4}
          />
        </Box>
      }
    />
  );
}
