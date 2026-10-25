import { RentalItem, RentalBooking } from '../types/rental';

export const SAMPLE_ITEMS: RentalItem[] = [
  // --- Existing Items (Enriched with subcategories and extra metadata) ---
  {
    id: 'item-1',
    title: 'Sony Alpha A7 IV Mirrorless Camera + 24-70mm f/2.8 GM',
    category: 'cameras-creation',
    subcategory: 'Mirrorless Cameras',
    description: 'Flagship 33MP full-frame hybrid camera equipped with Sony G Master 24-70mm f/2.8 lens. Perfect for high-end wedding shoots, commercial videography, travel photography, and 4K 60p 10-bit recording.',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 2499,
    weeklyPrice: 13999,
    weeklyDiscountPercent: 20,
    securityDeposit: 8000,
    replacementValue: 249000,
    condition: 'Like New',
    location: 'Bengaluru, KA (Koramangala / Indiranagar)',
    city: 'Bengaluru',
    pickupLocation: 'Koramangala 4th Block, near Sony World Signal',
    availableQuantity: 2,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    ownerContactPreference: 'in_app',
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
    tags: ['Camera', 'Sony', '4K Video', 'Professional', 'Photography', 'Mirrorless'],
    createdAt: '2026-01-10'
  },
  {
    id: 'item-2',
    title: 'DJI Mini 3 Pro Drone Fly More Combo (Sub-249g)',
    category: 'electronics-gadgets',
    subcategory: 'Drones',
    description: 'Ultra-lightweight, foldable mini drone with tri-directional obstacle sensing and 4K HDR true vertical video. Sub-249g weight means no complex DGCA drone registration required for recreational flying. Ideal for road trips, landscape captures, and reel creation.',
    images: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 1499,
    weeklyPrice: 7870,
    weeklyDiscountPercent: 25,
    securityDeposit: 5000,
    replacementValue: 78000,
    condition: 'Like New',
    location: 'Mumbai, MH (Bandra West / BKC)',
    city: 'Mumbai',
    pickupLocation: 'Hill Road, Bandra West',
    availableQuantity: 1,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    ownerContactPreference: 'in_app',
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
    tags: ['Drone', 'DJI', '4K', 'Aerial', 'Travel', 'Video'],
    createdAt: '2026-02-14'
  },
  {
    id: 'item-3',
    title: 'Patagonia Black Hole Wheeled Duffel 100L Weather-Resistant',
    category: 'travel-luggage',
    subcategory: 'Duffel Bags',
    description: 'Heavy-duty 100-liter wheeled duffel built from 100% recycled ripstop polyester with TPU laminate. Rugged oversized wheels roll smoothly through gravel, airports, and cobblestone streets. Perfect for 2-3 week adventures, Ladakh trips, or Himalayan trekking gear.',
    images: [
      'https://res.cloudinary.com/dqczk3bz/image/upload/samples/ecommerce/leather-bag-gray.jpg',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 349,
    weeklyPrice: 1710,
    weeklyDiscountPercent: 30,
    securityDeposit: 1500,
    replacementValue: 28000,
    condition: 'Excellent',
    location: 'Bengaluru, KA (Indiranagar / Domlur)',
    city: 'Bengaluru',
    pickupLocation: '100ft Road, Indiranagar',
    availableQuantity: 3,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-3',
      name: 'Karan Mehra',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 4.89,
      reviewsCount: 31,
      joinedDate: 'August 2023',
      responseTime: 'Within 30 mins',
      verified: true,
      location: 'Bengaluru, KA'
    },
    isAvailable: true,
    rating: 4.88,
    reviewCount: 22,
    featured: false,
    specs: [
      { label: 'Volume', value: '100 Liters' },
      { label: 'Material', value: '100% Recycled Ripstop with TPU Film' },
      { label: 'Dimensions', value: '83 x 40 x 35 cm' },
      { label: 'Weight Empty', value: '4.2 kg' }
    ],
    rules: [
      'Wipe down exterior with damp cloth before return',
      'No hazardous or leaking liquids inside'
    ],
    tags: ['Luggage', 'Travel', 'Patagonia', 'Duffel', 'Trekking'],
    createdAt: '2026-03-01'
  },
  {
    id: 'item-4',
    title: 'DeWalt 20V MAX Cordless Combi Drill Kit + 2 Batteries',
    category: 'tools-diy',
    subcategory: 'Power Drills',
    description: 'High-performance cordless brushless hammer drill driver with 2x 4.0Ah XR batteries, rapid charger, and 30-piece titanium drill and masonry bit set. Perfect for moving into new apartments, wall mountings, curtain rods, and DIY woodworking projects.',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 299,
    weeklyPrice: 1465,
    weeklyDiscountPercent: 30,
    securityDeposit: 1200,
    replacementValue: 14500,
    condition: 'Excellent',
    location: 'Delhi NCR (South Extension / Hauz Khas)',
    city: 'Delhi NCR',
    pickupLocation: 'Hauz Khas Enclave, New Delhi',
    availableQuantity: 2,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-4',
      name: 'Vikas Taneja',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 4.94,
      reviewsCount: 56,
      joinedDate: 'May 2023',
      responseTime: 'Instant reply',
      verified: true,
      location: 'Delhi, DL'
    },
    isAvailable: true,
    rating: 4.95,
    reviewCount: 44,
    featured: false,
    specs: [
      { label: 'Motor', value: 'Brushless 20V Max' },
      { label: 'Torque', value: '65 Nm, 15 clutch settings' },
      { label: 'Batteries', value: '2x 4.0Ah Li-ion + Fast Charger' },
      { label: 'Bits Included', value: '30-pc wood, metal & concrete bit set' }
    ],
    rules: [
      'Safety goggles (provided) must be worn during operation',
      'Check for hidden electrical wiring before drilling concrete walls',
      'Return all bits back into organizer slots'
    ],
    tags: ['Tools', 'DIY', 'Drill', 'DeWalt', 'Home Improvement'],
    createdAt: '2026-03-12'
  },
  {
    id: 'item-5',
    title: 'Breville Barista Express Espresso Machine with Integrated Grinder',
    category: 'kitchen-appliances',
    subcategory: 'Coffee Machines',
    description: 'Iconic all-in-one bean-to-cup espresso maker. Features integrated conical burr grinder, 15-bar Italian pump, PID temperature control, and microfoam steam wand for barista-quality latte art at weekend parties or special brunch hosting.',
    images: [
      'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 699,
    weeklyPrice: 3914,
    weeklyDiscountPercent: 20,
    securityDeposit: 3500,
    replacementValue: 65000,
    condition: 'Like New',
    location: 'Bengaluru, KA (HSR Layout / Bellandur)',
    city: 'Bengaluru',
    pickupLocation: 'Sector 2, HSR Layout',
    availableQuantity: 1,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup'],
    owner: {
      id: 'owner-5',
      name: 'Priya Nambiar',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      rating: 4.99,
      reviewsCount: 64,
      joinedDate: 'December 2023',
      responseTime: 'Within 20 mins',
      verified: true,
      location: 'Bengaluru, KA'
    },
    isAvailable: true,
    rating: 4.97,
    reviewCount: 36,
    featured: true,
    specs: [
      { label: 'Pump Pressure', value: '15 Bar Italian Pump' },
      { label: 'Heating System', value: '1600W Thermocoil with PID Control' },
      { label: 'Water Tank', value: '2.0 Liters Removable' },
      { label: 'Accessories', value: '54mm Portafilter, Tamper, Milk Pitcher, Razor tool' }
    ],
    rules: [
      'Only use filtered or RO drinking water in the reservoir',
      'Purge and wipe steam wand immediately after frothing milk',
      'Do not wash portafilter in dishwasher'
    ],
    tags: ['Kitchen', 'Coffee', 'Espresso', 'Hosting', 'Appliances'],
    createdAt: '2026-03-18'
  },
  {
    id: 'item-6',
    title: 'MSR Hubba Hubba NX 2-Person Lightweight Backpacking Tent',
    category: 'outdoor-garden',
    subcategory: 'Camping Equipment',
    description: 'Legendary freestanding ultralight 3-season backpacking tent. Weighs only 1.72kg packed, features StayDry doors with built-in rain gutters and optimized symmetrical geometry for storm stability in Himachal or Western Ghats monsoon treks.',
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 399,
    weeklyPrice: 1955,
    weeklyDiscountPercent: 30,
    securityDeposit: 2000,
    replacementValue: 42000,
    condition: 'Like New',
    location: 'Pune, MH (Kothrud / Baner)',
    city: 'Pune',
    pickupLocation: 'Near Cummins College, Karve Nagar',
    availableQuantity: 2,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-6',
      name: 'Aditya Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      rating: 4.91,
      reviewsCount: 28,
      joinedDate: 'February 2024',
      responseTime: 'Under 1 hour',
      verified: true,
      location: 'Pune, MH'
    },
    isAvailable: true,
    rating: 4.89,
    reviewCount: 19,
    featured: false,
    specs: [
      { label: 'Capacity', value: '2 Persons' },
      { label: 'Floor Dimensions', value: '213 x 127 cm (29 sq. ft.)' },
      { label: 'Packed Weight', value: '1.72 kg' },
      { label: 'Rainfly Fabric', value: '20D ripstop nylon 1200mm Durashield' }
    ],
    rules: [
      'Never pack or store damp - air dry before placing back in stuff sack',
      'No open flames or cooking stoves inside tent vestibule',
      'Always use ground footprint tarp (included)'
    ],
    tags: ['Outdoor', 'Camping', 'Tent', 'Trekking', 'Lightweight'],
    createdAt: '2026-03-22'
  },
  {
    id: 'item-7',
    title: 'HC Verma Concepts of Physics Vol 1 & 2 + Irodov Combo Set',
    category: 'books-education',
    subcategory: 'JEE & NEET Books',
    description: 'Pristine, unmarked copies of HC Verma Concepts of Physics Vol 1 & 2 plus IE Irodov Problems in General Physics. Perfect for intensive JEE Advanced revision sprints or crash course prep without purchasing costly physical copies.',
    images: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 49,
    weeklyPrice: 205,
    weeklyDiscountPercent: 40,
    securityDeposit: 300,
    replacementValue: 2400,
    condition: 'Like New',
    location: 'Hyderabad, TS (Gachibowli / Madhapur)',
    city: 'Hyderabad',
    pickupLocation: 'Near IIIT Hyderabad Main Gate',
    availableQuantity: 4,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-7',
      name: 'Sneha Reddy',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 4.97,
      reviewsCount: 39,
      joinedDate: 'November 2023',
      responseTime: 'Within 10 mins',
      verified: true,
      location: 'Hyderabad, TS'
    },
    isAvailable: true,
    rating: 4.94,
    reviewCount: 31,
    featured: false,
    specs: [
      { label: 'Subject', value: 'Physics (JEE Advanced / NEET)' },
      { label: 'Edition', value: 'Latest Revised Reprint' },
      { label: 'Condition Details', value: 'Zero pencil/pen markings on problem pages' },
      { label: 'Includes', value: 'Vol 1, Vol 2, and IE Irodov Solution companion' }
    ],
    rules: [
      'Strictly no ballpoint pen highlighting or annotations on pages',
      'Keep away from food and liquids during study sessions'
    ],
    tags: ['Books', 'Education', 'Physics', 'JEE', 'Textbook'],
    createdAt: '2026-03-25'
  },
  {
    id: 'item-8',
    title: 'Apple iPad Pro 12.9" M2 (128GB Wi-Fi) + Apple Pencil 2',
    category: 'electronics-gadgets',
    subcategory: 'Tablets & iPads',
    description: 'Liquid Retina XDR mini-LED display with ProMotion 120Hz and M2 processor. Includes Apple Pencil 2 and Magnetic Smart Folio. Ideal for digital art exhibitions, client presentations, UI/UX prototyping, or animation render testing.',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 899,
    weeklyPrice: 4782,
    weeklyDiscountPercent: 24,
    securityDeposit: 6000,
    replacementValue: 119000,
    condition: 'Like New',
    location: 'Bengaluru, KA (Whitefield / Marathahalli)',
    city: 'Bengaluru',
    pickupLocation: 'ITPB Road, Whitefield',
    availableQuantity: 1,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-8',
      name: 'Varun Joshi',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      rating: 4.96,
      reviewsCount: 42,
      joinedDate: 'January 2024',
      responseTime: 'Within 20 mins',
      verified: true,
      location: 'Bengaluru, KA'
    },
    isAvailable: true,
    rating: 4.93,
    reviewCount: 26,
    featured: true,
    specs: [
      { label: 'Chip', value: 'Apple M2 (8-core CPU, 10-core GPU)' },
      { label: 'Display', value: '12.9" Liquid Retina XDR (1600 nits peak)' },
      { label: 'Included Stylus', value: 'Apple Pencil (2nd Gen) with wireless charging' },
      { label: 'Security', value: 'Face ID, completely factory reset upon handover' }
    ],
    rules: [
      'Sign out of personal Apple ID before returning device',
      'Keep magnetic case attached when in transit',
      'Return with 20W USB-C fast charger and braided cable'
    ],
    tags: ['Electronics', 'Apple', 'iPad', 'Design', 'Tablet'],
    createdAt: '2026-03-28'
  },

  // --- 25 Specific Demo Products required by Prompt ---

  // 1. Cricket bat
  {
    id: 'item-cricket-bat',
    title: 'SS Master 5000 English Willow Cricket Bat (Grade 1 Short Handle)',
    category: 'sports-fitness',
    subcategory: 'Cricket Equipment',
    description: 'Top-grade hand-crafted English Willow cricket bat with 8-10 straight clean grains, thick contoured edges, and exceptional balance. Knocked-in and match-ready for weekend tournaments and corporate cricket leagues.',
    images: [
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 349,
    weeklyPrice: 1710,
    weeklyDiscountPercent: 30,
    securityDeposit: 1500,
    replacementValue: 18500,
    condition: 'Like New',
    location: 'Bengaluru, KA (Koramangala)',
    city: 'Bengaluru',
    pickupLocation: 'Near Koramangala Club, 6th Block',
    availableQuantity: 2,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-sports-1',
      name: 'Ashwin Kumar',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 4.95,
      reviewsCount: 34,
      joinedDate: 'Jan 2024',
      responseTime: 'Under 15 mins',
      verified: true,
      location: 'Bengaluru, KA'
    },
    isAvailable: true,
    rating: 4.96,
    reviewCount: 24,
    featured: true,
    specs: [
      { label: 'Willow', value: 'Grade 1 English Willow' },
      { label: 'Weight', value: '1180 grams' },
      { label: 'Handle', value: '9-piece cane handle with octopus grip' },
      { label: 'Protection', value: 'Toe guard and scuff sheet applied' }
    ],
    rules: [
      'Use strictly with leather cricket balls, no heavy tape balls',
      'Store in padded bat cover provided'
    ],
    tags: ['Cricket', 'Sports', 'Bat', 'English Willow', 'Tournament'],
    createdAt: '2026-04-01'
  },

  // 2. Football
  {
    id: 'item-football',
    title: 'Adidas Pro Match Official Match Football (FIFA Quality Pro, Size 5)',
    category: 'sports-fitness',
    subcategory: 'Football Equipment',
    description: 'Official match ball featuring thermally bonded seamless surface technology for predictable trajectory, enhanced touch, and minimal water uptake. Ideal for amateur club matches and turf tournaments.',
    images: [
      'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 149,
    weeklyPrice: 730,
    weeklyDiscountPercent: 30,
    securityDeposit: 500,
    replacementValue: 8999,
    condition: 'Excellent',
    location: 'Mumbai, MH (Andheri West)',
    city: 'Mumbai',
    pickupLocation: 'Near Lokhandwala Complex',
    availableQuantity: 3,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup'],
    owner: {
      id: 'owner-football',
      name: 'Sameer Sheikh',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      rating: 4.88,
      reviewsCount: 19,
      joinedDate: 'Feb 2024',
      responseTime: 'Within 30 mins',
      verified: true,
      location: 'Mumbai, MH'
    },
    isAvailable: true,
    rating: 4.9,
    reviewCount: 15,
    featured: false,
    specs: [
      { label: 'Size', value: 'Standard Size 5' },
      { label: 'Standard', value: 'FIFA Quality Pro Certified' },
      { label: 'Bladder', value: 'Butyl bladder for optimal air retention' },
      { label: 'Accessories', value: 'Hand pump and pressure gauge included' }
    ],
    rules: [
      'Keep inflated between 0.8 to 1.0 bar',
      'Wipe down after muddy turf sessions'
    ],
    tags: ['Football', 'Soccer', 'Adidas', 'Match Ball', 'Sports'],
    createdAt: '2026-04-02'
  },

  // 3. Badminton racket
  {
    id: 'item-badminton-racket',
    title: 'Yonex Astrox 88D Pro Graphite Badminton Racket (Strung at 28 lbs)',
    category: 'sports-fitness',
    subcategory: 'Badminton Rackets',
    description: 'High-end head-heavy offensive racket favoured by doubles rear-court smashers. Strung with Yonex BG80 at 28 lbs tension with Super Grap overgrip. Delivers devastating smashes and steep angles.',
    images: [
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 249,
    weeklyPrice: 1220,
    weeklyDiscountPercent: 30,
    securityDeposit: 1000,
    replacementValue: 14500,
    condition: 'Like New',
    location: 'Hyderabad, TS (Kondapur / Madhapur)',
    city: 'Hyderabad',
    pickupLocation: 'Near Kondapur RTO office',
    availableQuantity: 2,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-badminton',
      name: 'Deepak Varma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 4.97,
      reviewsCount: 45,
      joinedDate: 'Jan 2024',
      responseTime: 'Under 15 mins',
      verified: true,
      location: 'Hyderabad, TS'
    },
    isAvailable: true,
    rating: 4.96,
    reviewCount: 38,
    featured: true,
    specs: [
      { label: 'Weight & Grip', value: '4U (83g) / G5' },
      { label: 'Flex', value: 'Stiff' },
      { label: 'String & Tension', value: 'Yonex BG80 @ 28 lbs' },
      { label: 'Case', value: 'Full Astrox thermal cover included' }
    ],
    rules: [
      'Use strictly on indoor wooden or synthetic courts',
      'Avoid racket clashes during intense doubles rallies'
    ],
    tags: ['Badminton', 'Yonex', 'Astrox', 'Smash', 'Sports'],
    createdAt: '2026-04-03'
  },

  // 4. Gym dumbbells
  {
    id: 'item-dumbbells',
    title: 'Bowflex SelectTech 552 Adjustable Dumbbells Pair (2.5kg to 24kg)',
    category: 'sports-fitness',
    subcategory: 'Dumbbells & Weights',
    description: 'Space-saving adjustable dumbbell pair replacing 15 sets of weights. Turn the dial to easily adjust resistance from 2.5kg all the way up to 24kg per dumbbell. Ideal for home workout challenges and transformation bootcamps.',
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 399,
    weeklyPrice: 1955,
    weeklyDiscountPercent: 30,
    securityDeposit: 3000,
    replacementValue: 36000,
    condition: 'Like New',
    location: 'Bengaluru, KA (Indiranagar)',
    city: 'Bengaluru',
    pickupLocation: '12th Main, Indiranagar',
    availableQuantity: 1,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-fitness',
      name: 'Ritu Sen',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      rating: 4.93,
      reviewsCount: 22,
      joinedDate: 'Jan 2024',
      responseTime: 'Under 1 hour',
      verified: true,
      location: 'Bengaluru, KA'
    },
    isAvailable: true,
    rating: 4.95,
    reviewCount: 18,
    featured: false,
    specs: [
      { label: 'Weight Range', value: '2.5 to 24 kg per dumbbell' },
      { label: 'Settings', value: '15 incremental weight settings' },
      { label: 'Base Trays', value: 'Durable composite storage docks included' }
    ],
    rules: [
      'Do not drop on concrete floor; set down gently into base dock',
      'Ensure dial clicks completely into notch before lifting'
    ],
    tags: ['Fitness', 'Gym', 'Weights', 'Dumbbells', 'Home Workout'],
    createdAt: '2026-04-04'
  },

  // 5. Travel trolley bag
  {
    id: 'item-travel-trolley',
    title: 'Samsonite EVOA Polycarbonate Hardside Spinner 75cm Large Suitcase',
    category: 'travel-luggage',
    subcategory: 'Suitcases & Trolleys',
    description: 'Premium brushed-silver hardside luggage with Aero-Trac suspension wheel system for vibration reduction, TSA combination lock, and anti-theft zipper. 108-liter capacity ideal for international trips and long vacations.',
    images: [
      'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 299,
    weeklyPrice: 1465,
    weeklyDiscountPercent: 30,
    securityDeposit: 1500,
    replacementValue: 24000,
    condition: 'Like New',
    location: 'Delhi NCR (South Extension)',
    city: 'Delhi NCR',
    pickupLocation: 'South Extension Part 2, New Delhi',
    availableQuantity: 2,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-luggage-1',
      name: 'Mohit Kapoor',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      rating: 4.91,
      reviewsCount: 30,
      joinedDate: 'Jan 2024',
      responseTime: 'Within 20 mins',
      verified: true,
      location: 'Delhi NCR'
    },
    isAvailable: true,
    rating: 4.92,
    reviewCount: 20,
    featured: true,
    specs: [
      { label: 'Capacity', value: '108 Liters' },
      { label: 'Material', value: '100% Virgin Polycarbonate' },
      { label: 'Lock', value: 'TSA 3-dial recessed combination lock' },
      { label: 'Wheels', value: 'Aero-Trac 360 dual spinner wheels' }
    ],
    rules: [
      'Return with default code 0-0-0',
      'Do not check in liquids without sealed waterproof bags'
    ],
    tags: ['Travel', 'Luggage', 'Samsonite', 'Suitcase', 'Hardside'],
    createdAt: '2026-04-05'
  },

  // 6. Hiking backpack
  {
    id: 'item-hiking-backpack',
    title: 'Osprey Atmos AG 65L Ergonomic Anti-Gravity Trekking Backpack',
    category: 'travel-luggage',
    subcategory: 'Hiking Backpacks',
    description: 'Award-winning expedition pack featuring Anti-Gravity 3D suspended mesh backsystem. Effortlessly balances up to 22kg loads for Himalayan trails like Kedarkantha, Roopkund, or Hampta Pass.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 349,
    weeklyPrice: 1710,
    weeklyDiscountPercent: 30,
    securityDeposit: 1500,
    replacementValue: 27000,
    condition: 'Like New',
    location: 'Pune, MH (Baner)',
    city: 'Pune',
    pickupLocation: 'Baner Road, near Westend Mall',
    availableQuantity: 2,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-trek',
      name: 'Tanvi Shinde',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 4.96,
      reviewsCount: 39,
      joinedDate: 'Jan 2024',
      responseTime: 'Under 15 mins',
      verified: true,
      location: 'Pune, MH'
    },
    isAvailable: true,
    rating: 4.94,
    reviewCount: 33,
    featured: true,
    specs: [
      { label: 'Volume', value: '65 Liters (Size M/L)' },
      { label: 'Back System', value: 'Anti-Gravity 3D Tensioned Mesh' },
      { label: 'Raincover', value: 'Integrated high-visibility raincover included' },
      { label: 'Hydration', value: 'Internal reservoir sleeve compatible' }
    ],
    rules: [
      'Shake out trail dust before return',
      'Use raincover in heavy precipitation'
    ],
    tags: ['Trekking', 'Backpack', 'Osprey', 'Himalayas', 'Hiking'],
    createdAt: '2026-04-06'
  },

  // 7. DSLR camera
  {
    id: 'item-dslr-camera',
    title: 'Canon EOS 5D Mark IV DSLR Camera + EF 24-105mm f/4L IS II USM',
    category: 'cameras-creation',
    subcategory: 'DSLR Cameras',
    description: 'Workhorse 30.4MP full-frame professional DSLR with Dual Pixel CMOS AF, 4K video recording, and weather-sealed Magnesium alloy body. Includes L-series versatile zoom lens, 2 LP-E6N batteries, and dual memory card slots.',
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 1999,
    weeklyPrice: 11194,
    weeklyDiscountPercent: 20,
    securityDeposit: 6000,
    replacementValue: 215000,
    condition: 'Excellent',
    location: 'Mumbai, MH (Bandra West)',
    city: 'Mumbai',
    pickupLocation: 'Pali Hill, Bandra West',
    availableQuantity: 1,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-canon',
      name: 'Aakash Patel',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 4.94,
      reviewsCount: 52,
      joinedDate: 'Jan 2024',
      responseTime: 'Within 20 mins',
      verified: true,
      location: 'Mumbai, MH'
    },
    isAvailable: true,
    rating: 4.93,
    reviewCount: 41,
    featured: true,
    specs: [
      { label: 'Sensor', value: '30.4 Megapixel Full-Frame CMOS' },
      { label: 'Autofocus', value: '61-Point High Density Reticular AF II' },
      { label: 'Lens', value: 'Canon EF 24-105mm f/4L IS II' },
      { label: 'Accessories', value: '2x Batteries, 64GB CF + 64GB SD, Dual Charger, Bag' }
    ],
    rules: [
      'Transport in padded camera shoulder bag',
      'Do not expose to sand or direct saltwater spray'
    ],
    tags: ['DSLR', 'Canon', 'Photography', 'Wedding', 'Cameras'],
    createdAt: '2026-04-07'
  },

  // 8. Tripod
  {
    id: 'item-tripod',
    title: 'Manfrotto Befree Advanced Carbon Fiber Professional Travel Tripod',
    category: 'cameras-creation',
    subcategory: 'Tripods & Gimbals',
    description: 'Lightweight carbon fiber tripod weighing only 1.25kg with 494 Center Ball Head supporting up to 9kg payloads. Quick twist M-lock leg locks and 4 independent leg angle selectors for macro and landscape perspectives.',
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 249,
    weeklyPrice: 1220,
    weeklyDiscountPercent: 30,
    securityDeposit: 1000,
    replacementValue: 22000,
    condition: 'Like New',
    location: 'Bengaluru, KA (Koramangala)',
    city: 'Bengaluru',
    pickupLocation: 'Near Bethany High School',
    availableQuantity: 3,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-manfrotto',
      name: 'Rohan Verma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 4.96,
      reviewsCount: 48,
      joinedDate: 'March 2023',
      responseTime: 'Under 15 mins',
      verified: true,
      location: 'Bengaluru, KA'
    },
    isAvailable: true,
    rating: 4.92,
    reviewCount: 27,
    featured: false,
    specs: [
      { label: 'Weight', value: '1.25 kg Carbon Fiber' },
      { label: 'Max Payload', value: '9 kg' },
      { label: 'Max Height', value: '150 cm' },
      { label: 'Closed Length', value: '40 cm' }
    ],
    rules: [
      'Rinse leg locks if used in mud or saltwater before returning',
      'Keep Arca-Swiss plate attached when not mounted'
    ],
    tags: ['Tripod', 'Manfrotto', 'Carbon Fiber', 'Photography', 'Video'],
    createdAt: '2026-04-08'
  },

  // 9. Laptop
  {
    id: 'item-laptop',
    title: 'Apple MacBook Pro 16" M3 Max (36GB Unified RAM, 1TB SSD Space Black)',
    category: 'electronics-gadgets',
    subcategory: 'Laptops',
    description: 'Powerhouse workstation for 8K video color grading, Blender 3D rendering, and LLM fine-tuning. 16.2" Liquid Retina XDR screen with 120Hz ProMotion and 140W fast GaN charger.',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 1899,
    weeklyPrice: 10634,
    weeklyDiscountPercent: 20,
    securityDeposit: 10000,
    replacementValue: 349000,
    condition: 'Like New',
    location: 'Bengaluru, KA (Indiranagar / Domlur)',
    city: 'Bengaluru',
    pickupLocation: 'EGL Business Park, Domlur',
    availableQuantity: 1,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup'],
    owner: {
      id: 'owner-mac',
      name: 'Adarsh Srinivasan',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      rating: 4.98,
      reviewsCount: 61,
      joinedDate: 'Jan 2024',
      responseTime: 'Under 10 mins',
      verified: true,
      location: 'Bengaluru, KA'
    },
    isAvailable: true,
    rating: 4.97,
    reviewCount: 39,
    featured: true,
    specs: [
      { label: 'Chip', value: 'Apple M3 Max (14-core CPU, 30-core GPU)' },
      { label: 'RAM', value: '36GB Unified Memory' },
      { label: 'Storage', value: '1TB Superfast PCIe Gen 4 SSD' },
      { label: 'Battery Health', value: '100% capacity (18+ hours battery)' }
    ],
    rules: [
      'Guest profile or clean user account provided; factory reset before return',
      'Keep in Tomtoc protective hard sleeve during transport'
    ],
    tags: ['Laptop', 'Apple', 'MacBook Pro', 'M3 Max', 'Workstation'],
    createdAt: '2026-04-09'
  },

  // 10. Projector
  {
    id: 'item-projector',
    title: 'Anker Nebula Capsule 3 Laser 1080p Smart Portable Projector',
    category: 'electronics-gadgets',
    subcategory: 'Projectors',
    description: 'Soda-can sized 1080p Laser projector with 300 ANSI lumens, autofocus, auto-keystone correction, Google TV built-in, and 8W Dolby Digital speaker. Built-in battery provides 2.5 hours of movie playback anywhere.',
    images: [
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 599,
    weeklyPrice: 3354,
    weeklyDiscountPercent: 20,
    securityDeposit: 3000,
    replacementValue: 72000,
    condition: 'Like New',
    location: 'Delhi NCR (Gurugram / Cyber City)',
    city: 'Delhi NCR',
    pickupLocation: 'DLF Phase 2, Gurugram',
    availableQuantity: 2,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-projector',
      name: 'Nikhil Mathur',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 4.93,
      reviewsCount: 29,
      joinedDate: 'Jan 2024',
      responseTime: 'Under 30 mins',
      verified: true,
      location: 'Delhi NCR'
    },
    isAvailable: true,
    rating: 4.91,
    reviewCount: 25,
    featured: true,
    specs: [
      { label: 'Resolution', value: '1080p Full HD Laser' },
      { label: 'Screen Size', value: 'Up to 120 inches' },
      { label: 'Operating System', value: 'Google TV with Netflix/Prime Video' },
      { label: 'Weight', value: '950 grams with built-in battery' }
    ],
    rules: [
      'Do not touch projection lens; clean with lens blower only',
      'Return with protective travel pouch and remote control'
    ],
    tags: ['Projector', 'Home Theatre', 'Nebula', 'Movie Night', 'Gadgets'],
    createdAt: '2026-04-10'
  },

  // 11. Saree
  {
    id: 'item-saree',
    title: 'Royal Banarasi Pure Katan Silk Handloom Saree with Kadwa Zari Weave',
    category: 'clothes-fashion',
    subcategory: 'Sarees & Lehengas',
    description: 'Heritage handwoven deep crimson Banarasi pure silk saree with antique gold and silver zari jaal work. Professionally dry-cleaned, steam-pressed, and sanitized in premium breathable muslin wrap.',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 799,
    weeklyPrice: 3915,
    weeklyDiscountPercent: 30,
    securityDeposit: 2500,
    replacementValue: 45000,
    condition: 'Like New',
    location: 'Hyderabad, TS (Banjara Hills)',
    city: 'Hyderabad',
    pickupLocation: 'Road No. 12, Banjara Hills',
    availableQuantity: 1,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    hygieneCleaned: true,
    owner: {
      id: 'owner-fashion-1',
      name: 'Sunita Reddy',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      rating: 4.97,
      reviewsCount: 54,
      joinedDate: 'Jan 2024',
      responseTime: 'Under 15 mins',
      verified: true,
      location: 'Hyderabad, TS'
    },
    isAvailable: true,
    rating: 4.98,
    reviewCount: 32,
    featured: true,
    specs: [
      { label: 'Fabric', value: '100% Pure Katan Mulberry Silk' },
      { label: 'Weave', value: 'Authentic Banarasi Kadwa Handloom' },
      { label: 'Blouse Piece', value: 'Matching unstitched brocade piece included' },
      { label: 'Hygiene', value: 'Professional steam sanitation before every rental' }
    ],
    rules: [
      'Strictly dry-clean only (complimentary post-rental cleaning handled by owner)',
      'Do not apply safety pins directly without protective pin pads (provided)'
    ],
    tags: ['Saree', 'Banarasi', 'Silk', 'Wedding Wear', 'Fashion', 'Ethnic'],
    createdAt: '2026-04-11'
  },

  // 12. Lehenga
  {
    id: 'item-lehenga',
    title: 'Designer Emerald Raw Silk Bridal Lehenga Choli with Zardozi Work',
    category: 'clothes-fashion',
    subcategory: 'Sarees & Lehengas',
    description: 'Showstopper designer raw silk lehenga featuring intricate hand-embroidered dabka, cutdana, and zardozi floral motifs. Comes with dual organza dupattas and customizable drawstring fit (Waist 28" - 36").',
    images: [
      'https://res.cloudinary.com/dqczk3bz/image/upload/cld-sample.jpg',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 1499,
    weeklyPrice: 7345,
    weeklyDiscountPercent: 30,
    securityDeposit: 5000,
    replacementValue: 85000,
    condition: 'Like New',
    location: 'Delhi NCR (Chandni Chowk / Defence Colony)',
    city: 'Delhi NCR',
    pickupLocation: 'Defence Colony Main Market, New Delhi',
    availableQuantity: 1,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    hygieneCleaned: true,
    owner: {
      id: 'owner-lehenga',
      name: 'Simran Bajaj',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 4.96,
      reviewsCount: 47,
      joinedDate: 'Jan 2024',
      responseTime: 'Within 20 mins',
      verified: true,
      location: 'Delhi NCR'
    },
    isAvailable: true,
    rating: 4.96,
    reviewCount: 30,
    featured: true,
    specs: [
      { label: 'Fit / Size', value: 'Adjustable drawstring (Waist 28"-36", Height up to 5\'8")' },
      { label: 'Workmanship', value: 'Hand zardozi, dabka & pearls' },
      { label: 'Included', value: 'Skirt, padded choli blouse, 2 dupattas, garment bag' },
      { label: 'Can-can', value: 'Double flare can-can netting built-in' }
    ],
    rules: [
      'Complimentary sanitized dry-cleaning upon return handled by owner',
      'Keep inside garment bag on hanger when not worn'
    ],
    tags: ['Lehenga', 'Bridal', 'Wedding', 'Designer', 'Party Wear'],
    createdAt: '2026-04-12'
  },

  // 13. Men's suit
  {
    id: 'item-mens-suit',
    title: 'Raymond Italian Wool Charcoal Slim-Fit 3-Piece Tuxedo Suit (40R)',
    category: 'clothes-fashion',
    subcategory: 'Sherwanis & Suits',
    description: 'Tailored 3-piece tuxedo crafted from Super 120s Italian merino wool with black satin peak lapels. Includes jacket, double-breasted waistcoat, matching trousers (waist 32-34"), and silk bow tie.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 699,
    weeklyPrice: 3425,
    weeklyDiscountPercent: 30,
    securityDeposit: 2000,
    replacementValue: 28000,
    condition: 'Like New',
    location: 'Mumbai, MH (Bandra West)',
    city: 'Mumbai',
    pickupLocation: 'Turner Road, Bandra West',
    availableQuantity: 1,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    hygieneCleaned: true,
    owner: {
      id: 'owner-suit',
      name: 'Aditya Merchant',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 4.95,
      reviewsCount: 38,
      joinedDate: 'Jan 2024',
      responseTime: 'Under 15 mins',
      verified: true,
      location: 'Mumbai, MH'
    },
    isAvailable: true,
    rating: 4.94,
    reviewCount: 28,
    featured: false,
    specs: [
      { label: 'Chest Size', value: '40 Regular (Slim Fit)' },
      { label: 'Trouser Waist', value: '32-34 inches with hidden elastic expander' },
      { label: 'Fabric', value: 'Super 120s Pure Italian Merino Wool' },
      { label: 'Accessories', value: 'Matching satin bowtie and suit bag included' }
    ],
    rules: [
      'Hang immediately upon arrival to prevent creasing',
      'Owner handles dry-cleaning after return'
    ],
    tags: ['Suit', 'Tuxedo', 'Menswear', 'Reception', 'Formal'],
    createdAt: '2026-04-13'
  },

  // 14. Winter jacket
  {
    id: 'item-winter-jacket',
    title: 'The North Face 1996 Retro Nuptse 700-Down Insulated Puffer Jacket (L)',
    category: 'clothes-fashion',
    subcategory: 'Winter Wear',
    description: 'Iconic water-repellent baffle puffer jacket packed with 700-fill certified goose down. Engineered to retain heat in sub-zero alpine conditions, Kashmir winter trips, and Manali snowy getaways.',
    images: [
      'https://res.cloudinary.com/dqczk3bz/image/upload/samples/people/boy-snow-hoodie.jpg',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 349,
    weeklyPrice: 1710,
    weeklyDiscountPercent: 30,
    securityDeposit: 1500,
    replacementValue: 26000,
    condition: 'Like New',
    location: 'Delhi NCR (South Extension)',
    city: 'Delhi NCR',
    pickupLocation: 'Ring Road, South Extension Part 1',
    availableQuantity: 2,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    hygieneCleaned: true,
    owner: {
      id: 'owner-winter',
      name: 'Karan Mehra',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 4.89,
      reviewsCount: 31,
      joinedDate: 'August 2023',
      responseTime: 'Within 30 mins',
      verified: true,
      location: 'Delhi NCR'
    },
    isAvailable: true,
    rating: 4.93,
    reviewCount: 34,
    featured: false,
    specs: [
      { label: 'Size', value: 'Men\'s Large (Fits 40-42" chest)' },
      { label: 'Insulation', value: '700-Fill ProDown Goose Down' },
      { label: 'Finish', value: 'DWR (Durable Water-Repellent) Ripstop' },
      { label: 'Packability', value: 'Stows into internal right pocket' }
    ],
    rules: [
      'Do not machine wash or compress wet',
      'Complimentary anti-bacterial ozone sanitation between rentals'
    ],
    tags: ['Winter', 'Jacket', 'The North Face', 'Down', 'Snow', 'Holiday'],
    createdAt: '2026-04-14'
  },

  // 15. Wedding outfit
  {
    id: 'item-wedding-outfit',
    title: 'Manyavar Imperial Wedding Outfit Groom Sherwani Set with Stole & Safa (40)',
    category: 'clothes-fashion',
    subcategory: 'Wedding Wear',
    description: 'Majestic ivory raw silk groom wedding outfit sherwani with threadwork embroidery, mandarin collar, royal red velvet stole, matching safa turban with kalgi brooch, and churidar. Complete groom ensemble ready to wear.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 1299,
    weeklyPrice: 6365,
    weeklyDiscountPercent: 30,
    securityDeposit: 4000,
    replacementValue: 55000,
    condition: 'Like New',
    location: 'Delhi NCR (Lajpat Nagar / Greater Kailash)',
    city: 'Delhi NCR',
    pickupLocation: 'GK-1 M Block Market, New Delhi',
    availableQuantity: 1,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    hygieneCleaned: true,
    owner: {
      id: 'owner-groom',
      name: 'Rajeev Malhotra',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 4.97,
      reviewsCount: 42,
      joinedDate: 'Jan 2024',
      responseTime: 'Under 15 mins',
      verified: true,
      location: 'Delhi NCR'
    },
    isAvailable: true,
    rating: 4.96,
    reviewCount: 31,
    featured: true,
    specs: [
      { label: 'Size', value: '40 Regular' },
      { label: 'Set Contents', value: 'Sherwani, Kurta, Churidar, Stole, Safa Turban, Kalgi' },
      { label: 'Embroidery', value: 'Resham and Gota Patti detailing' }
    ],
    rules: [
      'Complimentary dry-cleaning handled by owner post-event',
      'Keep away from turmeric/haldi paste to avoid staining'
    ],
    tags: ['Wedding Outfit', 'Groom', 'Sherwani', 'Manyavar', 'Ethnic Wear', 'Wedding'],
    createdAt: '2026-04-15'
  },

  // 16. Mixer grinder
  {
    id: 'item-mixer-grinder',
    title: 'Sujata Dynamix 900W Heavy-Duty Mixer Grinder with 3 Stainless Steel Jars',
    category: 'kitchen-appliances',
    subcategory: 'Mixers & Grinders',
    description: 'Commercial-grade 900-watt double ball-bearing motor powerhouse for preparing festival sweets, smooth idli/dosa batter, dry masala grinding, and large family hosting events.',
    images: [
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 199,
    weeklyPrice: 975,
    weeklyDiscountPercent: 30,
    securityDeposit: 800,
    replacementValue: 7500,
    condition: 'Excellent',
    location: 'Bengaluru, KA (Jayanagar)',
    city: 'Bengaluru',
    pickupLocation: '4th Block Jayanagar, near Complex',
    availableQuantity: 2,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-kitchen-2',
      name: 'Shalini Murthy',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      rating: 4.95,
      reviewsCount: 37,
      joinedDate: 'Jan 2024',
      responseTime: 'Under 15 mins',
      verified: true,
      location: 'Bengaluru, KA'
    },
    isAvailable: true,
    rating: 4.92,
    reviewCount: 29,
    featured: false,
    specs: [
      { label: 'Motor', value: '900W Double Ball Bearing' },
      { label: 'Jars', value: '1.5L Wet Jar, 1.0L Dry Jar, 0.4L Chutney Jar' },
      { label: 'Blades', value: 'High strength surgical grade stainless steel' }
    ],
    rules: [
      'Wash jars thoroughly and dry blades before packing',
      'Do not immerse base motor unit in water'
    ],
    tags: ['Kitchen', 'Mixer', 'Grinder', 'Appliances', 'Hosting'],
    createdAt: '2026-04-16'
  },

  // 17. Air fryer
  {
    id: 'item-air-fryer',
    title: 'Philips Digital Airfryer XL Rapid Air 4.1L (Touch Control & 7 Presets)',
    category: 'kitchen-appliances',
    subcategory: 'Air Fryers',
    description: 'Crispy fried snacks with up to 90% less oil. Features patented Starfish bottom design for 360-degree rapid heat circulation, digital LED touch interface, and dishwasher-safe QuickClean basket.',
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 249,
    weeklyPrice: 1220,
    weeklyDiscountPercent: 30,
    securityDeposit: 1000,
    replacementValue: 12999,
    condition: 'Like New',
    location: 'Hyderabad, TS (Gachibowli)',
    city: 'Hyderabad',
    pickupLocation: 'Telecom Nagar, Gachibowli',
    availableQuantity: 2,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-airfryer',
      name: 'Gaurav Bansal',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      rating: 4.96,
      reviewsCount: 33,
      joinedDate: 'Jan 2024',
      responseTime: 'Within 20 mins',
      verified: true,
      location: 'Hyderabad, TS'
    },
    isAvailable: true,
    rating: 4.95,
    reviewCount: 35,
    featured: true,
    specs: [
      { label: 'Capacity', value: '4.1 Liters (Up to 4 portions)' },
      { label: 'Power', value: '1400W Rapid Air Technology' },
      { label: 'Presets', value: 'Fries, Chicken, Fish, Cake, Grilled Veggies' }
    ],
    rules: [
      'Clean non-stick basket with soft sponge only (no abrasive metal scrubs)',
      'Dry completely before returning'
    ],
    tags: ['Kitchen', 'Airfryer', 'Philips', 'Healthy', 'Appliances'],
    createdAt: '2026-04-17'
  },

  // 18. Academic textbook
  {
    id: 'item-academic-textbook',
    title: 'Principles of Neural Science (Kandel 6th Ed) & Medical Physiology Bundle',
    category: 'books-education',
    subcategory: 'Academic Textbooks',
    description: 'Gold standard medical neuroscience and physiology hardcovers for MBBS, AIIMS PG, and biomedical graduate students. Completely unmarked crisp pages with high-definition anatomical color plates.',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 69,
    weeklyPrice: 338,
    weeklyDiscountPercent: 30,
    securityDeposit: 500,
    replacementValue: 9800,
    condition: 'Like New',
    location: 'Bengaluru, KA (Mathikere / IISc campus)',
    city: 'Bengaluru',
    pickupLocation: 'Near IISc D-Gate, Mathikere',
    availableQuantity: 2,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-medbooks',
      name: 'Dr. Neha Sen',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      rating: 4.98,
      reviewsCount: 46,
      joinedDate: 'Jan 2024',
      responseTime: 'Under 10 mins',
      verified: true,
      location: 'Bengaluru, KA'
    },
    isAvailable: true,
    rating: 4.97,
    reviewCount: 40,
    featured: false,
    specs: [
      { label: 'Discipline', value: 'Neuroscience & Human Physiology' },
      { label: 'Edition', value: 'Kandel 6th Edition + Guyton 14th Edition' },
      { label: 'Condition', value: 'Zero pencil or pen markings throughout' }
    ],
    rules: [
      'Use sticky notes rather than highlighting on pages',
      'Protect with transparent plastic cover (provided)'
    ],
    tags: ['Books', 'Medical', 'Textbook', 'Neuroscience', 'Education'],
    createdAt: '2026-04-18'
  },

  // 19. Competitive exam book
  {
    id: 'item-exam-book',
    title: 'Complete JEE Advanced 46-Year Chapterwise Solved PCM Mastery Set',
    category: 'books-education',
    subcategory: 'Competitive Exam Books',
    description: 'Comprehensive 3-volume Physics, Chemistry, and Mathematics solved paper repository covering 1978 to 2025 JEE Advanced papers with detailed step-by-step alternate solution methodologies.',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 49,
    weeklyPrice: 240,
    weeklyDiscountPercent: 30,
    securityDeposit: 300,
    replacementValue: 3200,
    condition: 'Like New',
    location: 'Pune, MH (Kothrud)',
    city: 'Pune',
    pickupLocation: 'Near MIT World Peace University',
    availableQuantity: 3,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-jeebooks',
      name: 'Rahul Kulkarni',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 4.94,
      reviewsCount: 31,
      joinedDate: 'Jan 2024',
      responseTime: 'Within 20 mins',
      verified: true,
      location: 'Pune, MH'
    },
    isAvailable: true,
    rating: 4.95,
    reviewCount: 28,
    featured: false,
    specs: [
      { label: 'Subject', value: 'Physics, Chemistry, Maths (PCM)' },
      { label: 'Coverage', value: '46 Years Solved Chapterwise' },
      { label: 'Edition', value: 'Latest 2026 Examination Edition' }
    ],
    rules: [
      'Solve problems in separate rough notebook',
      'Keep pages free from tea/coffee spots'
    ],
    tags: ['Books', 'JEE', 'Exam', 'Education', 'Competitive'],
    createdAt: '2026-04-19'
  },

  // 20. Guitar
  {
    id: 'item-guitar',
    title: 'Yamaha FG800 Solid Top Folk Acoustic Guitar with Padded Gig Bag',
    category: 'music-entertainment',
    subcategory: 'Acoustic Guitars',
    description: 'Yamaha standard acoustic with solid Sitka spruce top and newly developed scalloped bracing for rich low-to-mid range punch. Freshly re-strung with D\'Addario Phosphor Bronze 11-52 strings, includes clip-on chromatic tuner and capo.',
    images: [
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 299,
    weeklyPrice: 1465,
    weeklyDiscountPercent: 30,
    securityDeposit: 1500,
    replacementValue: 18500,
    condition: 'Like New',
    location: 'Bengaluru, KA (Koramangala)',
    city: 'Bengaluru',
    pickupLocation: '5th Block Koramangala',
    availableQuantity: 2,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-guitar',
      name: 'Neil D\'Souza',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 4.97,
      reviewsCount: 50,
      joinedDate: 'Jan 2024',
      responseTime: 'Under 10 mins',
      verified: true,
      location: 'Bengaluru, KA'
    },
    isAvailable: true,
    rating: 4.96,
    reviewCount: 42,
    featured: true,
    specs: [
      { label: 'Top', value: 'Solid Sitka Spruce' },
      { label: 'Back & Sides', value: 'Nato / Okoume' },
      { label: 'Fingerboard', value: 'Walnut 20 Frets' },
      { label: 'Accessories', value: '20mm Padded Gig Bag, Snark Tuner, Capo, 5 Picks' }
    ],
    rules: [
      'Store in padded bag when not playing to maintain humidity',
      'Do not adjust truss rod without prior consent'
    ],
    tags: ['Guitar', 'Acoustic', 'Music', 'Yamaha', 'Instruments'],
    createdAt: '2026-04-20'
  },

  // 21. Camping tent
  {
    id: 'item-camping-tent',
    title: 'Quechua 2 Seconds Waterproof 3-Person Pop-Up Camping Tent',
    category: 'travel-luggage',
    subcategory: 'Camping Tents',
    description: 'Instant assembly freestanding 3-person pop-up tent. Pitches in literally 2 seconds with patented easy folding system. Lab-tested against 200mm/sqm/hr tropical downpours and 50km/h winds.',
    images: [
      'https://res.cloudinary.com/dqczk3bz/image/upload/samples/landscapes/nature-mountains.jpg',
      'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 299,
    weeklyPrice: 1465,
    weeklyDiscountPercent: 30,
    securityDeposit: 1200,
    replacementValue: 9999,
    condition: 'Like New',
    location: 'Mumbai, MH (Thane / Powai)',
    city: 'Mumbai',
    pickupLocation: 'Hiranandani Gardens, Powai',
    availableQuantity: 3,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-tent-2',
      name: 'Nitin Sawant',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      rating: 4.92,
      reviewsCount: 27,
      joinedDate: 'Jan 2024',
      responseTime: 'Under 30 mins',
      verified: true,
      location: 'Mumbai, MH'
    },
    isAvailable: true,
    rating: 4.9,
    reviewCount: 22,
    featured: false,
    specs: [
      { label: 'Capacity', value: '3 Persons (Bedroom 210 x 180 cm)' },
      { label: 'Pitching', value: 'Instant 2-second pop-up with guided fold' },
      { label: 'Waterproofing', value: 'Tropical rain tested (2000mm rating)' },
      { label: 'Includes', value: 'Tent, ground pegs, guy ropes, carry disc bag' }
    ],
    rules: [
      'Always sweep floor clean and air-dry thoroughly before packing',
      'No footwear inside the sleeping chamber'
    ],
    tags: ['Camping', 'Tent', 'Outdoor', 'Travel', 'Adventure'],
    createdAt: '2026-04-21'
  },

  // 22. Folding table
  {
    id: 'item-folding-table',
    title: 'Lifetime 6-Foot Heavy-Duty Adjustable Folding Event & Study Table',
    category: 'home-furniture',
    subcategory: 'Folding Furniture',
    description: 'High-density polyethylene (HDPE) 6ft commercial folding table with rust-resistant powder-coated steel frame. Adjusts to 3 height settings (24", 29", 36") and folds in half with carry handle for easy car trunk transport.',
    images: [
      'https://images.unsplash.com/photo-1530629013299-6cb10d168419?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 199,
    weeklyPrice: 975,
    weeklyDiscountPercent: 30,
    securityDeposit: 800,
    replacementValue: 8500,
    condition: 'Excellent',
    location: 'Bengaluru, KA (HSR Layout)',
    city: 'Bengaluru',
    pickupLocation: 'Sector 1 HSR Layout',
    availableQuantity: 4,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-furniture-1',
      name: 'Sunil Rao',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 4.93,
      reviewsCount: 36,
      joinedDate: 'Jan 2024',
      responseTime: 'Within 20 mins',
      verified: true,
      location: 'Bengaluru, KA'
    },
    isAvailable: true,
    rating: 4.91,
    reviewCount: 30,
    featured: false,
    specs: [
      { label: 'Dimensions', value: '183 cm x 76 cm (6 ft x 2.5 ft)' },
      { label: 'Weight Capacity', value: '450 kg uniformly distributed' },
      { label: 'Folded Size', value: '92 x 76 x 9 cm with carry handle' },
      { label: 'Height Settings', value: '61 cm, 74 cm, 91 cm' }
    ],
    rules: [
      'Lock center safety ring before putting weight on table',
      'Wipe top clean with surface cleaner before returning'
    ],
    tags: ['Furniture', 'Table', 'Events', 'Folding Table', 'Hosting'],
    createdAt: '2026-04-22'
  },

  // 23. Office chair
  {
    id: 'item-office-chair',
    title: 'Herman Miller Aeron Ergonomic Office Chair (Size B, PostureFit SL)',
    category: 'home-furniture',
    subcategory: 'Office Furniture',
    description: 'The world\'s most revered ergonomic office chair. Features 8Z Pellicle breathable suspension mesh, dual PostureFit SL sacral/lumbar support, fully adjustable arms, and forward tilt limiter for optimal work-from-home posture.',
    images: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 449,
    weeklyPrice: 2200,
    weeklyDiscountPercent: 30,
    securityDeposit: 3000,
    replacementValue: 125000,
    condition: 'Like New',
    location: 'Bengaluru, KA (Koramangala)',
    city: 'Bengaluru',
    pickupLocation: 'Near Wipro Park, Koramangala',
    availableQuantity: 2,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-office',
      name: 'Arjun Nambiar',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 4.98,
      reviewsCount: 55,
      joinedDate: 'Jan 2024',
      responseTime: 'Under 10 mins',
      verified: true,
      location: 'Bengaluru, KA'
    },
    isAvailable: true,
    rating: 4.97,
    reviewCount: 46,
    featured: true,
    specs: [
      { label: 'Size', value: 'Size B (Medium, 5\'3" to 6\'2", up to 135kg)' },
      { label: 'Support', value: 'Adjustable PostureFit SL' },
      { label: 'Armrests', value: '3D Fully Adjustable (Height, Depth, Pivot)' },
      { label: 'Castors', value: 'Quiet hard floor / carpet multi-surface castors' }
    ],
    rules: [
      'Transport in upright position in cab or SUV',
      'Do not apply lubricants or loosen structural bolts'
    ],
    tags: ['Office Chair', 'Chair', 'Ergonomic', 'Herman Miller', 'Furniture', 'WFH'],
    createdAt: '2026-04-23'
  },

  // 24. Power drill
  {
    id: 'item-power-drill',
    title: 'Bosch Professional GSB 18V-50 Brushless Cordless Impact Drill Kit',
    category: 'tools-diy',
    subcategory: 'Power Drills',
    description: 'Robust all-metal chuck brushless 18V impact drill delivering 50Nm of torque. Features 2-speed planetary gearbox, 2x 2.0Ah lithium batteries, fast GAL 18V-20 charger, and 35-piece screwdriving & masonry drill bit set in L-CASE.',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 249,
    weeklyPrice: 1220,
    weeklyDiscountPercent: 30,
    securityDeposit: 1000,
    replacementValue: 12500,
    condition: 'Like New',
    location: 'Delhi NCR (South Extension)',
    city: 'Delhi NCR',
    pickupLocation: 'South Extension 1, New Delhi',
    availableQuantity: 3,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-bosch',
      name: 'Vikas Taneja',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 4.94,
      reviewsCount: 56,
      joinedDate: 'May 2023',
      responseTime: 'Instant reply',
      verified: true,
      location: 'Delhi NCR'
    },
    isAvailable: true,
    rating: 4.95,
    reviewCount: 38,
    featured: true,
    specs: [
      { label: 'Torque', value: '50 Nm Max' },
      { label: 'Chuck', value: '13mm All-Metal Keyless Chuck' },
      { label: 'Impact Rate', value: '27,000 bpm for concrete/brick drilling' },
      { label: 'Batteries', value: '2x 18V 2.0Ah CoolPack Li-ion + Charger' }
    ],
    rules: [
      'Wear safety eyewear (included) when drilling masonry',
      'Charge batteries only with supplied Bosch charger'
    ],
    tags: ['Tools', 'Power Drill', 'Bosch', 'Cordless', 'DIY', 'Renovation'],
    createdAt: '2026-04-24'
  },

  // 25. Wheelchair
  {
    id: 'item-wheelchair',
    title: 'Karma Aurora Ultralight Foldable Ergonomic Wheelchair (Sanitized)',
    category: 'health-wellness',
    subcategory: 'Wheelchairs',
    description: 'Hospital-grade aircraft aluminium lightweight folding wheelchair weighing just 10.5kg with S-Ergo contour seating system. Certified hygienic, disinfected with medical autoclave spray before every dispatch. Ideal for visiting elderly relatives, airport assistance, and post-surgery mobility.',
    images: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80'
    ],
    dailyPrice: 249,
    weeklyPrice: 1220,
    weeklyDiscountPercent: 30,
    securityDeposit: 1000,
    replacementValue: 18000,
    condition: 'Like New',
    location: 'Bengaluru, KA (Koramangala / Indiranagar)',
    city: 'Bengaluru',
    pickupLocation: 'Near St. John\'s Hospital, Koramangala',
    availableQuantity: 2,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    safetyNotice: 'Fully disinfected with medical-grade hospital surface sanitizer. Non-medical mobility aid; please consult physical therapist for custom rehabilitation specifications.',
    hygieneCleaned: true,
    owner: {
      id: 'owner-health-1',
      name: 'Dr. Ramesh Kulkarni',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 4.99,
      reviewsCount: 78,
      joinedDate: 'Jan 2024',
      responseTime: 'Under 10 mins',
      verified: true,
      location: 'Bengaluru, KA'
    },
    isAvailable: true,
    rating: 4.98,
    reviewCount: 62,
    featured: true,
    specs: [
      { label: 'Weight', value: '10.5 kg (Ultralight Aircraft Aluminium)' },
      { label: 'Weight Capacity', value: '100 kg' },
      { label: 'Seat System', value: 'Patented S-Ergo pressure relief seating' },
      { label: 'Portability', value: 'Folds flat in 5 seconds to fit car boot' }
    ],
    rules: [
      'Always engage parking wheel locks when transferring user in or out',
      'Complimentary hospital-grade sanitized wipe before every handover'
    ],
    tags: ['Health', 'Wheelchair', 'Mobility', 'Wellness', 'Senior Care', 'Accessibility'],
    createdAt: '2026-04-25'
  },
  // --- Cloudinary CDN Hosted Assets (Verified on dqczk3bz) ---
  {
    id: 'item-shoes-nike',
    title: 'Nike Air Max 270 React Premium Streetwear & Running Sneakers (UK 9)',
    category: 'shoes',
    subcategory: 'Designer Sneakers & Streetwear',
    description: 'Ultra-cushioned lifestyle and running sneakers combining Nike React foam with a massive 270 Max Air heel unit. Lightweight, breathable mesh upper in pristine, sanitized condition.',
    images: [
      'https://res.cloudinary.com/dqczk3bz/image/upload/samples/ecommerce/shoes.jpg',
      'https://res.cloudinary.com/dqczk3bz/image/upload/cld-sample-5.jpg'
    ],
    dailyPrice: 299,
    weeklyPrice: 1499,
    weeklyDiscountPercent: 28,
    securityDeposit: 1500,
    replacementValue: 14995,
    condition: 'Like New',
    location: 'Bengaluru, KA (Indiranagar / Koramangala)',
    city: 'Bengaluru',
    pickupLocation: '100ft Road, Indiranagar',
    availableQuantity: 2,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    hygieneCleaned: true,
    owner: {
      id: 'owner-shoes',
      name: 'Aditya Nair',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 4.95,
      reviewsCount: 34,
      joinedDate: 'February 2024',
      responseTime: 'Under 15 mins',
      verified: true,
      location: 'Bengaluru, KA'
    },
    isAvailable: true,
    rating: 4.93,
    reviewCount: 26,
    featured: true,
    specs: [
      { label: 'Size', value: 'UK 9 / US 10 / EU 44' },
      { label: 'Cushioning', value: 'Nike React Foam + Max Air Heel' },
      { label: 'Hygiene', value: 'UV Sterilized & Sanitized with fresh cedar inserts' }
    ],
    rules: [
      'Wear with clean socks only',
      'Avoid muddy or unpaved trail running',
      'Return in original protective shoebox'
    ],
    tags: ['Nike', 'Sneakers', 'Shoes', 'Streetwear', 'Fashion', 'Running', 'Cloudinary'],
    createdAt: '2026-05-01'
  },
  {
    id: 'item-watch-tissot',
    title: 'Tissot Le Locle Automatic Classic Analog Chronograph Wristwatch',
    category: 'accessories',
    subcategory: 'Luxury & Smart Watches',
    description: 'Swiss-made automatic masterpiece with guilloché dial, scratch-resistant sapphire crystal, and traditional Roman numeral indices. Ideal for corporate galas, weddings, and formal celebrations.',
    images: [
      'https://res.cloudinary.com/dqczk3bz/image/upload/samples/ecommerce/analog-classic.jpg'
    ],
    dailyPrice: 499,
    weeklyPrice: 2499,
    weeklyDiscountPercent: 28,
    securityDeposit: 3000,
    replacementValue: 48000,
    condition: 'Like New',
    location: 'Mumbai, MH (Bandra / BKC)',
    city: 'Mumbai',
    pickupLocation: 'BKC Complex, Mumbai',
    availableQuantity: 1,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-watch',
      name: 'Sameer Singhania',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
      rating: 4.97,
      reviewsCount: 52,
      joinedDate: 'November 2023',
      responseTime: 'Under 30 mins',
      verified: true,
      location: 'Mumbai, MH'
    },
    isAvailable: true,
    rating: 4.96,
    reviewCount: 19,
    featured: true,
    specs: [
      { label: 'Movement', value: 'Swiss Automatic Powermatic 80' },
      { label: 'Crystal', value: 'Scratch-Resistant Sapphire Crystal' },
      { label: 'Case Material', value: '316L Stainless Steel (39.3mm)' }
    ],
    rules: [
      'Store in padded watch roll when not worn',
      'Do not submerge in water or wear in swimming pools'
    ],
    tags: ['Watch', 'Luxury', 'Accessories', 'Formal', 'Swiss Made', 'Cloudinary'],
    createdAt: '2026-05-02'
  },
  {
    id: 'item-bike-trek',
    title: 'Trek Marlin 7 All-Terrain Hardtail Mountain Bike (29er, Medium/Large)',
    category: 'sports-fitness',
    subcategory: 'Cycling & Accessories',
    description: 'Race-ready cross-country mountain bike with RockShox Judy suspension fork, 1x10 Shimano Deore drivetrain, and hydraulic disc brakes. Perfect for Bangalore trails, Nandi Hills rides, and weekend gravel grinding.',
    images: [
      'https://res.cloudinary.com/dqczk3bz/image/upload/samples/bike.jpg'
    ],
    dailyPrice: 599,
    weeklyPrice: 2999,
    weeklyDiscountPercent: 28,
    securityDeposit: 2500,
    replacementValue: 56000,
    condition: 'Excellent',
    location: 'Bengaluru, KA (HSR Layout / Sarjapur)',
    city: 'Bengaluru',
    pickupLocation: 'HSR Layout Sector 2',
    availableQuantity: 1,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-bike',
      name: 'Rishi Patel',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      rating: 4.91,
      reviewsCount: 41,
      joinedDate: 'December 2023',
      responseTime: 'Under 1 hour',
      verified: true,
      location: 'Bengaluru, KA'
    },
    isAvailable: true,
    rating: 4.9,
    reviewCount: 24,
    featured: true,
    specs: [
      { label: 'Frame', value: 'Alpha Silver Aluminum Internal Routing' },
      { label: 'Suspension', value: 'RockShox Judy 100mm with Hydraulic Lockout' },
      { label: 'Brakes', value: 'Shimano MT200 Hydraulic Disc Brakes' },
      { label: 'Accessories', value: 'Includes Helmet, High-Pressure Pump & Cable Lock' }
    ],
    rules: [
      'Wear helmet at all times when riding',
      'Do not jump downhill ramps exceeding 1 meter',
      'Return with tires inflated and lock intact'
    ],
    tags: ['Bicycle', 'Mountain Bike', 'Trek', 'Cycling', 'Fitness', 'Sports', 'Cloudinary'],
    createdAt: '2026-05-03'
  },
  {
    id: 'item-basketball-spalding',
    title: 'Spalding NBA Official Full-Grain Leather Game Basketball + Pump Kit',
    category: 'sports-fitness',
    subcategory: 'Sports Equipment',
    description: 'Official indoor tournament basketball engineered with genuine Horween full-grain leather for optimal moisture management, tactile grip, and true bounce consistency.',
    images: [
      'https://res.cloudinary.com/dqczk3bz/image/upload/cld-sample-3.jpg'
    ],
    dailyPrice: 149,
    weeklyPrice: 699,
    weeklyDiscountPercent: 33,
    securityDeposit: 600,
    replacementValue: 7999,
    condition: 'Like New',
    location: 'Delhi NCR (Gurugram Cyber Hub)',
    city: 'Delhi NCR',
    pickupLocation: 'DLF Phase 2, Gurugram',
    availableQuantity: 2,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    owner: {
      id: 'owner-basketball',
      name: 'Kabir Oberoi',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      rating: 4.88,
      reviewsCount: 17,
      joinedDate: 'January 2024',
      responseTime: 'Under 15 mins',
      verified: true,
      location: 'Delhi NCR'
    },
    isAvailable: true,
    rating: 4.85,
    reviewCount: 12,
    featured: false,
    specs: [
      { label: 'Size', value: 'Official Size 7 (29.5")' },
      { label: 'Material', value: 'Horween Full-Grain Composite Leather' },
      { label: 'Includes', value: 'Dual-Action Hand Pump & Mesh Carrying Bag' }
    ],
    rules: [
      'Best used on hardwood indoor courts or smooth synthetic flooring',
      'Do not store deflated in direct sunlight'
    ],
    tags: ['Basketball', 'Spalding', 'Sports', 'Fitness', 'Game', 'Cloudinary'],
    createdAt: '2026-05-04'
  },
  {
    id: 'item-dining-banquet',
    title: 'Artisanal Ceramic Dining Banquet & Event Tableware Service (Set for 12)',
    category: 'home-kitchen',
    subcategory: 'Home Decor & Lighting',
    description: 'Handcrafted stoneware ceramic dinner set including dinner plates, quarter plates, dessert bowls, soup bowls, and serving platters. Perfect for hosting dinner parties, family festive gatherings, and celebration dinners.',
    images: [
      'https://res.cloudinary.com/dqczk3bz/image/upload/cld-sample-4.jpg'
    ],
    dailyPrice: 399,
    weeklyPrice: 1899,
    weeklyDiscountPercent: 32,
    securityDeposit: 1500,
    replacementValue: 18000,
    condition: 'Excellent',
    location: 'Pune, MH (Koregaon Park)',
    city: 'Pune',
    pickupLocation: 'Lane 7, Koregaon Park',
    availableQuantity: 1,
    availableFrom: '2026-10-01',
    availableUntil: '2026-12-31',
    deliveryOptions: ['local_pickup', 'home_delivery'],
    hygieneCleaned: true,
    owner: {
      id: 'owner-dinner',
      name: 'Radhika Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      rating: 4.94,
      reviewsCount: 39,
      joinedDate: 'October 2023',
      responseTime: 'Under 45 mins',
      verified: true,
      location: 'Pune, MH'
    },
    isAvailable: true,
    rating: 4.92,
    reviewCount: 21,
    featured: false,
    specs: [
      { label: 'Capacity', value: 'Full Dinner Service for 12 Persons (48 Pieces)' },
      { label: 'Material', value: 'High-Fired Glazed Stoneware Ceramic' },
      { label: 'Safety', value: 'Microwave Safe, Dishwasher Safe & Lead-Free' }
    ],
    rules: [
      'Handle with care and return in original foam-lined storage crates',
      'Rinse food residues before repacking'
    ],
    tags: ['Dining', 'Tableware', 'Kitchen', 'Party', 'Plates', 'Events', 'Cloudinary'],
    createdAt: '2026-05-05'
  }
];

