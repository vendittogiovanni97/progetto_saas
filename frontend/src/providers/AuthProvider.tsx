'use client';

import { getAccessToken, setTokens } from '@/lib/api/auth';
import { AuthContext, User } from '@/types/authcontext';
import { useState, useMemo, ReactNode, useContext, useEffect } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Inizializzazione semplice da localStorage
  useEffect(() => {
    const saved = localStorage.getItem('auth_user');
    if (saved && getAccessToken()) {
      setUser(JSON.parse(saved));
      setIsAuthenticated(true);
    } else {
      // Mock user per sviluppo se non c'è nulla, ma solo per prova
      // TODO: Rimuovere questo mock quando l'integrazione API è completa
      const mockUser: User = { id: 1, accountId: 1, email: 'mario@test.com', role: 'admin' };
      setUser(mockUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Usare apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { email, password })
    console.log('Login con:', email, password);
    
    // Simulazione mock
    const mockUser: User = { id: 1, email, accountId: 1, role: 'admin' };
    const mockToken = 'mock-jwt-token';
    const mockRefreshToken = 'mock-refresh-token';

    setTokens(mockToken, mockRefreshToken, 3600);
    localStorage.setItem('auth_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setTokens('', '', 0);
    localStorage.removeItem('auth_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated,
    login,
    logout,
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
