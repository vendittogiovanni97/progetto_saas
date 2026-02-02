"use client";

import { Box, Typography, alpha, useTheme, Avatar, Paper, InputBase, IconButton, Icon } from "@mui/material";
import { 
  SmartToy as SmartToyIcon, 
  Send as SendIcon 
} from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { chatbotService, ChatbotConfig, ChatMessage } from "@/services/api/chatbot";
import { PageHeaderGeneric } from "@/common/components/header/PageHeaderGeneric";
import { useAuth } from "@/providers/AuthProvider";
import { ollamaService } from "@/services/api/ollama";

export function ChatbotViewPage() {
  const theme = useTheme();
  const { id } = useParams();
  const { user } = useAuth();
  const [chatbot, setChatbot] = useState<ChatbotConfig | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Carica dati chatbot usando l'accountId dell'utente autenticato
    const loadChatbot = async () => {
      if (!user?.accountId) {
        console.error("User not authenticated or accountId missing");
        return;
      }
      try {
        console.log("Chiamata API con accountId:", user.accountId);
        const response = await chatbotService.getChatbots(user.accountId);
        console.log("Risposta API:", response);
        if (response.data) {
          console.log("Chatbots disponibili:", response.data);
          const found = response.data.find(c => c.id === id || c.id === String(id) || String(c.id) === id);
          if (found) {
            setChatbot(found);
            setMessages([{ role: "assistant", content: found.welcomeMessage }]);
          } else {
            console.error("Chatbot non trovato con ID:", id);
          }
        } else {
          console.error("Nessun chatbot restituito dall'API");
        }
      } catch (error) {
        console.error("Error loading chatbot:", error);
      }
    };
    if (id) loadChatbot();
  }, [id, user?.accountId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatbot?.id) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      // Usa l'API di Ollama invece di sendMessage
      const response = await ollamaService.chatWithOllama({
        chatbotId: chatbot.id,
        message: userMsg,
        conversationHistory: messages.map(m => ({
          role: m.role,
          content: m.content
        }))
      });
      
      if (response.data?.reply || response.data?.response) {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: response.data.reply || response.data.response || "" 
        }]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Messaggio di errore per l'utente
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Mi dispiace, si è verificato un errore. Riprova." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  if (!chatbot) {
    return (
      <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        <Typography>Caricamento chatbot...</Typography>
        <Typography variant="caption" color="text.secondary">
          Verifica di essere autenticato e che il chatbot esista
        </Typography>
        {user ? (
          <Typography variant="caption" color="text.secondary">
            Account ID: {user.accountId}
          </Typography>
        ) : (
          <Typography variant="caption" color="error">
            Utente non autenticato
          </Typography>
        )}
      </Box>
    );
  }

  const headerActions = (
     <Avatar sx={{ bgcolor: chatbot.primaryColor, width: 44, height: 44 }}>
        <SmartToyIcon />
     </Avatar>
  );

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", height: "calc(100vh - 160px)", display: "flex", flexDirection: "column" }}>
      <PageHeaderGeneric
        title={chatbot.name}
        subtitle={`ID: ${chatbot.id}`}
        actions={headerActions}
      />

      <Paper
        elevation={0}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: 4,
          overflow: "hidden",
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: alpha(theme.palette.background.paper, 0.4),
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Messages Area */}
        <Box 
          ref={scrollRef}
          sx={{ 
            flex: 1, 
            p: 3, 
            overflow: "auto", 
            display: "flex", 
            flexDirection: "column", 
            gap: 2,
          }}
        >
          {messages.map((m, i) => (
            <Box 
              key={i} 
              sx={{ 
                alignSelf: m.role === "assistant" ? "flex-start" : "flex-end",
                maxWidth: "70%",
              }}
            >
              <Typography variant="caption" sx={{ ml: 1, mb: 0.5, display: "block", opacity: 0.6 }}>
                {m.role === "assistant" ? chatbot.name : "Tu"}
              </Typography>
              <Box 
                sx={{ 
                  p: 2, 
                  borderRadius: 3, 
                  bgcolor: m.role === "assistant" ? alpha(theme.palette.common.white, 0.05) : chatbot.primaryColor,
                  color: "#fff",
                  boxShadow: m.role === "assistant" ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
                  fontSize: "0.95rem",
                  lineHeight: 1.5
                }}
              >
                {m.content}
              </Box>
            </Box>
          ))}
          {loading && (
            <Box sx={{ alignSelf: "flex-start", opacity: 0.6, fontSize: "0.8rem", ml: 1 }}>
              {chatbot.name} sta scrivendo...
            </Box>
          )}
        </Box>

        {/* Input Area */}
        <Box sx={{ p: 2, bgcolor: alpha(theme.palette.background.paper, 0.6), borderTop: `1px solid ${theme.palette.divider}`, display: "flex", gap: 1 }}>
          <InputBase
            fullWidth
            placeholder="Scrivi un messaggio al tuo bot..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            sx={{ 
              p: 1.5, 
              bgcolor: alpha(theme.palette.common.black, 0.2), 
              borderRadius: 2,
              px: 2,
              fontSize: "1rem"
            }}
          />
          <IconButton 
            onClick={handleSend}
            disabled={loading}
            sx={{ 
              bgcolor: chatbot.primaryColor, 
              color: "#fff",
              "&:hover": { bgcolor: alpha(chatbot.primaryColor, 0.8) },
              borderRadius: 2,
              width: 54
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}
