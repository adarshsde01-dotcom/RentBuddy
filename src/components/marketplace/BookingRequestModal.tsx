import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Info,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RentalItem, RentalBooking } from '../../types/rental';
import { createNewBooking, getCurrentUser } from '../../services/storage';
import { getOptimizedImageUrl } from '../../services/cloudinary';

interface BookingRequestModalProps {
  item: RentalItem | null;
  calculation: {
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
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirmed: (booking: RentalBooking) => void;
}

export const BookingRequestModal: React.FC<BookingRequestModalProps> = ({
  item,
  calculation,
  isOpen,
  onClose,
  onBookingConfirmed,
}) => {
  const currentUser = getCurrentUser();
  const [renterName, setRenterName] = useState(currentUser.name);
  const [renterEmail, setRenterEmail] = useState(currentUser.email);
  const [pickupType, setPickupType] = useState<'local_pickup' | 'delivery'>('local_pickup');
  const [renterMessage, setRenterMessage] = useState(
    'Hi! I will take great care of your equipment. Excited to use this for my upcoming project.'
  );
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !item || !calculation) return null;

  const deliverySurcharge = pickupType === 'delivery' ? 199 : 0;
  const finalTotal = Math.round((calculation.totalPayable + deliverySurcharge) * 100) / 100;

  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string } = {};

    if (!renterName.trim() || renterName.trim().length < 2) {
      newErrors.name = 'Please provide your full name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!renterEmail.trim() || !emailRegex.test(renterEmail.trim())) {
      newErrors.email = 'Please provide a valid email address (e.g., name@example.com).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newBooking = createNewBooking({
        itemId: item.id,
        itemTitle: item.title,
        itemImage: item.images[0],
        itemCategory: item.category,
        renterName: renterName.trim(),
        renterEmail: renterEmail.trim(),
        ownerId: item.owner.id,
        startDate: calculation.startDate,
        endDate: calculation.endDate,
        totalDays: calculation.totalDays,
        dailyRate: calculation.dailyRate,
        baseTotal: calculation.baseTotal,
        discountAmount: calculation.discountAmount,
        serviceFee: calculation.serviceFee,
        securityDeposit: calculation.securityDeposit,
        totalPayable: finalTotal,
        savingsVsRetail: calculation.savingsVsRetail,
        status: 'pending',
        pickupType,
        renterMessage: renterMessage.trim(),
      });

      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#14b8a6', '#38bdf8', '#fbbf24'],
        });
      } catch (err) {
        console.error('Confetti animation failed', err);
      }

      setTimeout(() => {
        setIsSubmitting(false);
        onBookingConfirmed(newBooking);
      }, 500);
    } catch (err) {
      console.error('Booking failed', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-white">Complete Booking Request</h2>
              <p className="text-xs text-slate-400">Reserve item with owner approval</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Item Summary Card */}
        <div className="my-5 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-4">
          <img
            src={getOptimizedImageUrl(item.images[0] || '', { width: 160, height: 160, crop: 'thumb', quality: 'auto', format: 'auto' })}
            alt={item.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=160&q=80';
            }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-slate-700 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                {calculation.startDate} to {calculation.endDate} ({calculation.totalDays} {calculation.totalDays === 1 ? 'day' : 'days'})
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span>Lender: <strong className="text-slate-200">{item.owner.name}</strong></span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">₹{item.dailyPrice.toLocaleString('en-IN')}/day</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleConfirm} className="space-y-4">
          {/* Renter Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                value={renterName}
                onChange={(e) => {
                  setRenterName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                required
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-slate-100 text-xs sm:text-sm focus:outline-none transition-colors ${
                  errors.name
                    ? 'border-rose-500/80 focus:border-rose-500'
                    : 'border-slate-700 focus:border-emerald-500'
                }`}
              />
              {errors.name && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Your Contact Email *
              </label>
              <input
                type="email"
                value={renterEmail}
                onChange={(e) => {
                  setRenterEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                required
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-slate-100 text-xs sm:text-sm focus:outline-none transition-colors ${
                  errors.email
                    ? 'border-rose-500/80 focus:border-rose-500'
                    : 'border-slate-700 focus:border-emerald-500'
                }`}
              />
              {errors.email && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Pickup / Handover Option */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Select Handover Preference
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPickupType('local_pickup')}
                className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                  pickupType === 'local_pickup'
                    ? 'bg-emerald-500/10 border-emerald-500/60 text-emerald-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-white block">Local Pickup (Free)</span>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Meet lender at safe location: {item.location}
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPickupType('delivery')}
                className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                  pickupType === 'delivery'
                    ? 'bg-emerald-500/10 border-emerald-500/60 text-emerald-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Truck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-white block">Doorstep Delivery (+₹199)</span>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Eco-courier dropoff and pickup at your doorstep
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Message to Owner */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Note or Request for Owner (Optional)
            </label>
            <textarea
              rows={2}
              value={renterMessage}
              onChange={(e) => setRenterMessage(e.target.value)}
              placeholder="Tell the owner what you are using it for or your estimated pickup hour..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          {/* Pricing Summary Final */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Rental Charges ({calculation.totalDays} {calculation.totalDays === 1 ? 'day' : 'days'}):</span>
              <span className="font-semibold text-slate-100">
                ₹{(calculation.baseTotal - calculation.discountAmount).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Platform & Community Protection Fee (5%):</span>
              <span className="font-semibold text-slate-100">₹{calculation.serviceFee.toFixed(2)}</span>
            </div>

            {deliverySurcharge > 0 && (
              <div className="flex justify-between text-teal-300">
                <span>Doorstep Delivery Surcharge:</span>
                <span className="font-semibold">₹{deliverySurcharge.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between pt-1.5 border-t border-slate-800/80 text-emerald-400 font-medium">
              <span>Subtotal Non-Refundable Rental Cost:</span>
              <span>₹{((calculation.baseTotal - calculation.discountAmount) + calculation.serviceFee + deliverySurcharge).toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center pt-1.5 border-t border-slate-800/80">
              <div className="flex flex-col">
                <span className="font-semibold text-slate-200">Refundable Security Deposit</span>
                <span className="text-[10px] text-emerald-400">100% refunded after return • Escrow hold, not a rental fee</span>
              </div>
              <span className="font-semibold text-slate-100">
                ₹{calculation.securityDeposit.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2.5 border-t border-slate-700/80 text-sm font-bold text-white">
              <div>
                <span>Total Due at Checkout</span>
                <span className="text-[10px] text-slate-400 block font-normal">Rental cost + refundable deposit hold</span>
              </div>
              <span className="text-emerald-400 font-heading text-lg">₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Transparent Demo Mode Disclaimer */}
          <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 flex items-start gap-2.5 text-[11px] text-slate-400">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-300">Hackathon Simulation Mode: </span>
              No real credit cards or financial transactions are billed. Upon request submission, the booking is added directly to your User Dashboard and the Owner's incoming requests queue.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs sm:text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting Request...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Send Rental Request</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
