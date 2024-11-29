import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Property } from "@/types/data";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import SolidButton from "@/components/SolidButton";
import { fetchPropertyById } from "@/services/services";
import useBookingsStore from "@/store/bookingsStore";

const PropertyDetails: React.FC = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addBooking, isBooked } = useBookingsStore();

  const handleBookNow = () => {
    if (property) {
      addBooking(property);

      if (Platform.OS === "android") {
        ToastAndroid.show(
          `${property.title} booked successfully`,
          ToastAndroid.SHORT
        );
      }

      router.push("/bookings");
    }
  };

  const {
    data: property,
    isLoading,
    error,
  } = useQuery<Property>({
    queryKey: ["property", id],
    queryFn: () => fetchPropertyById(id as string),
    enabled: !!id,
  });

  if (!id) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text className="text-2xl font-bold">Invalid Property ID</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#0D34BF" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Error: {error.message}
        </Text>
        <Text style={{ fontSize: 16 }}>
          Check your network configuration and ensure the API endpoint is
          reachable.
        </Text>
      </View>
    );
  }

  if (!property) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <Text className="text-xl font-bold">Property not found.</Text>
      </View>
    );
  }

  const coordinates = property.location?.coordinates;

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: "#f9f9f9", padding: 16 }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginTop: 16,
            paddingVertical: 16,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={{ fontSize: 18, marginLeft: 8, fontWeight: "500" }}>
            Back
          </Text>
        </TouchableOpacity>

        <Image
          source={{
            uri:
              property.images?.[0] ||
              "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D",
          }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 8,
            marginBottom: 16,
            backgroundColor: "#ccc",
          }}
        />

        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 4 }}>
          {property.title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Ionicons name="pricetag" size={16} color="#0D34BF" />
          <Text style={{ fontSize: 16, color: "#0D34BF", marginLeft: 8 }}>
            ${property.price} / night
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Ionicons name="location" size={16} color="grey" />
          <Text style={{ fontSize: 14, color: "#666", marginLeft: 8 }}>
            {property.location?.address}, {property.location?.city},{" "}
            {property.location?.state}
          </Text>
        </View>

        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
          Features:
        </Text>
        {property.features?.map((feature, index) => (
          <Text
            key={index}
            style={{ fontSize: 14, color: "#333", marginBottom: 4 }}
          >
            - {feature}
          </Text>
        ))}
        {/* The Map works in the Debugging mode // for the apk file I have commented out this part */}

        {coordinates && (
          <View
            style={{
              marginTop: 16,
              padding: 16,
              borderRadius: 8,
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 3,
            }}
          >
            <MapView
              style={{ width: "100%", height: 160, borderRadius: 8 }}
              initialRegion={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
              onMapReady={() => console.log("Map is ready")}
            >
              <Marker
                coordinate={{
                  latitude: coordinates.latitude,
                  longitude: coordinates.longitude,
                }}
                title={property.title}
                description={property.location?.address}
              />
            </MapView>
          </View>
        )}
        <View style={{ height: 50 }} />
      </ScrollView>

      <View style={{ padding: 16, width: "100%" }}>
        <SolidButton
          disabled={isBooked(property.id)}
          title="Book Now"
          onPress={handleBookNow}
        />
      </View>
    </>
  );
};

export default PropertyDetails;
