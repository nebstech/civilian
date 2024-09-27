import { View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { KeyboardTypeOptions, StyleSheet } from "react-native";
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
  const backgroundColor = colorScheme === 'dark' ? '#1E1E1E' : '#F3F4F6'; // Darker background for dark mode
  const textColor = colorScheme === 'dark' ? 'white' : 'black'; // White text in dark mode
  const borderColor = colorScheme === 'dark' ? '#444444' : '#D1D5DB'; // Dark border for dark mode

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View style={[styles.container, { backgroundColor, borderColor }]}>
        <TextInput 
          style={[styles.input, { color: textColor }]} // Adjust text color
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

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    width: '100%',
    height: 56, // Adjusted height for consistency
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FormField;
