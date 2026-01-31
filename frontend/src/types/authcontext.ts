import { createContext } from "react";

export interface User {
  id: number;
  name?: string;
  email: string;
  accountId: number;
  role: 'admin' | 'editor' | 'viewer' | 'guest';
}

export interface AuthContextType {
  // Stato Auth
  user: User | null;
  isAuthenticated: boolean;
  
  // Azioni Auth
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);