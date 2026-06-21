import {
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useProduct } from "@/features/products/api/queries";
import { Loading } from "@/components/Loading";
import { ErrorView } from "@/components/ErrorView";
import { useCart } from "@/features/cart/store/CartContext";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const productId = Number(id);
  const { data: product, isLoading, isError, refetch } = useProduct(productId);
  const { addToCart } = useCart();

  if (isLoading) return <Loading />;
  if (isError || !product) {
    return (
      <ErrorView message="Nie udało się pobrać produktu" onRetry={refetch} />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{product.price.toFixed(2)} $</Text>
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => addToCart(product)}
      >
        <Text style={styles.buttonText}>Dodaj do koszyka</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  image: { width: "100%", height: 250, marginBottom: 16 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  price: { fontSize: 22, fontWeight: "800", color: "#2563eb", marginBottom: 8 },
  category: {
    fontSize: 13,
    color: "#888",
    textTransform: "capitalize",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
