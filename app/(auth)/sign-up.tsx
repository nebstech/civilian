import { View, ScrollView, Image, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Link, router } from "expo-router";
import { useColorScheme } from "react-native";

import Images from "@/constants/Images";
import FormFIeld from "@/components/FormFIeld";
import CustomButton from "@/components/CustomButton";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function SignUp() {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const colorScheme = useColorScheme(); // Get the current color scheme

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
      return; // Early return to avoid further processing
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Define text color based on the current theme
  const textColor = colorScheme === "dark" ? "white" : "black";
  const subTextColor = colorScheme === "dark" ? "lightgray" : "gray";

  return (
    <SafeAreaView className="h-full">
      <View className="relative flex-1">
        <Image
          source={colorScheme === "dark" ? Images.logo2 : Images.badge}
          className="absolute right-[-50%] top-80 h-[62vh] w-[68vh]"
        />
        <ScrollView>
          <View className="w-[92%] mx-auto justify-center min-h-[72vh] px-4 my-6">
            <Text
              style={{ color: textColor }}
              className="text-4xl font-semibold mt-1 text-center"
            >
              Welcome to Civilian Hotel
            </Text>
            <Text
              style={{ color: subTextColor }}
              className="text-lg font-pregular text-center mt-4"
            >
              Join us to unlock all the benefits of Civilian. Create your
              account today!
            </Text>
            <FormFIeld
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mt-5"
            />
            <FormFIeld
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-5"
              keyboardType="email-address"
            />
            <FormFIeld
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-5"
            />
            <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text
                style={{ color: subTextColor }}
                className="text-lg font-pregular"
              >
                Already a member?
              </Text>
              <Link
                href="/sign-in"
                className="text-lg font-psemibold text-secondary"
              >
                Sign In
              </Link>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}