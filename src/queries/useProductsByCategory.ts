import { useInfiniteQuery } from "@tanstack/react-query";

import { productApi } from "@/api";
import { ProductsResponse } from "@/api/api.product";
import { Product } from "@/models";

const PRODUCTS_PAGE_SIZE = 30;

export const useProductsByCategory = (category: string | null) => {
  return useInfiniteQuery<
    ProductsResponse,
    Error,
    Product[],
    ["products", "by", "category", string | null],
    number
  >({
    queryKey: ["products", "by", "category", category],
    queryFn: ({ pageParam }) => {
      if (!category) {
        throw new Error("Category is required");
      }

      return productApi.getProductsByCategory({
        category,
        limit: PRODUCTS_PAGE_SIZE,
        skip: pageParam,
      });
    },
    initialPageParam: 0,
    enabled: Boolean(category),
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;

      if (nextSkip >= lastPage.total) {
        return undefined; // no more pages
      }

      return nextSkip;
    },
    select: (data): Product[] => data.pages.flatMap((page) => page.products),
  });
};
