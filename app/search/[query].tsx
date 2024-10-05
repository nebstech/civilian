import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, Text, View } from "react-native";
import SearchInput from "@/components/SearchInput";
import { getAllEvents } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { useLocalSearchParams } from "expo-router";
import Images from "@/constants/Images";

const Search: React.FC = () => {
  const { query } = useLocalSearchParams();
  const { data: events, refetch } = useAppwrite(() => getAllEvents(query));
  
  const hardcodedEvents = [
    {
      eventName: "Sports at Starchild",
      eventDate: "2024-10-25T18:00:00",
      eventDescription: "Join us for an exciting evening of sports at our rooftop bar, Starchild!",
      eventImage: "https://cloud.appwrite.io/v1/storage/buckets/66f61ffc0035f5fce0f6/files/66fdbb1c0027b3a63765/view?project=66f619cc0001d770a13a&mode=admin",
    },
  ];

  const renderFetchedEventItem = ({ item }) => (
    <View className="flex-row items-center mb-4">
      <Image
        source={{ uri: item.image }}
        className="w-[140px] h-[140px] ml-4 rounded-sm"
      />
      <View className="ml-4">
        <Text className="text-lg font-bold">{item.sectionName}</Text>
        <Text className="text-lg text-gray-600 w-40">{item.description}</Text>
      </View>
    </View>
  );

  const renderHardcodedEvent = () => (
    <View className="mb-4 self-center p-2 border rounded-md bg-black-100">
      <Image 
        source={Images.logo2}
        className="w-full h-32 rounded-md"
      />
      <Text className="text-lg font-pbold text-gray-100">{hardcodedEvents[0].eventName}</Text>
      <Text className="text-sm text-white">{hardcodedEvents[0].eventDescription}</Text>
      <Text className="text-xs text-gray-400">
        {new Date(hardcodedEvents[0].eventDate).toLocaleDateString("en-GB")} {/* Format date as dd-mm-yyyy */}
      </Text>
    </View>
  );

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={events}
        keyExtractor={(item) => item.$id}
        renderItem={renderFetchedEventItem}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4">
            <Text className="font-pmedium text-gray-100 text-sm">Search Results</Text>
            <Text className="text-2xl font-psemibold text-white mt-1">{query}</Text>
            <SearchInput
              value={query}
              handleChangeText={refetch}
              placeholder="Search for an Event"
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500">No events found for this search query.</Text>
          </View>
        )}
      />
      {/* Add a container to adjust spacing and center the hardcoded event */}
      <View className="flex-1 justify-center items-center -mt-[170%] h-[70%] mb-4">
        {renderHardcodedEvent()}
      </View>
    </SafeAreaView>
  );
};

export default Search;
