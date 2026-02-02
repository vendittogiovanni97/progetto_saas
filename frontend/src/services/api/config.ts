/**
 * Configurazione API Client
 */

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api",
  timeout: 30000, // 30 secondi
  // TODO: In futuro potremmo aggiungere retryAttempts e retryDelay qui
} as const;

export const API_ENDPOINTS = {
  // Autenticazione
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
  },
  // Progetti
  PROJECTS: {
    BASE: "/projects",
    BY_ID: (id: string) => `/projects/${id}`,
  },
  // Clienti
  CLIENTS: {
    BASE: "/clients",
    BY_ID: (id: string) => `/clients/${id}`,
  },
  // Utenti
  USERS: {
    BASE: "/users",
    BY_ID: (id: string) => `/users/${id}`,
  },
  // Chatbot
  CHATBOT: {
    BASE: "/chatbots",
    BY_ID: (id: string) => `/chatbots/${id}`,
    CHAT: "/api/chat",
    TYPES: "/api/chat/types",
  },
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  TOKEN_EXPIRY: "token_expiry",
} as const;
