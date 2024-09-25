import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

export default function Booking() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "A1CEDC", dark: "1D3D47" }}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Book</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
