'use client';

import { AuthContext, User } from '@/types/authcontext';
import { useState, useMemo, ReactNode, useContext } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('auth_user');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return {
      id: 1,
      accountId: 1,
      email: 'mario@test.com',
      role: 'admin',
    };
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!user);

  const login = async (email: string, password: string) => {
    void password;
    // TODO: Implementare chiamata API reale qui
    
    // Simulazione ritardo API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock di login avvenuto con successo
    const mockUser: User = { 
      id: 1,
      email: email,
      accountId: 1,
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve essere usato all\'interno di un AuthProvider');
  }
  return context;
}
