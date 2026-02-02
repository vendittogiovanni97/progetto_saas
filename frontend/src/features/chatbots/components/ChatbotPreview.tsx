"use client";

import { Box, Typography, IconButton, alpha, Avatar, Paper, InputBase } from "@mui/material";
import { 
  SmartToy as SmartToyIcon, 
  Close as CloseIcon, 
  Send as SendIcon 
} from "@mui/icons-material";
import { useState } from "react";

interface ChatbotConfig {
  name: string;
  welcomeMessage: string;
  primaryColor: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatbotPreview({ config }: { config: ChatbotConfig }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: config.welcomeMessage }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    
    // Simula risposta
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", content: "Grazie per avermi scritto! Posso aiutarti in altro?" }]);
    }, 1000);
  };

  return (
    <Paper
      elevation={24}
      sx={{
        width: "100%",
        maxWidth: 360,
        height: 500,
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: "#ffffff",
        boxShadow: `0 20px 40px ${alpha(config.primaryColor, 0.2)}`,
        border: `1px solid ${alpha(config.primaryColor, 0.2)}`,
      }}
    >
      {/* Header */}
      <Box 
        sx={{ 
          p: 2, 
          bgcolor: config.primaryColor, 
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: 1.5
        }}
      >
        <Avatar sx={{ bgcolor: alpha("#fff", 0.2), width: 32, height: 32 }}>
          <SmartToyIcon sx={{ fontSize: 20 }} />
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            {config.name}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8, display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#4ade80" }} />
            Online
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: "#fff" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Messages Area */}
      <Box 
        sx={{ 
          flex: 1, 
          p: 2, 
          overflow: "auto", 
          display: "flex", 
          flexDirection: "column", 
          gap: 2,
          bgcolor: "#f8fafc"
        }}
      >
        {messages.map((m, i) => (
          <Box 
            key={i} 
            sx={{ 
              alignSelf: m.role === "assistant" ? "flex-start" : "flex-end",
              maxWidth: "80%",
            }}
          >
            <Box 
              sx={{ 
                p: 1.5, 
                borderRadius: 2, 
                bgcolor: m.role === "assistant" ? "#fff" : config.primaryColor,
                color: m.role === "assistant" ? "#1e293b" : "#fff",
                boxShadow: m.role === "assistant" ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
                fontSize: "0.875rem"
              }}
            >
              {m.content}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Input Area */}
      <Box sx={{ p: 2, bgcolor: "#fff", borderTop: "1px solid #e2e8f0", display: "flex", gap: 1 }}>
        <InputBase
          fullWidth
          placeholder="Scrivi un messaggio..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          sx={{ fontSize: "0.875rem" }}
        />
        <IconButton 
          size="small" 
          onClick={handleSend}
          sx={{ 
            color: config.primaryColor,
            "&:hover": { bgcolor: alpha(config.primaryColor, 0.1) }
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}
