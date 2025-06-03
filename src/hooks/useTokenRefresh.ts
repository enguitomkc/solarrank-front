// import { useEffect, useRef } from 'react';
// import useAuthStore from '@/lib/stores/auth';

// const TOKEN_REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes (access token expires in 15 minutes)

// export const useTokenRefresh = () => {
//   const { accessToken, refreshTokens, isAuthenticated } = useAuthStore();
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     if (isAuthenticated && accessToken) {
//       // Set up automatic token refresh
//       intervalRef.current = setInterval(async () => {
//         try {
//           await refreshTokens();
//         } catch (error) {
//           console.error('Automatic token refresh failed:', error);
//         }
//       }, TOKEN_REFRESH_INTERVAL);

//       return () => {
//         if (intervalRef.current) {
//           clearInterval(intervalRef.current);
//         }
//       };
//     } else {
//       // Clear interval if not authenticated
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//         intervalRef.current = null;
//       }
//     }
//   }, [isAuthenticated, accessToken, refreshTokens]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, []);
// }; 