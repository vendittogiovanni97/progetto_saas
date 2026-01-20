import { apiClient } from './client';
import { ApiResponse } from '@/types/api';

export interface ChatbotConfig {
  id?: string;
  name: string;
  welcomeMessage: string;
  systemPrompt?: string;
  primaryColor: string;
  userId: string;
}

export interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt?: string;
}

export const chatbotService = {
  createChatbot: async (config: ChatbotConfig): Promise<ApiResponse<ChatbotConfig>> => {
    return apiClient.post<ChatbotConfig>('/chatbots', config);
  },

  getChatbots: async (userId?: string): Promise<ApiResponse<ChatbotConfig[]>> => {
    return apiClient.get<ChatbotConfig[]>(`/chatbots${userId ? `?userId=${userId}` : ''}`);
  },

  sendMessage: async (chatbotId: string, message: string, visitorId: string): Promise<ApiResponse<ChatMessage>> => {
    return apiClient.post<ChatMessage>('/chatbots/message', { chatbotId, message, visitorId });
  }
};
