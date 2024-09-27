import { View, ScrollView, Image, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from 'react-native'; 

import Images from "@/constants/Images";
import FormFIeld from "@/components/FormFIeld";
import CustomButton from "@/components/CustomButton";
import { SignIn as AppSignIn } from "@/lib/appwrite"; 

export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const colorScheme = useColorScheme(); // Get the current color scheme

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
      return; 
    }

    setIsSubmitting(true);
    
    try {
      await AppSignIn(form.email, form.password);
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Define text color based on the current theme
  const textColor = colorScheme === 'dark' ? 'white' : 'black';
  const subTextColor = colorScheme === 'dark' ? 'lightgray' : 'gray';

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-[92%] mx-auto justify-center h-[72vh] px-4 my-6">
          <Image source={Images.badge} resizeMode="contain" className="self-center h-[10vh] mb-10" />
          <Text style={{ color: textColor }} className='text-4xl font-semibold mt-1 text-center'>Welcome to Civilian Hotel</Text>
          <Text style={{ color: subTextColor }} className='text-lg font-pregular text-center mt-4'>Please sign in to access all that Civilian has to offer</Text>
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
            <Text style={{ color: subTextColor }} className="text-lg font-pregular">
              Don’t have an account?
            </Text>
            <Link href="/home" className="text-lg font-psemibold text-secondary">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
