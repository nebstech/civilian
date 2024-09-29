import { View, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import { KeyboardTypeOptions, useColorScheme } from "react-native"; // Combine imports
import icons from "../constants/Icons"; // Ensure the path is correct

interface SearchInputProps {
  value: string;
  handleChangeText: (text: string) => void;
  placeholder?: string;
  otherStyles?: string;
  keyboardType?: KeyboardTypeOptions;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  placeholder = "Search for an Event",
  handleChangeText,
  otherStyles = "",
  keyboardType,
  ...props
}) => {
  const colorScheme = useColorScheme(); // Get the current color scheme

  // Define colors based on the current theme
  const bgColor = colorScheme === "dark" ? "bg-gray-900" : "bg-gray-200"; // Background
  const textColor = colorScheme === "dark" ? "text-white" : "text-black"; // Text color
  const borderColor = colorScheme === "dark" ? "border-gray-600" : "border-gray-300"; // Border color

  return (
    <View
      className={`flex-row items-center border-2 rounded-lg w-full h-14 shadow-md ${bgColor} ${borderColor} ${otherStyles}`} // Add otherStyles
    >
      <TextInput
        className={`flex-1 text-base ${textColor} px-4`}
        value={value}
        placeholder={placeholder} // Use the placeholder prop
        placeholderTextColor={colorScheme === "dark" ? "#A1A1A1" : "#7B7B8B"} // Adjust placeholder color
        onChangeText={handleChangeText}
        keyboardType={keyboardType}
        {...props}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
