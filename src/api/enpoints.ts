const AUTH = {
  signup: "/auth/signup",
  login: "/auth/login",
  refresh: "/auth/refresh",
  logout: "/auth/logout",
  verify: "/auth/verify",
};

const USER = {
  getUserProfile: (username: string) => `/users/${username}`,
  updateUserProfile: (username: string) => `/users/${username}`,
};

const API = {
  AUTH,
  USER,
};

export default API;