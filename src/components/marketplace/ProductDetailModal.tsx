import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  AlertTriangle, 
  Clock, 
  Share2, 
  Heart,
  ChevronRight,
  Calendar,
  Truck,
  Package,
  Info,
  Cloud,
  IndianRupee,
  Tag
} from 'lucide-react';
import { RentalItem } from '../../types/rental';
import { RentalPriceCalculator } from './RentalPriceCalculator';
import { getOptimizedImageUrl } from '../../services/cloudinary';
import { getCategoryName } from '../../data/categories';

interface ProductDetailModalProps {
  item: RentalItem | null;
  isOpen: boolean;
  onClose: () => void;
  onProceedToBooking: (calculation: any) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onProceedToBooking,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [prevItemId, setPrevItemId] = useState(item?.id);
  const [isFavorited, setIsFavorited] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (item?.id !== prevItemId) {
    setPrevItemId(item?.id);
    setSelectedImageIndex(0);
    setImgError(false);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const categoryName = getCategoryName(item.category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto text-slate-100 max-h-[92vh] flex flex-col">
        
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/95 border-b border-slate-800 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="uppercase font-semibold tracking-wider text-emerald-400">
              {categoryName}
            </span>
            {item.subcategory && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-emerald-300 font-medium">{item.subcategory}</span>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="truncate max-w-[180px] sm:max-w-md text-slate-300">
              {item.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              title="Share item link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copiedLink && (
              <span className="text-[11px] text-emerald-400 font-medium">Link copied!</span>
            )}
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className={`p-2 rounded-xl hover:bg-slate-800 transition-colors ${
                isFavorited ? 'text-rose-400' : 'text-slate-400 hover:text-white'
              }`}
              title="Favorite item"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Media & Product Details (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Main Image Gallery Preview */}
              <div className="space-y-3">
                <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                  {!imgError ? (
                    <img
                      src={getOptimizedImageUrl(item.images[selectedImageIndex] || item.images[0], {
                        width: 900,
                        height: 600,
                        crop: 'fill',
                        quality: 'auto',
                      })}
                      alt={item.title}
                      className="w-full h-full object-cover object-center"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 text-center">
                      <Package className="w-12 h-12 text-emerald-400/80 mb-3" />
                      <span className="text-sm font-bold text-slate-200">{item.title}</span>
                      <span className="text-xs text-emerald-400 mt-1">{item.subcategory || categoryName}</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                      {item.condition}
                    </span>
                    {item.featured && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 backdrop-blur-md text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> High Demand
                      </span>
                    )}
                    {item.hygieneCleaned && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 backdrop-blur-md flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Sanitized
                      </span>
                    )}
                    {Boolean(
                      (item.images[selectedImageIndex] || item.images[0])?.includes('res.cloudinary.com') ||
                      (item.images[selectedImageIndex] || item.images[0])?.startsWith('samples/') ||
                      (item.images[selectedImageIndex] || item.images[0])?.startsWith('cld-sample')
                    ) && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-950/90 text-sky-300 border border-sky-500/40 backdrop-blur-md flex items-center gap-1">
                        <Cloud className="w-3.5 h-3.5 text-sky-400" /> Cloudinary CDN
                      </span>
                    )}
                  </div>
                </div>

                {/* Thumbnails */}
                {item.images.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto pb-1">
                    {item.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedImageIndex(idx);
                          setImgError(false);
                        }}
                        className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                          selectedImageIndex === idx
                            ? 'border-emerald-500 scale-105 shadow-md shadow-emerald-500/20'
                            : 'border-slate-800 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={getOptimizedImageUrl(img, { width: 160, height: 120, crop: 'thumb' })}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Location Header */}
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-1.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    {item.location}
                  </span>
                  <span>•</span>
                  <div className="flex items-center gap-1 text-amber-400 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{item.rating.toFixed(2)}</span>
                    <span className="text-slate-400">({item.reviewCount} reviews)</span>
                  </div>
                  {item.availableQuantity && item.availableQuantity > 1 && (
                    <>
                      <span>•</span>
                      <span className="text-slate-300 font-semibold flex items-center gap-1">
                        <Package className="w-3.5 h-3.5 text-emerald-400" />
                        {item.availableQuantity} units in stock
                      </span>
                    </>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading leading-tight">
                  {item.title}
                </h2>
              </div>

              {/* Delivery & Availability Calendar Quick Strip */}
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Rental Availability
                  </span>
                  <span className="text-slate-200 font-medium">
                    {item.availableFrom && item.availableUntil
                      ? `${item.availableFrom} to ${item.availableUntil}`
                      : 'Available for immediate booking'}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-teal-400" /> Handover Options
                  </span>
                  <span className="text-slate-200 font-medium">
                    {item.deliveryOptions && item.deliveryOptions.length > 0
                      ? item.deliveryOptions.map(opt => opt.replace('_', ' ')).join(' • ')
                      : 'Local Pickup & Direct Handover'}
                  </span>
                </div>
              </div>

              {/* Market Value & Escrow Protection Strip */}
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-400" /> Estimated Retail
                  </span>
                  <span className="text-slate-200 font-bold">~₹{item.replacementValue.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Approx. purchase price</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> Refundable Deposit
                  </span>
                  <span className="text-emerald-400 font-bold">₹{item.securityDeposit.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-emerald-400/90 block mt-0.5">100% refunded after return</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 text-sky-400" /> Long-Term Savings
                  </span>
                  <span className="text-teal-300 font-bold">{item.weeklyDiscountPercent || 15}% (7d+) • {item.monthlyDiscountPercent || 25}% (30d+)</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Applied automatically</span>
                </div>
              </div>

              {/* Safety notice if applicable */}
              {(item.safetyNotice || item.category === 'health-wellness' || item.category === 'pet-accessories') && (
                <div className="p-3 rounded-xl bg-teal-950/30 border border-teal-500/30 text-xs text-teal-200/90 flex items-start gap-2 leading-relaxed">
                  <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>
                    {item.safetyNotice ||
                      'Care & Safety Notice: This equipment is disinfected and checked prior to handover. Please review safety rules.'}
                  </span>
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Item Description
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Key Specs */}
              {item.specs && item.specs.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Technical Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {item.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col text-xs"
                      >
                        <span className="text-slate-400">{spec.label}</span>
                        <span className="font-semibold text-slate-200 mt-0.5">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rental Rules & Lender Guidelines */}
              {item.rules && item.rules.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    Owner Rental Guidelines
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {item.rules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Verified Owner Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.owner.avatar}
                      alt={item.owner.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/50"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-white text-sm">{item.owner.name}</h4>
                        <span className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400" title="Identity Verified">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Member since {item.owner.joinedDate} • {item.owner.location}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold justify-end">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{item.owner.rating}</span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {item.owner.reviewsCount} reviews
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    Response: <strong className="text-slate-200">{item.owner.responseTime}</strong>
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" /> Identity & Bank Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Pricing & Booking Calculator Widget (5 cols) */}
            <div className="lg:col-span-5">
              <div className="sticky top-20">
                <RentalPriceCalculator
                  item={item}
                  onProceedToBooking={onProceedToBooking}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
