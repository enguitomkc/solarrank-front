import { useEffect } from 'react';
import useAuthStore from '@/stores/auth';
import { authApi } from '@/api';

export const useAuth = () => {
  const store = useAuthStore();

  // Auto-verify token on app load if token exists
  useEffect(() => {
    const verifyToken = async () => {
      if (store.token && !store.isAuthenticated) {
        try {
          const response = await authApi.verifyToken(store.token);
          if (response.success && response.user) {
            // Token is valid, update user info
            useAuthStore.setState({
              user: response.user,
              isAuthenticated: true,
            });
          } else {
            // Token is invalid, clear auth state
            store.logout();
          }
        } catch {
          // Token verification failed, clear auth state
          store.logout();
        }
      }
    };

    verifyToken();
  }, [store.token, store.isAuthenticated, store.logout, store]);

  return {
    // State
    user: store.user,
    token: store.token,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,

    // Actions
    signup: store.signup,
    login: store.login,
    logout: store.logout,
    clearError: store.clearError,
  };
};

export default useAuth; 