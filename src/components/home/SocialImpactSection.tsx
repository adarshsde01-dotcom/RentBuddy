import React, { useState } from 'react';
import { 
  Leaf, 
  GraduationCap, 
  Compass, 
  Wrench, 
  HeartHandshake, 
  TrendingDown, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface SocialImpactSectionProps {
  onExploreItems: () => void;
}

export const SocialImpactSection: React.FC<SocialImpactSectionProps> = ({
  onExploreItems,
}) => {
  const [selectedExample, setSelectedExample] = useState<'student' | 'traveler' | 'creator'>('student');

  const scenarios = {
    student: {
      title: 'College Students & Learners',
      item: 'CLRS Algorithms Textbook + iPad Pro for Semester Prep',
      buyCost: 1324,
      rentCost: 147,
      savings: 1177,
      co2Saved: 38,
      quote:
        '"As a computer science student, I needed the Cormen algorithm book and a tablet for finals. Renting saved me over $1,100 that I can put toward tuition and rent."',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      author: 'Aria Chen, Student @ MIT',
    },
    traveler: {
      title: 'Backpackers & Weekend Explorers',
      item: 'Patagonia 100L Weatherproof Duffel + 6-Person Camping Tent',
      buyCost: 939,
      rentCost: 108,
      savings: 831,
      co2Saved: 46,
      quote:
        '"I take one big mountaineering trip per year. It makes zero sense to store a giant 100L duffel in my tiny studio apartment all year. RentLoop is a game changer."',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      author: 'Caleb Walker, Outdoor Adventurer',
    },
    creator: {
      title: 'Indie Creators & DIY Homeowners',
      item: 'Sony Alpha A7 IV 4K Mirrorless Camera + DeWalt Impact Kit',
      buyCost: 2747,
      rentCost: 168,
      savings: 2579,
      co2Saved: 72,
      quote:
        '"We shot a commercial pilot for our local small business without spending $3,000 on camera gear upfront. It lowered our production barrier completely."',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      author: 'Marcus Vance, Filmmaker',
    },
  };

  const active = scenarios[selectedExample];

  return (
    <section className="py-16 border-t border-slate-800/80 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider inline-flex items-center gap-1.5">
          <Leaf className="w-3.5 h-3.5" /> Social Impact & Circular Economy
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
          Democratizing access. Eliminating waste.
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          The average power drill is used for just <strong>13 minutes in its entire lifespan</strong>. RentLoop unlocks the latent value of existing goods so people can accomplish great things without financial strain or environmental guilt.
        </p>
      </div>

      {/* 3 Beneficiary Persona Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => setSelectedExample('student')}
          className={`p-6 rounded-3xl border transition-all cursor-pointer ${
            selectedExample === 'student'
              ? 'bg-slate-900 border-emerald-500 shadow-xl shadow-emerald-500/10'
              : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 w-fit mb-4 border border-emerald-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-heading">Students & Learners</h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Eliminate textbook price gouging and rent tablets, STEM lab kits, and specialty software devices for the exact duration of a course.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs font-bold text-emerald-400 flex items-center justify-between">
            <span>Average savings: 89%</span>
            <span className="text-slate-500">&rarr;</span>
          </div>
        </div>

        <div 
          onClick={() => setSelectedExample('traveler')}
          className={`p-6 rounded-3xl border transition-all cursor-pointer ${
            selectedExample === 'traveler'
              ? 'bg-slate-900 border-teal-500 shadow-xl shadow-teal-500/10'
              : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 w-fit mb-4 border border-teal-500/20">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-heading">Travelers & Campers</h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Never crowd city apartments with oversized tents, roof racks, and duffels. Pick up gear before your road trip and return it hassle-free.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs font-bold text-teal-400 flex items-center justify-between">
            <span>Average savings: 84%</span>
            <span className="text-slate-500">&rarr;</span>
          </div>
        </div>

        <div 
          onClick={() => setSelectedExample('creator')}
          className={`p-6 rounded-3xl border transition-all cursor-pointer ${
            selectedExample === 'creator'
              ? 'bg-slate-900 border-sky-500 shadow-xl shadow-sky-500/10'
              : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-400 w-fit mb-4 border border-sky-500/20">
            <Wrench className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white font-heading">Creators & DIYers</h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Take on freelance shoots, home renovation projects, and events without high upfront capital expenses or credit card debt.
          </p>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs font-bold text-sky-400 flex items-center justify-between">
            <span>Average savings: 92%</span>
            <span className="text-slate-500">&rarr;</span>
          </div>
        </div>
      </div>

      {/* Interactive Case Study Comparison Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Real Scenario Breakdown: {active.title}
          </span>
          <h4 className="text-xl sm:text-2xl font-bold text-white font-heading">
            {active.item}
          </h4>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Retail Purchase</span>
              <span className="text-lg sm:text-xl font-bold text-rose-400 line-through mt-0.5 block">
                ${active.buyCost}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">RentLoop Rental</span>
              <span className="text-lg sm:text-xl font-black text-emerald-400 mt-0.5 block">
                ${active.rentCost}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
              <span className="text-[11px] text-emerald-400 block">Cash Kept</span>
              <span className="text-lg sm:text-xl font-black text-emerald-300 mt-0.5 block">
                +${active.savings}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3 mt-4">
            <img
              src={active.avatar}
              alt={active.author}
              className="w-10 h-10 rounded-full object-cover border border-emerald-500 shrink-0"
            />
            <div>
              <p className="text-xs text-slate-300 italic">{active.quote}</p>
              <p className="text-[11px] font-bold text-emerald-400 mt-1">{active.author}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-emerald-950/50 to-teal-950/40 border border-emerald-500/30 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <span>Environmental Footprint Avoided</span>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <span>Manufacturing emissions saved:</span>
              <strong className="text-emerald-300 font-bold">{active.co2Saved} kg CO2e</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Raw minerals / metals mined:</span>
              <strong className="text-emerald-300 font-bold">~14 kg materials</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Packaging / bubblewrap diverted:</span>
              <strong className="text-emerald-300 font-bold">100% Zero waste</strong>
            </div>
          </div>

          <button
            onClick={onExploreItems}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5 mt-2"
          >
            <span>Borrow Sustainably on RentLoop</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
