import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";
import Images from "@/constants/Images";
import SearchInput from "@/components/SearchInput";
import { getAllAmenities, getAllAttractions } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import AmenitiesCard from "@/components/AmenitiesCard";
import AttractionsCard from "@/components/AttractionsCard"; // Import your AttractionsCard component

const Home: React.FC = () => {
  const { data: posts, refetch } = useAppwrite(getAllAmenities);
  const { data: attractions } = useAppwrite(getAllAttractions);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary">
      {(!posts || posts.length === 0) ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <View></View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListHeaderComponent={() => (
            <View className="flex my-6 px-4 space-y-6">
              <View className="flex justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-400">
                    Welcome Back
                  </Text>
                  <Text className="text-2xl font-psemibold text-black">Neb</Text>
                </View>

                <View className="mt-1.5">
                  <Image
                    source={Images.badge}
                    className="w-9 h-10"
                    resizeMode="contain"
                  />
                </View>
              </View>

              <View className="w-[80%] self-center">
                <SearchInput
                  value="" // Placeholder value
                  handleChangeText={() => {}} // Placeholder function
                  placeholder="Search..."
                  otherStyles="mb-4"
                />
              </View>

              {/* Horizontal FlatList for Amenities */}
              {posts.length > 0 ? (
                <View className="w-full flex-1 pt-5 -mb-5">
                  <Text className="text-gray-500 text-lg font-pregular mb-4">
                    Inside Civilian &gt;
                  </Text>
                  <FlatList
                    data={posts}
                    horizontal
                    keyExtractor={(item) => item.$id}
                    renderItem={({ item }) => (
                      <AmenitiesCard amenitie={item} />
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                  />
                </View>
              ) : (
                <View className="flex-1 justify-center items-center">
                  <Text className="text-gray-500">No amenities available</Text>
                </View>
              )}

              {/* Horizontal FlatList for Attractions */}
              <View className="w-full flex-1 pt-5">
                <Text className="text-gray-500 text-lg font-pregular mb-4">
                  Local Attractions &gt;
                </Text>
                <FlatList
                  data={attractions}
                  horizontal
                  keyExtractor={(item) => item.$id}
                  renderItem={({ item }) => (
                    <AttractionsCard attraction={item} />
                  )}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 10 }}
                />
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
