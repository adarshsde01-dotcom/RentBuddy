import React, { useState, useId } from 'react';
import { Calendar, ShieldAlert, Sparkles, CheckCircle2, ArrowRight, AlertTriangle } from 'lucide-react';
import { RentalItem } from '../../types/rental';
import { calculateRentalPricing } from '../../utils/pricing';

interface RentalPriceCalculatorProps {
  item: RentalItem;
  onProceedToBooking: (calculation: {
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
  }) => void;
}

// Helper to calculate initial dates outside render
const getInitialDates = () => {
  const now = new Date();
  const minDate = now.toISOString().split('T')[0];
  const start = new Date(now);
  start.setDate(now.getDate() + 1);
  const end = new Date(start);
  end.setDate(start.getDate() + 3);
  return {
    minDate,
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0],
  };
};

export const RentalPriceCalculator: React.FC<RentalPriceCalculatorProps> = ({
  item,
  onProceedToBooking,
}) => {
  const startDateId = useId();
  const endDateId = useId();

  // Helper to format YYYY-MM-DD
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const [dateDefaults] = useState(getInitialDates);
  const [startDate, setStartDate] = useState(dateDefaults.startDate);
  const [endDate, setEndDate] = useState(dateDefaults.endDate);

  // Compute difference in days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const calculatedDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Unified transparent pricing calculation
  const pricing = calculateRentalPricing(item, calculatedDays);

  const handleStartChange = (val: string) => {
    setStartDate(val);
    if (new Date(val) >= new Date(endDate)) {
      const nextDay = new Date(val);
      nextDay.setDate(nextDay.getDate() + 2);
      setEndDate(formatDate(nextDay));
    }
  };

  const handleEndChange = (val: string) => {
    if (new Date(val) <= new Date(startDate)) {
      return;
    }
    setEndDate(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProceedToBooking({
      startDate,
      endDate,
      totalDays: calculatedDays,
      dailyRate: pricing.dailyRate,
      baseTotal: pricing.baseTotal,
      discountAmount: pricing.discountAmount,
      serviceFee: pricing.serviceFee,
      securityDeposit: pricing.securityDeposit,
      totalPayable: pricing.totalPayable,
      savingsVsRetail: pricing.savingsVsRetail,
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h4 className="text-base font-bold text-white font-heading">
            Rental Duration & Price Breakdown
          </h4>
          <p className="text-xs text-slate-400">
            Transparent pricing • No hidden surprise charges
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-emerald-400 font-heading">
            ₹{item.dailyPrice.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-slate-400 block -mt-1">/ day</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor={startDateId} className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              Pickup Date
            </label>
            <input
              id={startDateId}
              type="date"
              min={dateDefaults.minDate}
              value={startDate}
              onChange={(e) => handleStartChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 cursor-pointer"
              required
            />
          </div>

          <div>
            <label htmlFor={endDateId} className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-teal-400" />
              Return Date
            </label>
            <input
              id={endDateId}
              type="date"
              min={startDate}
              value={endDate}
              onChange={(e) => handleEndChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 cursor-pointer"
              required
            />
          </div>
        </div>

        {/* Duration notification banner */}
        <div className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-300 font-medium">
            Selected Duration: <strong className="text-emerald-400 font-bold">{pricing.totalDays} {pricing.totalDays === 1 ? 'day' : 'days'}</strong>
          </span>
          {pricing.discountTier === 'monthly' ? (
            <span className="text-teal-300 font-bold flex items-center gap-1 bg-teal-950/80 px-2 py-0.5 rounded-md border border-teal-500/30">
              <Sparkles className="w-3 h-3 text-teal-300" /> {pricing.discountPercent}% monthly discount applied!
            </span>
          ) : pricing.discountTier === 'weekly' ? (
            <span className="text-teal-300 font-bold flex items-center gap-1 bg-teal-950/80 px-2 py-0.5 rounded-md border border-teal-500/30">
              <Sparkles className="w-3 h-3 text-teal-300" /> {pricing.discountPercent}% weekly discount unlocked!
            </span>
          ) : (
            <span className="text-slate-400 text-[11px]">
              Tip: Rent 7+ days for {item.weeklyDiscountPercent || 15}% off
            </span>
          )}
        </div>

        {/* Itemized Calculation */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2.5 text-xs text-slate-300">
          <div className="flex justify-between items-center">
            <span>
              ₹{pricing.dailyRate.toLocaleString('en-IN')} × {pricing.totalDays} {pricing.totalDays === 1 ? 'day' : 'days'}
            </span>
            <span className="font-semibold text-slate-100">₹{pricing.baseTotal.toFixed(2)}</span>
          </div>

          {pricing.discountAmount > 0 && (
            <div className="flex justify-between items-center text-teal-400">
              <span>{pricing.discountTier === 'monthly' ? 'Monthly' : 'Weekly'} Long-Term Discount ({pricing.discountPercent}%)</span>
              <span className="font-semibold">-₹{pricing.discountAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1 text-slate-300">
              Platform & Community Protection Fee (5%)
            </span>
            <span className="font-semibold text-slate-100">₹{pricing.serviceFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-slate-800/80">
            <span className="font-medium text-slate-300">
              Subtotal Rental Charges
            </span>
            <span className="font-bold text-emerald-400">₹{pricing.rentalCost.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-slate-800">
            <div className="flex flex-col">
              <span className="font-semibold text-slate-200">Refundable Security Deposit</span>
              <span className="text-[10px] text-emerald-400">100% refunded after return • Escrow hold, not a rental charge</span>
            </div>
            <span className="font-semibold text-slate-100">₹{pricing.securityDeposit.toFixed(2)}</span>
          </div>

          {/* Upfront Total */}
          <div className="flex justify-between items-center pt-3 border-t border-slate-700/80 text-sm">
            <div>
              <span className="font-black text-white text-base">Total Due at Checkout</span>
              <span className="text-[10px] text-slate-400 block">Rental fee + refundable deposit hold</span>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-emerald-400 font-heading">
                ₹{pricing.totalPayable.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Social impact / Save vs Buying comparison badge */}
        {pricing.isSavingsPositive ? (
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border border-emerald-500/30 flex items-start gap-3 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-300">
                You save ₹{Math.round(pricing.savingsVsRetail).toLocaleString('en-IN')} vs buying new ({pricing.savingsPercentage}% savings)!
              </p>
              <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                Estimated retail purchase price is ~₹{pricing.estimatedPurchasePrice.toLocaleString('en-IN')}. Total rental cost for {pricing.totalDays} {pricing.totalDays === 1 ? 'day' : 'days'} is ₹{pricing.rentalCost.toFixed(2)} (incl. 5% platform fee). Refundable deposit (₹{pricing.securityDeposit.toFixed(2)}) is held in escrow and returned after inspection.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-start gap-3 text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-300">
                Rental charges (₹{pricing.rentalCost.toFixed(2)}) exceed ~₹{pricing.estimatedPurchasePrice.toLocaleString('en-IN')} estimated retail purchase price.
              </p>
              <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                For a duration of {pricing.totalDays} days, purchasing the item may be more economical than renting if you intend to keep it permanently.
              </p>
            </div>
          </div>
        )}

        {/* Submit Booking Request Button */}
        <button
          type="submit"
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
        >
          <span>Request Rental for ₹{pricing.totalPayable.toFixed(2)}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
          <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
          No payment processed until lender confirms availability.
        </p>
      </form>
    </div>
  );
};
