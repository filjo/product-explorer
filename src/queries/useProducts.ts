import { useInfiniteQuery } from "@tanstack/react-query";

import { productApi } from "@/api";
import { ProductsResponse } from "@/api/api.product";
import { Product } from "@/models";

const PRODUCTS_PAGE_SIZE = 30;

export const useProducts = () => {
  return useInfiniteQuery<ProductsResponse, Error, Product[], ["products"], number>({
    queryKey: ["products"],
    queryFn: ({ pageParam }) =>
      productApi.getProducts({ limit: PRODUCTS_PAGE_SIZE, skip: pageParam }),
    initialPageParam: 0,
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
