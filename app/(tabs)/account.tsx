import Icons from "@/constants/Icons";
import { useGlobalContext } from "@/context/GlobalProvider";
import { signOut, getUserReservations } from "@/lib/appwrite"; 
import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import Images from "@/constants/Images";


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

  const renderReservationItem = ({ item }) => (
    <View className="mb-4 p-4 bg-primary-100 h-full -mt-10  flex flex-col rounded shadow">
      <Text className="font-pbold mb-2">Reservation Number: </Text>
      <Text className="font-psemibold mb-4">{item.$id}</Text>
      <Text className="font-pbold mb-2">Check-in: </Text>
      <Text className="font-psemibold mb-4">{item.checkInDate}</Text>
      <Text className="font-pbold mb-2">Check-out: </Text>
      <Text className="font-psemibold mb-4">{item.checkOutDate}</Text>
      <Text className="font-pbold mb-2">Guests:</Text>
      <Text className="font-psemibold mb-4"> {item.numberOfGuests}</Text>
      <Text className="font-pbold mb-4">Room Type: </Text>
      <Text className="font-psemibold mb-2">{item.roomType}</Text>
      <Image 
        source={Images.king}
        className="w-64 h-40 rounded-lg"
        resizeMode="cover"
      />
    </View>
  );

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
        ListFooterComponent={() => (
          <FlatList
            data={reservations}
            keyExtractor={(item) => item.$id}
            renderItem={renderReservationItem}
            contentContainerStyle={{ paddingVertical: 16 }}
          />
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
};

export default Profile;
