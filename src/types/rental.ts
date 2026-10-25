export type CategoryType =
  | 'all'
  | 'clothing'
  | 'shoes'
  | 'sports-fitness'
  | 'travel-bags'
  | 'electronics'
  | 'books'
  | 'home-kitchen'
  | 'accessories'
  | 'beauty-personal-care'
  | 'tools'
  | 'toys-games'
  | 'party-events'
  | 'baby-kids'
  | 'musical-instruments'
  | 'camping-outdoors'
  | 'other'
  // Backward compatibility aliases:
  | 'clothes-fashion'
  | 'travel-luggage'
  | 'cameras-creation'
  | 'electronics-gadgets'
  | 'kitchen-appliances'
  | 'home-furniture'
  | 'books-education'
  | 'tools-diy'
  | 'outdoor-garden'
  | 'party-occasions'
  | 'music-entertainment'
  | 'daily-essentials'
  | 'health-wellness'
  | 'pet-accessories'
  | 'cameras'
  | 'travel'
  | 'kitchen'
  | 'outdoor'
  | (string & {});

export type ItemCondition = 'New' | 'Like New' | 'Excellent' | 'Good' | 'Fair';

export interface OwnerProfile {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  joinedDate: string;
  responseTime: string;
  verified: boolean;
  location: string;
}

export interface RentalItem {
  id: string;
  title: string;
  category: CategoryType;
  subcategory?: string;
  description: string;
  images: string[];
  dailyPrice: number;
  weeklyPrice?: number;
  weeklyDiscountPercent: number; // e.g. 20 for 20% off
  securityDeposit: number;
  replacementValue: number;
  condition: ItemCondition;
  location: string;
  city?: string;
  pickupLocation?: string;
  availableQuantity?: number;
  availableFrom?: string; // YYYY-MM-DD
  availableUntil?: string; // YYYY-MM-DD
  deliveryOptions?: ('local_pickup' | 'home_delivery' | 'courier' | string)[];
  ownerContactPreference?: 'in_app' | 'phone' | 'email';
  ownerContact?: {
    phone?: string;
    email?: string;
    preference?: string;
  };
  termsAndInstructions?: string[];
  safetyNotice?: string;
  hygieneCleaned?: boolean;
  owner: OwnerProfile;
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  specs: { label: string; value: string }[];
  rules: string[];
  tags: string[];
  createdAt: string;
}

export type BookingStatus =
  | 'pending'
  | 'approved'
  | 'active'
  | 'completed'
  | 'rejected';

export interface RentalBooking {
  id: string;
  itemId: string;
  itemTitle: string;
  itemImage: string;
  itemCategory: CategoryType;
  renterName: string;
  renterEmail: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  dailyRate: number;
  baseTotal: number;
  discountAmount: number;
  serviceFee: number;
  securityDeposit: number;
  totalPayable: number;
  savingsVsRetail: number;
  status: BookingStatus;
  pickupType: 'local_pickup' | 'delivery';
  renterMessage?: string;
  createdAt: string;
}

export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
  apiKey?: string;
  isCustomConfigured: boolean;
}

export interface FilterOptions {
  category: CategoryType;
  subcategory?: string;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  condition: string;
  city?: string;
  availableFrom?: string;
  availableUntil?: string;
  onlyAvailable: boolean;
  sortBy: 'recommended' | 'price_low' | 'price_high' | 'rating' | 'popular' | 'recently_added';
}

export interface SupportTicket {
  id: string;
  role: 'receiver' | 'renter';
  category: string;
  subject: string;
  message: string;
  bookingId?: string;
  userEmail: string;
  userName: string;
  urgency: 'normal' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
}
