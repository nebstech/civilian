import { View, Text, SafeAreaView, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { createReservation } from '@/lib/appwrite'; 
import { useGlobalContext } from '@/context/GlobalProvider';
import CustomButton from '@/components/CustomButton';

const CreateReservation = () => {
  const { user } = useGlobalContext();
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [roomType, setRoomType] = useState('');

  const handleSubmit = async () => {
    if (!checkInDate || !checkOutDate || !numberOfGuests || !roomType) {
      Alert.alert("All fields are required!");
      return;
    }

    try {
      const reservation = await createReservation(
        user.$id, // User ID from context
        checkInDate,
        checkOutDate,
        parseInt(numberOfGuests),
        roomType
      );
      Alert.alert("Reservation created!", `Confirmation Number: ${reservation.$id}`);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full p-4'>
      <Text className='text-2xl font-pbold mt-4 text-black text-center mb-4'>Create Reservation</Text>

      <View className='mb-4 mt-12 mx-4'>
        <Text className='font-psemibold text-lg text-black'>Check-In Date:</Text>
        <TextInput
          className='bg-primary-100 border border-gray-300 p-2 mt-4 h-14 rounded'
          placeholder='YYYY-MM-DD'
          value={checkInDate}
          onChangeText={setCheckInDate}
        />
      </View>

      <View className='mb-4 mx-4'>
        <Text className='font-psemibold text-lg text-black'>Check-Out Date:</Text>
        <TextInput
          className='bg-primary-100 border border-gray-300 p-2 mt-4 h-14 rounded'
          placeholder='YYYY-MM-DD'
          value={checkOutDate}
          onChangeText={setCheckOutDate}
        />
      </View>

      <View className='mb-4 mx-4'>
        <Text className='text-lg font-psemibold text-black'>Number of Guests:</Text>
        <TextInput
          className='bg-primary-100 border border-gray-300 p-2 mt-4 h-14 rounded'
          placeholder='Number of Guests'
          value={numberOfGuests}
          keyboardType='numeric'
          onChangeText={setNumberOfGuests}
        />
      </View>

      <View className='mb-4 mx-4'>
        <Text className='text-lg font-psemibold text-black'>Room Type:</Text>
        <TextInput
          className='bg-primary-100 border border-gray-300 p-2 mt-4 h-14 rounded'
          placeholder='e.g., Deluxe, Standard'
          value={roomType}
          onChangeText={setRoomType}
        />
      </View>

      <CustomButton 
      title='Create Reservation'
      handlePress={handleSubmit}
      containerStyles="w-[300px] mt-auto mb-10 self-center"
      />
    </SafeAreaView>
  );
};

export default CreateReservation;