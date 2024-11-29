import React, { useMemo } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Property } from "@/types/data";
import SearchBar from "@/components/SearchBar";
import HotelCard from "@/components/HotelCard";
import { fetchProperties } from "@/services/services";
import { Ionicons } from "@expo/vector-icons";
import useBookingsStore from "@/store/bookingsStore";

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const router = useRouter();
  const { bookings } = useBookingsStore();

  const {
    data: properties,
    isLoading,
    error,
  } = useQuery<Property[]>({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });

  // Memoized search results
  const filteredProperties = useMemo(() => {
    if (!properties) return [];

    return properties.filter(
      (property) =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.city
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        property.location.state
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }, [properties, searchQuery]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color="#0D34BF" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text className="text-2xl font-bold mb-4">Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView className="flex-1 bg-background">
      <View className="px-4 mt-10 w-full flex-row justify-between">
        <Text className="text-2xl font-bold mb-4">Welcome</Text>
        {/* <View className="flex-row items-center">
          <Ionicons name="book" size={24} color="#0D34BF" />
          <Text className="text-xl text-primary ml-2 font-semibold">
            {bookings.length}
          </Text>
        </View> */}
      </View>

      <View className="p-2 mb-2">
        <SearchBar
          placeholder="Search Properties"
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </View>

      {filteredProperties.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-xl text-gray-500">No properties found</Text>
        </View>
      ) : (
        <View className="px-4">
          <FlatList
            data={filteredProperties}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <HotelCard item={item} router={router} />}
          />
        </View>
      )}
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
