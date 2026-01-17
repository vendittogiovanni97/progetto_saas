/**
 * Configurazione API Client
 */

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  timeout: 30000, // 30 secondi
  retryAttempts: 3,
  retryDelay: 1000, // 1 secondo
  refreshTokenThreshold: 300, // 5 minuti prima della scadenza
} as const;

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
  },
  // Projects
  PROJECTS: {
    BASE: "/projects",
    BY_ID: (id: string) => `/projects/${id}`,
    BY_ID_DOMAINS: (id: string) => `/projects/${id}/domains`,
    BY_ID_CONFIG: (id: string) => `/projects/${id}/config`,
    BY_ID_SERVICES: (id: string) => `/projects/${id}/services`,
    BY_ID_ACCESS: (id: string) => `/projects/${id}/access`,
  },
  // Analytics
  ANALYTICS: {
    BASE: "/analytics",
    DASHBOARD: "/analytics/dashboard",
    METRICS: "/analytics/metrics",
    EXPORT: "/analytics/export",
  },
  // Clients
  CLIENTS: {
    BASE: "/clients",
    BY_ID: (id: string) => `/clients/${id}`,
  },
  // Deployments
  DEPLOYMENTS: {
    BASE: "/deployments",
    BY_ID: (id: string) => `/deployments/${id}`,
    BY_ID_LOGS: (id: string) => `/deployments/${id}/logs`,
    BY_ID_ROLLBACK: (id: string) => `/deployments/${id}/rollback`,
  },
  // Services
  SERVICES: {
    BASE: "/services",
    HEALTH: "/services/health",
    BY_ID: (id: string) => `/services/${id}`,
  },
  // Users
  USERS: {
    BASE: "/users",
    BY_ID: (id: string) => `/users/${id}`,
    ROLES: "/users/roles",
  },
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  TOKEN_EXPIRY: "token_expiry",
} as const;
