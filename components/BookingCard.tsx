import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Property } from "@/types/data";

const BookingCard: React.FC<{
  item: Property;
  onRemove: () => void;
}> = ({ item, onRemove }) => {
  const handleRemove = () => {
    ToastAndroid.show(`Removed ${item.title}`, ToastAndroid.SHORT);
    onRemove();
  };
  return (
    <View className="bg-white rounded-lg p-4 mb-4 shadow-md">
      <Image
        source={{ uri: item.images[0] }}
        className="w-full h-48 rounded-lg mb-4"
      />
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-xl font-bold">{item.title}</Text>
          <Text className="text-primary font-semibold">
            ${item.price} / night
          </Text>
          <Text className="text-secondary">
            {item.location.city}, {item.location.state}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleRemove}
          className="bg-red-500 p-2 rounded-full"
        >
          <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingCard;

const styles = StyleSheet.create({});
