// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { AuthStore, RegisterRequest, LoginRequest } from '@/types/auth';
// import { ApiError } from '@/utils/apiRequest';
// import { authApi } from '@/api/auth';

// const useAuthStore = create<AuthStore>()(
//   persist(
//     (set, get) => ({
//       // State
//       user: null,
//       accessToken: null,
//       refreshToken: null,
//       isAuthenticated: false,
//       isLoading: false,
//       error: null,

//       // Actions
//       signup: async (data: RegisterRequest) => {
//         set({ isLoading: true, error: null });
        
//         try {
//           const response = await authApi.signup(data);
          
//           if (response.success && response.user && response.accessToken && response.refreshToken) {
//             set({
//               user: response.user,
//               accessToken: response.accessToken,
//               refreshToken: response.refreshToken,
//               isAuthenticated: true,
//               isLoading: false,
//               error: null,
//             });
//           } else {
//             set({
//               isLoading: false,
//               error: response.message || 'Signup failed',
//             });
//           }
//         } catch (error) {
//           if (error instanceof ApiError) {
//             // Handle validation errors
//             if (error.errors && error.errors.length > 0) {
//               const errorMessage = error.errors.map(err => err.message).join(', ');
//               set({
//                 isLoading: false,
//                 error: errorMessage,
//               });
//             } else {
//               set({
//                 isLoading: false,
//                 error: error.message,
//               });
//             }
//           } else {
//             set({
//               isLoading: false,
//               error: 'An unexpected error occurred',
//             });
//           }
//         }
//       },

//       login: async (data: LoginRequest) => {
//         set({ isLoading: true, error: null });
        
//         try {
//           const response = await authApi.login(data);
          
//           if (response.success && response.user && response.accessToken && response.refreshToken) {
//             set({
//               user: response.user,
//               accessToken: response.accessToken,
//               refreshToken: response.refreshToken,
//               isAuthenticated: true,
//               isLoading: false,
//               error: null,
//             });
//           } else {
//             set({
//               isLoading: false,
//               error: response.message || 'Login failed',
//             });
//           }
//         } catch (error) {
//           if (error instanceof ApiError) {
//             set({
//               isLoading: false,
//               error: error.message,
//             });
//           } else {
//             set({
//               isLoading: false,
//               error: 'An unexpected error occurred',
//             });
//           }
//         }
//       },

//       refreshTokens: async (): Promise<boolean> => {
//         const { refreshToken } = get();
        
//         if (!refreshToken) {
//           return false;
//         }

//         try {
//           const response = await authApi.refreshToken({ refreshToken });
          
//           if (response.success && response.accessToken && response.refreshToken) {
//             set({
//               accessToken: response.accessToken,
//               refreshToken: response.refreshToken,
//             });
//             return true;
//           } else {
//             // Refresh failed, logout user
//             get().logout();
//             return false;
//           }
//         } catch {
//           // Refresh failed, logout user
//           get().logout();
//           return false;
//         }
//       },

//       logout: async () => {
//         const { refreshToken } = get();
        
//         // Try to revoke refresh token on server
//         if (refreshToken) {
//           try {
//             await authApi.logout(refreshToken);
//           } catch {
//             // Ignore logout errors, still clear local state
//             console.warn('Logout request failed');
//           }
//         }

//         set({
//           user: null,
//           accessToken: null,
//           refreshToken: null,
//           isAuthenticated: false,
//           error: null,
//         });
//       },

//       clearError: () => {
//         set({ error: null });
//       },

//       setLoading: (loading: boolean) => {
//         set({ isLoading: loading });
//       },
//     }),
//     {
//       name: 'auth-storage',
//       partialize: (state) => ({
//         user: state.user,
//         accessToken: state.accessToken,
//         refreshToken: state.refreshToken,
//         isAuthenticated: state.isAuthenticated,
//       }),
//     }
//   )
// );

// export default useAuthStore; 