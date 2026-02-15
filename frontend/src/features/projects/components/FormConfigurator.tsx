"use client";

import { Box, Typography, Grid, alpha, useTheme } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { FormGeneric } from "@/components/forms/formGeneric";
import { useState, useEffect, useCallback } from "react";
import { projectService, categoryService } from "../services/services";
import { ProjectWithRelations, CreateProjectDTO, Category as ICategory } from "../interfaces/Project.entity";
import { getDefaults, getStructure } from "@/utils/structureRegistry";
import { useThemeContext } from "@/providers/ThemeContext";
import { DynamicIcon } from "@/components/icons/DynamicIcon";
import { Card, CardContent, CardMedia } from "@mui/material";

// Importa tutte le strutture per attivare la auto-registrazione
import "@/structure/chatbot/structureChatbot";

import { PageHeaderGeneric } from "@/components/layout/page-header";
import { IconButton, CircularProgress } from "@mui/material";
import { IconBack } from "@/components/icons/icons";
import { ButtonGeneric } from "@/components/ui/button";

interface FormConfiguratorProps {
  projectId?: number | null;
  categoryId?: number | null;
  project?: ProjectWithRelations | null;
  onSuccess?: (project: ProjectWithRelations) => void;
  onCancel?: () => void;
  saveLabel?: string;
  padding?: number | string;
  showHeader?: boolean;
  title?: string;
  subtitle?: string;
  isReadOnly?: boolean;
}

// ============================================
// Internal TemplateGallery Component
// ============================================

interface GalleryCategory extends ICategory {
  image?: string;
}

