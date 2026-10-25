import { RentalItem, RentalBooking, BookingStatus, OwnerProfile } from '../types/rental';
import { SAMPLE_ITEMS, INITIAL_BOOKINGS } from '../data/sampleData';

const ITEMS_STORAGE_KEY = 'rentbuddy_items_v4';
const LEGACY_V3_KEY = 'rentbuddy_items_v3';
const LEGACY_V2_KEY = 'rentbuddy_items_v2';
const LEGACY_V1_KEY = 'rentbuddy_items_v1';
const LEGACY_ITEMS_STORAGE_KEY = 'rentloop_items_v1';
const BOOKINGS_STORAGE_KEY = 'rentbuddy_bookings_v3';
const LEGACY_BOOKINGS_V2_KEY = 'rentbuddy_bookings_v2';
const LEGACY_BOOKINGS_STORAGE_KEY = 'rentbuddy_bookings_v1';
const CURRENT_USER_STORAGE_KEY = 'rentbuddy_current_user_v1';

export const getStoredItems = (): RentalItem[] => {
  try {
    const raw = localStorage.getItem(ITEMS_STORAGE_KEY);
    if (raw) {
      const parsed: RentalItem[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure new demo items are present if user had an older partial cache
        const sampleIds = new Set(SAMPLE_ITEMS.map((s) => s.id));
        const customItems = parsed.filter((item) => !sampleIds.has(item.id));
        if (parsed.length < SAMPLE_ITEMS.length) {
          // Merge custom user items on top of updated sample catalog
          const merged = [...customItems, ...SAMPLE_ITEMS];
          saveStoredItems(merged);
          return merged;
        }
        return parsed;
      }
    }

    // Check v3 & legacy versions to migrate user-created items
    const legacyRaw = localStorage.getItem(LEGACY_V3_KEY) || localStorage.getItem(LEGACY_V2_KEY) || localStorage.getItem(LEGACY_V1_KEY) || localStorage.getItem(LEGACY_ITEMS_STORAGE_KEY);
    if (legacyRaw) {
      const legacyItems: RentalItem[] = JSON.parse(legacyRaw);
      const sampleIds = new Set(SAMPLE_ITEMS.map((s) => s.id));
      const customItems = legacyItems.filter((item) => !sampleIds.has(item.id));
      // Seamlessly merge any custom user-created items on top of updated sample catalog
      const merged = [...customItems, ...SAMPLE_ITEMS];
      saveStoredItems(merged);
      return merged;
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
    const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY) || localStorage.getItem(LEGACY_BOOKINGS_V2_KEY) || localStorage.getItem(LEGACY_BOOKINGS_STORAGE_KEY);
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
  const dailyPrice = Number(itemData.dailyPrice) || 100;
  const weeklyDiscountPercent = itemData.weeklyDiscountPercent ?? 15;
  const monthlyDiscountPercent = itemData.monthlyDiscountPercent ?? 25;
  const weeklyPrice = itemData.weeklyPrice ?? Math.round(dailyPrice * 7 * (1 - weeklyDiscountPercent / 100));
  const monthlyPrice = itemData.monthlyPrice ?? Math.round(dailyPrice * 30 * (1 - monthlyDiscountPercent / 100));

  const newItem: RentalItem = {
    ...itemData,
    dailyPrice,
    weeklyPrice,
    weeklyDiscountPercent,
    monthlyPrice,
    monthlyDiscountPercent,
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

  const relevantBookings = bookings.filter((b) => b.status !== 'rejected');
  const totalSavedDollars = relevantBookings.reduce(
    (acc, b) => acc + (b.savingsVsRetail > 0 ? b.savingsVsRetail : 0),
    0
  );

  const co2AvoidedKg = Math.round(relevantBookings.length * 12.8);
  const wasteDivertedKg = Math.round(relevantBookings.length * 4.6);

  const initialBenchmarkSavings = INITIAL_BOOKINGS.reduce((acc, b) => acc + (b.savingsVsRetail > 0 ? b.savingsVsRetail : 0), 0);

  return {
    totalSavedDollars: totalSavedDollars || initialBenchmarkSavings || 332886,
    co2AvoidedKg: co2AvoidedKg || 410,
    wasteDivertedKg: wasteDivertedKg || 140,
    activeListingsCount: items.length,
    activeRentalsCount: relevantBookings.length,
  };
};

export interface CurrentUser extends OwnerProfile {
  email: string;
}

export const DEFAULT_CURRENT_USER: CurrentUser = {
  id: 'owner-current-user',
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  rating: 5.0,
  reviewsCount: 1,
  joinedDate: 'October 2026',
  responseTime: 'Within an hour',
  verified: true,
  location: 'Bengaluru, KA',
};

export const getCurrentUser = (): CurrentUser => {
  try {
    const raw = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to read current user from storage', err);
  }
  return DEFAULT_CURRENT_USER;
};

export const saveCurrentUser = (user: CurrentUser): void => {
  try {
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
  } catch (err) {
    console.error('Failed to write current user to storage', err);
  }
};

export const resetStoreToDefaults = (): void => {
  localStorage.removeItem(ITEMS_STORAGE_KEY);
  localStorage.removeItem(LEGACY_V3_KEY);
  localStorage.removeItem(LEGACY_V2_KEY);
  localStorage.removeItem(LEGACY_V1_KEY);
  localStorage.removeItem(BOOKINGS_STORAGE_KEY);
  localStorage.removeItem(LEGACY_BOOKINGS_V2_KEY);
  localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
};
