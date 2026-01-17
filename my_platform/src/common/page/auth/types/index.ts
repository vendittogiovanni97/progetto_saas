/**
 * Tipi per la pagina di autenticazione
 */

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

