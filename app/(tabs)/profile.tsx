import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { Profile } from "@/types/data"; // Importing the Profile type
import { localIP } from "@/constants/keys";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import useBookingsStore from "@/store/bookingsStore";

const ProfileScreen = () => {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { bookings } = useBookingsStore();

  const fetchUserById = async () => {
    try {
      const response = await fetch(`${localIP}/profile`);
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data: Profile = await response.json();
      setUser(data);
    } catch (err: Error | any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserById();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#4B5563" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500 font-semibold text-lg">{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <View className="bg-white elevation-xl h-full w-full rounded-lg shadow-md p-6 mt-10">
        <View className="flex-row items-center justify-between w-full mb-4">
          <Text className="text-3xl font-bold text-gray-800">Profile</Text>
          <Ionicons name="person" size={48} color="#4B5563" />
        </View>
        {user && (
          <>
            <View className="mb-4">
              <Text className="text-lg text-gray-700">
                <Text className="font-semibold">Name:</Text> {user.name}
              </Text>
              <Text className="text-lg text-gray-700 mt-2">
                <Text className="font-semibold">Email:</Text> {user.email}
              </Text>
            </View>
            <View>
              <Text className="text-xl font-semibold text-gray-800 mb-2">
                Bookings
              </Text>
              <View className="bg-gray-100 p-3 rounded-md shadow-sm mb-2">
                <Text className="text-gray-600 font-medium">
                  Total Bookings: {bookings.length}
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
