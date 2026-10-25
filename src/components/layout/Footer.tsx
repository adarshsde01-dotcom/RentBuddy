import React from 'react';
import { Repeat, ShieldCheck, Leaf, Cloud, Headphones, Grid2X2 } from 'lucide-react';
import { CategoryType } from '../../types/rental';
import { getPopularCategories } from '../../data/categories';

interface FooterProps {
  onSelectCategory: (cat: CategoryType) => void;
  onOpenCloudinarySettings: () => void;
  onOpenListItem: () => void;
  onNavigateSupport?: () => void;
  onOpenAllCategories?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenCloudinarySettings,
  onOpenListItem,
  onNavigateSupport,
  onOpenAllCategories,
}) => {
  const popularCategories = getPopularCategories().slice(0, 8);

  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950/90 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Repeat className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <span className="text-xl font-black font-heading tracking-tight text-white">
                Rent<span className="text-emerald-400">Buddy</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              RentBuddy is a comprehensive, universal peer-to-peer rental marketplace where users can rent almost any useful physical item for a day, a week, or longer.
            </p>

            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <Leaf className="w-4 h-4" />
              <span>Borrow Smart • Save 85% • Reduce Landfill Waste</span>
            </div>
          </div>

          {/* Col 3: Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Popular Categories
            </h4>
            <ul className="space-y-2">
              {popularCategories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              {onOpenAllCategories && (
                <li className="pt-1">
                  <button
                    onClick={onOpenAllCategories}
                    className="text-emerald-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Grid2X2 className="w-3.5 h-3.5" />
                    <span>All 20 Categories &rarr;</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Trust, Protection & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Trust & Security
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Escrow Guarantee</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>₹2,00,000 Damage Cover</span>
              </li>
              {onNavigateSupport && (
                <li>
                  <button
                    onClick={onNavigateSupport}
                    className="flex items-center gap-1.5 text-teal-300 hover:text-white font-semibold transition-colors cursor-pointer"
                  >
                    <Headphones className="w-3.5 h-3.5 text-teal-400" />
                    <span>24/7 Customer Care Desk &rarr;</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={onOpenListItem}
                  className="text-emerald-400 font-semibold hover:underline cursor-pointer"
                >
                  List Your Item for Rent &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Architecture & Media */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Media & Integrations
            </h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Built with extensible, reusable category architecture, TypeScript, React 19, and Cloudinary media optimization.
            </p>
            <button
              onClick={onOpenCloudinarySettings}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500/50 transition-colors cursor-pointer"
            >
              <Cloud className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cloudinary Pipeline</span>
            </button>
          </div>

        </div>

        {/* Bottom credits */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            &copy; 2026 RentBuddy Universal Marketplace. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Engineered for circular economy & sustainable community sharing
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
