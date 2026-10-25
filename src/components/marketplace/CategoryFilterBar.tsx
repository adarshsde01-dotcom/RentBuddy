import React from 'react';
import { 
  Layers, 
  Camera, 
  Smartphone, 
  Luggage, 
  BookOpen, 
  UtensilsCrossed, 
  Wrench, 
  Tent 
} from 'lucide-react';
import { CategoryType, RentalItem } from '../../types/rental';

export interface CategoryInfo {
  id: CategoryType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'all',
    label: 'All Items',
    icon: <Layers className="w-4 h-4" />,
    description: 'Explore full catalog',
  },
  {
    id: 'cameras',
    label: 'Cameras & Optics',
    icon: <Camera className="w-4 h-4" />,
    description: 'Mirrorless, lenses, cinema kits',
  },
  {
    id: 'electronics',
    label: 'Electronics & Drones',
    icon: <Smartphone className="w-4 h-4" />,
    description: 'Drones, tablets, VR headsets',
  },
  {
    id: 'travel',
    label: 'Travel & Luggage',
    icon: <Luggage className="w-4 h-4" />,
    description: 'Duffels, hard cases, packs',
  },
  {
    id: 'books',
    label: 'Books & Textbooks',
    icon: <BookOpen className="w-4 h-4" />,
    description: 'Academic texts & bestsellers',
  },
  {
    id: 'kitchen',
    label: 'Kitchen & Hosting',
    icon: <UtensilsCrossed className="w-4 h-4" />,
    description: 'Espresso machines, pizza ovens',
  },
  {
    id: 'tools',
    label: 'Tools & DIY',
    icon: <Wrench className="w-4 h-4" />,
    description: 'Power tools, lasers, washers',
  },
  {
    id: 'outdoor',
    label: 'Outdoor & Camping',
    icon: <Tent className="w-4 h-4" />,
    description: 'Tents, stoves, power packs',
  },
];

interface CategoryFilterBarProps {
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  items: RentalItem[];
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  items,
}) => {
  const getCategoryCount = (catId: CategoryType): number => {
    if (catId === 'all') return items.length;
    return items.filter((item) => item.category === catId).length;
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = getCategoryCount(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
                isSelected
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/60 text-emerald-300 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              <span className={isSelected ? 'text-emerald-400' : 'text-slate-400'}>
                {cat.icon}
              </span>
              <span>{cat.label}</span>
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
      </div>
    </div>
  );
};
