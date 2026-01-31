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

export interface OllamaChatRequest {
  message: string;
  type?: string; // Tipo di chatbot (support, ecommerce, pharmacy, generic)
}

export interface OllamaChatResponse {
  success: boolean;
  reply: string;
}

export interface OllamaTypesResponse {
  success: boolean;
  types: string[];
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

  // Nuove funzioni per l'integrazione con Ollama
  chatWithOllama: async (request: OllamaChatRequest): Promise<ApiResponse<OllamaChatResponse>> => {
    try {
      const response = await apiClient.post<OllamaChatResponse>(API_ENDPOINTS.CHATBOT.CHAT, request);
      return response;
    } catch (error) {
      console.error('Errore nella chat con Ollama:', error);
      throw error;
    }
  },

  getAvailableChatbotTypes: async (): Promise<ApiResponse<OllamaTypesResponse>> => {
    try {
      const response = await apiClient.get<OllamaTypesResponse>(API_ENDPOINTS.CHATBOT.TYPES);
      return response;
    } catch (error) {
      console.error('Errore nel recupero dei tipi di chatbot:', error);
      throw error;
    }
  }
};
