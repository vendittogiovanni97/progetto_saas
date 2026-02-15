"use client";

import { useState, useEffect, Suspense } from "react";
import { Box, IconButton, alpha, useTheme, CircularProgress } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";
import { PageHeaderGeneric } from "@/components/layout/page-header";
import { FormProject } from "@/features/projects/components/FormProject";
import { projectService } from "@/features/projects/services/services";
import { CreateProjectDTO } from "@/features/projects/interfaces/Project.entity";
import { useThemeContext } from "@/providers/ThemeContext";
import { getDefaults } from "@/utils/structureRegistry";

function CreateProjectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const { setLoading, showSnack } = useThemeContext();

  const categoryIdParam = searchParams.get("categoryId");
  const categoryId = categoryIdParam ? Number(categoryIdParam) : null;

  const [formData, setFormData] = useState<CreateProjectDTO>({
    name: "",
    categoryId: categoryId || 0,
    accountId: 1,
    structure: categoryId ? getDefaults(categoryId) : {},
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!categoryId) {
      router.push("/dashboard/projects");
    }
  }, [categoryId, router]);

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

  if (!categoryId) return null;

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

export default function CreateProjectPage() {
  return (
    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}><CircularProgress /></Box>}>
      <CreateProjectContent />
    </Suspense>
  );
}
