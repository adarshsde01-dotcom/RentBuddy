import React, { useState } from 'react';
import { Star, MapPin, ShieldCheck, Sparkles, Check, ArrowRight, PackageOpen, Cloud } from 'lucide-react';
import { RentalItem } from '../../types/rental';
import { getOptimizedImageUrl } from '../../services/cloudinary';
import { getCategoryName } from '../../data/categories';
import { calculateBenchmarkSavings } from '../../utils/pricing';

interface ProductCardProps {
  item: RentalItem;
  onSelect: (item: RentalItem) => void;
  onRentClick: (item: RentalItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  onSelect,
  onRentClick,
}) => {
  const [imgError, setImgError] = useState(false);

  const optimizedImage = getOptimizedImageUrl(item.images[0] || '', {
    width: 600,
    height: 400,
    crop: 'fill',
    quality: 'auto',
  });

  const benchmark = calculateBenchmarkSavings(item, 7);
  const categoryDisplayName = getCategoryName(item.category);

  return (
    <div className="group relative bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col justify-between">
      {/* Image Container with Badges */}
      <div 
        onClick={() => onSelect(item)}
        className="relative w-full h-52 sm:h-56 overflow-hidden bg-slate-950 cursor-pointer"
      >
        {!imgError ? (
          <img
            src={optimizedImage}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-4 text-center">
            <PackageOpen className="w-10 h-10 text-emerald-400/80 mb-2" />
            <span className="text-xs font-bold text-slate-300">{item.title}</span>
            <span className="text-[10px] text-emerald-400 mt-1">{item.subcategory || categoryDisplayName}</span>
          </div>
        )}
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
              {item.condition}
            </span>
            {item.featured && (
              <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 backdrop-blur-md text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Popular
              </span>
            )}
          </div>

          <span
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border flex items-center gap-1.5 ${
              item.isAvailable
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-900/80 text-slate-400 border-slate-700'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                item.isAvailable ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
              }`}
            />
            {item.isAvailable ? 'Available Now' : 'Reserved'}
          </span>
        </div>

        {/* Weekly Discount / Savings Ribbon */}
        {item.weeklyDiscountPercent > 0 && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-950/90 border border-teal-500/40 text-teal-300 backdrop-blur-sm">
              Save {item.weeklyDiscountPercent}% for 7+ days
            </span>
          </div>
        )}

        {/* Cloudinary CDN Indicator Badge (when no weekly discount on bottom-left, or placed cleanly) */}
        {(item.images[0]?.includes('res.cloudinary.com') ||
          item.images[0]?.startsWith('samples/') ||
          item.images[0]?.startsWith('cld-sample')) && (
          <div className={`absolute ${item.weeklyDiscountPercent > 0 ? 'top-12 left-3' : 'bottom-3 left-3'}`}>
            <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-slate-950/90 border border-sky-500/40 text-sky-300 backdrop-blur-sm flex items-center gap-1 shadow-sm">
              <Cloud className="w-2.5 h-2.5 text-sky-400" /> Cloudinary CDN
            </span>
          </div>
        )}

        {/* Hygiene / Sanitized tag */}
        {item.hygieneCleaned && (
          <div className="absolute bottom-3 right-3">
            <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 backdrop-blur-sm flex items-center gap-0.5">
              <Check className="w-3 h-3" /> Sanitized
            </span>
          </div>
        )}
      </div>

      {/* Details Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Subcategory & Category breadcrumb */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span className="font-semibold text-emerald-400 truncate max-w-[170px]">
              {item.subcategory || categoryDisplayName}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{item.rating.toFixed(1)}</span>
              <span className="text-slate-400 text-[10px]">({item.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onSelect(item)}
            className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors cursor-pointer line-clamp-2 leading-snug"
            title={item.title}
          >
            {item.title}
          </h3>

          {/* Location and available quantity */}
          <div className="flex items-center justify-between text-xs text-slate-400 mt-1.5">
            <span className="flex items-center gap-1 truncate max-w-[190px]">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{item.city ? `${item.city} • ${item.pickupLocation || item.location}` : item.location}</span>
            </span>
            {item.availableQuantity && item.availableQuantity > 1 && (
              <span className="text-[10px] text-slate-400 font-medium">
                {item.availableQuantity} units
              </span>
            )}
          </div>

          {/* Short description */}
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Pricing & Savings Box */}
        <div className="pt-2 border-t border-slate-800/80 space-y-2">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-black text-emerald-400 font-heading">
                ₹{item.dailyPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400 font-medium ml-1">/ day</span>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">Refundable Deposit</span>
              <span className="text-xs font-semibold text-slate-300">₹{item.securityDeposit.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 px-0.5">
            <span>Est. Retail: ~₹{item.replacementValue.toLocaleString('en-IN')}</span>
            <span className="text-emerald-400/90 font-medium">100% deposit refund</span>
          </div>

          {/* Social Impact / Savings Tag with transparent duration disclosure */}
          <div 
            className="px-2.5 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-between text-[11px]"
            title={`Based on ~₹${benchmark.estimatedPurchasePrice.toLocaleString('en-IN')} estimated retail purchase price minus ~₹${benchmark.rentalCost.toLocaleString('en-IN')} 7-day rental charges (incl. 5% platform fee). Refundable deposit (₹${item.securityDeposit.toLocaleString('en-IN')}) is held in escrow and is not an expense.`}
          >
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Save vs Buying (7d):
            </span>
            <span className="font-bold text-emerald-300">~₹{benchmark.savings.toLocaleString('en-IN')}</span>
          </div>

          {/* Owner info & Action button */}
          <div className="pt-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <img
                src={item.owner.avatar}
                alt={item.owner.name}
                className="w-7 h-7 rounded-full object-cover border border-slate-700 shrink-0"
              />
              <div className="truncate">
                <span className="text-xs font-semibold text-slate-200 block truncate leading-tight">
                  {item.owner.name}
                </span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                  <Check className="w-3 h-3" /> Verified
                </span>
              </div>
            </div>

            <button
              onClick={() => onRentClick(item)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-100 text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shrink-0 shadow-sm active:scale-95"
            >
              <span>Rent Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
