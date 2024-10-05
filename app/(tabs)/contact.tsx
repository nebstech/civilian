import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import Images from "@/constants/Images";

const Contact = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="p-4">
        <Text className="text-2xl font-pbold text-black text-center mb-4 mt-4">
          Contact Us
        </Text>
        <View>
          <Text className="text-center font-plight -mt-3">
            Need help with anything?
          </Text>
        </View>

        <View className="mt-6">
          <Text className="text-xl font-psemibold text-black">Address:</Text>
          <Text className="text-lg font-pregular text-gray-700">
            123 Random St, New York, NY 10001
          </Text>
        </View>

        <View className="mt-4">
          <Text className="text-xl font-psemibold text-black">Email:</Text>
          <Text className="text-lg font-pregular text-gray-700">
            info@civilian.com
          </Text>
        </View>

        <View className="mt-4">
          <Text className="text-xl font-psemibold text-black">Phone:</Text>
          <Text className="text-lg font-pregular text-gray-700">
            (123) 456-7890
          </Text>
        </View>
      </View>
      <Image 
        source={Images.badge}
        className="ml-10 mt-10"
      />
    </SafeAreaView>
  );
};

export default Contact;