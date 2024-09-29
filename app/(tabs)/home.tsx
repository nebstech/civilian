import {
  View,
  Text,
  Image,
  FlatList,
} from "react-native";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "@/constants/Images";
import SearchInput from "@/components/SearchInput";
import Amenities from "@/components/Amenities";

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  return (
    <>
      <SafeAreaView className="bg-primary h-[21%] -mt-4">
        <FlatList
          data={[]}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (<View className=""></View>)}
          contentContainerStyle={{ marginBottom: -20 }}
          ListHeaderComponent={() => (
            <View className="my-6 px-4 space-y-6">
              <View className="justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-400">
                    Welcome Back
                  </Text>
                  <Text className="text-2xl font-psemibold text-black">
                    Neb
                  </Text>
                </View>
                <View className="mt-1.5">
                  <Image
                    source={Images.badge}
                    className="w-9 h-10"
                    resizeMode="contain"
                  />
                </View>
              </View>
            </View>
          )}
        />
      </SafeAreaView>

      <View className="w-full flex-1 pt-5 pb-8 bg-white z-1">
        <Text className="text-gray-100 text-lg font-pregular mb-3">
          In the Hotel
        </Text>
        <Amenities posts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
      </View>
    </>
  );
}
