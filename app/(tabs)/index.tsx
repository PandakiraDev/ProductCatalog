import { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Product } from "@/features/products/types";
import { useProducts } from "@/features/products/api/queries";
import { ProductCard } from "@/features/products/components/ProductCard";
import { Loading } from "@/components/Loading";
import { ErrorView } from "@/components/ErrorView";

export default function ProductListScreen() {
  const { data, isLoading, isError, refetch } = useProducts();
  const router = useRouter();

  const handlePress = useCallback(
    (product: Product) => {
      router.push({ pathname: "/product/[id]", params: { id: product.id } });
    },
    [router],
  );

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard product={item} onPress={handlePress} />
    ),
    [handlePress],
  );

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <ErrorView message="Nie udało się pobrać produktów" onRetry={refetch} />
    );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 12 },
});
