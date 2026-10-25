import React from 'react';
import { 
  Sparkles, 
  Search, 
  ShieldCheck, 
  Leaf, 
  ArrowRight, 
  IndianRupee, 
  Camera, 
  Smartphone, 
  Wrench, 
  Luggage,
  Tent,
  PlusCircle
} from 'lucide-react';
import { CategoryType } from '../../types/rental';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectCategory: (cat: CategoryType) => void;
  onOpenListItem: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onSelectCategory,
  onOpenListItem,
  onExploreClick,
}) => {
  return (
    <div className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        
        {/* Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-lg shadow-emerald-500/5 animate-fade-in">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Borrow Smart • Save More • Waste Less</span>
        </div>

        {/* Hero Title */}
        <div className="max-w-4xl mx-auto space-y-3">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white font-heading tracking-tight leading-[1.08]">
            Access the gear you need.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Without buying it.
            </span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Rent high-end cameras, drones, luggage, power tools, textbooks, and kitchen appliances from trusted locals near you for short periods.
          </p>
        </div>

        {/* Hero Search Box with Category Dropdown */}
        <div className="max-w-2xl mx-auto pt-2">
          <div className="p-2 sm:p-2.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="What do you want to rent today? (e.g. Sony A7IV, Camping Tent)"
                className="w-full pl-11 pr-4 py-3 bg-transparent text-slate-100 placeholder-slate-400 text-sm focus:outline-none"
              />
            </div>
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
            >
              <span>Explore Items</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-400 pt-2">
            <span>Have gear sitting idle?</span>
            <button
              onClick={onOpenListItem}
              className="text-emerald-400 hover:text-emerald-300 font-semibold underline flex items-center gap-1 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>List it for rent & earn</span>
            </button>
          </div>

          {/* Quick-Pick Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4 text-xs text-slate-400">
            <span className="font-semibold text-slate-400">Popular:</span>
            <button
              onClick={() => onSelectCategory('cameras')}
              className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <Camera className="w-3 h-3 text-emerald-400" /> Cameras
            </button>
            <button
              onClick={() => onSelectCategory('electronics')}
              className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <Smartphone className="w-3 h-3 text-teal-400" /> Drones & Tech
            </button>
            <button
              onClick={() => onSelectCategory('travel')}
              className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <Luggage className="w-3 h-3 text-sky-400" /> Luggage
            </button>
            <button
              onClick={() => onSelectCategory('outdoor')}
              className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <Tent className="w-3 h-3 text-amber-400" /> Camping
            </button>
            <button
              onClick={() => onSelectCategory('tools')}
              className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <Wrench className="w-3 h-3 text-rose-400" /> Tools
            </button>
          </div>
        </div>

        {/* Live Trust & Impact Badges Strip */}
        <div className="pt-6 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left">
          <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-extrabold text-white block">85% Cheaper</span>
              <span className="text-[11px] text-slate-400">Than buying retail</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-extrabold text-white block">Protected Escrow</span>
              <span className="text-[11px] text-slate-400">100% deposit refund</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-extrabold text-white block">Zero Waste</span>
              <span className="text-[11px] text-slate-400">Circular economy</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-extrabold text-white block">Verified Gear</span>
              <span className="text-[11px] text-slate-400">ID-checked lenders</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
