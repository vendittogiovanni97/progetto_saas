"use client";

import { useState, useEffect } from "react";
import { 
  Box, Typography, Card, CardContent, CardMedia, Grid, 
  alpha, useTheme, CircularProgress, Stack 
} from "@mui/material";
import { ButtonGeneric } from "@/components/ui/button";
import { DynamicIcon } from "@/components/icons/DynamicIcon";
import { CustomModal } from "@/components/ui/customModal";
import { FormGeneric } from "@/components/forms/formGeneric";
import { ChatbotPreview } from "./chatbot/ChatbotPreview";
import { useAuth } from "@/providers/AuthProvider";
import { useThemeContext } from "@/providers/ThemeContext";
import { projectService, categoryService } from "../services/services";
import { ProjectWithRelations, CreateProjectDTO } from "../interfaces/Project.entity";
import { Category } from "../interfaces/Category.entity";
import { chatbotProjectStructure } from "@/structure/chatbot/structureChatbot";

interface ProjectComposerProps {
  open: boolean;
  onClose: () => void;
  onSave: (project: ProjectWithRelations) => void;
  initialProject?: ProjectWithRelations | null; 
}

type ComposerStep = "GALLERY" | "CONFIG";

export function ProjectComposer({ open, onClose, onSave, initialProject }: ProjectComposerProps) {
  const theme = useTheme();
  const { user } = useAuth();
  const { setLoading, showSnack } = useThemeContext();
  
  const [step, setStep] = useState<ComposerStep>("GALLERY");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  
  const [formData, setFormData] = useState<CreateProjectDTO>({
    name: "",
    categoryId: 0,
    accountId: 1,
    structure: {},
  });

  // Reset state when opening
  useEffect(() => {
    if (open) {
      if (initialProject) {
        setStep("CONFIG");
        const cat = categories.find(c => c.id === initialProject.categoryId);
        setSelectedCategory(cat || null);
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
  }, [open, initialProject, categories]);

  // Fetch categories
  useEffect(() => {
    if (open && step === "GALLERY") {
      const fetchCats = async () => {
        setIsLoadingCategories(true);
        try {
          const data = await categoryService.getCategories();
          setCategories(data || []);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoadingCategories(false);
        }
      };
      fetchCats();
    }
  }, [open, step]);

  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat);
    
    // Auto-fill defaults
    const defaults: Record<string, any> = {};
    if (cat.id === 1) { // Chatbot
      chatbotProjectStructure.forEach(section => {
        section.fields.forEach(field => {
          if (field.defaultValue !== undefined) {
            defaults[field.attributeName] = field.defaultValue;
          }
        });
      });
    }

    setFormData(prev => ({ 
      ...prev, 
      categoryId: cat.id,
      structure: defaults
    }));
    setStep("CONFIG");
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
      showSnack("Errore durante il salvataggio // SYSTEM_FAIL", "alert");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const renderGallery = () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" sx={{ fontSize: "1.5rem", fontWeight: 800, mb: 1 }}>
        Cosa vuoi creare oggi?
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 4 }}>
        Seleziona una categoria per iniziare il tuo nuovo progetto.
      </Typography>

      {isLoadingCategories ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
      ) : (
        <Grid container spacing={3}>
          {categories.map((cat) => (
            <Grid key={cat.id} size={{ xs: 12, md: 4 }}>
              <Card 
                sx={{ 
                  cursor: "pointer", border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                  bgcolor: alpha(theme.palette.common.white, 0.02),
                  transition: "all 0.3s", "&:hover": { transform: "translateY(-4px)", borderColor: cat.color || "primary.main" }
                }}
                onClick={() => handleCategorySelect(cat)}
              >
                <CardMedia component="img" height="140" image={(cat as any).image || "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"} />
                <CardContent>
                   <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <DynamicIcon name={cat.icon || "category"} sx={{ color: cat.color || "primary.main" }} />
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{cat.name}</Typography>
                   </Box>
                   <Typography variant="caption" color="text.secondary">{cat.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );

  const renderConfig = () => {
    return (
      <Box sx={{ p: 4 }}>
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormGeneric
              sections={chatbotProjectStructure}
              config={formData.structure || {}}
              onConfigChange={(attr, val) => setFormData({ ...formData, structure: { ...(formData.structure || {}), [attr]: val } })}
              onSave={handleSave}
              onCancel={() => setStep("GALLERY")}
              saveLabel={initialProject ? "Aggiorna Chatbot" : "Crea Chatbot"}
              loading={isSubmitting}
            />
          </Grid>
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
              border: `1px dashed ${theme.palette.divider}`
            }}
          >
            <Typography variant="overline" sx={{ mb: 2, color: "text.secondary", fontWeight: 700 }}>
              Anteprima Live
            </Typography>
            <ChatbotPreview config={formData.structure || {}} />
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={step === "GALLERY" ? null : (
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          {initialProject ? "Modifica" : "Configura"} {selectedCategory?.name}
        </Typography>
      )}
      content={step === "GALLERY" ? renderGallery() : renderConfig()}
      maxWidth="lg"
      fullWidth
    />
  );
}
