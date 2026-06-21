import { memo } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Product } from "@/features/products/types";

type ProductCardProps = {
  product: Product;
  onPress: (product: Product) => void;
};

function ProductCardComponent({ product, onPress }: ProductCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(product)}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>{product.price.toFixed(2)} $</Text>
      </View>
    </TouchableOpacity>
  );
}

export const ProductCard = memo(ProductCardComponent);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
    elevation: 2,
  },
  image: { width: 70, height: 70, marginRight: 12 },
  info: { flex: 1 },
  title: { fontSize: 14, fontWeight: "500", marginBottom: 6 },
  price: { fontSize: 16, fontWeight: "700", color: "#2563eb" },
});
