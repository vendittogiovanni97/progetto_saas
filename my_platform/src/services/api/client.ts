/**
 * Client API centralizzato con interceptors e retry logic
 */

import { API_CONFIG } from './config';
import { ApiRequestConfig, ApiResponse, HttpMethod } from '@/types/api';
import { ApiClientError, NetworkError, TimeoutError } from './errors';
import { authManager } from './auth';

class ApiClient {
  private baseURL: string;
  private timeout: number;
  private defaultRetryAttempts: number;
  private defaultRetryDelay: number;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.timeout = API_CONFIG.timeout;
    this.defaultRetryAttempts = API_CONFIG.retryAttempts;
    this.defaultRetryDelay = API_CONFIG.retryDelay;
  }

  /**
   * Metodo principale per effettuare richieste HTTP
   */
  async request<T>(
    endpoint: string,
    method: HttpMethod = HttpMethod.GET,
    data?: unknown,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      retry = this.defaultRetryAttempts,
      retryDelay = this.defaultRetryDelay,
      timeout = this.timeout,
      skipAuth = false,
      ...fetchConfig
    } = config;

    let attempt = 0;

    while (attempt <= retry) {
      try {
        const response = await this.executeRequest<T>(
          endpoint,
          method,
          data,
          { ...fetchConfig, skipAuth, timeout }
        );
        return response;
      } catch (error) {
        attempt++;

        // Se è un errore di autenticazione, prova a refreshare il token
        if (error instanceof ApiClientError && error.status === 401 && !skipAuth && attempt === 1) {
          try {
            await authManager.refreshAccessToken();
            continue; // Riprova con il nuovo token
          } catch (refreshError) {
            authManager.clearTokens();
            // Redirect a login sarà gestito dal middleware
            throw error;
          }
        }

        // Se è un errore retryable e ci sono ancora tentativi
        if (
          error instanceof ApiClientError &&
          ApiClientError.isRetryable(error.status) &&
          attempt <= retry
        ) {
          await this.delay(retryDelay * attempt); // Exponential backoff
          continue;
        }

        // Se è un NetworkError o TimeoutError e ci sono ancora tentativi
        if (
          (error instanceof NetworkError || error instanceof TimeoutError) &&
          attempt <= retry
        ) {
          await this.delay(retryDelay * attempt);
          continue;
        }

        throw error;
      }
    }

    throw new Error('Tentativi esauriti');
  }

  /**
   * Esegue la richiesta HTTP effettiva
   */
  private async executeRequest<T>(
    endpoint: string,
    method: HttpMethod,
    data?: unknown,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { skipAuth = false, timeout, ...fetchConfig } = config;
    const url = `${this.baseURL}${endpoint}`;

    // Headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...fetchConfig.headers,
    };

    // Aggiungi token di autenticazione
    if (!skipAuth && authManager.shouldRefreshToken()) {
      try {
        await authManager.refreshAccessToken();
      } catch (error) {
        // Se il refresh fallisce, continua comunque con il token esistente
      }
    }

    const token = authManager.getAccessToken();
    if (!skipAuth && token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Body
    const body = data ? JSON.stringify(data) : undefined;

    // Timeout controller
    const controller = new AbortController();
    const timeoutId = timeout
      ? setTimeout(() => controller.abort(), timeout)
      : null;

    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
        signal: controller.signal,
        ...fetchConfig,
      });

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Gestione timeout
      if (controller.signal.aborted) {
        throw new TimeoutError();
      }

      // Parsing risposta
      const responseData = await this.parseResponse<T>(response);

      // Gestione errori HTTP
      if (!response.ok) {
        throw ApiClientError.fromResponse(response.status, responseData);
      }

      return {
        data: responseData.data || (responseData as unknown as T),
        message: responseData.message,
        status: response.status,
        timestamp: responseData.timestamp,
      };
    } catch (error) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (error instanceof TimeoutError || error instanceof ApiClientError) {
        throw error;
      }

      // Network error
      if (error instanceof Error && error.name === 'AbortError') {
        throw new TimeoutError();
      }

      throw new NetworkError(error instanceof Error ? error.message : 'Errore di rete');
    }
  }

  /**
   * Parse della risposta JSON
   */
  private async parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      try {
        return await response.json();
      } catch (error) {
        throw new Error('Errore nel parsing della risposta JSON');
      }
    }

    // Se non è JSON, restituisci la risposta come testo
    const text = await response.text();
    return {
      data: text as unknown as T,
      status: response.status,
    };
  }

  /**
   * Utility per delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Metodi HTTP helper
   */
  async get<T>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HttpMethod.GET, undefined, config);
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HttpMethod.POST, data, config);
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HttpMethod.PUT, data, config);
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HttpMethod.PATCH, data, config);
  }

  async delete<T>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, HttpMethod.DELETE, undefined, config);
  }
}

export const apiClient = new ApiClient();

