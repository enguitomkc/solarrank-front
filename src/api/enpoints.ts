const AUTH = {
  signup: "/auth/signup",
  login: "/auth/login",
  refresh: "/auth/refresh",
  logout: "/auth/logout",
  verify: "/auth/verify",
};

const USER = {
  getUsers: "/users",
  getUserProfile: (username: string) => `/users/${username}`,
  updateUserProfile: (username: string) => `/users/${username}`,
};

const POSTS = {
  getPosts: "/posts",
  votePost: (postId: string) => `/posts/${postId}/vote`,
};

const API = {
  AUTH,
  USER,
  POSTS,
};

export default API;