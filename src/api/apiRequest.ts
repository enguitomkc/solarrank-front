import axios, { AxiosHeaders } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';

export interface ApiResponse<T> {
  success: boolean;
  data: T | { error: string } | null;
  status: number;
}

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiRequest = async <T>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.request({
      url,
      method: options.method || 'GET',
      data: options.body,
      headers: options.headers as AxiosHeaders,
    });

    return {
      success: true,
      data: response.data,
      status: response.status
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        data: error.response?.data,
        status: error.response?.status ?? 500
      }
    }
    return {
      success: false,
      data: { error: 'There was an error with your request. Please try again.' },
      status: 500
    }
  }
};

axiosInstance.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    if (err.response?.status === 403 && !originalRequest._retry) {
      console.log("intercepting 403");
      originalRequest._retry = true;
      try {
        const { data } = await axiosInstance.post(
          '/auth/refresh',
          {
            refreshToken: localStorage.getItem("refreshToken"),
          }
        );
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        localStorage.setItem("accessToken", data.accessToken);
        return axiosInstance(originalRequest);
      } catch {
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }
);
