export type CategoryType =
  | 'all'
  | 'electronics'
  | 'cameras'
  | 'travel'
  | 'books'
  | 'kitchen'
  | 'tools'
  | 'outdoor';

export type ItemCondition = 'Like New' | 'Excellent' | 'Good' | 'Fair';

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
  description: string;
  images: string[];
  dailyPrice: number;
  weeklyDiscountPercent: number; // e.g. 15 for 15% off
  securityDeposit: number;
  replacementValue: number;
  condition: ItemCondition;
  location: string;
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
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  condition: string;
  onlyAvailable: boolean;
  sortBy: 'recommended' | 'price_low' | 'price_high' | 'rating' | 'popular';
}

export interface SupportTicket {
  id: string;
  role: 'receiver' | 'renter'; // receiver (borrower) vs renter (owner/lender)
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
