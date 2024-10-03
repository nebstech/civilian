import { View, Text, Image, TouchableOpacity, Modal, Pressable } from "react-native";
import React, { useState } from "react";

const AttractionsCard = ({ attraction: { name, description, image } }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex flex-col items-center -ml-5 px-4 mb-14">
      <TouchableOpacity 
        activeOpacity={0.8}
        className="w-60 h-60 relative justify-center items-center overflow-hidden" 
        onPress={() => setModalVisible(true)} // Show modal on image click
      >
        <Image
          source={{ uri: image }}
          className="h-full w-full rounded-sm"
          resizeMode="cover"
        />
        <Text
          className="absolute text-white text-lg font-psemibold text-center"
          style={{ top: 10 }} 
        >
          {name}
        </Text>
      </TouchableOpacity>

      {/* Modal for displaying description */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} 
      >
        <View className="flex-1 justify-center items-center bg-transparent bg-opacity-70">
          <View className="w-80 p-4 bg-zinc-100 rounded-lg">
            <Text className="text-2xl text-black font-psemibold">{name}</Text>
            <Text className="mt-2 font-pregular text-gray-600">{description}</Text>
            <Pressable
              style={{ marginTop: 20, alignSelf: 'flex-end' }}
              onPress={() => setModalVisible(false)} 
            >
              <Text className="text-blue-500 font-psemibold">Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AttractionsCard;
