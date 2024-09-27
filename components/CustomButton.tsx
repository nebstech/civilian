import { TouchableOpacity, Text } from "react-native";
import React from "react";
import { twMerge } from "tw-merge";
import { useColorScheme } from 'react-native'; // Import useColorScheme

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading = false,
}) => {
  const colorScheme = useColorScheme(); // Get the current color scheme

  // Determine background and text color classes based on the current theme
  const bgClass = colorScheme === 'dark' ? 'bg-gray-800' : 'bg-accent';
  const textClass = colorScheme === 'dark' ? 'text-white' : 'text-primary';

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={twMerge(`${bgClass} rounded-full min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`)}
      disabled={isLoading}
    >
      <Text className={twMerge(`${textClass} font-psemibold text-lg ${textStyles}`)}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
