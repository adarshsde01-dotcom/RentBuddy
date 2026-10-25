export interface CategoryDefinition {
  id: string;
  name: string;
  shortName?: string;
  group: 'Fashion & Style' | 'Active & Adventure' | 'Tech & Creativity' | 'Home & Living' | 'Events & Play' | 'General & Other';
  iconName: string;
  description: string;
  subcategories: string[];
  popular?: boolean;
  bannerImage: string;
  gradient: string;
  accentColor: string;
  aliases?: string[];
  safetyNotice?: string;
}

export const CATEGORIES: CategoryDefinition[] = [
  // 1. Clothing
  {
    id: 'clothing',
    name: 'Clothing',
    shortName: 'Clothing',
    group: 'Fashion & Style',
    iconName: 'Shirt',
    description: 'Designer sarees, lehengas, formal suits, tuxedos, winter parkas, and festive party wear',
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-pink-500/20 to-rose-500/20',
    accentColor: 'rose',
    aliases: ['clothes-fashion', 'fashion', 'clothes'],
    subcategories: [
      "Men's Formal & Suits",
      "Men's Ethnic & Sherwanis",
      "Women's Ethnic & Sarees",
      "Women's Lehengas & Anarkalis",
      'Dresses, Gowns & Party Wear',
      'Jackets & Winter Puffer Coats',
      'Blazers, Tuxedos & Waistcoats',
      'Festival & Theme Costumes',
    ],
  },

  // 2. Shoes
  {
    id: 'shoes',
    name: 'Shoes',
    shortName: 'Shoes',
    group: 'Fashion & Style',
    iconName: 'Footprints',
    description: 'Designer sneakers, formal leather shoes, hiking boots, party heels, and traditional juttis',
    popular: false,
    bannerImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-500/20 to-orange-500/20',
    accentColor: 'amber',
    aliases: ['footwear'],
    subcategories: [
      'Designer Sneakers & Streetwear',
      'Formal & Dress Shoes',
      'Trekking & Hiking Boots',
      'Sports & Running Shoes',
      'Traditional & Ethnic Juttis',
      'Party Heels & Stilettos',
      'Winter & Snow Boots',
    ],
  },

  // 3. Sports & Fitness
  {
    id: 'sports-fitness',
    name: 'Sports & Fitness',
    shortName: 'Sports',
    group: 'Active & Adventure',
    iconName: 'Dumbbell',
    description: 'Cricket bats, football gear, badminton rackets, gym dumbbells, yoga mats, and bicycles',
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    accentColor: 'emerald',
    aliases: ['sports', 'fitness'],
    subcategories: [
      'Cricket Equipment',
      'Football Equipment',
      'Badminton Rackets',
      'Tennis Equipment',
      'Dumbbells & Weights',
      'Gym Equipment',
      'Cycling & Accessories',
      'Yoga Mats & Accessories',
      'Table Tennis Equipment',
      'Combat & Boxing Gear',
    ],
  },

  // 4. Travel & Bags
  {
    id: 'travel-bags',
    name: 'Travel & Bags',
    shortName: 'Travel & Bags',
    group: 'Active & Adventure',
    iconName: 'Luggage',
    description: 'Hardside luggage trolleys, travel backpacks, trekking rucksacks, duffels, and designer bags',
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-sky-500/20 to-blue-500/20',
    accentColor: 'sky',
    aliases: ['travel-luggage', 'travel', 'luggage', 'bags'],
    subcategories: [
      'Suitcases & Trolleys',
      'Travel Backpacks',
      'Hiking Backpacks',
      'Duffel Bags',
      'Designer Handbags & Clutches',
      'Laptop Bags & Briefcases',
      'Travel Organizers & Packing Cubes',
      'Luggage Scales & Accessories',
    ],
  },

  // 5. Electronics
  {
    id: 'electronics',
    name: 'Electronics',
    shortName: 'Electronics',
    group: 'Tech & Creativity',
    iconName: 'Smartphone',
    description: 'DSLR and mirrorless cameras, 4K drones, laptops, tablets, smart projectors, and audio rigs',
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    accentColor: 'cyan',
    aliases: ['electronics-gadgets', 'gadgets', 'cameras-creation', 'cameras'],
    subcategories: [
      'DSLR Cameras',
      'Mirrorless Cameras',
      'Camera Lenses',
      'Tripods & Gimbals',
      'Drones',
      'Laptops',
      'Tablets & iPads',
      'Projectors',
      'Headphones & Earphones',
      'Speakers & Soundbars',
      'Gaming Consoles',
      'Power Banks & Chargers',
    ],
  },

  // 6. Books
  {
    id: 'books',
    name: 'Books',
    shortName: 'Books',
    group: 'Tech & Creativity',
    iconName: 'BookOpen',
    description: 'Academic textbooks, JEE & NEET competitive prep, bestselling novels, manga, and reference guides',
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-indigo-500/20 to-blue-500/20',
    accentColor: 'indigo',
    aliases: ['books-education', 'education'],
    subcategories: [
      'Academic Textbooks',
      'Competitive Exam Books (JEE, NEET, UPSC)',
      'Novels & Fiction',
      'Non-Fiction & Self-Help',
      'Comics & Manga',
      'Children\'s Books',
      'Reference & Study Guides',
      'Calculators & Scientific Instruments',
    ],
  },

  // 7. Home & Kitchen
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    shortName: 'Home & Kitchen',
    group: 'Home & Living',
    iconName: 'UtensilsCrossed',
    description: 'Air fryers, heavy mixers, espresso machines, ergonomic chairs, study desks, and home appliances',
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-orange-500/20 to-amber-500/20',
    accentColor: 'orange',
    aliases: ['home-furniture', 'kitchen-appliances', 'kitchen', 'furniture', 'daily-essentials', 'home', 'appliances'],
    subcategories: [
      'Air Fryers',
      'Mixers & Grinders',
      'Coffee & Espresso Machines',
      'Microwave Ovens',
      'Induction Cooktops',
      'Vacuum Cleaners',
      'Office Chairs & Ergonomic Seating',
      'Folding & Event Tables',
      'Beds & Mattresses',
      'Home Decor & Lighting',
    ],
  },

  // 8. Accessories
  {
    id: 'accessories',
    name: 'Accessories',
    shortName: 'Accessories',
    group: 'Fashion & Style',
    iconName: 'Watch',
    description: 'Bridal jewellery sets, luxury wristwatches, designer sunglasses, cufflinks, and accessories',
    popular: false,
    bannerImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-violet-500/20 to-purple-500/20',
    accentColor: 'violet',
    aliases: ['fashion-accessories'],
    subcategories: [
      'Traditional & Wedding Jewellery Sets',
      'Luxury & Smart Watches',
      'Sunglasses & Designer Eyewear',
      'Belts & Leather Wallets',
      'Hats, Caps & Stoles',
      'Ties, Bowties & Cufflinks',
      'Hair Accessories & Brooches',
    ],
  },

  // 9. Beauty & Personal Care
  {
    id: 'beauty-personal-care',
    name: 'Beauty & Personal Care',
    shortName: 'Beauty & Care',
    group: 'Fashion & Style',
    iconName: 'Sparkles',
    description: 'Dyson stylers, salon hair dryers, facial massagers, LED light masks, and grooming tools',
    popular: false,
    bannerImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-pink-500/20 to-rose-400/20',
    accentColor: 'pink',
    aliases: ['beauty', 'personal-care'],
    safetyNotice: 'All beauty and grooming tools are sanitized with hospital-grade UV sterilizers between rentals.',
    subcategories: [
      'Hair Stylers & Curlers',
      'Hair Dryers & Diffusers',
      'Facial Massagers & Skincare Tools',
      'LED Light Therapy Masks',
      'Beard Trimmers & Grooming Kits',
      'Body Massagers & Recovery Guns',
    ],
  },

  // 10. Tools
  {
    id: 'tools',
    name: 'Tools',
    shortName: 'Tools',
    group: 'Home & Living',
    iconName: 'Wrench',
    description: 'Cordless power drills, complete toolkits, pressure washers, laser levels, and garden tools',
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-amber-500/20 to-yellow-600/20',
    accentColor: 'amber',
    aliases: ['tools-diy', 'diy'],
    subcategories: [
      'Power Drills',
      'Toolkits & Hand Tools',
      'Pressure Washers',
      'Saws & Cutting Tools',
      'Sanders & Grinders',
      'Ladders & Step Stools',
      'Painting Equipment',
      'Measuring & Laser Tools',
      'Gardening Tools',
    ],
  },

  // 11. Toys & Games
  {
    id: 'toys-games',
    name: 'Toys & Games',
    shortName: 'Toys & Games',
    group: 'Events & Play',
    iconName: 'Gamepad2',
    description: 'Classic board games, LEGO architecture sets, STEM educational kits, and party table games',
    popular: false,
    bannerImage: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-red-500/20 to-orange-500/20',
    accentColor: 'red',
    aliases: ['toys', 'games'],
    subcategories: [
      'Board Games & Strategy Games',
      'LEGO & Building Sets',
      'STEM & Educational Kits',
      'Remote Control Toys',
      'Party Games & Card Games',
      'Outdoor & Lawn Games',
      'Kids\' Play Tents & Tunnels',
    ],
  },

  // 12. Party & Events
  {
    id: 'party-events',
    name: 'Party & Events',
    shortName: 'Party & Events',
    group: 'Events & Play',
    iconName: 'PartyPopper',
    description: 'High-power party speakers, laser lights, event projectors, photo backdrops, and buffet setups',
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-fuchsia-500/20 to-pink-500/20',
    accentColor: 'fuchsia',
    aliases: ['party-occasions', 'party', 'events'],
    subcategories: [
      'Party Speakers',
      'Party Lighting & Lasers',
      'Event Projectors & Screens',
      'Birthday & Anniversary Backdrops',
      'Wedding Decorations & Props',
      'Cake Stands & Buffet Serving Sets',
      'Pop-Up Event Tents',
      'Celebration Props & Photobooths',
    ],
  },

  // 13. Baby & Kids
  {
    id: 'baby-kids',
    name: 'Baby & Kids',
    shortName: 'Baby & Kids',
    group: 'Events & Play',
    iconName: 'Baby',
    description: 'Foldable baby strollers, car travel seats, high chairs, baby cots, and safety monitors',
    popular: false,
    bannerImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-teal-500/20 to-emerald-500/20',
    accentColor: 'teal',
    aliases: ['baby', 'kids'],
    safetyNotice: 'All baby gear is sanitized with hypoallergenic, pediatric-safe organic disinfectants.',
    subcategories: [
      'Baby Strollers',
      'Baby Travel Gear & Carriers',
      'High Chairs',
      'Baby Cots & Cribs',
      'Baby Monitors',
      'Kids\' Bicycles',
      'Play Equipment',
    ],
  },

  // 14. Musical Instruments
  {
    id: 'musical-instruments',
    name: 'Musical Instruments',
    shortName: 'Music',
    group: 'Tech & Creativity',
    iconName: 'Music',
    description: 'Acoustic and electric guitars, digital pianos, synthesizers, drum pads, and amplifiers',
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-purple-500/20 to-indigo-500/20',
    accentColor: 'purple',
    aliases: ['music-entertainment', 'music'],
    subcategories: [
      'Acoustic Guitars',
      'Electric Guitars',
      'Keyboards & Pianos',
      'Drums & Percussion',
      'Amplifiers & Interfaces',
      'DJ Equipment',
      'Microphones',
      'Violins & String Instruments',
    ],
  },

  // 15. Camping & Outdoors
  {
    id: 'camping-outdoors',
    name: 'Camping & Outdoors',
    shortName: 'Camping',
    group: 'Active & Adventure',
    iconName: 'Tent',
    description: 'Waterproof pop-up tents, sleeping bags, trekking gear, portable BBQ grills, and camp lights',
    popular: true,
    bannerImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-emerald-600/20 to-green-500/20',
    accentColor: 'emerald',
    aliases: ['outdoor-garden', 'outdoor', 'camping'],
    subcategories: [
      'Camping Tents',
      'Sleeping Bags & Mats',
      'Trekking Equipment',
      'Portable Camp Stoves',
      'Portable Coolers',
      'Camp Lighting & Lanterns',
      'Barbecue Equipment',
      'Outdoor Furniture',
    ],
  },

  // 16. Other
  {
    id: 'other',
    name: 'Other',
    shortName: 'Other',
    group: 'General & Other',
    iconName: 'Package',
    description: 'Mobility wheelchairs, heavy moving trolleys, pet carriers, car roof racks, and specialty equipment',
    popular: false,
    bannerImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    gradient: 'from-slate-600/20 to-slate-500/20',
    accentColor: 'slate',
    aliases: ['misc', 'health-wellness', 'home-moving', 'pet-accessories', 'vehicle-accessories', 'art-craft-hobbies', 'office-business'],
    safetyNotice: 'All mobility aids and pet travel carriers are steamed and disinfected before dispatch.',
    subcategories: [
      'Wheelchairs & Mobility Aids',
      'Moving Trolleys & Hand Trucks',
      'Pet Carriers & Travel Crates',
      'Vehicle & Bike Carriers',
      'Art & Craft Equipment',
      'Office & Business Equipment',
      'Miscellaneous Equipment',
    ],
  },
];

