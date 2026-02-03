import { apiClient } from './client';
import { API_ENDPOINTS } from './config';
import { ApiResponse } from '@/types/shared.types';
import { ProjectWithRelations, CreateProjectDTO, UpdateProjectDTO } from '@/features/projects/interfaces/Project.entity';

export const projectService = {
  /**
   * Crea un nuovo progetto
   * Se type è CHATBOT, crea automaticamente anche il chatbot associato
   */
  createProject: async (data: CreateProjectDTO): Promise<ApiResponse<ProjectWithRelations>> => {
    const response = await apiClient.post<any>(API_ENDPOINTS.PROJECTS.BASE, data);
    
    // Converti la risposta in entity class
    if (response.data) {
      response.data = new ProjectWithRelations(response.data);
    }
    
    return response;
  },

  /**
   * Recupera tutti i progetti di un account
   */
  getProjects: async (accountId: number): Promise<ApiResponse<ProjectWithRelations[]>> => {
    const response = await apiClient.get<any[]>(`${API_ENDPOINTS.PROJECTS.BASE}?accountId=${accountId}`);
    
    // Converti array di risposte in entity classes
    if (response.data) {
      response.data = response.data.map((item: any) => new ProjectWithRelations(item));
    }
    
    return response;
  },

  /**
   * Recupera un singolo progetto con le sue relazioni
   */
  getProject: async (id: number): Promise<ApiResponse<ProjectWithRelations>> => {
    const response = await apiClient.get<any>(`${API_ENDPOINTS.PROJECTS.BASE}/${id}`);
    
    // Converti la risposta in entity class
    if (response.data) {
      response.data = new ProjectWithRelations(response.data);
    }
    
    return response;
  },

  /**
   * Aggiorna un progetto esistente
   */
  updateProject: async (id: number, data: UpdateProjectDTO): Promise<ApiResponse<ProjectWithRelations>> => {
    const response = await apiClient.put<any>(`${API_ENDPOINTS.PROJECTS.BASE}/${id}`, data);
    
    // Converti la risposta in entity class
    if (response.data) {
      response.data = new ProjectWithRelations(response.data);
    }
    
    return response;
  },

  /**
   * Elimina un progetto e tutte le sue relazioni
   */
  deleteProject: async (id: number): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`${API_ENDPOINTS.PROJECTS.BASE}/${id}`);
  },
};

// Re-export entity classes e DTOs
export { Project, ProjectWithRelations } from '@/features/projects/interfaces/Project.entity';
export type { CreateProjectDTO, UpdateProjectDTO } from '@/features/projects/interfaces/Project.entity';

