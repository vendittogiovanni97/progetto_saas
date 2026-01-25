'use client';

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

/**
 * Interface per i dati dell'utente
 */
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer' | 'guest';
}

/**
 * Interfaccia del Context
 */
interface AuthContextType {
  // Stato Auth
  user: User | null;
  isAuthenticated: boolean;
  
  // Azioni Auth
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // --- STATO & LOGICA AUTH ---
  // --- STATO & LOGICA AUTH ---
  // Inizializziamo con un utente mock per sviluppo se non c'è nulla in localStorage
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('auth_user');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    // Default DEBUG user per evitare blocco sviluppo
    return {
      id: 'USR-001',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
    };
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!user);

  const login = async (email: string, password: string) => {
    // TODO: Implementare chiamata API reale qui
    console.log('TODO: Implementare login per', email);
    
    // Simulazione ritardo API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock di login avvenuto con successo
    const mockUser: User = { 
      id: 'USR-001',
      name: 'Admin User',
      email: email,
      role: 'admin',
    };

    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('auth_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_user');
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
    }),
    [user, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook custom per usare il contesto Auth
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve essere usato all\'interno di un AuthProvider');
  }
  return context;
}
