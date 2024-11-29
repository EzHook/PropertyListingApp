import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import useBookingsStore from "@/store/bookingsStore"; // Adjust import path as needed
import { Ionicons } from "@expo/vector-icons";
import { Property } from "@/types/data";
import BookingCard from "@/components/BookingCard";

const BookingsScreen: React.FC = () => {
  const router = useRouter();
  const { bookings, removeBooking } = useBookingsStore();
  return (
    <SafeAreaView className="flex-1 bg-background p-4">
      <View className="flex-row justify-between items-center mt-10">
        <Text className="text-2xl font-bold mb-4">My Bookings</Text>
      </View>
      {bookings.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Ionicons name="book" size={48} color="gray" />
          <Text className="text-xl font-bold text-gray-500">
            No bookings yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          renderItem={({ item }) => (
            <BookingCard item={item} onRemove={() => removeBooking(item.id)} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default BookingsScreen;
