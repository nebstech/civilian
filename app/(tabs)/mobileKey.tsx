import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TextInput, View, Alert } from 'react-native';
import CustomButton from '@/components/CustomButton'; 
import { getUserReservations } from '@/lib/appwrite'; 
import { useGlobalContext } from '@/context/GlobalProvider'; 

const MobileKeyActivator = () => {
  const { user } = useGlobalContext(); // Get user from context
  const [reservationNumber, setReservationNumber] = useState('');
  const [userReservations, setUserReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      if (user) {
        const reservations = await getUserReservations(user.$id); // Fetch reservations for the logged-in user
        setUserReservations(reservations || []); 
      }
    };
    fetchReservations();
  }, [user]);

  const handleSubmit = () => {
    // Check if the reservation number exists in userReservations
    const reservation = userReservations.find(res => res.$id === reservationNumber);

    if (!reservation) {
      Alert.alert('Error', 'Reservation number is invalid.');
      return;
    }

    // Proceed with checking in the reservation and generating the mobile key
    
    Alert.alert('Success', 'Reservation validated! Proceeding to create mobile key...');
    // Implement logic here to create the mobile key
  };

  return (
    <SafeAreaView className="bg-primary h-full p-4">
      <Text className='text-white text-2xl mt-10 mb-4 self-center font-pbold'>Mobile Key</Text>
      <View className='mb-4 mt-12 mx-4 justify-center'>
      <Text className="font-psemibold self-center text-lg text-gray-100">
        Check in and create your mobile key
      </Text>
      <TextInput
        className="text-lg bg-black-100 border border-gray-300 p-2 mt-4 h-14 rounded"
        placeholder="Enter Reservation Number"
        placeholderTextColor="#A0AEC0"
        value={reservationNumber}
        onChangeText={setReservationNumber}
      />
      </View>
      <CustomButton 
      title="Create Key"
      handlePress={handleSubmit} 
      containerStyles="w-[300px] mt-auto mb-10 self-center"
      />
    </SafeAreaView>
  );
};

export default MobileKeyActivator;
