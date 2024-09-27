// LoadingScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import Images from "@/constants/Images";

const LoadingScreen = () => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const dots = [0, 1, 2, 3]; // Array for the dots

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDotIndex((prevIndex) => (prevIndex + 1) % dots.length);
    }, 500); // Change dot every 500ms

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Image 
        source={Images.badge} 
        resizeMode="contain" 
        className="self-center h-[10vh] mb-10" 
      />
      <View className="flex-row mb-2">
        {dots.map((_, index) => (
          <View
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              activeDotIndex === index ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default LoadingScreen;
