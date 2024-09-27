import 'react-native-url-polyfill/auto';
import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import images from "../constants/Images";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <SafeAreaView className="bg-primary flex-1">
      <Image
        source={images.king}
        className="h-screen w-screen absolute"
      />
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex-1 items-start p-4 min-h-[85vh]">
          <Image
            source={images.badge}
            className="w-[64px] h-[72px] mb-16 -mt-4"
            resizeMode="contain"
          />
          <Text className="font-psemibold text-5xl mt-14 text-zinc-100">
            Your Urban Retreat Awaits You Here
          </Text>
            <CustomButton
              title="Book Now"
              handlePress={() => router.push("/sign-in")}
              containerStyles="w-[300px] mt-auto mb-8 self-center"
            />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
