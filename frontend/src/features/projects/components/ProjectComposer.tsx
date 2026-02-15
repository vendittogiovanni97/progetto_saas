"use client";

import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { CustomModal } from "@/components/ui/customModal";
import { FormProject } from "./FormProject";
import { TemplateGallery } from "./list/TemplateGallery";
import { useAuth } from "@/providers/AuthProvider";
import { useThemeContext } from "@/providers/ThemeContext";
import { projectService, categoryService } from "../services/services";
import { ProjectWithRelations, CreateProjectDTO } from "../interfaces/Project.entity";
import { Category } from "../interfaces/Category.entity";
import { getDefaults } from "@/utils/structureRegistry";

interface ProjectComposerProps {
  open: boolean;
  onClose: () => void;
  onSave: (project: ProjectWithRelations) => void;
  initialProject?: ProjectWithRelations | null;
}

type ComposerStep = "GALLERY" | "CONFIG";

export function ProjectComposer({ open, onClose, onSave, initialProject }: ProjectComposerProps) {
  const { user } = useAuth();
  const { setLoading, showSnack } = useThemeContext();

  const [step, setStep] = useState<ComposerStep>("GALLERY");
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
      if (initialProject) {
        setStep("CONFIG");
        categoryService.getCategories().then(cats => {
          const cat = (cats || []).find((c: Category) => c.id === initialProject.categoryId);
          setSelectedCategory(cat || null);
        }).catch(() => {});
        setFormData({
          name: initialProject.name,
          categoryId: initialProject.categoryId,
          accountId: initialProject.accountId,
          structure: initialProject.getParsedStructure() || {},
        });
      } else {
        setStep("GALLERY");
        setSelectedCategory(null);
        setFormData({ name: "", categoryId: 0, accountId: 1, structure: {} });
      }
    }
  }, [open, initialProject]);

  const handleCategorySelect = (categoryId: number) => {
    categoryService.getCategories().then(cats => {
      const cat = (cats || []).find((c: Category) => c.id === categoryId);
      setSelectedCategory(cat || null);

      setFormData(prev => ({
        ...prev,
        categoryId,
        structure: getDefaults(categoryId),
      }));
      setStep("CONFIG");
    }).catch(err => console.error(err));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    setLoading(true);
    try {
      let response;
      if (initialProject) {
        response = await projectService.updateProject(initialProject.id, formData);
      } else {
        response = await projectService.createProject(formData);
      }

      if (response.data) {
        onSave(response.data);
        showSnack(`Progetto ${initialProject ? "aggiornato" : "creato"} con successo!`, "success");
        onClose();
      }
    } catch (error) {
      showSnack("Errore durante il salvataggio", "alert");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  // Step GALLERY: selezione categoria
  if (step === "GALLERY" && !initialProject) {
    return (
      <TemplateGallery
        open={open}
        onClose={onClose}
        onSelect={handleCategorySelect}
      />
    );
  }

  // Step CONFIG: form generico basato sulla categoria
  return (
    <CustomModal
      open={open}
      maxWidth="lg"
      fullWidth
      onClose={onClose}
      title={
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          {initialProject ? "Modifica" : "Configura"} {selectedCategory?.name}
        </Typography>
      }
      content={
        <FormProject
          categoryId={formData.categoryId}
          config={formData.structure || {}}
          onConfigChange={(attr, val) =>
            setFormData({ ...formData, structure: { ...(formData.structure || {}), [attr]: val } })
          }
          onSave={handleSave}
          onCancel={() => setStep("GALLERY")}
          saveLabel={initialProject ? "Aggiorna" : "Crea Progetto"}
          loading={isSubmitting}
          isEditing={!!initialProject}
        />
      }
    />
  );
}
