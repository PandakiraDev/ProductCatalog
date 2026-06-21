import { View, Text, StyleSheet } from "react-native";
export default function CartScreen() {
  return (
    <View style={styles.c}>
      <Text>Koszyk — wkrótce</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  c: { flex: 1, justifyContent: "center", alignItems: "center" },
});
