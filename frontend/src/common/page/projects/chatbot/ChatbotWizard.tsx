"use client";

import { Box, Typography, TextField, Button, alpha, useTheme, Grid, Stack } from "@mui/material";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { chatbotService } from "@/services/api/chatbot";
import { ModalGeneric } from "@/common/components/modal/ModalGeneric";
import { ChatbotPreview } from "./ChatbotPreview";

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
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<ChatbotConfig>({ name: "My Assistant", welcomeMessage: "Ciao! Come posso aiutarti oggi?", primaryColor: "#3b82f6" });

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await chatbotService.createChatbot({
        ...config,
        accountId: 1,
      });
      if (response.data) {
        onSave(response.data);
      }
    } catch (error) {
      void error;
      alert("Errore durante la creazione del chatbot.");
    } finally {
      setLoading(false);
    }
  };

  const content = (
      <Box sx={{ p: 0 }}>
      <Box sx={{ p: 4 }}>
        <Grid container spacing={5}>
          {/* Form Side */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={4}>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 700 }}>
                  Nome del Bot
                </Typography>
                <TextField
                  fullWidth
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  placeholder="es. Support Bot"
                  disabled={loading}
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 700 }}>
                  Messaggio di Benvenuto
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  value={config.welcomeMessage}
                  onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
                  placeholder="Scrivi cosa dirà il bot all'inizio..."
                  disabled={loading}
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 700 }}>
                  Colore Brand
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                  {colors.map((color) => (
                    <Box
                      key={color}
                      onClick={() => !loading && setConfig({ ...config, primaryColor: color })}
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        bgcolor: color,
                        cursor: loading ? "default" : "pointer",
                        border: config.primaryColor === color ? "4px solid #fff" : "none",
                        boxShadow: config.primaryColor === color ? `0 0 0 2px ${color}` : "none",
                        transition: "transform 0.2s",
                        "&:hover": { transform: loading ? "none" : "scale(1.1)" }
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ pt: 2, display: "flex", gap: 2 }}>
                <Button variant="outlined" fullWidth onClick={onClose} disabled={loading}>
                  Annulla
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSave}
                  disabled={loading}
                  sx={{ bgcolor: config.primaryColor, "&:hover": { bgcolor: alpha(config.primaryColor, 0.8) } }}
                >
                  {loading ? "Creazione..." : "Crea Chatbot"}
                </Button>
              </Box>
            </Stack>
          </Grid>

          {/* Preview Side */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", bgcolor: alpha(theme.palette.divider, 0.1), borderRadius: 4, py: 4 }}>
            <Typography variant="overline" sx={{ mb: 2, color: "text.secondary", fontWeight: 700 }}>
              Anteprima Live
            </Typography>
            <ChatbotPreview config={config} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );

  return (
    <ModalGeneric
      open={open}
      onClose={onClose}
      title={<Typography sx={{ fontWeight: 800 }}>Configura il tuo Chatbot</Typography>}
      content={content}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: alpha(theme.palette.background.paper, 0.9),
          backdropFilter: "blur(20px)",
          borderRadius: 4,
        }
      }}
    />
  );
}
