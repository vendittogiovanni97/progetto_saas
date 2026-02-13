import {
  ChatbotType,
  ChatbotTemplate,
  ChatbotPersonality,
  ChatbotLanguage,
  ChatbotPosition,
} from "@/features/projects/interfaces/Chatbot.entity";

// ============================================
// Colori disponibili per il chatbot
// ============================================

export enum CHATBOT_COLORS {
  blue = "#3b82f6",       // Blue
  indigo = "#6366f1",     // Indigo
  violet = "#8b5cf6",     // Violet
  purple = "#a855f7",     // Purple
  fuchsia = "#d946ef",    // Fuchsia
  pink = "#ec4899",       // Pink
  rose = "#f43f5e",       // Rose
  red = "#ef4444",        // Red
  orange = "#f59e0b",     // Orange
  emerald = "#10b981",    // Emerald
  teal = "#14b8a6",       // Teal
  cyan = "#06b6d4",       // Cyan
  slate = "#475569",      // Slate
  dark = "#111827",       // Dark
}

// ============================================
// Labels leggibili per gli enum
// ============================================

export const TYPE_LABELS: Record<string, string> = {
  [ChatbotType.DEFAULT]: "Risposte Predefinite",
  [ChatbotType.AI]: "Intelligenza Artificiale",
  [ChatbotType.RULE_BASED]: "Basato su Regole",
  [ChatbotType.HYBRID]: "Ibrido (AI + Regole)",
};

export const TEMPLATE_LABELS: Record<string, string> = {
  [ChatbotTemplate.GENERIC]: "Generico",
  [ChatbotTemplate.CUSTOM]: "Personalizzato",
  [ChatbotTemplate.ECOMMERCE]: "E-Commerce",
  [ChatbotTemplate.SUPPORT]: "Assistenza Clienti",
  [ChatbotTemplate.BOOKING]: "Prenotazioni",
  [ChatbotTemplate.FAQ]: "FAQ Automatiche",
};

export const PERSONALITY_LABELS: Record<string, string> = {
  [ChatbotPersonality.AMICHEVOLE]: "Amichevole",
  [ChatbotPersonality.PROFESSIONALE]: "Professionale",
  [ChatbotPersonality.ESPERTO]: "Esperto",
  [ChatbotPersonality.DETTAGLIATO]: "Dettagliato",
  [ChatbotPersonality.TECNICO]: "Tecnico",
  [ChatbotPersonality.DIVERTENTE]: "Divertente",
};

export const LANGUAGE_LABELS: Record<string, string> = {
  [ChatbotLanguage.IT]: "🇮🇹 Italiano",
  [ChatbotLanguage.EN]: "🇬🇧 English",
  [ChatbotLanguage.FR]: "🇫🇷 Français",
  [ChatbotLanguage.DE]: "🇩🇪 Deutsch",
  [ChatbotLanguage.ES]: "🇪🇸 Español",
};

export const POSITION_LABELS: Record<string, string> = {
  [ChatbotPosition.BOTTOM_RIGHT]: "In basso a destra",
  [ChatbotPosition.BOTTOM_LEFT]: "In basso a sinistra",
  [ChatbotPosition.CENTER]: "Centrato",
};

// ============================================
// Helper per creare opzioni select da enum
// ============================================

export function enumToOptions(enumObj: Record<string, string>, labels: Record<string, string>) {
  return Object.values(enumObj).map((v) => ({
    value: v,
    label: labels[v] || v,
  }));
}