function LocalTemplateGallery({ onSelect, showHeader = true }: { onSelect: (id: number) => void, showHeader?: boolean }) {
  const theme = useTheme();
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await categoryService.getCategories();
        setCategories(data || []);
      } catch (err) {
        setError("Impossibile caricare le categorie");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ py: 8, textAlign: 'center' }}><Typography color="error">{error}</Typography></Box>;

  return (
    <Box>
      {showHeader && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontSize: "1.5rem", fontWeight: 800 }}>Cosa vuoi creare oggi?</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>Seleziona una categoria per iniziare il tuo nuovo progetto.</Typography>
        </Box>
      )}
      <Grid container spacing={3}>
        {categories.map((category) => {
          const color = category.color || theme.palette.primary.main;
          return (
            <Grid key={category.id} size={{ xs: 12, md: 4 }}>
              <Card
                sx={{
                  height: "100%", display: "flex", flexDirection: "column", cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                  bgcolor: alpha(theme.palette.common.white, 0.02),
                  "&:hover": {
                    transform: "translateY(-8px)", borderColor: color,
                    boxShadow: `0 12px 24px ${alpha(color, 0.2)}`, bgcolor: alpha(color, 0.03),
                  },
                }}
                onClick={() => onSelect(category.id)}
              >
                <CardMedia
                  component="img" height="140"
                  image={category.image || "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"}
                  alt={category.name}
                  sx={{ filter: "grayscale(20%) brightness(80%)" }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                    <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: alpha(color, 0.1), color: color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <DynamicIcon name={category.icon || "category"} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{category.name}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.8rem' }}>{category.description}</Typography>
                  <ButtonGeneric.Secondary label="Seleziona" fullWidth sx={{ color: color, borderColor: alpha(color, 0.3) }} />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export function FormConfigurator({
  projectId,
  categoryId,
  project: projectProp,
  onSuccess,
  onCancel,
  saveLabel,
  padding = 4,
  showHeader = false,
  title = "Configura Progetto",
  subtitle = "Personalizza il tuo progetto prima di iniziare",
  isReadOnly = false,
}: FormConfiguratorProps) {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setLoading: setGlobalLoading, showSnack } = useThemeContext();

  const [project, setProject] = useState<ProjectWithRelations | null>(projectProp || null);
  const [isLoading, setIsLoading] = useState(!!projectId && !projectProp);
  const [readOnlyMode, setReadOnlyMode] = useState(isReadOnly);

  const categoryIdParam = searchParams.get("categoryId");
  const extractedCategoryId = categoryId || (categoryIdParam ? Number(categoryIdParam) : null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formDataConfiguration, setFormDataConfiguration] = useState<CreateProjectDTO>({
    name: project?.name || "",
    categoryId: project?.categoryId || extractedCategoryId || 0,
    accountId: project?.accountId || 1,
    structure: project ? project.getParsedStructure() || {} : (extractedCategoryId ? getDefaults(extractedCategoryId) : {}),
  });

  useEffect(() => {
    if (projectId && !projectProp) {
      const fetchProject = async () => {
        setIsLoading(true);
        try {
          const response = await projectService.getProject(projectId);
          if (response.data) {
            setProject(response.data);
          }
        } catch (err) {
          console.error("Error fetching project:", err);
          showSnack("Impossibile caricare il progetto", "alert");
        } finally {
          setIsLoading(false);
        }
      };
      fetchProject();
    }
  }, [projectId, projectProp]);

  useEffect(() => {
    if (!extractedCategoryId && !project && showHeader && !isLoading) {
      router.push("/dashboard/projects");
    }
  }, [extractedCategoryId, project, router, showHeader, isLoading]);

  useEffect(() => {
    if (project) {
      setFormDataConfiguration({
        name: project.name,
        categoryId: project.categoryId,
        accountId: project.accountId,
        structure: project.getParsedStructure() || {},
      });
    } else if (extractedCategoryId) {
      setFormDataConfiguration({
        name: "",
        categoryId: extractedCategoryId,
        accountId: 1,
        structure: getDefaults(extractedCategoryId),
      });
    }
  }, [project, extractedCategoryId]);

  const setStructureValue = useCallback((attributeName: string, value: any) => {
    setFormDataConfiguration(prev => ({
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
        response = await projectService.updateProject(project.id, formDataConfiguration);
      } else {
        response = await projectService.createProject(formDataConfiguration);
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

  const handleCancel = onCancel || (() => {
    if (effectiveCategoryId !== 0 && !project) {
      setFormDataConfiguration(prev => ({ ...prev, categoryId: 0 }));
    } else {
      router.back();
    }
  });

  const effectiveCategoryId = formDataConfiguration.categoryId;

  if (effectiveCategoryId === 0 && !project && !isReadOnly) {
    return (
      <Box sx={{ p: padding }}>
        <LocalTemplateGallery 
          onSelect={(id) => {
            setFormDataConfiguration(prev => ({ 
              ...prev, 
              categoryId: id,
              structure: getDefaults(id)
            }));
          }} 
          showHeader={showHeader}
        />
      </Box>
    );
  }

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

  if (isLoading) {
    return (
      <Box sx={{ p: 8, display: "flex", justifyContent: "center", alignItems: "center", gap: 2, height: "100%" }}>
        <CircularProgress size={30} />
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: 1 }}>
          CARICAMENTO_SISTEMA...
        </Typography>
      </Box>
    );
  }

  const { sections, previewComponent: PreviewComponent } = structureConfig;
  const hasPreview = !!PreviewComponent;

  const dashboardInfo = (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ 
        p: 4, 
        borderRadius: 5,
        bgcolor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: "blur(12px)",
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
      }}>
        <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 900, letterSpacing: 2, mb: 2, display: "block" }}>
          DETTAGLI_PROGETTO
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 4, letterSpacing: -1 }}>
          {project?.name || "Senza Nome"}
        </Typography>
        
        <Grid container spacing={3}>
          {[
            { label: "ID", value: project?.id },
            { label: "STATO", value: project?.status?.toUpperCase() },
            { label: "CATEGORIA", value: project?.category?.name || "Chatbot" },
            { label: "CREATO_IL", value: project ? new Date(project.createdAt).toLocaleDateString() : "-" }
          ].map((info) => (
            <Grid size={{ xs: 6 }} key={info.label}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, letterSpacing: 1 }}>
                {info.label}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {info.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ 
        p: 4, 
        borderRadius: 5,
        bgcolor: alpha(theme.palette.primary.main, 0.03),
        border: `1px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
        display: "flex",
        flexDirection: "column",
        gap: 2
      }}>
        <Typography variant="body2" color="text.secondary">
          Vuoi modificare la configurazione o il comportamento di questo progetto?
        </Typography>
        <ButtonGeneric.Primary 
          label="Modifica Configurazione" 
          onClick={() => setReadOnlyMode(false)}
          fullWidth
        />
      </Box>
    </Box>
  );

  const content = (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: hasPreview ? 7 : 12 }}>
        {readOnlyMode ? (
          dashboardInfo
        ) : (
          <Box sx={{ 
            p: { xs: 3, md: 5 },
            borderRadius: 6,
            bgcolor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: "blur(12px)",
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
            animation: "fadeInUp 0.6s ease-out"
          }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>Impostazioni</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {!project && (
                  <ButtonGeneric.Secondary 
                    label="Cambia Tipo" 
                    onClick={() => setFormDataConfiguration(prev => ({ ...prev, categoryId: 0 }))}
                    size="small"
                  />
                )}
                {project && (
                  <ButtonGeneric.Secondary 
                    label="Annulla" 
                    onClick={() => setReadOnlyMode(true)}
                    size="small"
                  />
                )}
              </Box>
            </Box>
            <FormGeneric
              sections={sections}
              config={formDataConfiguration.structure || {}}
              onConfigChange={setStructureValue}
              onSave={async () => {
                await handleSave();
                if (project) setReadOnlyMode(true);
              }}
              onCancel={project ? () => setReadOnlyMode(true) : handleCancel}
              saveLabel={saveLabel || (project ? "Salva Modifiche" : "Crea Progetto")}
              loading={isSubmitting}
            />
          </Box>
        )}
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
              <PreviewComponent config={formDataConfiguration.structure || {}} />
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
            <IconBack />
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
