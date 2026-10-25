import { RentalItem, RentalBooking } from '../types/rental';

export const SAMPLE_ITEMS: RentalItem[] = [
  {
    id: 'item-1',
    title: 'Sony Alpha A7 IV Mirrorless Camera + 24-70mm f/2.8 GM',
    category: 'cameras',
    description: 'Flagship 33MP full-frame hybrid camera equipped with Sony G Master 24-70mm f/2.8 lens. Perfect for high-end wedding shoots, commercial videography, travel photography, and 4K 60p 10-bit recording.',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 2499,
    weeklyDiscountPercent: 20,
    securityDeposit: 8000,
    replacementValue: 249000,
    condition: 'Like New',
    location: 'Bengaluru, KA (Koramangala / Indiranagar)',
    owner: {
      id: 'owner-1',
      name: 'Rohan Verma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 4.96,
      reviewsCount: 48,
      joinedDate: 'March 2023',
      responseTime: 'Within 15 mins',
      verified: true,
      location: 'Bengaluru, KA'
    },
    isAvailable: true,
    rating: 4.95,
    reviewCount: 38,
    featured: true,
    specs: [
      { label: 'Sensor', value: '33MP Full-Frame Exmor R CMOS' },
      { label: 'Video', value: '4K 60p 10-bit 4:2:2 All-Intra' },
      { label: 'Included Lens', value: 'FE 24-70mm f/2.8 GM' },
      { label: 'Accessories', value: '2x Batteries, 128GB V90 SD Card, Dual Charger, Pelican Case' }
    ],
    rules: [
      'Must keep in protective pelican case when transporting',
      'Sensor cleaning strictly handled by owner',
      'Return with batteries fully recharged'
    ],
    tags: ['Camera', 'Sony', '4K Video', 'Professional', 'Photography'],
    createdAt: '2026-01-10'
  },
  {
    id: 'item-2',
    title: 'DJI Mini 3 Pro Drone Fly More Combo (Sub-249g)',
    category: 'electronics',
    description: 'Ultra-lightweight, foldable mini drone with tri-directional obstacle sensing and 4K HDR true vertical video. Sub-249g weight means no complex DGCA drone registration required for recreational flying. Ideal for road trips, landscape captures, and reel creation.',
    images: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 1499,
    weeklyDiscountPercent: 25,
    securityDeposit: 5000,
    replacementValue: 78000,
    condition: 'Like New',
    location: 'Mumbai, MH (Bandra West / BKC)',
    owner: {
      id: 'owner-2',
      name: 'Ananya Sharma',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      rating: 4.98,
      reviewsCount: 72,
      joinedDate: 'Jan 2024',
      responseTime: 'Under 1 hour',
      verified: true,
      location: 'Mumbai, MH'
    },
    isAvailable: true,
    rating: 4.92,
    reviewCount: 29,
    featured: true,
    specs: [
      { label: 'Weight', value: '< 249 g' },
      { label: 'Max Flight Time', value: '34 mins per battery (3 included)' },
      { label: 'Obstacle Sensing', value: 'Tri-Directional (Forward, Backward, Downward)' },
      { label: 'Controller', value: 'DJI RC with built-in 5.5" FHD Display' }
    ],
    rules: [
      'Do not fly in precipitation or near high-security zones',
      'Comply with local airspace regulations',
      'Inspect propellers before each takeoff'
    ],
    tags: ['Drone', 'DJI', '4K', 'Aerial', 'Travel'],
    createdAt: '2026-02-14'
  },
  {
    id: 'item-3',
    title: 'Patagonia Black Hole Wheeled Duffel 100L Weather-Resistant',
    category: 'travel',
    description: 'Heavy-duty 100-liter wheeled duffel built from 100% recycled ripstop polyester with TPU laminate. Rugged oversized wheels roll smoothly through gravel, airports, and cobblestone streets. Perfect for 2-3 week adventures, Ladakh trips, or Himalayan trekking gear.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 499,
    weeklyDiscountPercent: 30,
    securityDeposit: 2000,
    replacementValue: 28000,
    condition: 'Excellent',
    location: 'Delhi NCR (Hauz Khas / Gurgaon)',
    owner: {
      id: 'owner-3',
      name: 'Kabir Mehta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 4.88,
      reviewsCount: 31,
      joinedDate: 'May 2023',
      responseTime: 'Under 30 mins',
      verified: true,
      location: 'Delhi NCR'
    },
    isAvailable: true,
    rating: 4.89,
    reviewCount: 22,
    featured: false,
    specs: [
      { label: 'Capacity', value: '100 Liters' },
      { label: 'Material', value: '14-oz 900-denier 100% postconsumer recycled polyester' },
      { label: 'Weight', value: '4.2 kg' },
      { label: 'Features', value: 'Reinforced haul handles, internal compression straps' }
    ],
    rules: [
      'Wipe down exterior with damp cloth before return',
      'No transport of unsealed liquids'
    ],
    tags: ['Luggage', 'Patagonia', 'Travel', 'Waterproof', 'Duffel'],
    createdAt: '2026-02-01'
  },
  {
    id: 'item-4',
    title: 'Breville the Barista Touch Automated Espresso Machine',
    category: 'kitchen',
    description: 'Transform your weekend party or pop-up event into an artisan cafe. Features automated touchscreen menu with pre-programmed coffee favorites, ThermoJet 3-second heating, integrated conical burr grinder, and automatic microfoam milk texturing.',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 1299,
    weeklyDiscountPercent: 25,
    securityDeposit: 5000,
    replacementValue: 85000,
    condition: 'Like New',
    location: 'Pune, MH (Koregaon Park / Kalyani Nagar)',
    owner: {
      id: 'owner-4',
      name: 'Samantha D’Souza',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      rating: 5.0,
      reviewsCount: 65,
      joinedDate: 'August 2023',
      responseTime: 'Instant reply',
      verified: true,
      location: 'Pune, MH'
    },
    isAvailable: true,
    rating: 4.97,
    reviewCount: 44,
    featured: true,
    specs: [
      { label: 'Display', value: 'Color Touch Screen with customizable drinks' },
      { label: 'Heat-up Time', value: '3 Seconds (ThermoJet)' },
      { label: 'Portafilter', value: '54mm Stainless Steel with dual-wall baskets' },
      { label: 'Included Extras', value: 'Precision tamper, milk pitcher, knock box, cleaning kit' }
    ],
    rules: [
      'Use only filtered or RO water in the reservoir',
      'Run automatic steam wand purge after each milk drink',
      'No flavored or caramelized oily coffee beans in the grinder'
    ],
    tags: ['Coffee', 'Espresso', 'Kitchen', 'Breville', 'Hosting'],
    createdAt: '2026-01-28'
  },
  {
    id: 'item-5',
    title: 'DeWalt 20V MAX Cordless Drill + Impact Driver Combo Kit',
    category: 'tools',
    description: 'Industrial-grade brushless drilling and fastening kit. Includes compact drill/driver, 1/4" impact driver, two 20V 2.0Ah lithium-ion batteries, charger, magnetic bit set, and contractor bag. Essential for moving, furniture assembly, and DIY home improvements.',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 399,
    weeklyDiscountPercent: 20,
    securityDeposit: 1500,
    replacementValue: 16500,
    condition: 'Excellent',
    location: 'Hyderabad, TS (Hitec City / Gachibowli)',
    owner: {
      id: 'owner-5',
      name: 'Vikram Reddy',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 4.91,
      reviewsCount: 39,
      joinedDate: 'November 2023',
      responseTime: 'Under 20 mins',
      verified: true,
      location: 'Hyderabad, TS'
    },
    isAvailable: true,
    rating: 4.86,
    reviewCount: 19,
    featured: false,
    specs: [
      { label: 'Motor', value: 'High-Efficiency Brushless' },
      { label: 'Max Torque', value: '1,500 in-lbs (Impact Driver)' },
      { label: 'Batteries', value: '2x 20V MAX Compact Lithium-Ion' },
      { label: 'Weight', value: '1.3 kg ergonomic body' }
    ],
    rules: [
      'Wear safety glasses during operation (included)',
      'Keep batteries out of extreme heat or rain',
      'Return all drill driver bits in their magnetic case'
    ],
    tags: ['Tools', 'DeWalt', 'DIY', 'Drill', 'Home Improvement'],
    createdAt: '2026-02-18'
  },
  {
    id: 'item-6',
    title: 'Introduction to Algorithms 4th Edition (CLRS) Hardcover',
    category: 'books',
    description: 'The definitive bible of computer algorithms by Cormen, Leiserson, Rivest, and Stein. Rent for your semester algorithms class or technical interview preparation without spending ₹4,500 on a book you will only need for a few weeks.',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 99,
    weeklyDiscountPercent: 40,
    securityDeposit: 500,
    replacementValue: 4500,
    condition: 'Like New',
    location: 'Chennai, TN (IIT Madras / Adyar)',
    owner: {
      id: 'owner-6',
      name: 'Aishwarya Raman',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      rating: 4.99,
      reviewsCount: 84,
      joinedDate: 'Sept 2023',
      responseTime: 'Under 15 mins',
      verified: true,
      location: 'Chennai, TN'
    },
    isAvailable: true,
    rating: 4.98,
    reviewCount: 52,
    featured: true,
    specs: [
      { label: 'Edition', value: '4th Edition (Latest Hardcover)' },
      { label: 'Pages', value: '1,312 pages' },
      { label: 'Condition', value: 'Clean, no highlighter marks, pristine spine' },
      { label: 'Publisher', value: 'MIT Press / PHI' }
    ],
    rules: [
      'No pen, marker, or permanent highlighting in pages',
      'Keep away from open beverages and liquid spills',
      'Return in book sleeve provided'
    ],
    tags: ['Books', 'CS', 'Algorithms', 'Textbook', 'Students'],
    createdAt: '2026-01-05'
  },
  {
    id: 'item-7',
    title: 'The North Face Wawona 6-Person Camping Tent + Rainfly',
    category: 'outdoor',
    description: 'Gigantic, high-ceiling 6-person car camping tent with massive vestibule that doubles as a covered front porch. Color-coded poles make setup a breeze in under 10 minutes. Full standing height. Tested against heavy rain and mountain winds.',
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 899,
    weeklyDiscountPercent: 20,
    securityDeposit: 3000,
    replacementValue: 38000,
    condition: 'Excellent',
    location: 'Dehradun / Rishikesh, UK (Tapovan)',
    owner: {
      id: 'owner-7',
      name: 'Aditya Rawat',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      rating: 4.94,
      reviewsCount: 41,
      joinedDate: 'April 2023',
      responseTime: 'Under 1 hour',
      verified: true,
      location: 'Rishikesh, UK'
    },
    isAvailable: true,
    rating: 4.93,
    reviewCount: 31,
    featured: true,
    specs: [
      { label: 'Capacity', value: '6 Person + Gear Vestibule' },
      { label: 'Peak Height', value: '76 inches (full standing height)' },
      { label: 'Floor Area', value: '86 sq ft' },
      { label: 'Includes', value: 'Full rainfly, aluminum stakes, guy lines, duffel bag' }
    ],
    rules: [
      'Never pack tent away while damp (air dry before returning)',
      'Strictly no campfires or open flames inside vestibule',
      'Shake out all dirt before folding'
    ],
    tags: ['Camping', 'Tent', 'Outdoor', 'Family', 'Hiking'],
    createdAt: '2026-02-10'
  },
  {
    id: 'item-8',
    title: 'Apple iPad Pro 12.9" M2 (Wi-Fi, 256GB) with Apple Pencil 2',
    category: 'electronics',
    description: 'Liquid Retina XDR display with ProMotion 120Hz and incredible M2 chip performance. Comes equipped with Apple Pencil 2 for precision sketch/note-taking and a Smart Keyboard Folio. Superb for student exams, design projects, or temporary remote gigs.',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 999,
    weeklyDiscountPercent: 25,
    securityDeposit: 6000,
    replacementValue: 95000,
    condition: 'Like New',
    location: 'Bengaluru, KA (HSR Layout / Bellandur)',
    owner: {
      id: 'owner-8',
      name: 'Maya Patel',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      rating: 4.97,
      reviewsCount: 56,
      joinedDate: 'June 2023',
      responseTime: 'Under 15 mins',
      verified: true,
      location: 'Bengaluru, KA'
    },
    isAvailable: true,
    rating: 4.96,
    reviewCount: 37,
    featured: false,
    specs: [
      { label: 'Processor', value: 'Apple M2 8-core CPU / 10-core GPU' },
      { label: 'Display', value: '12.9-inch Liquid Retina XDR Mini-LED' },
      { label: 'Accessories', value: 'Apple Pencil 2, Smart Keyboard Case, 30W USB-C Charger' },
      { label: 'Security', value: 'Factory reset between rentals for complete privacy' }
    ],
    rules: [
      'Keep in magnetic folio case at all times',
      'Do not submerge or expose to water',
      'Sign out of Apple ID prior to return'
    ],
    tags: ['iPad', 'Apple', 'Design', 'Student', 'Tablet'],
    createdAt: '2026-02-20'
  }
];