// Quick index map for fast category lookup
const CATEGORY_MAP = new Map<string, CategoryDefinition>();
CATEGORIES.forEach((cat) => {
  CATEGORY_MAP.set(cat.id, cat);
  cat.aliases?.forEach((alias) => CATEGORY_MAP.set(alias.toLowerCase(), cat));
});

export const getAllCategories = (): CategoryDefinition[] => CATEGORIES;

export const getPopularCategories = (): CategoryDefinition[] =>
  CATEGORIES.filter((cat) => cat.popular);

export const getCategoryById = (id: string): CategoryDefinition | undefined => {
  if (!id || id === 'all') return undefined;
  return CATEGORY_MAP.get(id.toLowerCase().trim());
};

export const normalizeCategoryId = (rawId: string): string => {
  if (!rawId || rawId === 'all') return 'all';
  const found = CATEGORY_MAP.get(rawId.toLowerCase().trim());
  return found ? found.id : rawId;
};

export const getCategoryName = (id: string): string => {
  if (!id || id === 'all') return 'All Categories';
  const cat = getCategoryById(id);
  return cat ? cat.name : id;
};

export const getSubcategoriesForCategory = (catId: string): string[] => {
  const cat = getCategoryById(catId);
  return cat ? cat.subcategories : [];
};

export const getCategoryGroups = (): { group: string; categories: CategoryDefinition[] }[] => {
  const groupsOrder: CategoryDefinition['group'][] = [
    'Fashion & Style',
    'Active & Adventure',
    'Tech & Creativity',
    'Home & Living',
    'Events & Play',
    'General & Other',
  ];

  return groupsOrder.map((group) => ({
    group,
    categories: CATEGORIES.filter((cat) => cat.group === group),
  }));
};
