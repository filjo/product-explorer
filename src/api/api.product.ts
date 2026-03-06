import { ProductCategory, type Product } from "@/models";

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
  getProductCategories: async ({
    limit,
    skip,
  }: {
    limit: number;
    skip: number;
  }): Promise<ProductCategory[]> => {
    const response = await apiClient.get<ProductCategory[]>("products/categories", {
      params: { limit, skip },
    });
    return response;
  },
  getProductsByCategory: async ({
    category,
    limit,
    skip,
  }: {
    category: string;
    limit: number;
    skip: number;
  }): Promise<ProductsResponse> => {
    const url = `products/category/${encodeURIComponent(category)}`;
    const response = await apiClient.get<ProductsResponse>(url, { params: { limit, skip } });
    return response;
  },
};
