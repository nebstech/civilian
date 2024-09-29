import { View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { KeyboardTypeOptions } from "react-native"; // Removed StyleSheet
import { useColorScheme } from 'react-native'; // Import useColorScheme
import icons from "../constants/Icons";

interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  placeholder?: string;
  otherStyles?: string;
  keyboardType?: KeyboardTypeOptions;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles = '',
  keyboardType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const colorScheme = useColorScheme(); // Get the current color scheme

  // Define colors based on the current theme
  const backgroundColor = colorScheme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'; // Tailwind background colors
  const textColor = colorScheme === 'dark' ? 'text-white' : 'text-black'; // Tailwind text colors
  const borderColor = colorScheme === 'dark' ? 'border-gray-600' : 'border-gray-300'; // Tailwind border colors

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className={`flex-row items-center border-2 rounded-lg w-full h-14 shadow-md ${backgroundColor} ${borderColor}`}>
        <TextInput 
          className={`flex-1 text-base ${textColor} px-4`} // Use Tailwind for input styles
          value={value}
          placeholder={placeholder || title} // Use placeholder prop if provided
          placeholderTextColor={colorScheme === 'dark' ? '#A1A1A1' : '#7B7B8B'} // Adjust placeholder color
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          keyboardType={keyboardType}
          {...props}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
