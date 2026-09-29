import { Stack } from "expo-router";
import { View } from "react-native";
import "../styles/global.css";

export default function RootLayout() {
  return (
    <View
      style={{
        flex: 1,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000000",
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#000000", flex: 1 },
        }}
      />
    </View>
  );
}
