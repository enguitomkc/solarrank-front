import useAuthStore from "@/stores/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';

interface ValidationError {
  field: string;
  message: string;
}

class ApiError extends Error {
  constructor(public status: number, message: string, public errors?: ValidationError[]) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Makes an API request with automatic token attachment when available
 * @param endpoint - The API endpoint (without base URL)
 * @param options - Fetch options
 * @returns Promise with the response data
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const { token, logout } = useAuthStore.getState();

  // Prepare headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers as Record<string, string>,
  };

  // Add Authorization header only if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      // Handle authentication errors
      if (response.status === 401) {
        // Token is invalid or expired, logout user
        logout();
        throw new ApiError(
          response.status,
          'Your session has expired. Please log in again.'
        );
      }

      throw new ApiError(
        response.status,
        data.message || 'An error occurred',
        data.errors
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ApiError(
      0,
      'Network error. Please check your connection and try again.'
    );
  }
}

/**
 * Makes an authenticated API request (requires token)
 * Throws an error if no token is available
 * @param endpoint - The API endpoint (without base URL)
 * @param options - Fetch options
 * @returns Promise with the response data
 */
async function authenticatedRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const { token } = useAuthStore.getState();

  if (!token) {
    throw new ApiError(401, 'Authentication required. Please log in.');
  }

  return apiRequest<T>(endpoint, options);
}

export { apiRequest, authenticatedRequest, ApiError };
