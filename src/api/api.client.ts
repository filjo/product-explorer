import axios, { type AxiosRequestConfig } from "axios";

export const createApiClient = (baseURL: string) => {
  const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    get: async <T>(path: string, config?: AxiosRequestConfig): Promise<T> => {
      const response = await api.get<T>(path, config);
      return response.data;
    },

    post: async <T, B = unknown>(
      path: string,
      body?: B,
      config?: AxiosRequestConfig<B>,
    ): Promise<T> => {
      const response = await api.post<T>(path, body, config);
      return response.data;
    },
  };
};
