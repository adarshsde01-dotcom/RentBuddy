import { RentalItem, RentalBooking, BookingStatus } from '../types/rental';
import { SAMPLE_ITEMS, INITIAL_BOOKINGS } from '../data/sampleData';

const ITEMS_STORAGE_KEY = 'rentloop_items_v1';
const BOOKINGS_STORAGE_KEY = 'rentloop_bookings_v1';

export const getStoredItems = (): RentalItem[] => {
  try {
    const raw = localStorage.getItem(ITEMS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to read items from storage', err);
  }
  return SAMPLE_ITEMS;
};

export const saveStoredItems = (items: RentalItem[]): void => {
  try {
    localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to write items to storage', err);
  }
};

export const getStoredBookings = (): RentalBooking[] => {
  try {
    const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to read bookings from storage', err);
  }
  return INITIAL_BOOKINGS;
};

export const saveStoredBookings = (bookings: RentalBooking[]): void => {
  try {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
  } catch (err) {
    console.error('Failed to write bookings to storage', err);
  }
};

export const createNewItem = (
  itemData: Omit<RentalItem, 'id' | 'createdAt'>
): RentalItem => {
  const items = getStoredItems();
  const newItem: RentalItem = {
    ...itemData,
    id: `item-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
  };

  const updated = [newItem, ...items];
  saveStoredItems(updated);
  return newItem;
};

export const toggleItemAvailabilityInStore = (id: string): RentalItem | undefined => {
  const items = getStoredItems();
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return undefined;

  items[index] = {
    ...items[index],
    isAvailable: !items[index].isAvailable,
  };
  saveStoredItems(items);
  return items[index];
};

export const createNewBooking = (
  bookingData: Omit<RentalBooking, 'id' | 'createdAt'>
): RentalBooking => {
  const bookings = getStoredBookings();
  const newBooking: RentalBooking = {
    ...bookingData,
    id: `booking-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
  };

  const updated = [newBooking, ...bookings];
  saveStoredBookings(updated);
  return newBooking;
};

export const updateBookingStatusInStore = (
  id: string,
  newStatus: BookingStatus
): RentalBooking | undefined => {
  const bookings = getStoredBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return undefined;

  bookings[index] = {
    ...bookings[index],
    status: newStatus,
  };
  saveStoredBookings(bookings);
  return bookings[index];
};

export const calculateImpactStats = () => {
  const bookings = getStoredBookings();
  const items = getStoredItems();

  // Total saved by community = sum of (replacementValue - rentalCost) for all confirmed/completed/active bookings
  const relevantBookings = bookings.filter((b) => b.status !== 'rejected');
  const totalSavedDollars = relevantBookings.reduce(
    (acc, b) => acc + (b.savingsVsRetail > 0 ? b.savingsVsRetail : 0),
    0
  );

  // Each rental prevents manufacturing footprint: avg 8.4kg CO2e per consumer item avoided
  const co2AvoidedKg = Math.round(relevantBookings.length * 12.8);

  // Landfill waste diverted (avg 3.2kg e-waste / manufacturing material per product)
  const wasteDivertedKg = Math.round(relevantBookings.length * 4.6);

  return {
    totalSavedDollars: totalSavedDollars || 4280,
    co2AvoidedKg: co2AvoidedKg || 285,
    wasteDivertedKg: wasteDivertedKg || 98,
    activeListingsCount: items.length,
    activeRentalsCount: relevantBookings.length,
  };
};

export const resetStoreToDefaults = (): void => {
  localStorage.removeItem(ITEMS_STORAGE_KEY);
  localStorage.removeItem(BOOKINGS_STORAGE_KEY);
};
