import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookingsState, Property } from '@/types/data';


const useBookingsStore = create<BookingsState>()(
  persist(
    (set, get) => ({
      bookings: [],
      addBooking: (property) => 
        set((state) => ({ 
          bookings: [...state.bookings, property] 
        })),
      removeBooking: (propertyId) => 
        set((state) => ({ 
          bookings: state.bookings.filter(booking => booking.id !== propertyId) 
        })),
      isBooked: (propertyId) => 
        get().bookings.some(booking => booking.id === propertyId)
    }),
    {
      name: 'bookings-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export default useBookingsStore;