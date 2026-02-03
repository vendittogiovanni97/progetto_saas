import { apiClient } from './client';
import { ApiResponse } from '@/types/api';
import { API_ENDPOINTS } from './config';

export interface ChatbotConfig {
  id?: string;
  name: string;
  welcomeMessage: string;
  systemPrompt?: string;
  primaryColor: string;
  accountId: number;
}

export interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt?: string;
}

/**
 * Servizio per gestire i chatbot
 * NOTA: La creazione e l'eliminazione dei chatbot avviene tramite projectService
 */
export const chatbotService = {
  /**
   * Recupera tutti i chatbot di un account
   */
  getChatbots: async (accountId?: number): Promise<ApiResponse<ChatbotConfig[]>> => {
    return apiClient.get<ChatbotConfig[]>(`${API_ENDPOINTS.CHATBOT.BASE}${accountId ? `?accountId=${accountId}` : ''}`);
  },

  /**
   * Invia un messaggio al chatbot
   */
  sendMessage: async (chatbotId: string, message: string, visitorId: string): Promise<ApiResponse<ChatMessage>> => {
    return apiClient.post<ChatMessage>('/chatbots/message', { chatbotId, message, visitorId });
  },
};
