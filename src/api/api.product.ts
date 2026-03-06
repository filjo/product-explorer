import { type Product } from "@/models";

import { createApiClient } from "./api.client";

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

const apiClient = createApiClient("https://dummyjson.com");

export const productApi = {
  getProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get<ProductsResponse>("products");
    return response.products;
  },
};
