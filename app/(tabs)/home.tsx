import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, FlatList, Image, RefreshControl, Text, View } from "react-native";
import Images from "@/constants/Images";
import Amenities from "@/components/Amenities";
import SearchInput from "@/components/SearchInput";
import { getAllAmenities } from "@/lib/appwrite";

interface Event {
  eventName: string;
  eventDate: string;
  eventDescription: string;
  eventImage: string;
}

interface Document {
  $collectionId: string;
  $createdAt: string;
  $databaseId: string;
  $id: string;
  $permissions: any[];
  $updatedAt: string;
  description: string;
  events: string[];
  image: string;
  sectionName: string;
}


const Home: React.FC = () => {
  const [data, setData] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await getAllAmenities() as Document[] | undefined; 
        if (response) {
          setData(response); 
        } else {
          setData([]); // Or handle the case where response is undefined
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert('Error', error.message);
        } else {
          Alert.alert('Error', 'An unexpected error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);



  console.log(data);


  const [refreshing, setRefreshing] = useState(false);
  const posts = [{ id: 1 }, { id: 2 }, { id: 3 }]; // Example posts data

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false)
  };

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={posts} // Replace with your actual data
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className=""></View> // Replace with your actual item rendering
        )}
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

            {/* Conditional Rendering for Amenities */}
            {posts.length > 0 ? (
              <>
                <View className="w-full flex-1 pt-5 pb-8">
                  <Text className="text-gray-100 text-lg font-pregular mb-4">
                    In the Hotel &gt;
                  </Text>
                  <Amenities posts={posts} />
                </View>
                <View className="w-full flex-1 pt-5 pb-8">
                  <Text className="text-gray-100 text-lg font-pregular mb-4">
                    Near the Hotel &gt;
                  </Text>
                  <Amenities posts={posts ?? []} />
                </View>
              </>
            ) : (
              <View className="flex-1 justify-center items-center">
                <Text className="text-gray-500">No amenities available</Text>
              </View>
            )}
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
