import { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { Product } from "@/features/products/types";
import { useProducts } from "@/features/products/api/queries";
import { ProductCard } from "@/features/products/components/ProductCard";
import { Loading } from "@/components/Loading";
import { ErrorView } from "@/components/ErrorView";

export default function ProductListScreen() {
  const { data, isLoading, isError, refetch, isRefetching } = useProducts();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((p) => p.title.toLowerCase().includes(q));
  }, [data, query]);

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
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        value={query}
        onChangeText={setQuery}
        placeholder="Szukaj produktu..."
        clearButtonMode="while-editing"
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  search: {
    margin: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 15,
  },
  list: { padding: 12, paddingTop: 0 },
});
