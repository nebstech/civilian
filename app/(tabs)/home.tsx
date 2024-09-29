import { View, Text, StatusBar, Image, TouchableOpacity, Linking, FlatList } from "react-native";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "@/constants/Images";

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  const statusBarColor = colorScheme === "dark" ? "black" : "#1F1F1F"; // Lighter black for light mode
  const backgroundColor = colorScheme === "dark" ? "black" : "white";

  return (
    <>
    {/*
      <View style={{ flex: 1, backgroundColor }}>
        <View
          style={{
            height: StatusBar.currentHeight || 127, // Set a standard height
            backgroundColor: statusBarColor,
            zIndex: 1, // Set the zIndex here
            position: "relative", // Make sure to set position if needed
          }}
        />
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"} // Adjust bar style based on mode
          backgroundColor={statusBarColor}
        />
        */}
        <SafeAreaView className="bg-primary">
          <FlatList 
          data={[{ id: 1 }, { id: 2 }, { id: 3 } ]}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <Text className="text-3xl">{item.id}</Text>
          )}
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
          {/*
          <View className="w-[60vh] h-[60%] -mt-20 self-center items-center">
            <Image source={Images.king} className="w-[50vh] h-[80%] z-10" />

            <TouchableOpacity
              className="bg-[#FF8C00] p-2 rounded-md mt-3 w-[20vh]"
              onPress={() => {
                Linking.openURL("https://www.civilianhotel.com");
              }}
            >
              <Text className="text-black font-pbold text-lg text-center">
                Book A Stay
              </Text>
            </TouchableOpacity>
          </View>
          */}
        </SafeAreaView>
      {/*</View>*/}
    </>
  );
}
