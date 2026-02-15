"use client";

import { useState } from "react";
import { Box, IconButton, alpha, useTheme } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { PageHeaderGeneric } from "@/components/layout/page-header";
import { FormProject } from "./FormProject";
import { projectService } from "../services/services";
import { CreateProjectDTO } from "../interfaces/Project.entity";
import { useThemeContext } from "@/providers/ThemeContext";
import { getDefaults } from "@/utils/structureRegistry";

interface ProjectBuilderProps {
  categoryId: number;
}

export function ProjectBuilder({ categoryId }: ProjectBuilderProps) {
  const router = useRouter();
  const theme = useTheme();
  const { setLoading, showSnack } = useThemeContext();

  const [formData, setFormData] = useState<CreateProjectDTO>({
    name: "",
    categoryId: categoryId,
    accountId: 1,
    structure: getDefaults(categoryId),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    setIsSubmitting(true);
    setLoading(true);
    try {
      const response = await projectService.createProject(formData);
      if (response.data) {
        showSnack("Progetto creato con successo!", "success");
        router.push("/dashboard/projects");
      }
    } catch (error) {
      showSnack("Errore durante la creazione del progetto", "alert");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/dashboard/projects");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton 
          onClick={handleBack}
          sx={{ 
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: "primary.main",
            "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <PageHeaderGeneric
          title="Configura Progetto"
          subtitle="Personalizza il tuo progetto prima di iniziare"
        />
      </Box>

      <Box sx={{ 
        bgcolor: "background.paper", 
        borderRadius: 4, 
        p: 0,
        border: `1px solid ${theme.palette.divider}`,
        overflow: "hidden"
      }}>
        <FormProject
          categoryId={categoryId}
          config={formData.structure || {}}
          onConfigChange={(attr, val) =>
            setFormData({ ...formData, structure: { ...(formData.structure || {}), [attr]: val } })
          }
          onSave={handleSave}
          onCancel={handleBack}
          saveLabel="Crea Progetto"
          loading={isSubmitting}
          isEditing={false}
        />
      </Box>
    </Box>
  );
}
