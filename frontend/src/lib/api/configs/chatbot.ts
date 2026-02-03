/**
 * Configurazioni specifiche per progetti di tipo CHATBOT
 */

import {
  ChatbotType,
  ChatbotTemplate,
  ChatbotPersonality,
  ChatbotProjectConfig,
} from '@/types/shared.types';

/**
 * Valori di default per un nuovo chatbot
 */
export const DEFAULT_CHATBOT_CONFIG: ChatbotProjectConfig = {
  welcomeMessage: "Ciao! Come posso aiutarti oggi?",
  type: ChatbotType.AI,
  template: ChatbotTemplate.GENERIC,
  personality: ChatbotPersonality.PROFESSIONALE,
  primaryColor: "#3b82f6",
  encodedPrompt: null,
};

/**
 * Colori disponibili per il chatbot
 */
export const CHATBOT_COLORS = [
  "#3b82f6", // Blue
  "#10b981", // Green
  "#ef4444", // Red
  "#f59e0b", // Orange
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#111827", // Dark
];

// Re-export types for convenience
export type {
  ChatbotType,
  ChatbotTemplate,
  ChatbotPersonality,
  ChatbotProjectConfig,
} from '@/types/shared.types';
