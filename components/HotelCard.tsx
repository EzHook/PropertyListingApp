import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Property } from "@/types/data";
import { Ionicons } from "@expo/vector-icons";
import { Router } from "expo-router";

const HotelCard = ({ item, router }: { item: Property; router: Router }) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/property/${item.id}`)}
      className="bg-white p-4 shadow-current rounded-lg mb-4 elevation-md"
    >
      <Image
        className="h-40 w-full rounded-lg"
        source={{ uri: item.images[0] }}
      />
      <View className="flex-row justify-between mt-2">
        <View className="wrap">
          <Text className="font-bold text-heading text-lg">
            {item.title.slice(0, 20)}..
          </Text>
          <Text className="text-gray-500 text-md font-medium">
            ${item.price} / night
          </Text>
        </View>

        <View className=" flex-row">
          <Ionicons
            className="mt-1"
            name="location"
            size={12}
            color="#0D34BF"
          />
          <View className="ml-2">
            <Text className="font-bold text-xs text-heading">
              {item.location.city}
            </Text>
            <Text className="font-semibold text-xs text-gray-500">
              {item.location.state}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HotelCard;

const styles = StyleSheet.create({});
