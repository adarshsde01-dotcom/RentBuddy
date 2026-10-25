import React from 'react';
import { Layers, Grid2X2, X } from 'lucide-react';
import { CategoryType, RentalItem } from '../../types/rental';
import { getAllCategories, getPopularCategories, normalizeCategoryId, getCategoryById } from '../../data/categories';
import { CategoryIcon } from '../common/CategoryIcon';

interface CategoryFilterBarProps {
  selectedCategory: CategoryType;
  selectedSubcategory?: string;
  onSelectCategory: (cat: CategoryType) => void;
  onSelectSubcategory: (subcat?: string) => void;
  items: RentalItem[];
  onOpenAllCategories?: () => void;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  selectedCategory,
  selectedSubcategory,
  onSelectCategory,
  onSelectSubcategory,
  items,
  onOpenAllCategories,
}) => {
  const popularCategories = getPopularCategories();
  const allCategories = getAllCategories();
  const activeNormalizedCatId = normalizeCategoryId(selectedCategory);

  // If the currently selected category is not in popular, include it in the bar so user sees it highlighted
  const displayedCategories = [...popularCategories];
  if (
    activeNormalizedCatId !== 'all' &&
    !popularCategories.some((c) => c.id === activeNormalizedCatId)
  ) {
    const activeCatDef = getCategoryById(activeNormalizedCatId);
    if (activeCatDef) {
      displayedCategories.push(activeCatDef);
    }
  }

  const getCategoryCount = (catId: string): number => {
    if (catId === 'all') return items.length;
    return items.filter((item) => normalizeCategoryId(item.category) === catId).length;
  };

  const activeCategoryDef = getCategoryById(activeNormalizedCatId);
  const activeSubcategories = activeCategoryDef?.subcategories || [];

  const getSubcategoryCount = (subcatName: string): number => {
    return items.filter(
      (item) =>
        normalizeCategoryId(item.category) === activeNormalizedCatId &&
        item.subcategory?.toLowerCase() === subcatName.toLowerCase()
    ).length;
  };

  return (
    <div className="w-full space-y-3">
      {/* Main Categories Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
        {/* All Items Pill */}
        <button
          onClick={() => {
            onSelectCategory('all');
            onSelectSubcategory(undefined);
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
            activeNormalizedCatId === 'all'
              ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/60 text-emerald-300 shadow-md shadow-emerald-500/10'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-800/60'
          }`}
        >
          <Layers className={`w-4 h-4 ${activeNormalizedCatId === 'all' ? 'text-emerald-400' : 'text-slate-400'}`} />
          <span>All Items</span>
          <span
            className={`text-[11px] px-1.5 py-0.5 rounded-full font-semibold ${
              activeNormalizedCatId === 'all'
                ? 'bg-emerald-500/30 text-emerald-200'
                : 'bg-slate-800 text-slate-500'
            }`}
          >
            {items.length}
          </span>
        </button>

        {/* Popular Categories */}
        {displayedCategories.map((cat) => {
          const isSelected = activeNormalizedCatId === cat.id;
          const count = getCategoryCount(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => {
                if (isSelected) {
                  onSelectCategory('all');
                  onSelectSubcategory(undefined);
                } else {
                  onSelectCategory(cat.id);
                  onSelectSubcategory(undefined);
                }
              }}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
                isSelected
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/60 text-emerald-300 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              <CategoryIcon
                name={cat.iconName}
                className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`}
              />
              <span>{cat.shortName || cat.name}</span>
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-full font-semibold ${
                  isSelected
                    ? 'bg-emerald-500/30 text-emerald-200'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}

        {/* Explore All 20 Categories Button */}
        {onOpenAllCategories && (
          <button
            onClick={onOpenAllCategories}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-dashed border-emerald-500/40 bg-emerald-950/20 text-emerald-300 hover:bg-emerald-900/30 hover:border-emerald-500 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0"
          >
            <Grid2X2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>All Categories ({allCategories.length})</span>
          </button>
        )}
      </div>

      {/* Dynamic Subcategory Pills Bar (shown when a specific category is active) */}
      {activeNormalizedCatId !== 'all' && activeCategoryDef && activeSubcategories.length > 0 && (
        <div className="pt-2 pb-1 border-t border-slate-800/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none animate-fade-in">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1">
            {activeCategoryDef.shortName || activeCategoryDef.name} Subcategories:
          </span>

          {/* All in Category */}
          <button
            onClick={() => onSelectSubcategory(undefined)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-colors ${
              !selectedSubcategory
                ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            All {activeCategoryDef.name}
          </button>

          {/* Subcategory Pills */}
          {activeSubcategories.map((subcat) => {
            const isSubSelected = selectedSubcategory?.toLowerCase() === subcat.toLowerCase();
            const count = getSubcategoryCount(subcat);

            return (
              <button
                key={subcat}
                onClick={() => {
                  if (isSubSelected) {
                    onSelectSubcategory(undefined);
                  } else {
                    onSelectSubcategory(subcat);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs whitespace-nowrap transition-colors ${
                  isSubSelected
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span>{subcat}</span>
                {count > 0 && (
                  <span
                    className={`text-[10px] px-1 rounded-full font-mono ${
                      isSubSelected ? 'bg-emerald-400 text-slate-950 font-bold' : 'text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}

          {selectedSubcategory && (
            <button
              onClick={() => onSelectSubcategory(undefined)}
              className="text-xs text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-slate-800 transition-colors shrink-0 ml-1"
              title="Clear subcategory filter"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
