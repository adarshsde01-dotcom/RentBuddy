import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Sparkles, 
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CategoryType, ItemCondition, RentalItem } from '../../types/rental';
import { createNewItem } from '../../services/storage';
import { CloudinaryUploader } from './CloudinaryUploader';

interface ListItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemCreated: (item: RentalItem) => void;
  onOpenCloudinarySettings: () => void;
}

export const ListItemModal: React.FC<ListItemModalProps> = ({
  isOpen,
  onClose,
  onItemCreated,
  onOpenCloudinarySettings,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('electronics');
  const [description, setDescription] = useState('');
  const [dailyPrice, setDailyPrice] = useState<number | ''>(499);
  const [weeklyDiscountPercent, setWeeklyDiscountPercent] = useState<number>(20);
  const [securityDeposit, setSecurityDeposit] = useState<number | ''>(2000);
  const [replacementValue, setReplacementValue] = useState<number | ''>(18000);
  const [condition, setCondition] = useState<ItemCondition>('Like New');
  const [location, setLocation] = useState('Bengaluru, KA (Koramangala)');
  const [images, setImages] = useState<string[]>([]);
  const [specInput, setSpecInput] = useState('');
  const [ruleInput, setRuleInput] = useState('');
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>([
    { label: 'Condition Details', value: 'Original packaging & all cords included' },
  ]);
  const [rules, setRules] = useState<string[]>([
    'Clean and inspect before returning',
    'Keep in protective case when not in use',
  ]);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAddSpec = () => {
    if (!specInput.trim()) return;
    const parts = specInput.split(':');
    if (parts.length >= 2) {
      setSpecs([...specs, { label: parts[0].trim(), value: parts.slice(1).join(':').trim() }]);
    } else {
      setSpecs([...specs, { label: 'Feature', value: specInput.trim() }]);
    }
    setSpecInput('');
  };

  const handleAddRule = () => {
    if (!ruleInput.trim()) return;
    setRules([...rules, ruleInput.trim()]);
    setRuleInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dailyPrice || !securityDeposit || !replacementValue) {
      alert('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    // If no images uploaded, supply a high-quality default matching category
    const finalImages = images.length > 0 ? images : [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80'
    ];

    try {
      const newItem = createNewItem({
        title: title.trim(),
        category,
        description: description.trim() || 'High quality equipment ready for your projects and travels.',
        images: finalImages,
        dailyPrice: Number(dailyPrice),
        weeklyDiscountPercent: Number(weeklyDiscountPercent),
        securityDeposit: Number(securityDeposit),
        replacementValue: Number(replacementValue),
        condition,
        location: location.trim(),
        owner: {
          id: `owner-${Date.now()}`,
          name: 'You (Lender)',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
          rating: 5.0,
          reviewsCount: 1,
          joinedDate: 'October 2026',
          responseTime: 'Within minutes',
          verified: true,
          location: location.trim(),
        },
        isAvailable: true,
        rating: 5.0,
        reviewCount: 0,
        featured: true,
        specs,
        rules,
        tags: [category, condition, 'Verified'],
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
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-white">List an Item for Rent</h2>
              <p className="text-xs text-slate-400">Earn passive income while reducing consumer waste</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 py-5 space-y-6 pr-1">
          
          {/* Cloudinary Image Uploader Widget */}
          <CloudinaryUploader
            images={images}
            onChangeImages={setImages}
            onOpenSettings={onOpenCloudinarySettings}
          />

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Item Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sony Alpha A7 IV Mirrorless Camera or DeWalt Drill Kit"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 placeholder-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="cameras">Cameras & Optics</option>
                <option value="electronics">Electronics & Drones</option>
                <option value="travel">Travel & Luggage</option>
                <option value="books">Books & Textbooks</option>
                <option value="kitchen">Kitchen & Hosting</option>
                <option value="tools">Tools & DIY</option>
                <option value="outdoor">Outdoor & Camping</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Description & What's Included *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe features, included accessories (cables, cases, chargers), and condition..."
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 placeholder-slate-500"
            />
          </div>

          {/* Pricing Row: Daily Price, Weekly Discount, Deposit, Replacement */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Daily Rate (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={dailyPrice}
                  onChange={(e) => setDailyPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  required
                  className="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 font-bold text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Weekly Discount (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={weeklyDiscountPercent}
                  onChange={(e) => setWeeklyDiscountPercent(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 font-bold text-sm focus:outline-none focus:border-emerald-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">%</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Security Deposit (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                <input
                  type="number"
                  min="50"
                  step="50"
                  value={securityDeposit}
                  onChange={(e) => setSecurityDeposit(e.target.value === '' ? '' : Number(e.target.value))}
                  required
                  className="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 font-bold text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Retail Value (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={replacementValue}
                  onChange={(e) => setReplacementValue(e.target.value === '' ? '' : Number(e.target.value))}
                  required
                  className="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 font-bold text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Condition and Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Item Condition *
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['Like New', 'Excellent', 'Good', 'Fair'] as ItemCondition[]).map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setCondition(c)}
                    className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all text-center ${
                      condition === c
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Pickup Location & Neighborhood *
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Austin, TX (Downtown) or Brooklyn, NY"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Technical Specs Adder */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Technical Specs & Inclusions
            </label>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={specInput}
                onChange={(e) => setSpecInput(e.target.value)}
                placeholder="e.g. Battery Life: 12 Hours or Included: Charger + Carrying Case"
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddSpec}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Spec
              </button>
            </div>

            {specs.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {specs.map((s, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300"
                  >
                    <strong>{s.label}:</strong> {s.value}
                    <button
                      type="button"
                      onClick={() => setSpecs(specs.filter((_, i) => i !== idx))}
                      className="text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Owner Rental Rules Adder */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Owner Rental Guidelines & Rules
            </label>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={ruleInput}
                onChange={(e) => setRuleInput(e.target.value)}
                placeholder="e.g. Clean and inspect before returning or No underwater usage"
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddRule}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Rule
              </button>
            </div>

            {rules.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {rules.map((r, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300"
                  >
                    <span>{r}</span>
                    <button
                      type="button"
                      onClick={() => setRules(rules.filter((_, i) => i !== idx))}
                      className="text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Escrow Guarantee Agreement */}
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-emerald-500 accent-emerald-500 cursor-pointer"
              />
              <span className="text-xs text-slate-300 leading-relaxed">
                I confirm this item is in working order and agree to the RentBuddy community trust pledge. I understand that security deposits are returned only after I verify the item is received back in good condition.
              </span>
            </label>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !agreedToTerms}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Publishing Listing...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Publish Rental Listing</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
