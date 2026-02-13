"use client";

import { useState, useEffect } from "react";
import { 
  Box, Typography, Grid, 
  alpha, useTheme, Stack 
} from "@mui/material";
import { CustomModal } from "@/components/ui/customModal";
import { FormGeneric } from "@/components/forms/formGeneric";
import { ChatbotPreview } from "./chatbot/ChatbotPreview";
import { TemplateGallery } from "./list/TemplateGallery";
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
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
        // Fetch category name for the title
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
    // Fetch the category to get details
    categoryService.getCategories().then(cats => {
      const cat = (cats || []).find((c: Category) => c.id === categoryId);
      setSelectedCategory(cat || null);
      
      // Auto-fill defaults
      const defaults: Record<string, any> = {};
      if (categoryId === 1) { // Chatbot
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
        categoryId,
        structure: defaults
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

  // If we're in the GALLERY step, show TemplateGallery directly
  if (step === "GALLERY" && !initialProject) {
    return (
      <TemplateGallery
        open={open}
        onClose={onClose}
        onSelect={handleCategorySelect}
      />
    );
  }

  // Otherwise show the CONFIG step in a modal
  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          {initialProject ? "Modifica" : "Configura"} {selectedCategory?.name}
        </Typography>
      }
      content={renderConfig()}
      maxWidth="lg"
      fullWidth
    />
  );
}

