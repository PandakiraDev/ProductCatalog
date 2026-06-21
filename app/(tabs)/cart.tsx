import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useCart } from "@/features/cart/store/CartContext";
import { CartItem } from "@/features/cart/types";

export default function CartScreen() {
  const { items, totalPrice, increment, decrement, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Koszyk jest pusty</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.row}>
      <Image
        source={{ uri: item.product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.product.title}
        </Text>
        <Text style={styles.price}>
          {(item.product.price * item.quantity).toFixed(2)} $
        </Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => decrement(item.product.id)}
          >
            <Text style={styles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => increment(item.product.id)}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.product.id)}>
        <Text style={styles.remove}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Razem:</Text>
        <Text style={styles.totalValue}>{totalPrice.toFixed(2)} $</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 12 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 16, color: "#888" },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  image: { width: 60, height: 60, marginRight: 12 },
  info: { flex: 1 },
  title: { fontSize: 14, fontWeight: "500", marginBottom: 4 },
  price: { fontSize: 15, fontWeight: "700", color: "#2563eb", marginBottom: 8 },
  qtyRow: { flexDirection: "row", alignItems: "center" },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyBtnText: { fontSize: 18, fontWeight: "700" },
  qty: {
    marginHorizontal: 14,
    fontSize: 16,
    fontWeight: "600",
    minWidth: 20,
    textAlign: "center",
  },
  remove: { fontSize: 18, color: "#ef4444", paddingHorizontal: 8 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  totalLabel: { fontSize: 16, fontWeight: "600" },
  totalValue: { fontSize: 20, fontWeight: "800", color: "#2563eb" },
});
