"use client";

import React from "react";
import { Box, Typography, Grid, alpha, useTheme } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { FormGeneric } from "@/components/forms/formGeneric";
import { useState, useEffect, useCallback } from "react";
import { projectService } from "../services/services";
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
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: hasPreview ? 7 : 12 }}>
        <Box sx={{ 
          p: { xs: 3, md: 5 },
          borderRadius: 6,
          bgcolor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: "blur(12px)",
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
          animation: "fadeInUp 0.6s ease-out"
        }}>
          <FormGeneric
            sections={sections}
            config={formData.structure || {}}
            onConfigChange={setStructureValue}
            onSave={handleSave}
            onCancel={handleCancel}
            saveLabel={saveLabel || (project ? "Aggiorna" : "Crea Progetto")}
            loading={isSubmitting}
          />
        </Box>
      </Grid>

      {hasPreview && PreviewComponent && (
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "sticky",
            top: 40,
            alignSelf: "flex-start",
            animation: "fadeInUp 0.8s ease-out"
          }}
        >
          <Box sx={{
            width: "fit-content",
            textAlign: "center",
            mb: 4,
            px: 3,
            py: 1,
            borderRadius: 10,
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5
          }}>
            <Box sx={{ 
              width: 8, 
              height: 8, 
              bgcolor: "primary.main", 
              borderRadius: "50%",
              boxShadow: `0 0 10px ${theme.palette.primary.main}`,
              "@keyframes pulse": {
                "0%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.7)" },
                "70%": { transform: "scale(1)", boxShadow: "0 0 0 6px rgba(0, 0, 0, 0)" },
                "100%": { transform: "scale(0.95)", boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)" }
              },
              animation: "pulse 2s infinite"
            }} />
            <Typography
              variant="overline"
              sx={{ color: "primary.main", fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase" }}
            >
              Anteprima Live
            </Typography>
          </Box>

          <Box sx={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            perspective: "1000px"
          }}>
            <Box sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              bgcolor: "primary.main",
              filter: "blur(80px)",
              opacity: 0.1,
              zIndex: 0,
              transform: "scale(0.8)"
            }} />
            
            <Box sx={{
              zIndex: 1,
              transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              "&:hover": {
                transform: "translateY(-10px) rotateX(5deg)",
              }
            }}>
              <PreviewComponent config={formData.structure || {}} />
            </Box>
          </Box>
        </Grid>
      )}
    </Grid>
  );

  if (showHeader) {
    return (
      <Box sx={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: 6,
        maxWidth: 1600,
        mx: "auto",
        width: "100%",
        py: 4,
        px: { xs: 2, md: 4 }
      }}>
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          gap: 3
        }}>
          <IconButton 
            onClick={handleCancel}
            sx={{ 
              width: 50,
              height: 50,
              bgcolor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: "blur(8px)",
              color: "text.primary",
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              "&:hover": { 
                bgcolor: "primary.main",
                color: "primary.contrastText",
                transform: "translateX(-4px)"
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <PageHeaderGeneric 
            title={title} 
            subtitle={subtitle}
          />
        </Box>

        <Box sx={{ p: padding }}>
          {content}
        </Box>
        
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: padding }}>
      {content}
    </Box>
  );
}
