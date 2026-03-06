import { type Product } from "@/models";

import { createApiClient } from "./api.client";

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

const baseURL = process.env.EXPO_PUBLIC_API_URL;
const apiClient = createApiClient(baseURL);

export const productApi = {
  getProducts: async ({
    limit,
    skip,
  }: {
    limit: number;
    skip: number;
  }): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>("products", {
      params: { limit, skip },
    });
    return response;
  },
};
