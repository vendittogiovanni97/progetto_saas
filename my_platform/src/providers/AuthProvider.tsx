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
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    // TODO: Implementare chiamata API reale qui
    console.log('TODO: Implementare login per', email);
    
    // Simulazione ritardo API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock di login avvenuto con successo
    setUser({ 
      id: 'USR-001',
      name: 'Admin User',
      email: email,
      role: 'admin',
    });
    setIsAuthenticated(true);
    
    // TODO: Salvare il token in un cookie o nel localStorage
  };

  const logout = () => {
    // TODO: Implementare chiamata API reale per il logout
    setUser(null);
    setIsAuthenticated(false);
    // TODO: Cancellare il token dal cookie o dal localStorage
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
