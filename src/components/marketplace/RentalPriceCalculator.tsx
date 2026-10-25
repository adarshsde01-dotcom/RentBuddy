import React, { useState, useId } from 'react';
import { Calendar, ShieldAlert, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { RentalItem } from '../../types/rental';

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

  const today = new Date();
  const defaultStart = new Date(today);
  defaultStart.setDate(today.getDate() + 1);

  const defaultEnd = new Date(defaultStart);
  defaultEnd.setDate(defaultStart.getDate() + 3);

  const [startDate, setStartDate] = useState(formatDate(defaultStart));
  const [endDate, setEndDate] = useState(formatDate(defaultEnd));

  // Compute difference in days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const calculatedDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const baseTotal = calculatedDays * item.dailyPrice;

  // Multi-day discount calculation
  let discountPercent = 0;
  if (calculatedDays >= 7) {
    discountPercent = item.weeklyDiscountPercent || 20;
  } else if (calculatedDays >= 3) {
    discountPercent = 10;
  }

  const discountAmount = Math.round((baseTotal * (discountPercent / 100)) * 100) / 100;
  const discountedRental = baseTotal - discountAmount;
  const serviceFee = Math.round((discountedRental * 0.05) * 100) / 100; // 5% community insurance fee
  const securityDeposit = item.securityDeposit;
  const totalPayable = Math.round((discountedRental + serviceFee + securityDeposit) * 100) / 100;
  const savingsVsRetail = Math.max(0, item.replacementValue - (discountedRental + serviceFee));

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
      dailyRate: item.dailyPrice,
      baseTotal,
      discountAmount,
      serviceFee,
      securityDeposit,
      totalPayable,
      savingsVsRetail,
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
              min={formatDate(today)}
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
            Selected Duration: <strong className="text-emerald-400 font-bold">{calculatedDays} {calculatedDays === 1 ? 'day' : 'days'}</strong>
          </span>
          {discountPercent > 0 ? (
            <span className="text-teal-300 font-bold flex items-center gap-1 bg-teal-950/80 px-2 py-0.5 rounded-md border border-teal-500/30">
              <Sparkles className="w-3 h-3 text-teal-300" /> {discountPercent}% multi-day discount unlocked!
            </span>
          ) : (
            <span className="text-slate-400 text-[11px]">
              Tip: Rent 3+ days for 10% off
            </span>
          )}
        </div>

        {/* Itemized Calculation */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2.5 text-xs text-slate-300">
          <div className="flex justify-between items-center">
            <span>
              ₹{item.dailyPrice.toLocaleString('en-IN')} × {calculatedDays} {calculatedDays === 1 ? 'day' : 'days'}
            </span>
            <span className="font-semibold text-slate-100">₹{baseTotal.toFixed(2)}</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between items-center text-teal-400">
              <span>Multi-Day Discount ({discountPercent}%)</span>
              <span className="font-semibold">-₹{discountAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1">
              Community Protection & Platform Fee (5%)
            </span>
            <span className="font-semibold text-slate-100">₹{serviceFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-slate-800">
            <div className="flex flex-col">
              <span className="font-semibold text-slate-200">Refundable Security Deposit</span>
              <span className="text-[10px] text-emerald-400">100% refunded within 24h of return</span>
            </div>
            <span className="font-semibold text-slate-100">₹{securityDeposit.toFixed(2)}</span>
          </div>

          {/* Upfront Total */}
          <div className="flex justify-between items-center pt-3 border-t border-slate-700/80 text-sm">
            <div>
              <span className="font-black text-white text-base">Total Due at Checkout</span>
              <span className="text-[10px] text-slate-400 block">Includes refundable deposit</span>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-emerald-400 font-heading">
                ₹{totalPayable.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Social impact / circular economy comparison badge */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border border-emerald-500/30 flex items-start gap-3 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-emerald-300">
              You save ₹{Math.round(savingsVsRetail).toLocaleString('en-IN')} by borrowing smart!
            </p>
            <p className="text-slate-300 text-[11px] mt-0.5">
              Retail price is ~₹{item.replacementValue.toLocaleString('en-IN')}. Renting saves cash and keeps manufacturing emissions out of the atmosphere.
            </p>
          </div>
        </div>

        {/* Submit Booking Request Button */}
        <button
          type="submit"
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
        >
          <span>Request Rental for ₹{totalPayable.toFixed(2)}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
          <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
          No credit card charged until lender confirms reservation.
        </p>
      </form>
    </div>
  );
};
