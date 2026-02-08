'use client';

import { API_CONFIG, API_ENDPOINTS, STORAGE_KEYS } from "@/lib/api/config";
import { RefreshTokenResponse } from "@/types/api";
import { useState, useMemo, ReactNode, useContext, useEffect, createContext, useCallback, useRef } from 'react';

export interface User {
  id: number;
  name?: string;
  email: string;
  accountId: number;
  role: 'admin';
}

export interface AuthContextType {
  // Stato Auth
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  isAdmin: boolean;
  
  // Azioni Auth
  login: (token: string, rememberMe: boolean) => void;
  logout: () => void;
  refreshAccessToken?: () => Promise<string>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const lastToken = useRef<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const localToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const sessionToken = sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

    if (localToken) {
      storeToken(localToken);
    } else if (sessionToken) {
      storeToken(sessionToken);
    } else {
      storeToken(null);
    }
  }, []);

  function storeToken(_token: string | null) {
    lastToken.current = _token;
    setToken(_token);
    
    if (_token) {
      try {
        const payload = JSON.parse(atob(_token.split('.')[1]));
        setUser(payload);
        setIsAuthenticated(true);
        setIsAdmin(payload.role === 'admin');
      } catch (err) {
        console.error("Errore decodifica token:", err);
        logout();
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }

  const login = useCallback(async (newToken: string, rememberMe: boolean) => {
    setRememberMe(rememberMe);
    storeToken(newToken);
    if(rememberMe){
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newToken);
    } else {
      sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newToken);
    }
  }, []);

  const logout = () => {
    clearToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  const clearToken = useCallback(() => {
    storeToken(null);
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  }, []);

  // const refreshAccessToken = async (): Promise<string> => {
  //   const refreshToken = getRefreshToken();
  //   if (!refreshToken) {
  //     throw new Error('Nessun refresh token disponibile');
  //   }

  //   const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.AUTH.REFRESH}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ refreshToken }),
  //   });

  //   if (!response.ok) {
  //     clearToken();
  //     throw new Error('Refresh token fallito');
  //   }

  //   const data: RefreshTokenResponse = await response.json();
    
  //   setTokens(data.accessToken, refreshToken, data.expiresIn);

  //   return data.accessToken;
  // };

  const value = useMemo(() => ({
    user,
    isAuthenticated,
    token,
    isAdmin,
    login,
    logout,
    // refreshAccessToken,

  }), [user, isAuthenticated]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve essere usato all\'interno di un AuthProvider');
  }
  return context;
}
