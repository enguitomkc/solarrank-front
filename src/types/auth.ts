export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  profile_image?: string;
  role: 'user' | 'admin';
  total_energy: number;
  created_at: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
}

export interface AuthActions {
  signup: (data: RegisterRequest) => Promise<void>;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export type AuthStore = AuthState & AuthActions; 