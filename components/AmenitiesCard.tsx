import { View, Text, Image, TouchableOpacity } from "react-native";

import React from "react";

const AmenitiesCard = ({ amenitie: { sectionName, image } }) => {
  

  return (
    <View className="flex flex-col items-center -ml-5 px-4 mb-14">
      <TouchableOpacity
        activeOpacity={0.8}
        className="w-60 h-60 relative justify-center items-center overflow-hidden" 
      >
        <Image
          source={{ uri: image }}
          className="h-full w-full rounded-sm"
          resizeMode="cover"
        />

        <Text
          className="absolute text-white text-lg font-psemibold text-center"
          style={{ bottom: 20 }}
        >
          {sectionName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AmenitiesCard;
