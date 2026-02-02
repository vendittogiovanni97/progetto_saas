/**
 * Gestione autenticazione e token (Semplificata)
 */

import { STORAGE_KEYS, API_CONFIG, API_ENDPOINTS } from './config';
import { RefreshTokenResponse } from '@/types/api';

/**
 * Recupera l'access token dal localStorage
 */
export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

/**
 * Recupera il refresh token dal localStorage
 */
export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

/**
 * Salva i token nel localStorage
 */
export const setTokens = (accessToken: string, refreshToken: string, expiresIn: number): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  
  const expiryTime = Date.now() + expiresIn * 1000;
  localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, expiryTime.toString());
};

/**
 * Rimuove i token (Logout)
 */
export const clearTokens = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRY);
};

/**
 * Controlla se il token è scaduto
 */
export const isTokenExpired = (): boolean => {
  if (typeof window === 'undefined') return true;
  
  const expiry = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);
  if (!expiry) return true;
  
  const expiryTime = parseInt(expiry, 10);
  const now = Date.now();
  
  // Scade se siamo oltre il tempo limite
  return now >= expiryTime;
};

/**
 * Funzione semplice per refreshare il token
 * TODO: Da implementare meglio in futuro se serve
 */
export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('Nessun refresh token disponibile');
  }

  const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.AUTH.REFRESH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    clearTokens();
    throw new Error('Refresh token fallito');
  }

  const data: RefreshTokenResponse = await response.json();
  
  // Aggiorniamo i token
  setTokens(data.accessToken, refreshToken, data.expiresIn);

  return data.accessToken;
};

// Esportiamo un oggetto per retrocompatibilità se serve, ma meglio usare le funzioni dirette
export const authManager = {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
  isTokenExpired,
  refreshAccessToken,
  // TODO: Aggiungere logica più avanzata qui in futuro
};

