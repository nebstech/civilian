import InfoBox from "@/components/InfoBox";
import Icons from "@/constants/Icons";
import { useGlobalContext } from "@/context/GlobalProvider";
import { signOut } from "@/lib/appwrite";
import React from "react";
import { SafeAreaView, FlatList, Text, View, Image, TouchableOpacity } from "react-native";

import { router } from "expo-router";

const Profile: React.FC = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null)
    setIsLoggedIn(false)

    router.replace('/sign-in')
  };


  return (
    <SafeAreaView className="bg-primary h-full flex-1">
      <FlatList
        data={[user]} // Wrap user object in an array
        keyExtractor={(item) => item.id} // Ensure you have a unique identifier
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
              <Image 
                source={Icons.logout}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-zinc-300 rounded-lg justify-center items-center">
              <Image 
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <View className="flex-row items-center mb-4">
              <Text className="mt-1 font-psemibold text-center text-lg text-black">{user.username}</Text> 
            </View>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
};

export default Profile;
