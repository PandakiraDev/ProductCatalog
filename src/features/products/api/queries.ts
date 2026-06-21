import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, getProduct } from "@/features/products/api/products";
import { Product } from "@/features/products/types";

export function useProducts() {
  return useQuery({ queryKey: ["products"], queryFn: getProducts });
}

export function useProduct(id: number) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    initialData: () =>
      queryClient
        .getQueryData<Product[]>(["products"])
        ?.find((p) => p.id === id),
  });
}
