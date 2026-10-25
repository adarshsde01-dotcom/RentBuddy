import React from 'react';
import { Repeat, ShieldCheck, Leaf, Cloud } from 'lucide-react';
import { CategoryType } from '../../types/rental';

interface FooterProps {
  onSelectCategory: (cat: CategoryType) => void;
  onOpenCloudinarySettings: () => void;
  onOpenListItem: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenCloudinarySettings,
  onOpenListItem,
}) => {
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
                Rent<span className="text-emerald-400">Loop</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              RentLoop is a modern universal rental marketplace connecting neighbors to share cameras, drones, tools, textbooks, and gear for short durations instead of buying new.
            </p>

            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <Leaf className="w-4 h-4" />
              <span>Borrow Smart • Save More • Waste Less</span>
            </div>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Rental Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('cameras')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Cameras & Optics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('electronics')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Drones & Electronics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('travel')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Travel & Luggage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('books')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Academic Textbooks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('outdoor')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Camping & Outdoors
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('tools')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Tools & DIY
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Trust & Community
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Escrow Guarantee</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Damage Protection</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Borrower IDs</span>
              </li>
              <li>
                <button
                  onClick={onOpenListItem}
                  className="text-emerald-400 font-semibold hover:underline"
                >
                  List an Item for Rent &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Cloudinary & Tech */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Technology & Media
            </h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Built with React, TypeScript, Vite, Tailwind CSS, and Cloudinary for real-time media transformations.
            </p>
            <button
              onClick={onOpenCloudinarySettings}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500/50 transition-colors"
            >
              <Cloud className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cloudinary Pipeline</span>
            </button>
          </div>

        </div>

        {/* Bottom credits */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} RentLoop. Open source hackathon prototype.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted for sustainability & circular economy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
