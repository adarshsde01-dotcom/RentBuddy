import React, { useState } from 'react';
import { 
  Package, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Leaf, 
  IndianRupee, 
  ArrowUpRight, 
  RefreshCcw, 
  Layers, 
  PlusCircle, 
  FileText, 
  UserCheck, 
  Check, 
  Headphones 
} from 'lucide-react';
import { RentalBooking, RentalItem, BookingStatus } from '../../types/rental';
import { 
  updateBookingStatusInStore, 
  toggleItemAvailabilityInStore, 
  calculateImpactStats,
  resetStoreToDefaults 
} from '../../services/storage';

interface UserDashboardProps {
  bookings: RentalBooking[];
  items: RentalItem[];
  onRefreshData: () => void;
  onOpenListItem: () => void;
  onNavigateMarketplace: () => void;
  onShowToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  onNavigateSupport?: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  bookings,
  items,
  onRefreshData,
  onOpenListItem,
  onNavigateMarketplace,
  onShowToast,
  onNavigateSupport,
}) => {
  const [activeTab, setActiveTab] = useState<'renter' | 'owner' | 'impact'>('renter');
  const [selectedReceiptBooking, setSelectedReceiptBooking] = useState<RentalBooking | null>(null);

  const impact = calculateImpactStats();

  // Renter view bookings
  const renterBookings = bookings;

  // Owner view: listings owned by "owner-1" or user listings, plus incoming requests
  const ownerItems = items;
  const incomingRequests = bookings.filter((b) => b.status === 'pending');

  const handleUpdateStatus = (bookingId: string, newStatus: BookingStatus) => {
    updateBookingStatusInStore(bookingId, newStatus);
    onRefreshData();
    const statusLabels: Record<BookingStatus, string> = {
      approved: 'Rental request approved! Renter notified.',
      rejected: 'Rental request declined.',
      active: 'Rental is now active.',
      completed: 'Item marked as returned. Deposit released from escrow!',
      pending: 'Status marked as pending.',
    };
    onShowToast(statusLabels[newStatus], newStatus === 'rejected' ? 'info' : 'success');
  };

  const handleToggleAvailability = (itemId: string) => {
    const updated = toggleItemAvailabilityInStore(itemId);
    onRefreshData();
    if (updated) {
      onShowToast(
        updated.isAvailable ? 'Item is now available for rent' : 'Item marked as unavailable',
        'info'
      );
    }
  };

  const handleResetDemoData = () => {
    if (confirm('Reset demo data to initial catalog and sample bookings?')) {
      resetStoreToDefaults();
      onRefreshData();
      onShowToast('Dashboard & listings reset to initial demo state', 'info');
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Approved • Ready for Pickup
          </span>
        );
      case 'pending':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            Awaiting Owner Approval
          </span>
        );
      case 'active':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-950/80 text-sky-300 border border-sky-500/40 flex items-center gap-1">
            <Package className="w-3.5 h-3.5 text-sky-400" />
            Rental in Progress
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            Returned • Deposit Released
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-950/80 text-rose-300 border border-rose-500/40 flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5 text-rose-400" />
            Declined
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Banner & Impact Metric Strip */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/50 border border-slate-800 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
              Verified Community Member Dashboard
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white font-heading tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Alex</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Track your borrowed equipment, manage incoming borrower requests, and monitor your personal financial and sustainability impact.
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto">
            <button
              onClick={onOpenListItem}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List New Gear</span>
            </button>
            <button
              onClick={handleResetDemoData}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              title="Reset sample demo data"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Financial Savings</span>
              <IndianRupee className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
              ₹{impact.totalSavedDollars.toLocaleString('en-IN')}
            </p>
            <p className="text-[11px] text-emerald-400 mt-0.5">Saved vs retail purchasing</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>CO2e Prevented</span>
              <Leaf className="w-4 h-4 text-teal-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
              {impact.co2AvoidedKg} kg
            </p>
            <p className="text-[11px] text-teal-400 mt-0.5">Manufacturing carbon offset</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Waste Diverted</span>
              <Layers className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
              {impact.wasteDivertedKg} kg
            </p>
            <p className="text-[11px] text-sky-400 mt-0.5">E-waste / plastics kept out</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Trust Rating</span>
              <UserCheck className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white font-heading mt-1">
              5.0 ★
            </p>
            <p className="text-[11px] text-amber-400 mt-0.5">100% on-time returns</p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('renter')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'renter'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Package className="w-4 h-4 text-emerald-400" />
          <span>My Borrowings & Rentals ({renterBookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('owner')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'owner'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Layers className="w-4 h-4 text-teal-400" />
          <span>Owner Hub & Requests</span>
          {incomingRequests.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[11px] font-black animate-pulse">
              {incomingRequests.length} action
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('impact')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'impact'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span>Sustainability & Social Impact</span>
        </button>
      </div>

      {/* TAB 1: RENTER VIEW */}
      {activeTab === 'renter' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-heading">
              My Rental Bookings & History
            </h3>
            <button
              onClick={onNavigateMarketplace}
              className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 font-semibold"
            >
              Borrow more items <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {renterBookings.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <Package className="w-12 h-12 text-slate-600 mx-auto" />
              <h4 className="text-base font-bold text-white">No active rental requests yet</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Explore our catalog of cameras, drones, tools, books, and travel equipment to rent for your next project.
              </p>
              <button
                onClick={onNavigateMarketplace}
                className="mt-3 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
              >
                Browse Marketplace
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {renterBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={b.itemImage}
                      alt={b.itemTitle}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-slate-800 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusBadge(b.status)}
                        <span className="text-[11px] text-slate-500 font-mono">
                          ID: {b.id.slice(-6)}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
                        {b.itemTitle}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                          {b.startDate} &rarr; {b.endDate} ({b.totalDays} days)
                        </span>
                        <span>•</span>
                        <span>Handover: {b.pickupType === 'delivery' ? 'Courier Delivery' : 'Local Pickup'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Financials & Actions */}
                  <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                    <div className="text-left md:text-right">
                      <span className="text-base sm:text-lg font-black text-emerald-400 font-heading block">
                        ₹{b.totalPayable.toFixed(2)}
                      </span>
                      <span className="text-[11px] text-slate-400 block">
                        Includes ₹{b.securityDeposit.toLocaleString('en-IN')} refundable deposit
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedReceiptBooking(b)}
                        className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                        title="View Escrow Deposit Agreement Receipt"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Receipt</span>
                      </button>

                      {b.status === 'approved' && (
                        <button
                          onClick={() => handleUpdateStatus(b.id, 'active')}
                          className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all"
                        >
                          Confirm Pickup
                        </button>
                      )}

                      {b.status === 'active' && (
                        <button
                          onClick={() => handleUpdateStatus(b.id, 'completed')}
                          className="px-3 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all"
                        >
                          Mark Returned
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: OWNER HUB & REQUESTS */}
      {activeTab === 'owner' && (
        <div className="space-y-6">
          {/* Incoming Booking Requests Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                <span>Incoming Borrow Requests</span>
                {incomingRequests.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-xs font-bold">
                    {incomingRequests.length} pending
                  </span>
                )}
              </h3>
            </div>

            {incomingRequests.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-center text-xs text-slate-400">
                No pending borrower requests right now. Your items are listed and discoverable!
              </div>
            ) : (
              <div className="space-y-3">
                {incomingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg shadow-emerald-500/5"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={req.itemImage}
                        alt={req.itemTitle}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{req.renterName}</span>
                          <span className="text-[11px] text-slate-400">({req.renterEmail})</span>
                        </div>
                        <h4 className="text-sm font-semibold text-emerald-300 mt-0.5">
                          Requests to rent: {req.itemTitle}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          Dates: <strong className="text-slate-200">{req.startDate} to {req.endDate}</strong> ({req.totalDays} days) • Earnings: <strong className="text-emerald-400">₹{(req.baseTotal - req.discountAmount).toFixed(2)}</strong>
                        </p>
                        {req.renterMessage && (
                          <p className="text-xs text-slate-300 italic mt-1 bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                            "{req.renterMessage}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-end md:self-auto">
                      <button
                        onClick={() => handleUpdateStatus(req.id, 'rejected')}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/80 hover:text-rose-300 text-slate-300 text-xs font-bold transition-colors border border-slate-700"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(req.id, 'approved')}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Approve Rental
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* My Listed Items Section */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white font-heading">
                  My Listed Gear Catalog ({ownerItems.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Toggle availability or edit rental rates anytime
                </p>
              </div>
              <button
                onClick={onOpenListItem}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" /> Add Item
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ownerItems.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-bold text-white truncate" title={item.title}>
                        {item.title}
                      </h4>
                      <p className="text-xs font-black text-emerald-400 mt-1">
                        ₹{item.dailyPrice.toLocaleString('en-IN')} <span className="text-[10px] text-slate-400 font-normal">/ day</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                    <button
                      onClick={() => handleToggleAvailability(item.id)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 ${
                        item.isAvailable
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-500'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${item.isAvailable ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                      {item.isAvailable ? 'Listing Active' : 'Paused'}
                    </button>

                    <span className="text-slate-400 text-[11px]">
                      Deposit: ₹{item.securityDeposit.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SOCIAL & ENVIRONMENTAL IMPACT DEEP DIVE */}
      {activeTab === 'impact' && (
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden">
            <div className="max-w-2xl space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5" /> Circular Economy Impact Score
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading leading-tight">
                Borrowing is the single most effective way to eliminate product manufacture waste.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                By choosing to rent items like drones, cameras, pressure washers, and suitcases instead of purchasing them outright, you have diverted an estimated <strong>{impact.wasteDivertedKg} kg</strong> of e-waste and avoided <strong>{impact.co2AvoidedKg} kg</strong> of greenhouse gas emissions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 block">Money Kept in Community</span>
                <span className="text-2xl font-black text-emerald-400 font-heading mt-1 block">
                  ₹{impact.totalSavedDollars.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-slate-400">85% average savings vs purchasing new</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 block">Equiv. Trees Planted</span>
                <span className="text-2xl font-black text-teal-400 font-heading mt-1 block">
                  ~{Math.round(impact.co2AvoidedKg / 21)} Mature Trees
                </span>
                <span className="text-[11px] text-slate-400">Carbon absorption equivalent</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-400 block">Community Trust Rating</span>
                <span className="text-2xl font-black text-amber-400 font-heading mt-1 block">
                  100% Escrow Return
                </span>
                <span className="text-[11px] text-slate-400">Zero disputes or lost deposits</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 24/7 Customer Care Assistance Banner */}
      {onNavigateSupport && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Need help with an active rental or deposit?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Our 24/7 Care Desk provides dedicated assistance for both Borrowers (Receivers) and Lenders (Renters).
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateSupport}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-white text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5"
          >
            <span>Open Customer Care Desk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Escrow Deposit Receipt Modal (Demo) */}
      {selectedReceiptBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-white font-heading">Escrow Deposit Receipt</h4>
              </div>
              <button
                onClick={() => setSelectedReceiptBooking(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Booking Reference:</span>
                <span className="font-mono text-emerald-400">{selectedReceiptBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Item:</span>
                <span className="font-semibold text-slate-200">{selectedReceiptBooking.itemTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Renter:</span>
                <span>{selectedReceiptBooking.renterName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Rental Period:</span>
                <span>{selectedReceiptBooking.startDate} to {selectedReceiptBooking.endDate} ({selectedReceiptBooking.totalDays} days)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Rental Fee:</span>
                <span>₹{(selectedReceiptBooking.baseTotal - selectedReceiptBooking.discountAmount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Platform & Insurance (5%):</span>
                <span>₹{selectedReceiptBooking.serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 text-emerald-400 font-bold">
                <span>Refundable Escrow Deposit:</span>
                <span>₹{selectedReceiptBooking.securityDeposit.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold text-white">
                <span>Total Upfront Amount:</span>
                <span>₹{selectedReceiptBooking.totalPayable.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              * The security deposit is held in a protected simulated escrow account and refunded automatically within 24 hours of successful item return.
            </p>

            <button
              onClick={() => setSelectedReceiptBooking(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
