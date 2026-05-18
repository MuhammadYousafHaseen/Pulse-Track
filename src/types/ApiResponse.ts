export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;

  data?: T;       // optional payload (user, token, etc.)
  error?: string; // optional error detail (for debugging)
}