import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Grid2X2, 
  ShieldCheck, 
  Info,
  Tag
} from 'lucide-react';
import { CategoryType, RentalItem } from '../../types/rental';
import { getCategoryGroups, normalizeCategoryId, getAllCategories } from '../../data/categories';
import { CategoryIcon } from '../common/CategoryIcon';

interface AllCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: RentalItem[];
  onSelectCategoryAndSubcategory: (catId: CategoryType, subcat?: string) => void;
}

export const AllCategoriesModal: React.FC<AllCategoriesModalProps> = ({
  isOpen,
  onClose,
  items,
  onSelectCategoryAndSubcategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const categoryGroups = getCategoryGroups();
  const allCategories = getAllCategories();

  if (!isOpen) return null;

  const getCategoryCount = (catId: string) => {
    return items.filter((item) => normalizeCategoryId(item.category) === catId).length;
  };

  const getSubcategoryCount = (catId: string, subcat: string) => {
    return items.filter(
      (item) =>
        normalizeCategoryId(item.category) === catId &&
        item.subcategory?.toLowerCase() === subcat.toLowerCase()
    ).length;
  };

  const query = searchQuery.toLowerCase().trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Grid2X2 className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                  All 20 Rental Categories & Subcategories
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold">
                  {allCategories.length} Categories
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Explore thousands of useful physical items available for flexible rent from verified neighbors
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Search across categories */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories & subcategories..."
                className="w-full pl-9 pr-8 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors shrink-0"
              aria-label="Close categories directory"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Directory Body */}
        <div className="overflow-y-auto flex-1 py-4 space-y-8 pr-1">
          {categoryGroups.map(({ group, categories }) => {
            // Filter categories and subcategories if search query is active
            const filteredCategories = categories.filter((cat) => {
              if (!query) return true;
              const matchCatName = cat.name.toLowerCase().includes(query);
              const matchDesc = cat.description.toLowerCase().includes(query);
              const matchSubcats = cat.subcategories.some((sub) => sub.toLowerCase().includes(query));
              return matchCatName || matchDesc || matchSubcats;
            });

            if (filteredCategories.length === 0) return null;

            return (
              <div key={group} className="space-y-4">
                {/* Group Heading */}
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 border-b border-slate-800 pb-2">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{group}</span>
                  <span className="text-slate-400 font-normal">
                    ({filteredCategories.length} categories)
                  </span>
                </div>

                {/* Categories Cards in this Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCategories.map((cat) => {
                    const totalCount = getCategoryCount(cat.id);

                    return (
                      <div
                        key={cat.id}
                        className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 hover:shadow-lg transition-all flex flex-col justify-between space-y-3"
                      >
                        <div>
                          {/* Card Top Title Row */}
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <div className="p-2 rounded-xl bg-slate-900 border border-slate-700/80 text-emerald-400 shrink-0">
                                <CategoryIcon name={cat.iconName} className="w-4 h-4" />
                              </div>
                              <div>
                                <h4
                                  onClick={() => {
                                    onSelectCategoryAndSubcategory(cat.id);
                                    onClose();
                                  }}
                                  className="text-sm font-black text-white hover:text-emerald-400 cursor-pointer transition-colors"
                                >
                                  {cat.name}
                                </h4>
                                <span className="text-[10px] text-slate-400">
                                  {cat.subcategories.length} subcategories • {totalCount} items
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                onSelectCategoryAndSubcategory(cat.id);
                                onClose();
                              }}
                              className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-bold transition-colors shrink-0"
                            >
                              Explore &rarr;
                            </button>
                          </div>

                          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                            {cat.description}
                          </p>

                          {/* Safety Notice if applicable */}
                          {cat.safetyNotice && (
                            <div className="mt-2 p-2 rounded-lg bg-amber-950/30 border border-amber-500/30 text-[10px] text-amber-200/90 flex items-start gap-1.5 leading-normal">
                              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                              <span>{cat.safetyNotice}</span>
                            </div>
                          )}
                        </div>

                        {/* Subcategories list pills */}
                        <div className="pt-2 border-t border-slate-900">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1.5">
                            Subcategories:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {cat.subcategories.map((subcat) => {
                              const subCount = getSubcategoryCount(cat.id, subcat);
                              const isHighlighted = query && subcat.toLowerCase().includes(query);

                              return (
                                <button
                                  key={subcat}
                                  onClick={() => {
                                    onSelectCategoryAndSubcategory(cat.id, subcat);
                                    onClose();
                                  }}
                                  className={`text-[10px] px-2 py-0.5 rounded-md border transition-all ${
                                    isHighlighted
                                      ? 'bg-emerald-500/30 border-emerald-400 text-white font-bold'
                                      : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-emerald-300 hover:border-slate-700'
                                  }`}
                                  title={`Explore ${subcat}`}
                                >
                                  <span>{subcat}</span>
                                  {subCount > 0 && (
                                    <span className="ml-1 text-[9px] text-emerald-400 font-mono font-bold">
                                      ({subCount})
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Directory Footer Guarantee */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>All 20 categories are covered by verified escrow & ₹2,00,000 damage protection.</span>
          </div>
          <button
            onClick={() => {
              onSelectCategoryAndSubcategory('all');
              onClose();
            }}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-bold hover:underline"
          >
            Show All Catalog Items &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};
