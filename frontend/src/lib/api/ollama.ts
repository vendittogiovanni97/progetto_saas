import { ApiResponse } from "@/types/api";
import { API_ENDPOINTS } from "./config";
import { apiClient } from "./client";

export interface OllamaChatRequest {
  message: string;
  chatbotId?: string;
  type?: string; // Tipo di chatbot (support, ecommerce, pharmacy, generic)
  conversationHistory?: { role: string; content: string }[];
}

export interface OllamaChatResponse {
  success: boolean;
  reply: string;
  response?: string; // Support redundant field for legacy code
}

export interface OllamaTypesResponse {
  success: boolean;
  types: string[];
}

export const ollamaService = {
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