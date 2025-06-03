import { RegisterRequest, LoginRequest, AuthResponse, RefreshTokenRequest, RefreshTokenResponse } from '@/types/auth';
import { apiRequest } from '@/utils/apiRequest';

export const authApi = {
  async signup(data: RegisterRequest): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    return apiRequest<RefreshTokenResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async logout(refreshToken: string): Promise<{ success: boolean; message: string }> {
    return apiRequest<{ success: boolean; message: string }>('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },

  async verifyToken(token: string): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/auth/verify', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};