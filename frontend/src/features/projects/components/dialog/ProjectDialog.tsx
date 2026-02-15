"use client";

import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { CustomModal } from "@/components/ui/customModal";
import { FormProject } from "../FormProject";
import { TemplateGallery } from "../list/TemplateGallery";
import { useThemeContext } from "@/providers/ThemeContext";
import { projectService, categoryService } from "../../services/services";
import { ProjectWithRelations, CreateProjectDTO } from "../../interfaces/Project.entity";
import { Category } from "../../interfaces/Category.entity";

interface ProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (project: ProjectWithRelations) => void;
  project: ProjectWithRelations | null;
}

export function ProjectDialog({ open, onClose, onSave, project }: ProjectDialogProps) {
  const router = useRouter();
  const { setLoading, showSnack } = useThemeContext();

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<CreateProjectDTO>({
    name: "",
    categoryId: 0,
    accountId: 1,
    structure: {},
  });

  useEffect(() => {
    if (open) {
      if (project) {
        // Edit mode
        categoryService.getCategories().then(cats => {
          const cat = (cats || []).find((c: Category) => c.id === project.categoryId);
          setSelectedCategory(cat || null);
        }).catch(() => {});

        setFormData({
          name: project.name,
          categoryId: project.categoryId,
          accountId: project.accountId,
          structure: project.getParsedStructure() || {},
        });
      } else {
        // Create mode - reset state
        setSelectedCategory(null);
        setFormData({ name: "", categoryId: 0, accountId: 1, structure: {} });
      }
    }
  }, [open, project]);

  const handleCategorySelect = (categoryId: number) => {
    onClose();
    router.push(`/dashboard/projects/create?categoryId=${categoryId}`);
  };

  const handleSaveEdit = async () => {
    if (!project) return;
    
    setIsSubmitting(true);
    setLoading(true);
    try {
      const response = await projectService.updateProject(project.id, formData);

      if (response.data) {
        onSave(response.data);
        showSnack("Progetto aggiornato con successo!", "success");
        onClose();
      }
    } catch (error) {
      showSnack("Errore durante il salvataggio", "alert");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const title = (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800 }}>
        {project 
          ? `Modifica ${selectedCategory?.name || project.name}` 
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
        <Box sx={{ p: project ? 0 : 4, pt: 0 }}>
          {project ? (
            <FormProject
              categoryId={formData.categoryId}
              config={formData.structure || {}}
              onConfigChange={(attr, val) =>
                setFormData({ ...formData, structure: { ...(formData.structure || {}), [attr]: val } })
              }
              onSave={handleSaveEdit}
              onCancel={onClose}
              saveLabel="Aggiorna"
              loading={isSubmitting}
              isEditing={true}
            />
          ) : (
            <TemplateGallery onSelect={handleCategorySelect} showHeader={false} />
          )}
        </Box>
      }
    />
  );
}
