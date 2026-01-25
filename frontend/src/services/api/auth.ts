/**
 * Gestione autenticazione e token
 */

import { STORAGE_KEYS } from './config';
import { RefreshTokenResponse } from '@/types/api';
import { API_CONFIG, API_ENDPOINTS } from './config';

export class AuthManager {
  private static instance: AuthManager;
  private refreshPromise: Promise<string> | null = null;

  private constructor() {}

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  setTokens(accessToken: string, refreshToken: string, expiresIn: number): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    
    const expiryTime = Date.now() + expiresIn * 1000;
    localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, expiryTime.toString());
  }

  clearTokens(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRY);
  }

  isTokenExpired(): boolean {
    if (typeof window === 'undefined') return true;
    
    const expiry = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);
    if (!expiry) return true;
    
    const expiryTime = parseInt(expiry, 10);
    const now = Date.now();
    const threshold = API_CONFIG.refreshTokenThreshold * 1000;
    
    return now >= expiryTime - threshold;
  }

  async refreshAccessToken(): Promise<string> {
    // Prevenire multiple refresh simultanei
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('Nessun refresh token disponibile');
    }

    this.refreshPromise = this.performRefresh(refreshToken);
    
    try {
      const token = await this.refreshPromise;
      return token;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async performRefresh(refreshToken: string): Promise<string> {
    const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.AUTH.REFRESH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      this.clearTokens();
      throw new Error('Refresh token fallito');
    }

    const data: RefreshTokenResponse = await response.json();
    
    const expiryTime = Date.now() + data.expiresIn * 1000;
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
    localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, expiryTime.toString());

    return data.accessToken;
  }

  shouldRefreshToken(): boolean {
    return this.isTokenExpired() && !!this.getRefreshToken();
  }
}

export const authManager = AuthManager.getInstance();

