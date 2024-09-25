import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "A1CEDC", dark: "1D3D47" }}
      headerImage={
        <Image
        source={require("@/assets/images/civilian-entrance.jpg")}
        style={styles.civilianLogo} />
      }
    >
      <ThemedView style={styles.default}>
        <ThemedText type="default">NOW PRESENTING</ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">A Stay With New York Soul</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    gap: 8,
    marginTop: 0,
  },
  default: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    gap: 8,
    marginBottom: 0,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  civilianLogo: {
    height: 250,
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
