import { apiClient } from '@/lib/api/client';

/**
 * Recupera tutte le categorie disponibili
 */
export const getCategories = async () => {
  const response = await apiClient.get<any[]>('/api/categories');
  return response.data;
};

/**
 * Recupera i dettagli di una singola categoria tramite ID
 */
export const getCategory = async (id: number) => {
  const response = await apiClient.get<any>(`/api/categories/${id}`);
  return response.data;
};