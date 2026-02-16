"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  alpha,
  useTheme,
  Stack,
  TextField,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

export interface ChatbotConfig {
  welcomeMessage?: string;
  primaryColor?: string;
  name?: string;
  avatarEmoji?: string;
  enableTypingIndicator?: boolean;
  enableFileUpload?: boolean;
  personality?: string;
  language?: string;
  [key: string]: any;
}

interface ChatbotPreviewProps {
  config: ChatbotConfig;
}

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
}

export function ChatbotPreview({ config }: ChatbotPreviewProps) {
  const theme = useTheme();
  const primaryColor = config.primaryColor || theme.palette.primary.main;
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      text: config.welcomeMessage || "Ciao! Come posso aiutarti?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Aggiorna il messaggio di benvenuto se cambia nella config
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === "initial") {
        return [{
          ...prev[0],
          text: config.welcomeMessage || "Ciao! Come posso aiutarti?"
        }];
      }
      return prev;
    });
  }, [config.welcomeMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simula risposta del bot
    if (config.enableTypingIndicator !== false) {
      setIsTyping(true);
    }

    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getSimulatedResponse(inputValue, config.personality),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1500);
  };

  const getSimulatedResponse = (input: string, personality?: string) => {
    const p = personality?.toLowerCase();
    if (p === "amichevole" || p === "divertente") {
      return "Ehilà! Che bella domanda! Sto ancora imparando, ma farò del mio meglio per aiutarti! ✨";
    }
    if (p === "professionale" || p === "esperto") {
      return "Certamente. Ho analizzato la sua richiesta e posso confermare che stiamo elaborando la soluzione ottimale.";
    }
    if (p === "tecnico") {
      return "Richiesta ricevuta. Elaborazione dei parametri in corso... Analisi completata con successo.";
    }
    return "Grazie per il tuo messaggio! Sono un assistente virtuale in fase di configurazione.";
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        height: 650,
        bgcolor: "#0b0d11", // Profondo nero per far risaltare il contenuto
        borderRadius: 6,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,0,0,0.1)",
        border: `1px solid ${alpha("#fff", 0.08)}`,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Header con un gradiente vibrante e riflessi */}
      <Box
        sx={{
          p: 3,
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${alpha(
            primaryColor,
            0.8
          )} 100%)`,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: 2,
          position: "relative",
          zIndex: 2,
          boxShadow: `0 4px 20px -5px ${alpha(primaryColor, 0.5)}`,
          "&::after": {
            content: '""',
            position: "absolute",
            top: -20,
            right: -20,
            width: 100,
            height: 100,
            background: alpha("#fff", 0.1),
            borderRadius: "50%",
            filter: "blur(20px)",
          },
        }}
      >
        <Avatar
          sx={{
            bgcolor: alpha("#fff", 0.2),
            width: 52,
            height: 52,
            fontSize: "1.6rem",
            border: "2px solid rgba(255,255,255,0.4)",
            boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
          }}
        >
          {config.avatarEmoji || "🤖"}
        </Avatar>
        <Box sx={{ flex: 1, zIndex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1, letterSpacing: -0.5, fontSize: "1.1rem" }}>
            {config.name || "AI Assistant"}
          </Typography>
          <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 0.8 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                bgcolor: "#4caf50",
                borderRadius: "50%",
                boxShadow: "0 0 10px #4caf50",
                animation: "pulseOnline 2s infinite ease-in-out",
                "@keyframes pulseOnline": {
                  "0%, 100%": { transform: "scale(1)", opacity: 1 },
                  "50%": { transform: "scale(1.3)", opacity: 0.5 },
                },
              }}
            />
            <Typography variant="caption" sx={{ opacity: 0.8, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, fontSize: "0.6rem" }}>
              Attivo ora
            </Typography>
          </Stack>
        </Box>
        <IconButton size="small" sx={{ color: "#fff", bgcolor: alpha("#fff", 0.1), "&:hover": { bgcolor: alpha("#fff", 0.2) } }}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Messages Area con pattern e gradienti soffusi */}
      <Box
        sx={{
          flex: 1,
          p: 3,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          position: "relative",
          background: `
            radial-gradient(circle at 0% 0%, ${alpha(primaryColor, 0.08)} 0%, transparent 40%),
            radial-gradient(circle at 100% 100%, ${alpha(primaryColor, 0.05)} 0%, transparent 40%),
            #0b0d11
          `,
          "::-webkit-scrollbar": { width: 4 },
          "::-webkit-scrollbar-thumb": { bgcolor: alpha("#fff", 0.1), borderRadius: 10 },
        }}
      >
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              maxWidth: "80%",
              display: "flex",
              flexDirection: "column",
              gap: 0.8,
              transition: "all 0.3s ease",
            }}
          >
            <Box
              sx={{
                p: 2,
                px: 2.5,
                bgcolor: msg.sender === "user" ? primaryColor : alpha("#fff", 0.05),
                color: "#fff",
                borderRadius: msg.sender === "user" ? "24px 24px 4px 24px" : "24px 24px 24px 4px",
                border: msg.sender === "user" ? "none" : `1px solid ${alpha("#fff", 0.08)}`,
                boxShadow: msg.sender === "user" ? `0 10px 25px ${alpha(primaryColor, 0.3)}` : "0 4px 15px rgba(0,0,0,0.2)",
                backdropFilter: msg.sender === "bot" ? "blur(12px)" : "none",
                transform: "translateY(0)",
                animation: "fadeInUp 0.3s ease-out",
                "@keyframes fadeInUp": {
                  from: { opacity: 0, transform: "translateY(10px)" },
                  to: { opacity: 1, transform: "translateY(0)" }
                }
              }}
            >
              <Typography variant="body2" sx={{ lineHeight: 1.6, fontWeight: 400, fontSize: "0.95rem" }}>
                {msg.text}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.7rem",
                opacity: 0.3,
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                px: 1,
                fontWeight: 600,
                letterSpacing: 0.5
              }}
            >
              {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </Typography>
          </Box>
        ))}

        {isTyping && (
          <Box sx={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                p: 2,
                bgcolor: alpha("#fff", 0.05),
                borderRadius: "20px 20px 20px 4px",
                border: `1px solid ${alpha("#fff", 0.08)}`,
                backdropFilter: "blur(12px)",
                display: "flex",
                gap: 1,
                px: 2.5
              }}
            >
              {[0, 1, 2].map((i) => (
                <Box
                  key={i}
                  component="span"
                  sx={{
                    width: 6,
                    height: 6,
                    bgcolor: alpha("#fff", 0.4),
                    borderRadius: "50%",
                    animation: "bounceDot 1s infinite ease-in-out",
                    animationDelay: `${i * 0.15}s`,
                    "@keyframes bounceDot": {
                      "0%, 100%": { transform: "translateY(0)", opacity: 0.4 },
                      "50%": { transform: "translateY(-4px)", opacity: 1 }
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area Glassmorphism raffinata */}
      <Box
        sx={{
          p: 3,
          px: 4,
          borderTop: `1px solid ${alpha("#fff", 0.08)}`,
          bgcolor: alpha("#000", 0.2),
          backdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          {config.enableFileUpload && (
            <IconButton
              size="small" 
              sx={{ 
                color: alpha("#fff", 0.6), 
                bgcolor: alpha("#fff", 0.05), 
                "&:hover": { bgcolor: alpha("#fff", 0.1), color: "#fff" },
                transition: "all 0.2s ease"
              }}
            >
              <AttachFileIcon fontSize="small" />
            </IconButton>
          )}
          <TextField
            fullWidth
            variant="standard"
            placeholder="Chiedimi pure qualcosa..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            autoComplete="off"
            InputProps={{
              disableUnderline: true,
              sx: {
                bgcolor: alpha("#fff", 0.04),
                borderRadius: 4,
                px: 3,
                py: 1.5,
                fontSize: "1rem",
                color: "#fff",
                border: `1px solid ${alpha("#fff", 0.1)}`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": { bgcolor: alpha("#fff", 0.07), borderColor: alpha("#fff", 0.2) },
                "&.Mui-focused": { 
                  bgcolor: alpha("#fff", 0.08), 
                  borderColor: alpha(primaryColor, 0.6), 
                  boxShadow: `0 0 0 4px ${alpha(primaryColor, 0.15)}`,
                  transform: "scale(1.01)"
                },
              },
            }}
          />
          <IconButton
            onClick={handleSend}
            disabled={!inputValue.trim()}
            sx={{
              bgcolor: inputValue.trim() ? primaryColor : alpha("#fff", 0.03),
              color: "#fff",
              "&:hover": { 
                bgcolor: alpha(primaryColor, 0.9),
                transform: "translateY(-3px) scale(1.05)",
                boxShadow: `0 8px 25px ${alpha(primaryColor, 0.5)}`
              },
              "&:disabled": { color: alpha("#fff", 0.1) },
              transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              p: 2,
              borderRadius: 4
            }}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
