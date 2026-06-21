import { Tabs } from "expo-router";
import { useCart } from "@/features/cart/store/CartContext";

export default function TabsLayout() {
  const { totalCount } = useCart();

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Katalog" }} />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Koszyk",
          tabBarBadge: totalCount > 0 ? totalCount : undefined,
        }}
      />
    </Tabs>
  );
}
