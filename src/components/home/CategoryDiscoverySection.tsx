import React from 'react';
import { ArrowRight, Grid2X2, Sparkles, ChevronRight } from 'lucide-react';
import { CategoryType, RentalItem } from '../../types/rental';
import { getPopularCategories, normalizeCategoryId } from '../../data/categories';
import { CategoryIcon } from '../common/CategoryIcon';

interface CategoryDiscoverySectionProps {
  items: RentalItem[];
  onSelectCategory: (catId: CategoryType, subcat?: string) => void;
  onOpenAllCategories: () => void;
}

export const CategoryDiscoverySection: React.FC<CategoryDiscoverySectionProps> = ({
  items,
  onSelectCategory,
  onOpenAllCategories,
}) => {
  const popularCategories = getPopularCategories();

  const getCategoryItemCount = (catId: string) => {
    return items.filter((item) => normalizeCategoryId(item.category) === catId).length;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Smart Borrowing Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight">
            Popular Rental Categories
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mt-1">
            Browse our most requested gear across high-demand categories, from creator kits and designer wear to camping tents and DIY tools.
          </p>
        </div>

        <button
          onClick={onOpenAllCategories}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-emerald-300 hover:text-emerald-200 text-xs sm:text-sm font-bold transition-all shadow-md group shrink-0 active:scale-95"
        >
          <Grid2X2 className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
          <span>Explore All Categories</span>
          <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Popular Categories Grid (10 Popular Categories) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {popularCategories.map((cat) => {
          const count = getCategoryItemCount(cat.id);
          const topSubcategories = cat.subcategories.slice(0, 3);

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/70 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Background Cover Image with Gradient */}
              <div className="relative h-36 w-full overflow-hidden bg-slate-950">
                <img
                  src={cat.bannerImage}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-75 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Top Badge: Item Count */}
                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 border border-slate-700/80 text-emerald-400 backdrop-blur-md">
                    {count} {count === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {/* Icon Circle */}
                <div className="absolute bottom-2.5 left-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-900/90 border border-emerald-500/40 flex items-center justify-center text-emerald-400 backdrop-blur-md shadow-md group-hover:scale-105 transition-transform">
                    <CategoryIcon name={cat.iconName} className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
                <div>
                  <h3 className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                    {cat.description}
                  </p>
                </div>

                {/* Subcategories preview tags */}
                <div className="pt-1 flex flex-wrap gap-1">
                  {topSubcategories.map((subcat) => (
                    <button
                      key={subcat}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCategory(cat.id, subcat);
                      }}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950/70 border border-slate-800 text-slate-400 hover:text-emerald-300 hover:border-emerald-500/40 transition-colors"
                      title={`Filter by ${subcat}`}
                    >
                      {subcat}
                    </button>
                  ))}
                  {cat.subcategories.length > 3 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{cat.subcategories.length - 3} more
                    </span>
                  )}
                </div>

                {/* Hover CTA Indicator */}
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-emerald-400 transition-colors">
                  <span className="font-semibold">Browse Category</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
