import "react-native-url-polyfill/auto";
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, ImageBackground } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Asset } from "expo-asset"; // Import Asset from expo-asset
import images from "../constants/Images";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import LoadingScreen from "@/components/LoadingScreen";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if(!isLoading && isLoggedIn) return <Redirect href="/home" />
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      const imagesToLoad = [
        images.background,
        images.badge,
        // Add other images you want to preload here
      ];

      const cacheImages = imagesToLoad.map((image) => {
        return Asset.fromModule(image).downloadAsync();
      });

      await Promise.all(cacheImages);

      // Delay for a specific amount of time (e.g., 1 second)
      setTimeout(() => {
        setLoading(false);
      }, 5000); // 1000 ms = 1 second
    };

    preloadImages();
  }, []);

  if (loading) {
    return <LoadingScreen />; // Show loading screen
  }

  return (
    <ImageBackground
      source={images.background}
      style={{ flex: 1, backgroundColor: "transparent" }}
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="flex-1 items-start p-4 min-h-[85vh]">
            <Image
              source={images.badge}
              className="w-[64px] h-[72px] mb-16 -mt-4"
              resizeMode="contain"
            />
            <Text className="font-psemibold text-5xl mt-14">
              Your Urban Retreat Awaits You Here
            </Text>
            <Text className="font-pmedium text-xl mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy.
            </Text>
            <CustomButton
              title="Log In"
              handlePress={() => router.push("/sign-in")}
              containerStyles="w-[300px] mt-auto mb-8 self-center"
            />
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#161622" style="light" />
      </SafeAreaView>
    </ImageBackground>
  );
}