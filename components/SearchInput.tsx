import { View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { KeyboardTypeOptions } from "react-native";
import icons from "../constants/Icons";
import { router, usePathname } from "expo-router";

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
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  
  const bgColor = "bg-black-100";
  const textColor = "text-white";
  const borderColor = "border-primary";

  return (
    <View
      className={`flex-row items-center space-x-4 border-2 border-black-200 foucus:border-secondary rounded-2xl w-full h-16 px-4 shadow-md ${bgColor} ${borderColor}`}
    >
      <TextInput
        className={`flex-1 text-base ${textColor} px-4 bg-transparent`}
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        keyboardType={keyboardType}
        {...props}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search results across database"
            );
          }

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
