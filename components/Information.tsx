import { View, Text, TouchableOpacity, Linking } from 'react-native';
import React from 'react';

const Information = () => {
  const handlePress = (item) => {
    const url = "https://www.civilianhotel.com/"; // Base URL
    // You can modify this to direct to specific sections if needed
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

  const items = [
    "Clean",
    "Membership",
    "FAQ",
    "App Feedback",
    "Privacy Policy",
    "Terms & Conditions"
  ];

  return (
    <View className=''>
      {items.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handlePress(item)} className='flex flex-row justify-between py-4'>
          <Text className='font-plight text-lg'>{item}</Text>
          <Text className='font-pregular'>&gt;</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Information;
