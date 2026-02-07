export interface ApiResponse<T> {
  success: boolean;
  status: number;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  status: number;
  errors?: Record<string, string[]>;
  timestamp?: string;
}

export interface ApiRequestConfig extends RequestInit {
  retry?: number;
  retryDelay?: number;
  timeout?: number;
  skipAuth?: boolean;
}

export interface AuthTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}
