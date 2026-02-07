import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { ApiResponse } from '@/types/api';
import { ProjectWithRelations, CreateProjectDTO, UpdateProjectDTO } from '../interfaces/Project.entity';
import { Category } from '../interfaces/Category.entity';
import { Message } from '../interfaces/Conversation.entity';
import { OllamaChatRequest, OllamaChatResponse, OllamaTypesResponse } from '../types/ollama.types';

export const projectService = {
  createProject: async (data: CreateProjectDTO): Promise<ApiResponse<ProjectWithRelations>> => {
    const response = await apiClient.post<any>(API_ENDPOINTS.PROJECTS.BASE, data);
    
    if (response.data) {
      response.data = new ProjectWithRelations(response.data);
    }
    
    return response;
  },

  getProjects: async (accountId: number): Promise<ApiResponse<ProjectWithRelations[]>> => {
    const response = await apiClient.get<any[]>(`${API_ENDPOINTS.PROJECTS.BASE}?accountId=${accountId}`);
    
    if (response.data) {
      response.data = response.data.map((item: any) => new ProjectWithRelations(item));
    }
    
    return response;
  },

  getProject: async (id: number): Promise<ApiResponse<ProjectWithRelations>> => {
    const response = await apiClient.get<any>(`${API_ENDPOINTS.PROJECTS.BASE}/${id}`);
    
    if (response.data) {
      response.data = new ProjectWithRelations(response.data);
    }
    
    return response;
  },

  updateProject: async (id: number, data: UpdateProjectDTO): Promise<ApiResponse<ProjectWithRelations>> => {
    const response = await apiClient.put<any>(`${API_ENDPOINTS.PROJECTS.BASE}/${id}`, data);
    
    if (response.data) {
      response.data = new ProjectWithRelations(response.data);
    }
    
    return response;
  },

  deleteProject: async (id: number): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`${API_ENDPOINTS.PROJECTS.BASE}/${id}`);
  },
};

export const chatbotService = {
  sendMessage: async (chatbotId: number | string, message: string, visitorId: string): Promise<ApiResponse<Message>> => {
    return apiClient.post<Message>('/chatbots/message', { chatbotId, message, visitorId });
  },
};

export const ollamaService = {
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

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>(API_ENDPOINTS.CHATBOT.TYPES); // O endpoint specifico se esiste
    // Nota: Ho visto che prima puntava a /api/categories, ma in config.ts abbiamo CHATBOT.TYPES. 
    // Manteniamo la logica precedente se differente, ma usiamo config se possibile.
    // Ripristino /api/categories se non mappato correttamente in config.
    const res = await apiClient.get<any[]>('/api/categories');
    return res.data || [];
  },

  getCategory: async (id: number): Promise<Category> => {
    const response = await apiClient.get<any>(`/api/categories/${id}`);
    return response.data;
  },
};