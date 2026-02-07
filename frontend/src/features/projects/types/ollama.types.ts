/**
 * Interfacce per Ollama
 */
export interface OllamaChatRequest {
  message: string;
  chatbotId?: string;
  type?: string; 
  conversationHistory?: { role: string; content: string }[];
}

export interface OllamaChatResponse {
  success: boolean;
  reply: string;
  response?: string; 
}

export interface OllamaTypesResponse {
  success: boolean;
  types: string[];
}