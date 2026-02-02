/**
 * Gestione errori API (Semplificata)
 */

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// TODO: In futuro si possono aggiungere errori più specifici come NetworkError o TimeoutError
