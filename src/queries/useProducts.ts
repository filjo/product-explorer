import { useQuery } from "@tanstack/react-query";

import { productApi } from "@/api";

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: productApi.getProducts,
  });
