import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Sparkles, 
  Tag, 
  Percent, 
  ChevronRight,
  Star
} from 'lucide-react';
import { RentalItem } from '../../types/rental';
import { getOptimizedImageUrl } from '../../services/cloudinary';

type CollectionType = 'trending' | 'recent' | 'budget' | 'longer_value';

interface CuratedCollectionsRibbonProps {
  items: RentalItem[];
  onSelectItem: (item: RentalItem) => void;
  onExploreFilter: (type: CollectionType) => void;
}

export const CuratedCollectionsRibbon: React.FC<CuratedCollectionsRibbonProps> = ({
  items,
  onSelectItem,
  onExploreFilter,
}) => {
  const [activeTab, setActiveTab] = useState<CollectionType>('trending');

  const filteredCollection = useMemo(() => {
    const list = [...items];
    switch (activeTab) {
      case 'trending':
        return list.sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 6);
      case 'recent':
        return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6);
      case 'budget':
        return list.filter((i) => i.dailyPrice <= 199).sort((a, b) => a.dailyPrice - b.dailyPrice).slice(0, 6);
      case 'longer_value':
        return list.filter((i) => i.weeklyDiscountPercent >= 15).sort((a, b) => (b.monthlyDiscountPercent || 25) - (a.monthlyDiscountPercent || 25)).slice(0, 6);
      default:
        return list.slice(0, 6);
    }
  }, [items, activeTab]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Ribbon Navigation Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-heading tracking-tight flex items-center gap-2">
            <span>Curated Rental Collections</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Hand-picked selections based on verified ratings, affordability, and duration savings
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('trending')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'trending'
                ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Trending Rentals</span>
          </button>

          <button
            onClick={() => setActiveTab('recent')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'recent'
                ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Recently Added</span>
          </button>

          <button
            onClick={() => setActiveTab('budget')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'budget'
                ? 'bg-gradient-to-r from-sky-500/20 to-cyan-500/20 text-sky-300 border border-sky-500/50 shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Tag className="w-3.5 h-3.5 text-sky-400" />
            <span>Budget-Friendly (&lt;₹200/day)</span>
          </button>

          <button
            onClick={() => setActiveTab('longer_value')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === 'longer_value'
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/50 shadow-sm'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Percent className="w-3.5 h-3.5 text-purple-400" />
            <span>Best Value for Longer Rentals</span>
          </button>
        </div>
      </div>

      {/* Horizontal Cards Reel / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {filteredCollection.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="group relative bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-950">
              <img
                src={getOptimizedImageUrl(item.images[0] || '', {
                  width: 300,
                  height: 200,
                  crop: 'fill',
                  quality: 'auto',
                })}
                alt={item.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=300&q=80';
                }}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                  {item.condition}
                </span>
              </div>
              {item.weeklyDiscountPercent >= 15 && (
                <div className="absolute bottom-2 right-2">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-teal-950/90 border border-teal-500/40 text-teal-300 font-bold backdrop-blur-sm">
                    -{item.weeklyDiscountPercent}% week
                  </span>
                </div>
              )}
            </div>

            <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block truncate">
                  {item.subcategory || item.category}
                </span>
                <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2 leading-tight mt-0.5">
                  {item.title}
                </h4>
              </div>

              <div className="pt-1 border-t border-slate-800/80 flex items-baseline justify-between">
                <div>
                  <span className="text-sm font-black text-emerald-400 font-heading">
                    ₹{item.dailyPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-0.5">/day</span>
                </div>
                <div className="flex items-center gap-0.5 text-amber-400 text-[11px] font-semibold">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{item.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer link to catalog */}
      <div className="flex items-center justify-end">
        <button
          onClick={() => onExploreFilter(activeTab)}
          className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 group"
        >
          <span>View all in full catalog</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
