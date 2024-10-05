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
      <Text className="font-psemibold text-lg mb-4">
        Seamlessly check in and create a mobile key for your stay!
      </Text>
      <TextInput
        className="text-lg bg-blue-50 text-black border border-gray-300 rounded p-2 mb-5"
        placeholder="Enter Reservation Number"
        placeholderTextColor="#A0AEC0"
        value={reservationNumber}
        onChangeText={setReservationNumber}
      />
      <CustomButton 
      title="Create Key"
      handlePress={handleSubmit} 
      containerStyles="w-[300px] mt-auto mb-10 self-center"
      />
    </SafeAreaView>
  );
};

export default MobileKeyActivator;
