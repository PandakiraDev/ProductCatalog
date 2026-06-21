import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Katalog" }} />
      <Tabs.Screen name="cart" options={{ title: "Koszyk" }} />
    </Tabs>
  );
}
