import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import Entypo from '@expo/vector-icons/Entypo'; 

export default function Contact() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "A1CEDC", dark: "1D3D47" }}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Contact</ThemedText>
      </ThemedView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Link style={styles.linkText} href="sms:+19175248979">
            <Entypo name="phone" size={28} color="gray" />
            <ThemedText style={styles.linkText}>Text Us</ThemedText>
          </Link>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginVertical: 20, // Add some margin for spacing
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end", // Push the button to the bottom
    paddingBottom: 20, // Add some bottom padding
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 15, // Increase vertical padding for a larger button
    paddingHorizontal: 20, // Increase horizontal padding for a larger button
    margin: 10,
    backgroundColor: "transparent",
    justifyContent: "center", // Center content inside the button
  },
  linkText: {
    color: "gray",
    marginLeft: 5,
  },
});
