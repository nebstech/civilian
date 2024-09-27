import { View, ScrollView, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Link } from "expo-router";

import Images from "@/constants/Images";
import FormFIeld from "@/components/FormFIeld";
import CustomButton from "@/components/CustomButton";

export default function SignUp() {
  const submit = () => {
    // Handle submission logic here
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-[92%] mx-auto justify-center min-h-[72vh] px-4 my-6">
          <Image source={Images.badge} resizeMode="contain" className="self-center h-[10vh] mb-10" />
          <Text className='text-4xl font-semibold mt-1 text-center '>Welcome to Civilian Hotel</Text>
          <Text className='text-lg font-pregular text-center mt-4'>Join us to unlock all the benefits of Civilian. Create your account today!</Text>
          <FormFIeld 
            title='Username'
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-5"
          />
          <FormFIeld 
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-5"
            keyboardType="email-address"
          />
          <FormFIeld 
            title='Password'
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-5"
          />
          <CustomButton 
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-zinc-700 font-pregular">
              Already a member?
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Custom useColorScheme that always returns 'light'
export function useColorScheme() {
  return 'light';
}
