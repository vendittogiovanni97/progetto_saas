"use client";

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { CustomModal } from "@/components/ui/customModal";
import { TemplateGallery } from "../list/TemplateGallery";
import { ProjectWithRelations } from "../../interfaces/Project.entity";
import { ProjectConfigurator } from "../ProjectConfigurator";

interface ProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (project: ProjectWithRelations) => void;
  project: ProjectWithRelations | null;
}

export function ProjectDialog({ open, onClose, onSave, project }: ProjectDialogProps) {
  const router = useRouter();

  const handleCategorySelect = (categoryId: number) => {
    onClose();
    router.push(`/dashboard/projects/create?categoryId=${categoryId}`);
  };

  const title = (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800 }}>
        {project 
          ? `Modifica ${project.name}` 
          : "Cosa vuoi creare oggi?"}
      </Typography>
      {!project && (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Seleziona una categoria per iniziare il tuo nuovo progetto.
        </Typography>
      )}
    </Box>
  );

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="lg"
      fullWidth
      content={
        <Box sx={{ p: 0, pt: project ? 0 : 4 }}>
          {project ? (
            <ProjectConfigurator
              project={project}
              onSuccess={(p) => {
                onSave(p);
                onClose();
              }}
              onCancel={onClose}
              padding={4}
            />
          ) : (
            <Box sx={{ p: 4, pt: 0 }}>
              <TemplateGallery onSelect={handleCategorySelect} showHeader={false} />
            </Box>
          )}
        </Box>
      }
    />
  );
}
