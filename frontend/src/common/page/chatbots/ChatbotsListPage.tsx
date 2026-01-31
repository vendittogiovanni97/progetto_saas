"use client";

import { Box, Typography, Grid, Card, CardContent, Button, alpha, useTheme, Avatar, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { chatbotService, ChatbotConfig } from "@/services/api/chatbot";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";

export function ChatbotsListPage() {
  const theme = useTheme();
  const { user } = useAuth();
  const [chatbots, setChatbots] = useState<ChatbotConfig[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>I Miei Chatbot</Typography>
          <Typography variant="body1" color="text.secondary">Gestisci e interagisci con i tuoi assistenti virtuali.</Typography>
        </Box>
        <Button 
          variant="contained" 
          component={Link} 
          href="/dashboard/projects"
          startIcon={<span className="material-symbols-outlined">add</span>}
          sx={{ borderRadius: 2 }}
        >
          Nuovo Chatbot
        </Button>
      </Box>

      {loading ? (
        <Typography>Caricamento...</Typography>
      ) : chatbots.length === 0 ? (
        <Paper sx={{ p: 8, textAlign: "center", borderRadius: 4, bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Nessun chatbot creato ancora.</Typography>
          <Button variant="outlined" component={Link} href="/dashboard/projects">Inizia Ora</Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {chatbots.map((bot) => (
            <Grid key={bot.id} size={{ xs: 12, md: 4 }}>
              <Card sx={{ 
                borderRadius: 4, 
                bgcolor: alpha(theme.palette.background.paper, 0.4),
                backdropFilter: "blur(10px)",
                border: `1px solid ${alpha(bot.primaryColor, 0.2)}`,
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-4px)" }
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <Avatar sx={{ bgcolor: bot.primaryColor }}>
                      <span className="material-symbols-outlined">smart_toy</span>
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>{bot.name}</Typography>
                      <Typography variant="caption" color="text.secondary">ID: {bot.id}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>Creato il: {new Date().toLocaleDateString()}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 40 }}>
                    {bot.welcomeMessage}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      component={Link} 
                      href={`/dashboard/chatbots/${bot.id}`}
                      sx={{ bgcolor: bot.primaryColor, "&:hover": { bgcolor: alpha(bot.primaryColor, 0.8) } }}
                    >
                      Usa Bot
                    </Button>
                    <Button variant="outlined" sx={{ minWidth: 0, px: 2 }}>
                      <span className="material-symbols-outlined">settings</span>
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
