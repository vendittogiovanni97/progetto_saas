"use client";

import React from "react";
import { Box, Typography, Grid, alpha, useTheme } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { FormGeneric } from "@/components/forms/formGeneric";
import { useState, useEffect, useCallback } from "react";
import { projectService, categoryService } from "../services/services";
import { ProjectWithRelations, CreateProjectDTO } from "../interfaces/Project.entity";
import { getDefaults, getStructure } from "@/utils/structureRegistry";
import { useThemeContext } from "@/providers/ThemeContext";

// Importa tutte le strutture per attivare la auto-registrazione
import "@/structure/chatbot/structureChatbot";

import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { PageHeaderGeneric } from "@/components/layout/page-header";
import { IconButton } from "@mui/material";

interface ProjectConfiguratorProps {
  categoryId?: number | null;
  project?: ProjectWithRelations | null;
  onSuccess?: (project: ProjectWithRelations) => void;
  onCancel?: () => void;
  saveLabel?: string;
  padding?: number | string;
  showHeader?: boolean;
  title?: string;
  subtitle?: string;
}

export function ProjectConfigurator({
  categoryId,
  project,
  onSuccess,
  onCancel,
  saveLabel,
  padding = 4,
  showHeader = false,
  title = "Configura Progetto",
  subtitle = "Personalizza il tuo progetto prima di iniziare",
}: ProjectConfiguratorProps) {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setLoading: setGlobalLoading, showSnack } = useThemeContext();

  const categoryIdParam = searchParams.get("categoryId");
  const extractedCategoryId = categoryId || (categoryIdParam ? Number(categoryIdParam) : null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateProjectDTO>({
    name: project?.name || "",
    categoryId: project?.categoryId || extractedCategoryId || 0,
    accountId: project?.accountId || 1,
    structure: project ? project.getParsedStructure() || {} : (extractedCategoryId ? getDefaults(extractedCategoryId) : {}),
  });

  useEffect(() => {
    if (!extractedCategoryId && !project && showHeader) {
      router.push("/dashboard/projects");
    }
  }, [extractedCategoryId, project, router, showHeader]);

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        categoryId: project.categoryId,
        accountId: project.accountId,
        structure: project.getParsedStructure() || {},
      });
    } else if (extractedCategoryId) {
      setFormData({
        name: "",
        categoryId: extractedCategoryId,
        accountId: 1,
        structure: getDefaults(extractedCategoryId),
      });
    }
  }, [project, extractedCategoryId]);

  const setStructureValue = useCallback((attributeName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      structure: { ...(prev.structure || {}), [attributeName]: value }
    }));
  }, []);

  const handleSave = async () => {
    setIsSubmitting(true);
    setGlobalLoading(true);
    try {
      let response;
      if (project) {
        response = await projectService.updateProject(project.id, formData);
      } else {
        response = await projectService.createProject(formData);
      }

      if (response.data) {
        showSnack(`Progetto ${project ? "aggiornato" : "creato"} con successo!`, "success");
        if (onSuccess) {
          onSuccess(response.data);
        } else {
          router.push("/dashboard/projects");
        }
      }
    } catch (error) {
      showSnack("Errore durante il salvataggio", "alert");
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setGlobalLoading(false);
    }
  };

  const handleCancel = onCancel || (() => router.back());

  const effectiveCategoryId = formData.categoryId;
  const structureConfig = getStructure(effectiveCategoryId);

  if (!structureConfig) {
    return (
      <Box sx={{ p: padding, textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Struttura non disponibile
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Nessuna configurazione trovata per questa categoria ({effectiveCategoryId}).
        </Typography>
      </Box>
    );
  }

  const { sections, previewComponent: PreviewComponent } = structureConfig;
  const hasPreview = !!PreviewComponent;

  const content = (
    <Grid container spacing={5}>
      <Grid size={{ xs: 12, md: hasPreview ? 6 : 12 }}>
        <FormGeneric
          sections={sections}
          config={formData.structure || {}}
          onConfigChange={setStructureValue}
          onSave={handleSave}
          onCancel={handleCancel}
          saveLabel={saveLabel || (project ? "Aggiorna" : "Crea Progetto")}
          loading={isSubmitting}
        />
      </Grid>

      {hasPreview && PreviewComponent && (
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: alpha(theme.palette.divider, 0.05),
            borderRadius: 4,
            py: 4,
            border: `1px dashed ${theme.palette.divider}`,
            position: "sticky",
            top: 24,
            alignSelf: "flex-start"
          }}
        >
          <Typography
            variant="overline"
            sx={{ mb: 2, color: "text.secondary", fontWeight: 700 }}
          >
            Anteprima Live
          </Typography>
          <PreviewComponent config={formData.structure || {}} />
        </Grid>
      )}
    </Grid>
  );

  if (showHeader) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton 
            onClick={handleCancel}
            sx={{ 
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: "primary.main",
              "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <PageHeaderGeneric title={title} subtitle={subtitle} />
        </Box>

        <Box sx={{ 
          bgcolor: "background.paper", 
          borderRadius: 4, 
          p: padding,
          border: `1px solid ${theme.palette.divider}`,
          overflow: "hidden"
        }}>
          {content}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ p: padding }}>
      {content}
    </Box>
  );
}
