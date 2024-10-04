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
  const pathname = usePathname()
  const [query, setQuery] = useState('')



  // Define colors based on the primary theme
  const bgColor = "bg-primary-100"; 
  const textColor = "text-black"; 
  const borderColor = "border-primary-100"; 

  return (
    <View
      className={`flex-row items-center border-2 rounded-lg w-full h-14 shadow-md ${bgColor} ${borderColor}`}
    >
      <TextInput
        className={`flex-1 text-base ${textColor} px-4 bg-transparent`} 
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#000" 
        onChangeText={(e) => setQuery(e)}
        keyboardType={keyboardType}
        {...props}
      />
      <TouchableOpacity
        onPress={() => {
          if(!query) {
            return Alert.alert('Missing query', "Please input something to search results across database")
          }

          if(pathname.startsWith('/search')) router.setParams({ query })
            else router.push(`/search/${query}`)
        }}
      >
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
