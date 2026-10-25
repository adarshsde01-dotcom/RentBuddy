import React, { useState } from 'react';
import { 
  Repeat, 
  PlusCircle, 
  LayoutDashboard, 
  Cloud, 
  Menu, 
  X, 
  Search, 
  Compass, 
  HelpCircle, 
  Leaf,
  Headphones,
  Grid2X2
} from 'lucide-react';
import { CloudinaryConfig } from '../../types/rental';

interface NavbarProps {
  currentView: 'marketplace' | 'dashboard' | 'how-it-works' | 'impact' | 'support';
  onNavigate: (view: 'marketplace' | 'dashboard' | 'how-it-works' | 'impact' | 'support') => void;
  onOpenListItem: () => void;
  onOpenCloudinarySettings: () => void;
  onOpenAllCategories?: () => void;
  cloudinaryConfig: CloudinaryConfig;
  pendingRequestsCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenListItem,
  onOpenCloudinarySettings,
  onOpenAllCategories,
  cloudinaryConfig,
  pendingRequestsCount,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isCloudinaryConnected = cloudinaryConfig.isCustomConfigured;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onNavigate('marketplace');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/30 transition-all">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Repeat className="w-5 h-5 text-emerald-400 group-hover:rotate-180 transition-transform duration-500" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black font-heading tracking-tight text-white flex items-center gap-1">
                  Rent<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Loop</span>
                </span>
                <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest text-emerald-400/80 -mt-1">
                  Universal Rental Marketplace
                </span>
              </div>
            </button>
          </div>

          {/* Quick Search bar in Navbar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentView !== 'marketplace') onNavigate('marketplace');
                }}
                placeholder="Search cameras, cricket bats, drones, sarees, tools..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-300">
            <button
              onClick={() => onNavigate('marketplace')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentView === 'marketplace'
                  ? 'text-emerald-400 bg-emerald-500/10 font-semibold'
                  : 'hover:text-white hover:bg-slate-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              Explore
            </button>

            {onOpenAllCategories && (
              <button
                onClick={onOpenAllCategories}
                className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Grid2X2 className="w-4 h-4 text-emerald-400" />
                Categories
              </button>
            )}

            <button
              onClick={() => onNavigate('how-it-works')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentView === 'how-it-works'
                  ? 'text-emerald-400 bg-emerald-500/10 font-semibold'
                  : 'hover:text-white hover:bg-slate-900'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              How It Works
            </button>

            <button
              onClick={() => onNavigate('impact')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentView === 'impact'
                  ? 'text-emerald-400 bg-emerald-500/10 font-semibold'
                  : 'hover:text-white hover:bg-slate-900'
              }`}
            >
              <Leaf className="w-4 h-4 text-emerald-400" />
              Impact
            </button>

            <button
              onClick={() => onNavigate('support')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentView === 'support'
                  ? 'text-emerald-400 bg-emerald-500/10 font-semibold'
                  : 'hover:text-white hover:bg-slate-900'
              }`}
            >
              <Headphones className="w-4 h-4 text-teal-400" />
              Care
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className={`relative px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentView === 'dashboard'
                  ? 'text-emerald-400 bg-emerald-500/10 font-semibold'
                  : 'hover:text-white hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
              {pendingRequestsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black flex items-center justify-center animate-pulse">
                  {pendingRequestsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2.5">
            {/* Cloudinary Integration Status Pill */}
            <button
              onClick={onOpenCloudinarySettings}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                isCloudinaryConnected
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/40'
                  : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:border-slate-600'
              }`}
              title="Cloudinary Media Settings"
            >
              <Cloud className={`w-3.5 h-3.5 ${isCloudinaryConnected ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className="truncate max-w-[110px]">
                {isCloudinaryConnected ? 'Cloudinary: Live' : 'Media: Demo'}
              </span>
              <span
                className={`w-2 h-2 rounded-full ${
                  isCloudinaryConnected ? 'bg-emerald-400 shadow-sm shadow-emerald-400' : 'bg-amber-400'
                }`}
              />
            </button>

            {/* List an Item CTA */}
            <button
              onClick={onOpenListItem}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 shrink-0" />
              <span>List an Item</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800/80 space-y-2 animate-fade-in">
            {/* Mobile search */}
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentView !== 'marketplace') onNavigate('marketplace');
                }}
                placeholder="Search cameras, tools, textbooks..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              onClick={() => {
                onNavigate('marketplace');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm ${
                currentView === 'marketplace' ? 'bg-emerald-500/10 text-emerald-400 font-semibold' : 'text-slate-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4" /> Explore Marketplace
              </span>
            </button>

            {onOpenAllCategories && (
              <button
                onClick={() => {
                  onOpenAllCategories();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-900"
              >
                <span className="flex items-center gap-2">
                  <Grid2X2 className="w-4 h-4 text-emerald-400" /> All 20 Categories
                </span>
                <span className="text-xs text-emerald-400 font-bold">200+ subcategories</span>
              </button>
            )}

            <button
              onClick={() => {
                onNavigate('dashboard');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm ${
                currentView === 'dashboard' ? 'bg-emerald-500/10 text-emerald-400 font-semibold' : 'text-slate-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" /> User Dashboard
              </span>
              {pendingRequestsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold">
                  {pendingRequestsCount} new
                </span>
              )}
            </button>

            <button
              onClick={() => {
                onNavigate('how-it-works');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm ${
                currentView === 'how-it-works' ? 'bg-emerald-500/10 text-emerald-400 font-semibold' : 'text-slate-300'
              }`}
            >
              <HelpCircle className="w-4 h-4" /> How It Works
            </button>

            <button
              onClick={() => {
                onNavigate('impact');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm ${
                currentView === 'impact' ? 'bg-emerald-500/10 text-emerald-400 font-semibold' : 'text-slate-300'
              }`}
            >
              <Leaf className="w-4 h-4 text-emerald-400" /> Social & Eco Impact
            </button>

            <button
              onClick={() => {
                onNavigate('support');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm ${
                currentView === 'support' ? 'bg-emerald-500/10 text-emerald-400 font-semibold' : 'text-slate-300'
              }`}
            >
              <Headphones className="w-4 h-4 text-teal-400" /> Customer Care
            </button>

            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  onOpenCloudinarySettings();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-400 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-emerald-400" /> Cloudinary Settings
                </span>
                <span className="text-[11px] text-emerald-400">
                  {isCloudinaryConnected ? 'Connected' : 'Demo Mode'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
