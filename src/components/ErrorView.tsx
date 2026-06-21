import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type ErrorViewProps = { message: string; onRetry: () => void };

export function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Spróbuj ponownie</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
