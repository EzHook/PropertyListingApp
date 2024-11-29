import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

type SolidButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

const SolidButton: React.FC<SolidButtonProps> = ({
  title,
  onPress,
  disabled,
}) => {
  return (
    <TouchableOpacity
      className={`w-full p-4 rounded-xl items-center justify-center ${
        disabled ? "bg-gray-400" : "bg-blue-500"
      }`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        className={`text-lg font-bold items-center justify-center ${
          disabled ? "text-gray-600" : "text-white"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SolidButton;
