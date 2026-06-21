import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.c}>
      <Text>Szczegóły produktu {id} — wkrótce</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  c: { flex: 1, justifyContent: "center", alignItems: "center" },
});