export const INITIAL_BOOKINGS: RentalBooking[] = [
  {
    id: 'booking-101',
    itemId: 'item-1',
    itemTitle: 'Sony Alpha A7 IV Mirrorless Camera + 24-70mm f/2.8 GM',
    itemImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    itemCategory: 'cameras',
    renterName: 'Aarav Gupta',
    renterEmail: 'aarav.gupta@example.com',
    ownerId: 'owner-1',
    startDate: '2026-10-28',
    endDate: '2026-10-31',
    totalDays: 3,
    dailyRate: 2499,
    baseTotal: 7497,
    discountAmount: 749.7,
    serviceFee: 337.35,
    securityDeposit: 8000,
    totalPayable: 15084.65,
    savingsVsRetail: 241503,
    status: 'approved',
    pickupType: 'local_pickup',
    renterMessage: 'Hi Rohan! Renting this for a pre-wedding shoot in Coorg. Will return in pristine condition.',
    createdAt: '2026-10-24'
  },
  {
    id: 'booking-102',
    itemId: 'item-7',
    itemTitle: 'The North Face Wawona 6-Person Camping Tent + Rainfly',
    itemImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80',
    itemCategory: 'outdoor',
    renterName: 'Neha Joshi',
    renterEmail: 'neha.joshi@example.com',
    ownerId: 'owner-7',
    startDate: '2026-11-05',
    endDate: '2026-11-08',
    totalDays: 3,
    dailyRate: 899,
    baseTotal: 2697,
    discountAmount: 269.7,
    serviceFee: 121.35,
    securityDeposit: 3000,
    totalPayable: 5548.65,
    savingsVsRetail: 35303,
    status: 'pending',
    pickupType: 'delivery',
    renterMessage: 'Taking our college group trekking to Chopta Tungnath for the weekend!',
    createdAt: '2026-10-25'
  }
];
