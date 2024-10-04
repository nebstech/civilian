import { View, Text, SafeAreaView, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { createReservation } from '@/lib/appwrite'; 
import { useGlobalContext } from '@/context/GlobalProvider';

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
      <Text className='text-2xl font-bold text-black text-center mb-4'>Create Reservation</Text>

      <View className='mb-4'>
        <Text className='text-lg text-black'>Check-In Date:</Text>
        <TextInput
          className='border border-gray-300 p-2 rounded'
          placeholder='YYYY-MM-DD'
          value={checkInDate}
          onChangeText={setCheckInDate}
        />
      </View>

      <View className='mb-4'>
        <Text className='text-lg text-black'>Check-Out Date:</Text>
        <TextInput
          className='border border-gray-300 p-2 rounded'
          placeholder='YYYY-MM-DD'
          value={checkOutDate}
          onChangeText={setCheckOutDate}
        />
      </View>

      <View className='mb-4'>
        <Text className='text-lg text-black'>Number of Guests:</Text>
        <TextInput
          className='border border-gray-300 p-2 rounded'
          placeholder='Number of Guests'
          value={numberOfGuests}
          keyboardType='numeric'
          onChangeText={setNumberOfGuests}
        />
      </View>

      <View className='mb-4'>
        <Text className='text-lg text-black'>Room Type:</Text>
        <TextInput
          className='border border-gray-300 p-2 rounded'
          placeholder='e.g., Deluxe, Standard'
          value={roomType}
          onChangeText={setRoomType}
        />
      </View>

      <Button title="Create Reservation" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

export default CreateReservation;
