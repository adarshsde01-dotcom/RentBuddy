import React, { useState, useEffect, useMemo } from 'react';
import { 
  RentalItem, 
  RentalBooking, 
  CategoryType, 
  FilterOptions, 
  CloudinaryConfig 
} from './types/rental';
import { 
  getStoredItems, 
  getStoredBookings 
} from './services/storage';
import { getStoredCloudinaryConfig } from './services/cloudinary';

// Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { HowItWorks } from './components/home/HowItWorks';
import { SocialImpactSection } from './components/home/SocialImpactSection';
import { CategoryFilterBar } from './components/marketplace/CategoryFilterBar';
import { SearchBarAndFilters } from './components/marketplace/SearchBarAndFilters';
import { ProductCard } from './components/marketplace/ProductCard';
import { ProductDetailModal } from './components/marketplace/ProductDetailModal';
import { BookingRequestModal } from './components/marketplace/BookingRequestModal';
import { ListItemModal } from './components/listing/ListItemModal';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { CloudinarySettingsModal } from './components/common/CloudinarySettingsModal';
import { Toast, ToastProps } from './components/common/Toast';
import { PackageOpen, Sparkles, PlusCircle } from 'lucide-react';

export function App() {
  // Navigation
  const [currentView, setCurrentView] = useState<'marketplace' | 'dashboard' | 'how-it-works' | 'impact'>('marketplace');

  // Core Data
  const [items, setItems] = useState<RentalItem[]>([]);
  const [bookings, setBookings] = useState<RentalBooking[]>([]);
  const [cloudinaryConfig, setCloudinaryConfig] = useState<CloudinaryConfig>(getStoredCloudinaryConfig());

  // Filter & Search State
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    searchQuery: '',
    minPrice: 0,
    maxPrice: 60,
    condition: 'all',
    onlyAvailable: false,
    sortBy: 'recommended',
  });

  // Modals & Popups
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<RentalItem | null>(null);
  const [activeBookingItem, setActiveBookingItem] = useState<RentalItem | null>(null);
  const [bookingCalculation, setBookingCalculation] = useState<any>(null);
  const [isListItemModalOpen, setIsListItemModalOpen] = useState(false);
  const [isCloudinaryModalOpen, setIsCloudinaryModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'info' | 'error' }>>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Load Initial Data
  const refreshData = () => {
    setItems(getStoredItems());
    setBookings(getStoredBookings());
    setCloudinaryConfig(getStoredCloudinaryConfig());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Filter Engine
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (filters.category !== 'all' && item.category !== filters.category) {
        return false;
      }

      // Max price filter
      if (item.dailyPrice > filters.maxPrice) {
        return false;
      }

      // Condition filter
      if (filters.condition !== 'all' && item.condition !== filters.condition) {
        return false;
      }

      // Availability filter
      if (filters.onlyAvailable && !item.isAvailable) {
        return false;
      }

      // Search query filter (matches title, description, tags, location)
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchLoc = item.location.toLowerCase().includes(query);
        const matchCategory = item.category.toLowerCase().includes(query);
        const matchTags = item.tags.some((tag) => tag.toLowerCase().includes(query));

        if (!matchTitle && !matchDesc && !matchLoc && !matchCategory && !matchTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price_low':
          return a.dailyPrice - b.dailyPrice;
        case 'price_high':
          return b.dailyPrice - a.dailyPrice;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return b.reviewCount - a.reviewCount;
        case 'recommended':
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
      }
    });
  }, [items, filters]);

  // Handle Quick Rent click
  const handleQuickRent = (item: RentalItem) => {
    setSelectedItemForDetail(item);
  };

  // Handle proceed from Detail Modal to Booking Modal
  const handleProceedToBooking = (calc: any) => {
    setActiveBookingItem(selectedItemForDetail);
    setBookingCalculation(calc);
    setSelectedItemForDetail(null);
  };

  // Handle Confirmed Booking
  const handleBookingConfirmed = (newBooking: RentalBooking) => {
    setActiveBookingItem(null);
    setBookingCalculation(null);
    refreshData();
    addToast(
      `Rental request sent to ${selectedItemForDetail?.owner.name || 'owner'}! View status in Dashboard.`,
      'success'
    );
    setCurrentView('dashboard');
  };

  // Handle Created Item
  const handleItemCreated = (newItem: RentalItem) => {
    refreshData();
    addToast(`"${newItem.title}" has been published to the rental catalog!`, 'success');
  };

  const pendingRequestsCount = bookings.filter((b) => b.status === 'pending').length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Toast Notifications Overlay */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              id={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={removeToast}
            />
          </div>
        ))}
      </div>

      {/* Responsive Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenListItem={() => setIsListItemModalOpen(true)}
        onOpenCloudinarySettings={() => setIsCloudinaryModalOpen(true)}
        cloudinaryConfig={cloudinaryConfig}
        pendingRequestsCount={pendingRequestsCount}
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => setFilters((prev) => ({ ...prev, searchQuery: q }))}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'marketplace' && (
          <div className="space-y-10">
            {/* Hero Section with Live Stats */}
            <HeroSection
              searchQuery={filters.searchQuery}
              onSearchChange={(q) => setFilters((prev) => ({ ...prev, searchQuery: q }))}
              onSelectCategory={(cat) => {
                setFilters((prev) => ({ ...prev, category: cat }));
                const element = document.getElementById('catalog-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenListItem={() => setIsListItemModalOpen(true)}
              onExploreClick={() => {
                const element = document.getElementById('catalog-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Catalog Grid Anchor Section */}
            <div id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
              
              {/* Category Pills Slider */}
              <CategoryFilterBar
                selectedCategory={filters.category}
                onSelectCategory={(cat) => setFilters((prev) => ({ ...prev, category: cat }))}
                items={items}
              />

              {/* Advanced Search & Filtering Controls */}
              <SearchBarAndFilters
                filters={filters}
                onChangeFilters={setFilters}
                totalResultsCount={filteredItems.length}
              />

              {/* Product Cards Grid */}
              {filteredItems.length === 0 ? (
                <div className="p-16 rounded-3xl bg-slate-900/40 border border-slate-800 text-center space-y-4 my-8">
                  <div className="p-4 rounded-2xl bg-slate-800/80 w-fit mx-auto text-slate-500">
                    <PackageOpen className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    No items match your criteria
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                    Try adjusting your maximum price slider, clearing your search keywords, or switching categories.
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() =>
                        setFilters({
                          category: 'all',
                          searchQuery: '',
                          minPrice: 0,
                          maxPrice: 60,
                          condition: 'all',
                          onlyAvailable: false,
                          sortBy: 'recommended',
                        })
                      }
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
                    >
                      Clear All Filters
                    </button>
                    <button
                      onClick={() => setIsListItemModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>List This Item First</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems.map((item) => (
                    <ProductCard
                      key={item.id}
                      item={item}
                      onSelect={(item) => setSelectedItemForDetail(item)}
                      onRentClick={(item) => handleQuickRent(item)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* How It Works & Social Impact Previews on Homepage */}
            <HowItWorks
              onOpenListItem={() => setIsListItemModalOpen(true)}
              onExploreItems={() => {
                const element = document.getElementById('catalog-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <SocialImpactSection
              onExploreItems={() => {
                const element = document.getElementById('catalog-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {currentView === 'dashboard' && (
          <div className="py-6">
            <UserDashboard
              bookings={bookings}
              items={items}
              onRefreshData={refreshData}
              onOpenListItem={() => setIsListItemModalOpen(true)}
              onNavigateMarketplace={() => setCurrentView('marketplace')}
              onShowToast={addToast}
            />
          </div>
        )}

        {currentView === 'how-it-works' && (
          <div className="py-6">
            <HowItWorks
              onOpenListItem={() => setIsListItemModalOpen(true)}
              onExploreItems={() => setCurrentView('marketplace')}
            />
          </div>
        )}

        {currentView === 'impact' && (
          <div className="py-6">
            <SocialImpactSection
              onExploreItems={() => setCurrentView('marketplace')}
            />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setFilters((prev) => ({ ...prev, category: cat }));
          setCurrentView('marketplace');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCloudinarySettings={() => setIsCloudinaryModalOpen(true)}
        onOpenListItem={() => setIsListItemModalOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        item={selectedItemForDetail}
        isOpen={Boolean(selectedItemForDetail)}
        onClose={() => setSelectedItemForDetail(null)}
        onProceedToBooking={handleProceedToBooking}
      />

      {/* Booking Confirmation Workflow Modal */}
      <BookingRequestModal
        item={activeBookingItem}
        calculation={bookingCalculation}
        isOpen={Boolean(activeBookingItem && bookingCalculation)}
        onClose={() => {
          setActiveBookingItem(null);
          setBookingCalculation(null);
        }}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* List an Item Modal */}
      <ListItemModal
        isOpen={isListItemModalOpen}
        onClose={() => setIsListItemModalOpen(false)}
        onItemCreated={handleItemCreated}
        onOpenCloudinarySettings={() => setIsCloudinaryModalOpen(true)}
      />

      {/* Cloudinary Media Configuration Modal */}
      <CloudinarySettingsModal
        isOpen={isCloudinaryModalOpen}
        onClose={() => setIsCloudinaryModalOpen(false)}
        onConfigUpdated={(cfg) => {
          setCloudinaryConfig(cfg);
          addToast('Cloudinary configuration updated successfully', 'success');
        }}
      />
    </div>
  );
}

export default App;
