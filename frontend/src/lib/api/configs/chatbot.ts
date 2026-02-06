/**
 * Configurazioni specifiche per progetti di tipo CHATBOT
 */

import {
  ChatbotType,
  ChatbotTemplate,
  ChatbotPersonality,
  ChatbotProjectConfig,
} from '@/types/shared.types';
import { blue } from '@mui/material/colors';

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
export enum CHATBOT_COLORS {
  blue = "#3b82f6", // Blue
  green = "#10b981", // Green
  red = "#ef4444", // Red
  orange = "#f59e0b", // Orange
  purple = "#8b5cf6", // Purple
  pink = "#ec4899", // Pink
  dark = "#111827", // Dark
}

// Re-export types for convenience
export type {
  ChatbotType,
  ChatbotTemplate,
  ChatbotPersonality,
  ChatbotProjectConfig,
} from '@/types/shared.types';
