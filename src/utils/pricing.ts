import { RentalItem } from '../types/rental';

export interface RentalPricingCalculation {
  totalDays: number;
  dailyRate: number;
  baseTotal: number;
  discountPercent: number;
  discountTier: 'none' | 'weekly' | 'monthly';
  discountAmount: number;
  discountedRental: number;
  serviceFee: number; // 5% community protection & platform fee
  deliveryFee: number;
  rentalCost: number; // discountedRental + serviceFee + deliveryFee (actual non-refundable rental expense)
  securityDeposit: number; // 100% refundable hold, kept strictly separate from rental expenses
  totalPayable: number; // rentalCost + securityDeposit (total charged at checkout)
  estimatedPurchasePrice: number; // item.replacementValue (approximate retail market price)
  savingsVsRetail: number; // estimatedPurchasePrice - rentalCost (when positive)
  isSavingsPositive: boolean;
  savingsPercentage: number;
}

/**
 * Standard community platform & protection fee percentage (5%).
 */
export const PLATFORM_FEE_PERCENT = 0.05;

/**
 * Default long-term discount rates aligned with marketplace standards.
 */
export const DEFAULT_WEEKLY_DISCOUNT_PERCENT = 15; // 7+ days (~15% off)
export const DEFAULT_MONTHLY_DISCOUNT_PERCENT = 25; // 30+ days (~25% off)

/**
 * Calculates complete, transparent pricing for any rental duration.
 * Guarantees:
 * 1. Single discount tier applied (no accidental stacking).
 * 2. Refundable security deposits are NEVER counted as rental expense or savings.
 * 3. Platform fees are factored into total rental cost.
 * 4. Realistic comparison against estimated retail purchase price.
 */
export const calculateRentalPricing = (
  item: RentalItem,
  days: number,
  options?: { delivery?: boolean; deliveryFee?: number }
): RentalPricingCalculation => {
  const totalDays = Math.max(1, Math.round(days));
  const dailyRate = item.dailyPrice;
  const baseTotal = totalDays * dailyRate;

  // Single discount tier evaluation (no stacking)
  let discountPercent = 0;
  let discountTier: 'none' | 'weekly' | 'monthly' = 'none';

  if (totalDays >= 30) {
    discountPercent = item.monthlyDiscountPercent || DEFAULT_MONTHLY_DISCOUNT_PERCENT;
    discountTier = 'monthly';
  } else if (totalDays >= 7) {
    discountPercent = item.weeklyDiscountPercent || DEFAULT_WEEKLY_DISCOUNT_PERCENT;
    discountTier = 'weekly';
  }

  const discountAmount = Math.round((baseTotal * (discountPercent / 100)) * 100) / 100;
  const discountedRental = Math.round((baseTotal - discountAmount) * 100) / 100;
  const serviceFee = Math.round((discountedRental * PLATFORM_FEE_PERCENT) * 100) / 100;
  const deliveryFee = options?.delivery ? (options.deliveryFee ?? 199) : 0;

  // Total non-refundable rental expenses
  const rentalCost = Math.round((discountedRental + serviceFee + deliveryFee) * 100) / 100;

  // Refundable security deposit (held in escrow, 100% refunded after inspection)
  const securityDeposit = item.securityDeposit;

  // Total amount due upfront at checkout
  const totalPayable = Math.round((rentalCost + securityDeposit) * 100) / 100;

  // "Save vs Buying" calculation: estimated retail purchase price minus actual rental expenses
  // Deposit is explicitly excluded from rental expense
  const estimatedPurchasePrice = item.replacementValue;
  const netSavings = Math.round((estimatedPurchasePrice - rentalCost) * 100) / 100;
  const isSavingsPositive = netSavings > 0;
  const savingsVsRetail = Math.max(0, netSavings);
  const savingsPercentage = estimatedPurchasePrice > 0 
    ? Math.max(0, Math.min(99, Math.round((savingsVsRetail / estimatedPurchasePrice) * 100)))
    : 0;

  return {
    totalDays,
    dailyRate,
    baseTotal,
    discountPercent,
    discountTier,
    discountAmount,
    discountedRental,
    serviceFee,
    deliveryFee,
    rentalCost,
    securityDeposit,
    totalPayable,
    estimatedPurchasePrice,
    savingsVsRetail,
    isSavingsPositive,
    savingsPercentage,
  };
};

/**
 * Standard comparison benchmark for product cards and catalogs where rental duration is not yet selected.
 * Discloses a transparent standard 7-day benchmark comparison.
 */
export const calculateBenchmarkSavings = (item: RentalItem, benchmarkDays = 7) => {
  const pricing = calculateRentalPricing(item, benchmarkDays);
  return {
    benchmarkDays,
    savings: Math.round(pricing.savingsVsRetail),
    rentalCost: Math.round(pricing.rentalCost),
    estimatedPurchasePrice: item.replacementValue,
    savingsPercentage: pricing.savingsPercentage,
    isSavingsPositive: pricing.isSavingsPositive,
  };
};

/**
 * Formats Indian Rupee currency amounts cleanly.
 */
export const formatRupee = (amount: number, includeDecimals = false): string => {
  if (includeDecimals) {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
};
