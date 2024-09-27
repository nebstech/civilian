import { View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { KeyboardTypeOptions } from "react-native";

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

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className="border-2 border-gray-100 w-full h-14 px-4 bg-primary-200 rounded-lg flex flex-row items-center shadow-sm">
        <TextInput 
          className="flex-1 text-zinc-900 font-psemibold text-base"
          value={value}
          placeholder={placeholder || title} // Use placeholder prop if provided
          placeholderTextColor="#7B7B8B"
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
