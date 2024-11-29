import { localIP } from "@/constants/keys";
import { Property } from "@/types/data";

export const fetchProperties = async (): Promise<Property[]> => {
  const response = await fetch(`${localIP}/properties`);
  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }
  return response.json();
};

export const fetchPropertyById = async (id: string): Promise<Property> => {
  const response = await fetch(`${localIP}/properties/${id}`);
  console.log("the url is", `${localIP}/properties/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch property details");
  }
  return response.json();
};
