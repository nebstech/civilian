import Icons from "@/constants/Icons";
import { useGlobalContext } from "@/context/GlobalProvider";
import { signOut, getUserReservations } from "@/lib/appwrite"; 
import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";

const Profile: React.FC = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [reservations, setReservations] = useState([]);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace('/sign-in');
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const userReservations = await getUserReservations(user.$id); // Get reservations for the current user
        setReservations(userReservations);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReservations();
  }, [user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}-${day}-${year}` // MM-DD-YYYY
  }

  const renderReservationItem = ({ item }) => {
    return (
      <View className="bg-black-100 border border-black-50 rounded-lg p-4  m-2 shadow-md flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="text-lg font-bold text-white uppercase">{item.reservationId || item.$id}</Text>
          <Text className="text-sm text-gray-100">
            {formatDate(item.checkInDate)} - {formatDate(item.checkOutDate)}</Text>
        </View>
        <View className="ml-4">
          <Text className="text-lg text-gray-100">{item.numberOfGuests} Guests</Text>
          <Text className="text-lg text-gray-100">{item.roomType}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-primary h-full flex-1">
      <FlatList
        data={[user]} // Wrap user object in an array
        keyExtractor={(item) => item.$id} 
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
              <Text className="mt-1 font-psemibold text-center text-lg text-zinc-100">{user.username}</Text> 
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <FlatList
            data={reservations}
            keyExtractor={(item) => item.$id}
            renderItem={renderReservationItem}
            contentContainerStyle={{ paddingVertical: 16 }}
          />
        )}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </SafeAreaView>
  );
};

export default Profile;