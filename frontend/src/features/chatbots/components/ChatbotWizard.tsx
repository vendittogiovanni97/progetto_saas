"use client";

import { Box, Typography, alpha, useTheme, Grid, Stack } from "@mui/material";
import { InputGeneric } from "@/components/ui/input";
import { ButtonGeneric } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { ModalGeneric } from "@/components/ui/modal";
import { ChatbotPreview } from "./ChatbotPreview";
import { SectionGeneric } from "@/components/ui/section";
import { useThemeContext } from "@/providers/ThemeContext";
import { chatbotService } from "@/lib/api/chatbot";

interface ChatbotWizardProps {
  open: boolean;
  onClose: () => void;
  onSave: (chatbot: any) => void;
}

interface ChatbotConfig {
  name: string;
  welcomeMessage: string;
  primaryColor: string;
}

const colors = ["#3b82f6", "#10b981", "#ef4444", "#f59e0b", "#8b5cf6", "#ec4899", "#111827"];

export function ChatbotWizard({ open, onClose, onSave }: ChatbotWizardProps) {
  const theme = useTheme();
  const { user } = useAuth();
  const { setLoading, showSnack } = useThemeContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [config, setConfig] = useState<ChatbotConfig>({ 
    name: "My Assistant", 
    welcomeMessage: "Ciao! Come posso aiutarti oggi?", 
    primaryColor: "#3b82f6" 
  });

  const handleSave = async () => {
    if (!user) return;
    setIsSubmitting(true);
    setLoading(true);
    try {
      const response = await chatbotService.createChatbot({
        ...config,
        accountId: 1,
      });
      if (response.data) {
        onSave(response.data);
        showSnack("Chatbot creato con successo! // SYSTEM_INIT_OK", "success");
        onClose();
      }
    } catch (error) {
      console.error("Errore durante la creazione del chatbot:", error);
      showSnack("Errore critico durante la creazione // SYSTEM_FAIL", "alert");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const content = (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={5}>
        {/* Form Side */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={4}>
            <SectionGeneric title="Informazioni Base" showDivider={false}>
              <Stack spacing={2.5}>
                <InputGeneric
                  label="Nome del Bot"
                  placeholder="es. Support Bot"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  disabled={isSubmitting}
                />

                <InputGeneric
                  label="Messaggio di Benvenuto"
                  multiline
                  rows={2}
                  value={config.welcomeMessage}
                  onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
                  placeholder="Scrivi cosa dirà il bot all'inizio..."
                  disabled={isSubmitting}
                />
              </Stack>
            </SectionGeneric>

            <SectionGeneric title="Personalizzazione" showDivider={false}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700 }}>
                  Colore Brand
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                  {colors.map((color) => (
                    <Box
                      key={color}
                      onClick={() => !isSubmitting && setConfig({ ...config, primaryColor: color })}
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        bgcolor: color,
                        cursor: isSubmitting ? "default" : "pointer",
                        border: config.primaryColor === color ? "4px solid #fff" : "none",
                        boxShadow: config.primaryColor === color ? `0 0 0 2px ${color}` : "none",
                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": { 
                          transform: isSubmitting ? "none" : "scale(1.1)",
                          boxShadow: isSubmitting ? "none" : `0 0 12px ${alpha(color, 0.5)}`
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </SectionGeneric>

            <Box sx={{ pt: 2, display: "flex", gap: 2 }}>
              <ButtonGeneric.Secondary fullWidth onClick={onClose} disabled={isSubmitting} label="Annulla" />
              <ButtonGeneric.Primary
                fullWidth
                onClick={handleSave}
                loading={isSubmitting}
                label="Crea Chatbot"
                sx={{ 
                  bgcolor: config.primaryColor, 
                  "&:hover": { bgcolor: alpha(config.primaryColor, 0.9), transform: "translateY(-1px)" } 
                }}
              />
            </Box>
          </Stack>
        </Grid>

        {/* Preview Side */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", bgcolor: alpha(theme.palette.divider, 0.05), borderRadius: 4, py: 4, border: `1px dashed ${theme.palette.divider}` }}>
          <Typography variant="overline" sx={{ mb: 2, color: "text.secondary", fontWeight: 700 }}>
            Anteprima Live
          </Typography>
          <ChatbotPreview config={config} />
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <ModalGeneric
      open={open}
      onClose={onClose}
      title={<Typography variant="h6" sx={{ fontWeight: 800 }}>Configura il tuo Chatbot</Typography>}
      content={content}
      maxWidth="lg"
      fullWidth
    />
  );
}
