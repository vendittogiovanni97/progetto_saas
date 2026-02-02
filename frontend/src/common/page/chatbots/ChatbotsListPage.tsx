"use client";

import { Box, Typography, Grid, alpha, useTheme, Avatar, Paper } from "@mui/material";
import { ButtonGeneric } from "@/common/components/button/ButtonGeneric";
import { useRouter } from "next/navigation";
import { ChatbotWizard } from "./components/ChatbotWizard";
import { 
  IconAdd, 
  IconBot, 
  IconSettings 
} from "@/common/icons/icons";
import { useState, useEffect } from "react";
import { chatbotService, ChatbotConfig } from "@/services/api/chatbot";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { PageHeaderGeneric } from "@/common/components/header/PageHeaderGeneric";
import { CardGeneric } from "@/common/components/card/CardGeneric";

export function ChatbotsListPage() {
  const { user } = useAuth();
  const theme = useTheme();
  const router = useRouter();
  const [chatbots, setChatbots] = useState<ChatbotConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  useEffect(() => {
    const loadChatbots = async () => {
      if (!user) return;
      try {
        const response = await chatbotService.getChatbots(user.id);
        if (response.data) {
          setChatbots(response.data);
        }
      } catch (error) {
        console.error("Error loading chatbots:", error);
      } finally {
        setLoading(false);
      }
    };
    loadChatbots();
  }, [user]);

  const headerActions = (
    <ButtonGeneric.Primary
      onClick={() => setIsWizardOpen(true)}
      startIcon={<IconAdd />}
    >
      New Chatbot
    </ButtonGeneric.Primary>
  );

  return (
    <Box sx={{ p: 4 }}>
      <PageHeaderGeneric
        title="Chatbots // AI Intelligence"
        subtitle="MANAGE YOUR AI ASSISTANTS AND AGENTS"
        actions={headerActions}
      />

      {loading ? (
        <Typography>Caricamento...</Typography>
      ) : chatbots.length === 0 ? (
        <Paper sx={{ p: 8, textAlign: "center", borderRadius: 4, bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Nessun chatbot creato ancora.</Typography>
          <ButtonGeneric.Secondary component={Link} href="/dashboard/projects" label="Inizia Ora" />
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {chatbots.map((bot) => (
            <Grid key={bot.id} size={{ xs: 12, md: 4 }}>
              <CardGeneric
                title={bot.name}
                subtitle={`ID: ${bot.id}`}
                onClick={() => {}} // Placeholder for card click if needed
                isActive={false}
              >
                <Box sx={{ display: "flex", gap: 2, mb: 2, mt: -1 }}>
                    <Avatar sx={{ bgcolor: bot.primaryColor, width: 32, height: 32 }}>
                        <IconBot sx={{ fontSize: 20 }} />
                    </Avatar>
                    <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>
                        Creato il: {new Date().toLocaleDateString()}
                    </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 40 }}>
                  {bot.welcomeMessage}
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <ButtonGeneric.Primary
                    fullWidth
                    component={Link}
                    href={`/dashboard/chatbots/${bot.id}`}
                    label="Usa Bot"
                    sx={{ bgcolor: bot.primaryColor, "&:hover": { bgcolor: alpha(bot.primaryColor, 0.8) } }}
                  />
                  <ButtonGeneric.Ghost
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/dashboard/chatbots/${bot.id}/settings`); // Changed chatbot.id to bot.id
                    }}
                  >
                    <IconSettings sx={{ fontSize: 18 }} />
                  </ButtonGeneric.Ghost>
                </Box>
              </CardGeneric>
            </Grid>
          ))}
        </Grid>
      )}

      <ChatbotWizard 
        open={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSave={(newBot) => {
          setChatbots(prev => [...prev, newBot]);
          setIsWizardOpen(false);
        }}
      />
    </Box>
  );
}
