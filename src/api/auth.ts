import { RegisterRequest, LoginRequest, AuthResponse } from '@/types/auth';
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

  async verifyToken(token: string): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/auth/verify', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};