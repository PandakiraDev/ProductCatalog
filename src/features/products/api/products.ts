import { httpGet } from "@/lib/httpClient";
import { Product } from "@/features/products/types";

export function getProducts(): Promise<Product[]> {
  return httpGet<Product[]>("/products");
}

export function getProduct(id: number): Promise<Product> {
  return httpGet<Product>(`/products/${id}`);
}
