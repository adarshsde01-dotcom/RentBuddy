import React, { useState } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X, Check, ShieldCheck } from 'lucide-react';
import { FilterOptions } from '../../types/rental';

interface SearchBarAndFiltersProps {
  filters: FilterOptions;
  onChangeFilters: (newFilters: FilterOptions) => void;
  totalResultsCount: number;
}

export const SearchBarAndFilters: React.FC<SearchBarAndFiltersProps> = ({
  filters,
  onChangeFilters,
  totalResultsCount,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearchChange = (val: string) => {
    onChangeFilters({ ...filters, searchQuery: val });
  };

  const handlePriceChange = (val: number) => {
    onChangeFilters({ ...filters, maxPrice: val });
  };

  const handleConditionChange = (condition: string) => {
    onChangeFilters({ ...filters, condition });
  };

  const handleAvailabilityToggle = () => {
    onChangeFilters({ ...filters, onlyAvailable: !filters.onlyAvailable });
  };

  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    onChangeFilters({ ...filters, sortBy });
  };

  const handleResetFilters = () => {
    onChangeFilters({
      category: 'all',
      searchQuery: '',
      minPrice: 0,
      maxPrice: 60,
      condition: 'all',
      onlyAvailable: false,
      sortBy: 'recommended',
    });
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.maxPrice < 60 ||
    filters.condition !== 'all' ||
    filters.onlyAvailable ||
    filters.category !== 'all';

  return (
    <div className="w-full bg-slate-900/70 border border-slate-800 rounded-2xl p-4 space-y-4 backdrop-blur-md">
      {/* Top Search & Controls Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by product name, brand, or feature..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Drawer Toggle & Sort Dropdown */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors ${
              showAdvanced || hasActiveFilters
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300'
                : 'bg-slate-950/80 border-slate-700/80 text-slate-300 hover:border-slate-600'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            )}
          </button>

          {/* Sort By */}
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value as FilterOptions['sortBy'])}
              className="appearance-none pl-8 pr-8 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="recommended">Featured / Recommended</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Advanced Filter drawer */}
      {showAdvanced && (
        <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-5 animate-fade-in text-xs">
          
          {/* Max Daily Rate Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-slate-300">
              <span className="font-semibold uppercase tracking-wider text-slate-400">
                Max Daily Rate: <span className="text-emerald-400 font-bold text-sm">${filters.maxPrice}/day</span>
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              step="1"
              value={filters.maxPrice}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>$5/day</span>
              <span>$30/day</span>
              <span>$60+/day</span>
            </div>
          </div>

          {/* Item Condition Pills */}
          <div className="space-y-2">
            <span className="block font-semibold uppercase tracking-wider text-slate-400">
              Condition
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['all', 'Like New', 'Excellent', 'Good'].map((cond) => (
                <button
                  key={cond}
                  onClick={() => handleConditionChange(cond)}
                  className={`px-3 py-1.5 rounded-lg border text-xs capitalize transition-colors ${
                    filters.condition === cond
                      ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-medium'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cond === 'all' ? 'Any Condition' : cond}
                </button>
              ))}
            </div>
          </div>

          {/* Availability & Reset */}
          <div className="space-y-2 flex flex-col justify-between">
            <span className="block font-semibold uppercase tracking-wider text-slate-400">
              Availability & Extras
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAvailabilityToggle}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-colors ${
                  filters.onlyAvailable
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                    filters.onlyAvailable
                      ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                      : 'border-slate-600'
                  }`}
                >
                  {filters.onlyAvailable && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>Available Now</span>
              </button>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-1 ml-auto"
                >
                  <X className="w-3.5 h-3.5" />
                  Reset Filters
                </button>
              )}
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              All rentals include damage protection & refundable deposits.
            </p>
          </div>
        </div>
      )}

      {/* Results status line */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/40">
        <span>
          Showing <span className="font-semibold text-emerald-400">{totalResultsCount}</span> {totalResultsCount === 1 ? 'item available' : 'items available'}
        </span>
        {hasActiveFilters && (
          <span className="text-[11px] text-slate-400">
            Filtered results
          </span>
        )}
      </div>
    </div>
  );
};
