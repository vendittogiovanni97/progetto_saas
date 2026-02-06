import { API_CONFIG } from './config';
import { ApiRequestConfig, ApiResponse, HttpMethod } from '@/types/api';
import { ApiError } from './errors';
import { getAccessToken } from './auth';

async function request<T>(
  endpoint: string,
  method: HttpMethod = HttpMethod.GET,
  data?: unknown,
  config: ApiRequestConfig = {}
): Promise<ApiResponse<T>> {
  const url = `${API_CONFIG.baseURL}${endpoint}`;
  
  // Prepariamo gli header
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(config.headers as Record<string, string>),
  };

  // Aggiungiamo il token se presente
  const token = getAccessToken();
  if (token && !config.skipAuth) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new ApiError(responseData.message || 'Errore API', response.status, responseData);
    }

    return {
      success: true,
      status: response.status,
      data: responseData.data || responseData,
      message: responseData.message,
    };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error instanceof Error ? error.message : 'Errore di rete', 500);
  }
}

/**
 * Esportiamo i metodi semplici
 */
export const apiClient = {
  get: <T>(endpoint: string, config?: ApiRequestConfig) => 
    request<T>(endpoint, HttpMethod.GET, undefined, config),
    
  post: <T>(endpoint: string, data?: unknown, config?: ApiRequestConfig) => 
    request<T>(endpoint, HttpMethod.POST, data, config),
    
  put: <T>(endpoint: string, data?: unknown, config?: ApiRequestConfig) => 
    request<T>(endpoint, HttpMethod.PUT, data, config),
    
  delete: <T>(endpoint: string, config?: ApiRequestConfig) => 
    request<T>(endpoint, HttpMethod.DELETE, undefined, config),

  // TODO: In futuro aggiungere retry logic
  // TODO: In futuro aggiungere refresh token automatico
};