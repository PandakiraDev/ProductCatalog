import { Text, View } from "react-native";
import { useEffect } from "react";
import { getProducts } from "@/features/products/api/products";

export default function Index() {
  useEffect(() => {
    getProducts()
      .then((p) => console.log("OK, produktów:", p.length))
      .catch((e) => console.log("Błąd:", e.message));
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>TEST</Text>
    </View>
  );
}
