import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Package, 
  Truck, 
  ShieldCheck, 
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CategoryType, ItemCondition, RentalItem } from '../../types/rental';
import { getAllCategories, getSubcategoriesForCategory, normalizeCategoryId } from '../../data/categories';
import { createNewItem, getCurrentUser } from '../../services/storage';
import { CloudinaryUploader } from './CloudinaryUploader';

interface ListItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemCreated: (item: RentalItem) => void;
  onOpenCloudinarySettings: () => void;
}

const CITIES = ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata'];
const CONDITIONS: ItemCondition[] = ['New', 'Like New', 'Excellent', 'Good', 'Fair'];

// Precompute default dates outside component render
const getInitialDates = () => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const nextQuarter = new Date();
  nextQuarter.setMonth(nextQuarter.getMonth() + 3);
  const untilStr = nextQuarter.toISOString().split('T')[0];
  return { todayStr, untilStr };
};

export const ListItemModal: React.FC<ListItemModalProps> = ({
  isOpen,
  onClose,
  onItemCreated,
  onOpenCloudinarySettings,
}) => {
  const categories = getAllCategories();
  const initialDates = getInitialDates();
  const defaultCat = (categories[0]?.id as CategoryType) || 'clothing';
  const defaultSubcats = getSubcategoriesForCategory(defaultCat);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>(defaultCat);
  const [subcategory, setSubcategory] = useState(defaultSubcats[0] || '');
  const [description, setDescription] = useState('');
  const [dailyPrice, setDailyPrice] = useState<number | ''>(499);
  const [weeklyPrice, setWeeklyPrice] = useState<number | ''>(2499);
  const [securityDeposit, setSecurityDeposit] = useState<number | ''>(2000);
  const [replacementValue, setReplacementValue] = useState<number | ''>(15000);
  const [condition, setCondition] = useState<ItemCondition>('Like New');
  const [quantity, setQuantity] = useState<number>(1);
  const [city, setCity] = useState('Bengaluru');
  const [pickupLocation, setPickupLocation] = useState('Koramangala 4th Block');
  
  const [availableFrom, setAvailableFrom] = useState(initialDates.todayStr);
  const [availableUntil, setAvailableUntil] = useState(initialDates.untilStr);

  // Delivery & Contact
  const [pickupOption, setPickupOption] = useState<boolean>(true);
  const [deliveryOption, setDeliveryOption] = useState<boolean>(true);
  const [courierOption, setCourierOption] = useState<boolean>(false);
  const [contactPreference, setContactPreference] = useState<'in_app' | 'phone' | 'email'>('in_app');
  const [contactPhone, setContactPhone] = useState('+91 98765 43210');
  const [contactEmail, setContactEmail] = useState('owner@example.com');

  // Media
  const [images, setImages] = useState<string[]>([]);
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Specs & Rules
  const [specInput, setSpecInput] = useState('');
  const [ruleInput, setRuleInput] = useState('');
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>([
    { label: 'Condition Details', value: 'Complete working condition with original accessories' },
  ]);
  const [rules, setRules] = useState<string[]>([
    'Clean and inspect prior to handover',
    'Keep in protective case when not in use',
    'Report any functional issues immediately',
  ]);
  const [termsAndInstructions, setTermsAndInstructions] = useState<string>('');

  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Direct category switcher updating subcategory synchronously
  const handleCategoryChange = (newCatId: CategoryType) => {
    setCategory(newCatId);
    const subcats = getSubcategoriesForCategory(normalizeCategoryId(newCatId));
    setSubcategory(subcats.length > 0 ? subcats[0] : '');
  };

  // Auto-sync weekly price estimate if empty or daily rate changes
  const handleDailyPriceChange = (val: number | '') => {
    setDailyPrice(val);
    if (val && (!weeklyPrice || weeklyPrice === 0)) {
      setWeeklyPrice(Math.round(val * 7 * 0.75));
    }
  };

  if (!isOpen) return null;

  const handleAddSpec = () => {
    if (!specInput.trim()) return;
    const parts = specInput.split(':');
    if (parts.length >= 2) {
      setSpecs([...specs, { label: parts[0].trim(), value: parts.slice(1).join(':').trim() }]);
    } else {
      setSpecs([...specs, { label: 'Included', value: specInput.trim() }]);
    }
    setSpecInput('');
  };

  const handleAddRule = () => {
    if (!ruleInput.trim()) return;
    setRules([...rules, ruleInput.trim()]);
    setRuleInput('');
  };

  const handleAddCustomImage = () => {
    if (!customImageUrl.trim()) return;
    setImages([...images, customImageUrl.trim()]);
    setCustomImageUrl('');
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];
    if (!title.trim() || title.trim().length < 4) {
      errors.push('Title must be at least 4 characters long.');
    }
    if (!category) {
      errors.push('Please select a main category.');
    }
    if (!dailyPrice || Number(dailyPrice) <= 0) {
      errors.push('Daily rental price must be greater than ₹0.');
    }
    if (!securityDeposit || Number(securityDeposit) < 0) {
      errors.push('Please enter a valid security deposit.');
    }
    if (!replacementValue || Number(replacementValue) <= 0) {
      errors.push('Estimated replacement value is required for insurance calculation.');
    }
    if (!city.trim() || !pickupLocation.trim()) {
      errors.push('City and pickup location are required.');
    }
    if (!pickupOption && !deliveryOption && !courierOption) {
      errors.push('Select at least one delivery or pickup option.');
    }
    if (availableFrom && availableUntil && availableFrom > availableUntil) {
      errors.push('Available-until date must be after available-from date.');
    }
    if (!agreedToTerms) {
      errors.push('You must agree to the platform rental terms.');
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const selectedCatDef = categories.find((c) => c.id === normalizeCategoryId(category));
    const finalImages = images.length > 0 
      ? images 
      : [selectedCatDef?.bannerImage || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80'];

    const numDailyPrice = Number(dailyPrice);
    const numWeeklyPrice = weeklyPrice ? Number(weeklyPrice) : Math.round(numDailyPrice * 7 * 0.8);
    const calculatedDiscount = Math.max(0, Math.round(((numDailyPrice * 7 - numWeeklyPrice) / (numDailyPrice * 7)) * 100));

    const selectedDeliveryOptions: string[] = [];
    if (pickupOption) selectedDeliveryOptions.push('local_pickup');
    if (deliveryOption) selectedDeliveryOptions.push('home_delivery');
    if (courierOption) selectedDeliveryOptions.push('courier');

    try {
      const newItem = createNewItem({
        title: title.trim(),
        category,
        subcategory: subcategory.trim() || undefined,
        description: description.trim() || `${title.trim()} available for flexible daily and weekly rental in ${city}. Kept in ${condition} condition.`,
        images: finalImages,
        dailyPrice: numDailyPrice,
        weeklyPrice: numWeeklyPrice,
        weeklyDiscountPercent: calculatedDiscount,
        securityDeposit: Number(securityDeposit),
        replacementValue: Number(replacementValue),
        condition,
        location: `${city}, ${pickupLocation.trim()}`,
        city,
        pickupLocation: pickupLocation.trim(),
        availableQuantity: quantity || 1,
        availableFrom,
        availableUntil,
        deliveryOptions: selectedDeliveryOptions,
        ownerContactPreference: contactPreference,
        ownerContact: {
          phone: contactPreference === 'phone' ? contactPhone : undefined,
          email: contactPreference === 'email' ? contactEmail : undefined,
          preference: contactPreference,
        },
        termsAndInstructions: termsAndInstructions ? [termsAndInstructions] : undefined,
        owner: (() => {
          const user = getCurrentUser();
          return {
            id: user.id,
            name: `${user.name} (You)`,
            avatar: user.avatar,
            rating: user.rating,
            reviewsCount: user.reviewsCount,
            joinedDate: user.joinedDate,
            responseTime: user.responseTime,
            verified: user.verified,
            location: `${city}, ${pickupLocation.trim()}`,
          };
        })(),
        isAvailable: true,
        rating: 5.0,
        reviewCount: 0,
        featured: true,
        specs,
        rules,
        tags: [category, subcategory, condition, city, 'Verified'],
      });

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10b981', '#14b8a6', '#0ea5e9'],
        });
      } catch (err) {
        console.error('Confetti failed', err);
      }

      setTimeout(() => {
        setIsSubmitting(false);
        onItemCreated(newItem);
        onClose();
      }, 500);
    } catch (err) {
      console.error('Failed to create item', err);
      setIsSubmitting(false);
      setValidationErrors(['An unexpected error occurred while saving. Please try again.']);
    }
  };

  const currentCatSubcategories = getSubcategoriesForCategory(normalizeCategoryId(category));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                List an Item for Rent
              </h2>
              <p className="text-xs text-slate-400">
                Share your gear across {categories.length} supported categories • Earn recurring income safely
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Validation Errors Callout */}
        {validationErrors.length > 0 && (
          <div className="my-3 p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs space-y-1">
            <div className="flex items-center gap-2 font-bold text-rose-200">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>Please resolve the following before listing:</span>
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-rose-300 pl-2">
              {validationErrors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 space-y-6 pt-4 pr-1">
          
          {/* Section 1: Item Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Package className="w-4 h-4" /> 1. Category & Item Information
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Item Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sony Alpha A7 IV Mirrorless, Quechua 3-Person Tent, or Banarasi Silk Saree"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Main Category Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Main Category * ({categories.length} supported)
                </label>
                <select
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value as CategoryType)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.group})
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory Dropdown (Dynamic based on selected main category) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Subcategory *
                </label>
                <select
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {currentCatSubcategories.map((subcat) => (
                    <option key={subcat} value={subcat}>
                      {subcat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Item Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe condition, what is included (cases, cables, lenses), special features, and ideal use cases..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Condition, Quantity & Replacement Value */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Item Condition *
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as ItemCondition)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {CONDITIONS.map((cond) => (
                    <option key={cond} value={cond}>
                      {cond}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Available Quantity *
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Retail Replacement Value (₹) *
                </label>
                <input
                  type="number"
                  required
                  min="100"
                  value={replacementValue}
                  onChange={(e) => setReplacementValue(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="e.g. 25000"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Deposit */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <span>₹</span> 2. Rental Pricing & Security Deposit
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Daily Rental Price (₹/day) *
                </label>
                <input
                  type="number"
                  required
                  min="10"
                  value={dailyPrice}
                  onChange={(e) => handleDailyPriceChange(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="e.g. 499"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 font-bold text-emerald-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Weekly Rental Price (₹/week, Optional)
                </label>
                <input
                  type="number"
                  min="50"
                  value={weeklyPrice}
                  onChange={(e) => setWeeklyPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="e.g. 2499 (Discounted)"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-400">
                  {dailyPrice && weeklyPrice
                    ? `~${Math.round(((Number(dailyPrice) * 7 - Number(weeklyPrice)) / (Number(dailyPrice) * 7)) * 100)}% weekly discount`
                    : 'Encourages longer bookings'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Refundable Security Deposit (₹) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={securityDeposit}
                  onChange={(e) => setSecurityDeposit(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="e.g. 2000"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-400">
                  Protected in Escrow, refunded on return
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Location & Availability Dates */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <MapPin className="w-4 h-4" /> 3. Location & Availability Calendar
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  City *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Pickup Location & Area *
                </label>
                <input
                  type="text"
                  required
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="e.g. Koramangala 4th Block, near Wipro Park"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Date Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Available From *
                </label>
                <input
                  type="date"
                  required
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Available Until *
                </label>
                <input
                  type="date"
                  required
                  value={availableUntil}
                  onChange={(e) => setAvailableUntil(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Delivery & Handover Options */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Truck className="w-4 h-4" /> 4. Handover & Delivery Options
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-700 bg-slate-950 cursor-pointer hover:border-emerald-500/50 transition-colors">
                <input
                  type="checkbox"
                  checked={pickupOption}
                  onChange={(e) => setPickupOption(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 accent-emerald-500"
                />
                <span className="text-xs font-medium text-slate-200">Local Pickup (Free)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-700 bg-slate-950 cursor-pointer hover:border-emerald-500/50 transition-colors">
                <input
                  type="checkbox"
                  checked={deliveryOption}
                  onChange={(e) => setDeliveryOption(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 accent-emerald-500"
                />
                <span className="text-xs font-medium text-slate-200">Owner Doorstep Delivery</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-700 bg-slate-950 cursor-pointer hover:border-emerald-500/50 transition-colors">
                <input
                  type="checkbox"
                  checked={courierOption}
                  onChange={(e) => setCourierOption(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 accent-emerald-500"
                />
                <span className="text-xs font-medium text-slate-200">Courier / Shipping</span>
              </label>
            </div>

            {/* Owner Contact Preference */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-semibold text-slate-300">
                Owner Communication Preference
              </label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="contactPref"
                    value="in_app"
                    checked={contactPreference === 'in_app'}
                    onChange={() => setContactPreference('in_app')}
                    className="accent-emerald-500"
                  />
                  <span>RentBuddy In-App Messaging (Recommended for privacy)</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="contactPref"
                    value="phone"
                    checked={contactPreference === 'phone'}
                    onChange={() => setContactPreference('phone')}
                    className="accent-emerald-500"
                  />
                  <span>Phone / WhatsApp Handover</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="radio"
                    name="contactPref"
                    value="email"
                    checked={contactPreference === 'email'}
                    onChange={() => setContactPreference('email')}
                    className="accent-emerald-500"
                  />
                  <span>Email Confirmation</span>
                </label>
              </div>

              {contactPreference === 'phone' && (
                <div className="pt-2">
                  <label className="block text-[11px] text-slate-400 mb-1">Lender Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full sm:w-1/2 px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-100"
                  />
                </div>
              )}

              {contactPreference === 'email' && (
                <div className="pt-2">
                  <label className="block text-[11px] text-slate-400 mb-1">Lender Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full sm:w-1/2 px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-100"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Section 5: Media Upload */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Sparkles className="w-4 h-4" /> 5. Product Images & Media
            </h3>

            <CloudinaryUploader
              images={images}
              onChangeImages={setImages}
              onOpenSettings={onOpenCloudinarySettings}
            />

            {/* Quick URL addition fallback */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="url"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder="Or paste an image URL directly (e.g. Unsplash URL)..."
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-400"
              />
              <button
                type="button"
                onClick={handleAddCustomImage}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
              >
                Add URL
              </button>
            </div>
          </div>

          {/* Section 6: Terms, Specs & Usage Instructions */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <ShieldCheck className="w-4 h-4" /> 6. Terms, Rules & Usage Instructions
            </h3>

            {/* Key Specs Input */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                Key Specs & Included Accessories
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={specInput}
                  onChange={(e) => setSpecInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpec())}
                  placeholder="e.g. Battery: 2x Included or Sensor: 33MP (or Label: Value)"
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-400"
                />
                <button
                  type="button"
                  onClick={handleAddSpec}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {specs.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {specs.map((sp, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-xs bg-slate-950 p-1.5 px-2.5 rounded-lg border border-slate-800 text-slate-300"
                    >
                      <strong className="text-emerald-400">{sp.label}:</strong> {sp.value}
                      <button
                        type="button"
                        onClick={() => setSpecs(specs.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-400 ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Rules */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-semibold text-slate-300">
                Lender Rules & Handling Guidelines
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={ruleInput}
                  onChange={(e) => setRuleInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRule())}
                  placeholder="e.g. Return with fully charged battery, or wipe dry after rain"
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-400"
                />
                <button
                  type="button"
                  onClick={handleAddRule}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {rules.length > 0 && (
                <ul className="space-y-1 pt-1">
                  {rules.map((rule, idx) => (
                    <li key={idx} className="flex items-center justify-between text-xs text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                      <span>• {rule}</span>
                      <button
                        type="button"
                        onClick={() => setRules(rules.filter((_, i) => i !== idx))}
                        className="text-slate-400 hover:text-rose-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Terms & Usage Instructions */}
            <div className="space-y-1 pt-1">
              <label className="block text-xs font-semibold text-slate-300">
                Terms and Usage Instructions
              </label>
              <textarea
                rows={2}
                value={termsAndInstructions}
                onChange={(e) => setTermsAndInstructions(e.target.value)}
                placeholder="e.g. Disinfected before dispatch. Borrower must carry valid ID proof upon pickup. For indoor use only."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Agreement Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-emerald-500 accent-emerald-500"
                />
                <span className="text-xs text-slate-400 leading-relaxed">
                  I confirm this item is in safe, fully operational condition. I understand that RentBuddy holds refundable borrower security deposits in escrow and covers damages up to ₹2,00,000 under verified platform policy.
                </span>
              </label>
            </div>
          </div>

          {/* Form Footer Action */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3 sticky bottom-0 bg-slate-900 py-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'Publishing Listing...' : 'Publish Rental Listing'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
