import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthStore, RegisterRequest, LoginRequest } from '@/types/auth';
import { ApiError } from '@/utils/apiRequest';
import { authApi } from '@/api/auth';

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      signup: async (data: RegisterRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authApi.signup(data);
          
          if (response.success && response.user && response.token) {
            set({
              user: response.user,
              token: response.token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              isLoading: false,
              error: response.message || 'Signup failed',
            });
          }
        } catch (error) {
          if (error instanceof ApiError) {
            // Handle validation errors
            if (error.errors && error.errors.length > 0) {
              const errorMessage = error.errors.map(err => err.message).join(', ');
              set({
                isLoading: false,
                error: errorMessage,
              });
            } else {
              set({
                isLoading: false,
                error: error.message,
              });
            }
          } else {
            set({
              isLoading: false,
              error: 'An unexpected error occurred',
            });
          }
        }
      },

      login: async (data: LoginRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authApi.login(data);
          
          if (response.success && response.user && response.token) {
            set({
              user: response.user,
              token: response.token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              isLoading: false,
              error: response.message || 'Login failed',
            });
          }
        } catch (error) {
          if (error instanceof ApiError) {
            set({
              isLoading: false,
              error: error.message,
            });
          } else {
            set({
              isLoading: false,
              error: 'An unexpected error occurred',
            });
          }
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore; 