export const INITIAL_BOOKINGS: RentalBooking[] = [
  {
    id: 'booking-1',
    itemId: 'item-1',
    itemTitle: 'Sony Alpha A7 IV Mirrorless Camera + 24-70mm f/2.8 GM',
    itemImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    itemCategory: 'cameras-creation',
    renterName: 'Vikram Seth',
    renterEmail: 'vikram.seth@example.com',
    ownerId: 'owner-1',
    startDate: '2026-10-28',
    endDate: '2026-10-31',
    totalDays: 3,
    dailyRate: 2499,
    baseTotal: 7497,
    discountAmount: 0,
    serviceFee: 374,
    securityDeposit: 8000,
    totalPayable: 15871,
    savingsVsRetail: 241503,
    status: 'approved',
    pickupType: 'local_pickup',
    renterMessage: 'Shooting a destination wedding in Goa. Will carry my own pelican case as well.',
    createdAt: '2026-10-22'
  },
  {
    id: 'booking-2',
    itemId: 'item-2',
    itemTitle: 'DJI Mini 3 Pro Drone Fly More Combo (Sub-249g)',
    itemImage: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=600&q=80',
    itemCategory: 'electronics-gadgets',
    renterName: 'Rohan Mehra',
    renterEmail: 'rohan.mehra@example.com',
    ownerId: 'owner-2',
    startDate: '2026-11-02',
    endDate: '2026-11-09',
    totalDays: 7,
    dailyRate: 1499,
    baseTotal: 10493,
    discountAmount: 2623,
    serviceFee: 393,
    securityDeposit: 5000,
    totalPayable: 13263,
    savingsVsRetail: 67507,
    status: 'active',
    pickupType: 'delivery',
    renterMessage: 'Taking it for landscape B-roll shots on a Spiti Valley bike expedition.',
    createdAt: '2026-10-23'
  },
  {
    id: 'booking-3',
    itemId: 'item-4',
    itemTitle: 'DeWalt 20V MAX Cordless Combi Drill Kit + 2 Batteries',
    itemImage: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80',
    itemCategory: 'tools-diy',
    renterName: 'Arun Iyer',
    renterEmail: 'arun.iyer@example.com',
    ownerId: 'owner-4',
    startDate: '2026-10-24',
    endDate: '2026-10-26',
    totalDays: 2,
    dailyRate: 299,
    baseTotal: 598,
    discountAmount: 0,
    serviceFee: 30,
    securityDeposit: 1200,
    totalPayable: 1828,
    savingsVsRetail: 13902,
    status: 'completed',
    pickupType: 'local_pickup',
    renterMessage: 'Just moved into my new 2BHK flat in Hauz Khas. Need to hang curtain rods and TV wall mount.',
    createdAt: '2026-10-20'
  }
];
