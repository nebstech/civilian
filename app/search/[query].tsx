import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, Text, View } from "react-native";
import SearchInput from "@/components/SearchInput";
import { getAllEvents } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { useLocalSearchParams } from "expo-router";

const Search: React.FC = () => {
  const { query } = useLocalSearchParams();
  const { data: events, refetch } = useAppwrite(() => getAllEvents(query));
  console.log("Query:", query);
  console.log("Raw Events Data:", events); 

  const hardcodedEvents = [
    {
      eventName: "Sports at Starchild",
      eventDate: "2024-10-25T18:00:00",
      eventDescription: "Join us for an exciting evening of sports at our rooftop bar, Starchild!",
      eventImage: "https://cloud.appwrite.io/v1/storage/buckets/66f61ffc0035f5fce0f6/files/66fdbb1c0027b3a63765/view?project=66f619cc0001d770a13a&mode=admin",
    },
    
  ];
  
  const renderEvents = () => {
    return hardcodedEvents.map((event, index) => (
      <View key={index} className="mb-4 p-2 border rounded-md bg-gray-100">
        <Image 
          source={{ uri: event.eventImage }}
          className="w-full h-32 rounded-md"
        />
        <Text className="text-lg font-pbold">{event.eventName}</Text>
        <Text className="text-sm">{event.eventDescription}</Text>
        <Text className="text-xs text-gray-600">{new Date(event.eventDate).toLocaleString()}</Text>
      </View>
    ));
  };
  
  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={events}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className="flex-row items-center mb-4">
            <Image
              source={{ uri: item.image }}
              className="w-[140px] h-[140px] ml-4 rounded-sm"
            />
            <View className="ml-4">
              <Text className="text-lg font-bold">{item.sectionName}</Text>
              <Text className="text-lg text-gray-600 w-40">
                {item.description}
              </Text>
            </View>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4">
            <Text className="font-pmedium text-gray-100 text-sm">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white mt-1">
              {query}
            </Text>
            <SearchInput
              value={query}
              handleChangeText={refetch}
              placeholder="Search for an Event"
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500">
              No events found for this search query.
            </Text>
          </View>
        )}
      />
      <View className="">
        <FlatList
          data={events}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <View className="mt-4">
              {renderEvents()}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;
