/**
 * Gestione errori API
 */

import { ApiError, HttpStatus } from "@/types/api";

export class ApiClientError extends Error {
  public readonly status: number;
  public readonly code?: string;
  public readonly errors?: Record<string, string[]>;
  public readonly timestamp?: string;

  constructor(error: ApiError) {
    super(error.message);
    this.name = "ApiClientError";
    this.status = error.status;
    this.code = error.code;
    this.errors = error.errors;
    this.timestamp = error.timestamp;
  }

  static fromResponse(status: number, data: unknown): ApiClientError {
    const errorData = data as Partial<ApiError>;
    return new ApiClientError({
      message: errorData.message || "Errore sconosciuto",
      code: errorData.code,
      status,
      errors: errorData.errors,
      timestamp: errorData.timestamp,
    });
  }

  static isRetryable(status: number): boolean {
    return (
      status === HttpStatus.INTERNAL_SERVER_ERROR ||
      status === HttpStatus.BAD_GATEWAY ||
      status === HttpStatus.SERVICE_UNAVAILABLE ||
      status === 0 // Network error
    );
  }

  static isAuthError(status: number): boolean {
    return (
      status === HttpStatus.UNAUTHORIZED || status === HttpStatus.FORBIDDEN
    );
  }
}

export class NetworkError extends Error {
  constructor(message: string = "Errore di connessione alla rete") {
    super(message);
    this.name = "NetworkError";
  }
}

export class TimeoutError extends Error {
  constructor(message: string = "Richiesta timeout") {
    super(message);
    this.name = "TimeoutError";
  }
}
