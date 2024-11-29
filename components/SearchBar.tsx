import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type SearchBarProps = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <View className="flex-row elevation-sm items-center space-x-4 pl-4 bg-gray-200 p-2 rounded-full">
      <Ionicons name="search-outline" size={24} color="black" />
      <TextInput
        value={value}
        onChangeText={onChange}
        className="text-heading"
        placeholder={placeholder}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
