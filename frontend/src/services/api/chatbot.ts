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

export const chatbotService = {
  createChatbot: async (config: ChatbotConfig): Promise<ApiResponse<ChatbotConfig>> => {
    return apiClient.post<ChatbotConfig>(API_ENDPOINTS.CHATBOT.BASE, config);
  },

  getChatbots: async (accountId?: number): Promise<ApiResponse<ChatbotConfig[]>> => {
    return apiClient.get<ChatbotConfig[]>(`${API_ENDPOINTS.CHATBOT.BASE}${accountId ? `?accountId=${accountId}` : ''}`);
  },

  sendMessage: async (chatbotId: string, message: string, visitorId: string): Promise<ApiResponse<ChatMessage>> => {
    return apiClient.post<ChatMessage>('/chatbots/message', { chatbotId, message, visitorId });
  },
};
