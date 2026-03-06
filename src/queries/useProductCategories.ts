import { useQuery } from "@tanstack/react-query";

import { productApi } from "@/api";
import { ProductCategory } from "@/models";
import { useProductCategoriesStore } from "@/store";

const PRODUCT_CATEGORIES_LIMIT = 100;

export const useProductCategories = () => {
  return useQuery<ProductCategory[], Error>({
    queryKey: ["product", "categories"],
    initialData: () => {
      const storedCategories = useProductCategoriesStore.getState().categories;
      return storedCategories.length > 0 ? storedCategories : undefined;
    },
    queryFn: async () => {
      const categories = await productApi.getProductCategories({
        limit: PRODUCT_CATEGORIES_LIMIT,
        skip: 0,
      });
      useProductCategoriesStore.getState().setCategories(categories);
      return categories;
    },
    staleTime: 5 * 60 * 1000,
  });
};
