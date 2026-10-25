import React, { useState } from 'react';
import { 
  Search, 
  CalendarCheck, 
  RotateCcw, 
  PlusCircle, 
  ShieldCheck, 
  Coins, 
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';

interface HowItWorksProps {
  onOpenListItem: () => void;
  onExploreItems: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  onOpenListItem,
  onExploreItems,
}) => {
  const [role, setRole] = useState<'renter' | 'lender'>('renter');

  return (
    <section className="py-16 border-t border-slate-800/80 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> How RentBuddy Works
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
          Seamless, safe peer-to-peer rentals.
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          Whether you need a 4K camera for a weekend wedding or have tools sitting idle in your garage, RentBuddy keeps the process safe, transparent, and rewarding.
        </p>

        {/* Role Toggle Switcher */}
        <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 mt-4">
          <button
            onClick={() => setRole('renter')}
            className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              role === 'renter'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            For Renters & Borrowers
          </button>
          <button
            onClick={() => setRole('lender')}
            className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              role === 'lender'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            For Item Owners & Lenders
          </button>
        </div>
      </div>

      {/* 3 Step Process Cards */}
      {role === 'renter' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 relative group hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-lg font-heading border border-emerald-500/20">
              1
            </div>
            <h3 className="text-lg font-bold text-white font-heading">
              Find & Reserve Local Gear
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Search top brands across cameras, drones, camping tents, books, and tools. Check specs, genuine owner reviews, and nearby pickup locations.
            </p>
            <div className="pt-2 text-emerald-400 text-xs font-semibold flex items-center gap-1">
              <Search className="w-4 h-4" /> Real-time availability
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 relative group hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-lg font-heading border border-teal-500/20">
              2
            </div>
            <h3 className="text-lg font-bold text-white font-heading">
              Pick Dates & Enjoy Discounts
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Select your pickup and return days. Unlock multi-day savings automatically (up to 30% off for week-long adventures). Security deposits are securely held in escrow.
            </p>
            <div className="pt-2 text-teal-400 text-xs font-semibold flex items-center gap-1">
              <CalendarCheck className="w-4 h-4" /> Multi-day automated savings
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 relative group hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-lg font-heading border border-sky-500/20">
              3
            </div>
            <h3 className="text-lg font-bold text-white font-heading">
              Return & Release Deposit
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Hand the gear back to the owner or arrange contactless courier return. Once verified, your full security deposit is released automatically within 24 hours.
            </p>
            <div className="pt-2 text-sky-400 text-xs font-semibold flex items-center gap-1">
              <RotateCcw className="w-4 h-4" /> 100% Guaranteed Escrow
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 relative group hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-lg font-heading border border-emerald-500/20">
              1
            </div>
            <h3 className="text-lg font-bold text-white font-heading">
              List Idle Gear in 2 Minutes
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Upload photos via Cloudinary drag & drop, set your daily rate and deposit, and specify pickup rules. Your item is immediately live in the catalog.
            </p>
            <div className="pt-2 text-emerald-400 text-xs font-semibold flex items-center gap-1">
              <PlusCircle className="w-4 h-4" /> Fast Cloudinary photo uploader
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 relative group hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-lg font-heading border border-teal-500/20">
              2
            </div>
            <h3 className="text-lg font-bold text-white font-heading">
              Approve Verified Borrowers
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Get notified of incoming requests. Inspect borrower identity badges, past ratings, and rental messages before you accept or decline.
            </p>
            <div className="pt-2 text-teal-400 text-xs font-semibold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Full borrower screening
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 relative group hover:border-emerald-500/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-lg font-heading border border-amber-500/20">
              3
            </div>
            <h3 className="text-lg font-bold text-white font-heading">
              Earn Passive Cash Safely
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Turn tools, cameras, or appliances that sit in closets for 95% of the year into steady monthly revenue, protected by damage guarantees and security deposits.
            </p>
            <div className="pt-2 text-amber-400 text-xs font-semibold flex items-center gap-1">
              <Coins className="w-4 h-4" /> Escrow deposit protection
            </div>
          </div>
        </div>
      )}

      {/* Trust & Guarantee Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white">The RentBuddy Safety & Escrow Promise</h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Every rental is covered by verified user profiles, transparent refundable deposits, and peer reviews.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExploreItems}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-bold transition-all"
          >
            Explore Catalog
          </button>
          <button
            onClick={onOpenListItem}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
          >
            <span>List an Item</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
