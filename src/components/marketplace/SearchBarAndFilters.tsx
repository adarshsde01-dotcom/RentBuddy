import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  X, 
  Check, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Tag, 
  RotateCcw 
} from 'lucide-react';
import { FilterOptions } from '../../types/rental';
import { getAllCategories, getSubcategoriesForCategory, normalizeCategoryId } from '../../data/categories';

interface SearchBarAndFiltersProps {
  filters: FilterOptions;
  onChangeFilters: (newFilters: FilterOptions) => void;
  totalResultsCount: number;
}

const CITIES = ['All Cities', 'Bengaluru', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad'];
const CONDITIONS = ['all', 'New', 'Like New', 'Excellent', 'Good', 'Fair'];

export const SearchBarAndFilters: React.FC<SearchBarAndFiltersProps> = ({
  filters,
  onChangeFilters,
  totalResultsCount,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categories = getAllCategories();
  const activeNormalizedCat = normalizeCategoryId(filters.category);
  const availableSubcategories = activeNormalizedCat !== 'all' ? getSubcategoriesForCategory(activeNormalizedCat) : [];

  const handleSearchChange = (val: string) => {
    onChangeFilters({ ...filters, searchQuery: val });
  };

  const handleCategoryChange = (catId: string) => {
    onChangeFilters({
      ...filters,
      category: catId,
      subcategory: undefined, // reset subcategory when category changes
    });
  };

  const handleSubcategoryChange = (subcat: string) => {
    onChangeFilters({
      ...filters,
      subcategory: subcat === 'all' ? undefined : subcat,
    });
  };

  const handlePriceChange = (min: number, max: number) => {
    onChangeFilters({
      ...filters,
      minPrice: min,
      maxPrice: max,
    });
  };

  const handleCityChange = (city: string) => {
    onChangeFilters({
      ...filters,
      city: city === 'All Cities' ? undefined : city,
    });
  };

  const handleConditionChange = (condition: string) => {
    onChangeFilters({ ...filters, condition });
  };

  const handleAvailabilityToggle = () => {
    onChangeFilters({ ...filters, onlyAvailable: !filters.onlyAvailable });
  };

  const handleDateChange = (field: 'availableFrom' | 'availableUntil', value: string) => {
    onChangeFilters({
      ...filters,
      [field]: value || undefined,
    });
  };

  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    onChangeFilters({ ...filters, sortBy });
  };

  const handleResetFilters = () => {
    onChangeFilters({
      category: 'all',
      subcategory: undefined,
      searchQuery: '',
      minPrice: 0,
      maxPrice: 3000,
      condition: 'all',
      city: undefined,
      availableFrom: undefined,
      availableUntil: undefined,
      onlyAvailable: false,
      sortBy: 'recommended',
    });
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.minPrice > 0 ||
    filters.maxPrice < 3000 ||
    filters.condition !== 'all' ||
    Boolean(filters.city) ||
    Boolean(filters.subcategory) ||
    Boolean(filters.availableFrom) ||
    Boolean(filters.availableUntil) ||
    filters.onlyAvailable ||
    filters.category !== 'all';

  return (
    <div className="w-full bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 backdrop-blur-md shadow-lg">
      
      {/* Top Search & Controls Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by title, category, subcategory, camera, drone, suit, book..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
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

        {/* Action Controls: Category Quick Select, Filter Toggle & Sort */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          
          {/* Main Category Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={activeNormalizedCat}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full sm:w-auto appearance-none pl-3 pr-8 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer font-medium"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <Tag className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Filter Drawer Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors shrink-0 ${
              showAdvanced || hasActiveFilters
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300'
                : 'bg-slate-950/80 border-slate-700/80 text-slate-300 hover:border-slate-600'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>

          {/* Sort By Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value as FilterOptions['sortBy'])}
              className="w-full sm:w-auto appearance-none pl-8 pr-8 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="recommended">Featured / Recommended</option>
              <option value="recently_added">Recently Added</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="p-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 text-xs transition-colors shrink-0"
              title="Reset All Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filter Drawer */}
      {showAdvanced && (
        <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 animate-fade-in text-xs">
          
          {/* 1. Subcategory Selection (Dynamic based on Category) */}
          <div className="space-y-2">
            <span className="block font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Subcategory</span>
              {filters.subcategory && (
                <button
                  onClick={() => handleSubcategoryChange('all')}
                  className="text-[11px] text-rose-400 hover:underline lowercase font-normal"
                >
                  clear
                </button>
              )}
            </span>
            <select
              value={filters.subcategory || 'all'}
              onChange={(e) => handleSubcategoryChange(e.target.value)}
              className="w-full py-2 px-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">
                {activeNormalizedCat === 'all'
                  ? 'All Subcategories (Select category first)'
                  : `All Subcategories in this Category (${availableSubcategories.length})`}
              </option>
              {availableSubcategories.map((subcat) => (
                <option key={subcat} value={subcat}>
                  {subcat}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400">
              {activeNormalizedCat === 'all'
                ? 'Pick a category above to unlock specific subcategories.'
                : `${availableSubcategories.length} specific item types in this category.`}
            </p>
          </div>

          {/* 2. City & Location Filter */}
          <div className="space-y-2">
            <span className="block font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> City / Location
            </span>
            <select
              value={filters.city || 'All Cities'}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full py-2 px-3 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400">
              Filter products available for local pickup near you.
            </p>
          </div>

          {/* 3. Daily Rental Rate Range */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-slate-300">
              <span className="font-semibold uppercase tracking-wider text-slate-400">
                Rate Range: <span className="text-emerald-400 font-bold">₹{filters.minPrice} – ₹{filters.maxPrice < 3000 ? filters.maxPrice : '3,000+'}</span>/day
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="3000"
              step="50"
              value={filters.maxPrice}
              onChange={(e) => handlePriceChange(filters.minPrice, Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>₹0/day</span>
              <span>₹1,500/day</span>
              <span>₹3,000+/day</span>
            </div>
          </div>

          {/* 4. Availability Dates & Instant Ready */}
          <div className="space-y-2">
            <span className="block font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Rental Date Window
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <div>
                <input
                  type="date"
                  value={filters.availableFrom || ''}
                  onChange={(e) => handleDateChange('availableFrom', e.target.value)}
                  className="w-full py-1.5 px-2 bg-slate-950/80 border border-slate-700/80 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  title="Available From"
                />
              </div>
              <div>
                <input
                  type="date"
                  value={filters.availableUntil || ''}
                  onChange={(e) => handleDateChange('availableUntil', e.target.value)}
                  className="w-full py-1.5 px-2 bg-slate-950/80 border border-slate-700/80 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  title="Available Until"
                />
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleAvailabilityToggle}
              className={`w-full flex items-center justify-center gap-2 py-1.5 rounded-lg border text-xs transition-colors ${
                filters.onlyAvailable
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
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
              <span>Available Now Only</span>
            </button>
          </div>

          {/* Condition Pills Strip (Full Width) */}
          <div className="md:col-span-2 lg:col-span-4 pt-2 border-t border-slate-800/60 flex flex-wrap items-center gap-2">
            <span className="font-semibold uppercase tracking-wider text-slate-400 text-[11px] mr-1">
              Condition:
            </span>
            {CONDITIONS.map((cond) => (
              <button
                key={cond}
                onClick={() => handleConditionChange(cond)}
                className={`px-3 py-1 rounded-lg border text-xs capitalize transition-colors ${
                  filters.condition === cond
                    ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-semibold shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cond === 'all' ? 'Any Condition' : cond}
              </button>
            ))}

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-1 ml-auto font-medium"
              >
                <X className="w-3.5 h-3.5" />
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Active Filter Badges Strip */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mr-1">
            Active:
          </span>
          {filters.category !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs">
              Category: {filters.category}
              <button onClick={() => handleCategoryChange('all')}>
                <X className="w-3 h-3 text-slate-400 hover:text-white" />
              </button>
            </span>
          )}
          {filters.subcategory && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-950/60 border border-teal-500/40 text-teal-300 text-xs">
              Subcategory: {filters.subcategory}
              <button onClick={() => handleSubcategoryChange('all')}>
                <X className="w-3 h-3 text-slate-400 hover:text-white" />
              </button>
            </span>
          )}
          {filters.city && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-950/60 border border-sky-500/40 text-sky-300 text-xs">
              City: {filters.city}
              <button onClick={() => handleCityChange('All Cities')}>
                <X className="w-3 h-3 text-slate-400 hover:text-white" />
              </button>
            </span>
          )}
          {filters.condition !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs">
              Condition: {filters.condition}
              <button onClick={() => handleConditionChange('all')}>
                <X className="w-3 h-3 text-slate-400 hover:text-white" />
              </button>
            </span>
          )}
          {filters.maxPrice < 3000 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs">
              Up to ₹{filters.maxPrice}/day
              <button onClick={() => handlePriceChange(filters.minPrice, 3000)}>
                <X className="w-3 h-3 text-slate-400 hover:text-white" />
              </button>
            </span>
          )}
          {filters.onlyAvailable && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs">
              Available Now Only
              <button onClick={handleAvailabilityToggle}>
                <X className="w-3 h-3 text-slate-400 hover:text-white" />
              </button>
            </span>
          )}
          {(filters.availableFrom || filters.availableUntil) && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs">
              Dates: {filters.availableFrom || 'Any'} &rarr; {filters.availableUntil || 'Any'}
              <button onClick={() => onChangeFilters({ ...filters, availableFrom: undefined, availableUntil: undefined })}>
                <X className="w-3 h-3 text-slate-400 hover:text-white" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Results status line */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/40">
        <span>
          Showing <span className="font-semibold text-emerald-400">{totalResultsCount}</span>{' '}
          {totalResultsCount === 1 ? 'rental item found' : 'rental items found'}
        </span>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Direct owner rentals • 100% deposit escrow guarantee
          </span>
        </div>
      </div>
    </div>
  );
};
