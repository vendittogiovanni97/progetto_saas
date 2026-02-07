import { ChatbotType, ChatbotTemplate, ChatbotPersonality } from '@/features/projects/interfaces/Chatbot.entity';

export const DEFAULT_CHATBOT_CONFIG = {
  welcomeMessage: "Ciao! Come posso aiutarti oggi?",
  type: ChatbotType.AI,
  template: ChatbotTemplate.GENERIC,
  personality: ChatbotPersonality.PROFESSIONALE,
  primaryColor: "#3b82f6",
  encodedPrompt: null,
};

export enum CHATBOT_COLORS {
  blue = "#3b82f6", // Blue
  green = "#10b981", // Green
  red = "#ef4444", // Red
  orange = "#f59e0b", // Orange
  purple = "#8b5cf6", // Purple
  pink = "#ec4899", // Pink
  dark = "#111827", // Dark
}
