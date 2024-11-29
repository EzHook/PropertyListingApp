import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default function Layout() {
  const iconSize: number = 24;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0D34BF", // Active tab color
        tabBarInactiveTintColor: "#414862", // Inactive tab color
        tabBarStyle: {
          backgroundColor: "#fff", // Light background for the tab bar
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          borderRadius: 20,
          bottom: 10,
          marginHorizontal: 20,
          // position: "absolute",
          elevation: 10, // For Android shadow
          // paddingBottom: 10,
          // paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 10, // Smaller text for a minimalist feel
          fontWeight: "600", // Semi-bold for emphasis
        },
        tabBarIconStyle: {
          marginBottom: -4, // Adjust icon position
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={iconSize} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          tabBarLabel: "Booking",
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar-outline" color={color} size={iconSize} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" color={color} size={iconSize} />
          ),
        }}
      />
    </Tabs>
  );
}
