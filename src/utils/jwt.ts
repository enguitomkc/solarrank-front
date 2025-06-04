import { jwtDecode } from "jwt-decode";

// Returns true if the JWT is expired
export const isJWTExpired = (token: string) => {
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp && decoded.exp < currentTime;
};

// Returns the number of milliseconds until the JWT expires
export const msUntilJWTExpiry = (token: string) => {
  const thirtySeconds = 30000; // in milliseconds
  const jwtData = jwtDecode(token);
  const epochDateSeconds = Date.now() / 1000;
  // Subtract 30 seconds to avoid sending bad requests to the server
  return Math.max(jwtData.exp ? ((jwtData.exp - epochDateSeconds) * 1000) - thirtySeconds : 0, 0);
};