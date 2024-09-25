import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#EEE6D6", dark: "#EEE6D6" }}
      headerImage={
        <View style={styles.headerContainer}>
          <Image
            source={require("@/assets/images/civilian-badge.png")}
            style={styles.civilianLogo}
          />
        </View>
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
  headerContainer: {
    height: 135,
    justifyContent: "center",
    alignItems: "center",
  },
  civilianLogo: {
    height: 70,
    width: "auto",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 0,
  },
  default: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 0,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
