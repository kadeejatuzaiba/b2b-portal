/**
 * Standard API Response Structures
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  timestamp?: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

export interface QueryParams {
  [key: string]: string | number | boolean | undefined | null;
}
