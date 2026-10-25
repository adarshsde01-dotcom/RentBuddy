import React, { useState } from 'react';
import { 
  Headphones, 
  ShieldCheck, 
  HelpCircle, 
  MessageSquare, 
  PhoneCall, 
  Mail, 
  Clock, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  Sparkles,
  FileQuestion,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SupportTicket } from '../../types/rental';

interface CustomerSupportSectionProps {
  onShowToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  initialRole?: 'receiver' | 'renter';
}

export const CustomerSupportSection: React.FC<CustomerSupportSectionProps> = ({
  onShowToast,
  initialRole = 'receiver',
}) => {
  const [activeRole, setActiveRole] = useState<'receiver' | 'renter'>(initialRole);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Form State
  const [ticketName, setTicketName] = useState('');
  const [ticketEmail, setTicketEmail] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [issueCategory, setIssueCategory] = useState(
    activeRole === 'receiver' ? 'Security Deposit Refund' : 'Damage Claim & Protection'
  );
  const [urgency, setUrgency] = useState<'normal' | 'high' | 'urgent'>('normal');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<SupportTicket | null>(null);

  // FAQs tailored for both sides
  const receiverFaqs = [
    {
      q: 'How and when will my security deposit be refunded?',
      a: 'Your security deposit is locked safely in simulated escrow. Once you return the gear and the owner confirms that the item is in good condition, the full deposit is released back to your original payment method automatically within 24 hours. No manual follow-up required.',
    },
    {
      q: 'What should I do if the equipment arrives with existing scratches or defects?',
      a: 'Inspect the item immediately at handover! Take 2-3 quick photos showing the defect and note it in your pickup message to the lender or through our Care desk. You are NEVER held liable for pre-existing wear and tear that was documented at pickup.',
    },
    {
      q: 'Can I extend my rental duration if I need the item for more days?',
      a: 'Yes! Navigate to your Dashboard -> My Borrowings, and submit a "Request Extension". As long as the owner does not have a back-to-back booking from another user, extensions are approved with your multi-day discount intact.',
    },
    {
      q: 'What if the lender does not show up at the scheduled pickup point?',
      a: 'If a lender is more than 20 minutes late with no communication, call our 24/7 priority line or tap "Urgent Assistance". We will either locate an alternate verified item nearby or cancel the booking with an instant 100% refund plus ₹500 rental credit.',
    },
    {
      q: 'How does cancellation work if my plans change?',
      a: 'Cancellations made at least 24 hours prior to the scheduled pickup time receive a 100% full refund with zero cancellation penalties.',
    },
  ];

  const renterFaqs = [
    {
      q: 'What protection do I have if a borrower damages or breaks my equipment?',
      a: 'Every item on RentBuddy is backed by the borrower’s refundable security deposit plus RentBuddy’s Community Damage Protection Guarantee (covering up to ₹2,00,000). If an item is returned damaged, simply tap "Report Damage" within 48 hours with photos, and our claims team reimburses repair or replacement costs.',
    },
    {
      q: 'What happens if the borrower returns my gear late?',
      a: 'Late returns without prior mutual agreement trigger automatic late fee charges: 1.5x the daily rental rate for each delayed day, charged to the borrower and transferred directly to your payout account.',
    },
    {
      q: 'When and how do I receive my rental earnings payout?',
      a: 'Earnings are transferred directly to your bank account or registered UPI ID within 24 hours of successful item handover. You can review earnings breakdowns anytime in your Owner Hub.',
    },
    {
      q: 'How are borrowers verified before they can rent my gear?',
      a: 'All borrowers must complete mobile OTP verification, government ID verification (Aadhaar / Driving License / Passport), and link a verified email address. You also have the right to decline any rental request before accepting.',
    },
    {
      q: 'Can I pause or temporarily unlist my items when I need them myself?',
      a: 'Absolutely! Go to Dashboard -> Owner Hub, and toggle the "Active / Paused" button next to any of your listed items. Pausing prevents new booking requests while keeping your reviews and specs saved.',
    },
  ];

  const activeFaqs = activeRole === 'receiver' ? receiverFaqs : renterFaqs;

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketName.trim() || !ticketEmail.trim() || !message.trim()) {
      onShowToast('Please fill out all required fields.', 'error');
      return;
    }

    const newTicket: SupportTicket = {
      id: `RLC-${Math.floor(1000 + Math.random() * 9000)}`,
      role: activeRole,
      category: issueCategory,
      subject: subject || `${issueCategory} Request`,
      message: message.trim(),
      bookingId: bookingId.trim() || undefined,
      userEmail: ticketEmail.trim(),
      userName: ticketName.trim(),
      urgency,
      status: 'open',
      createdAt: new Date().toISOString(),
    };

    setSubmittedTicket(newTicket);
    onShowToast(`Support ticket ${newTicket.id} registered! Our team is on it.`, 'success');

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#14b8a6', '#38bdf8'],
      });
    } catch {
      // ignore
    }
  };

  const handleResetForm = () => {
    setSubmittedTicket(null);
    setSubject('');
    setMessage('');
    setBookingId('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fade-in">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-md">
          <Headphones className="w-4 h-4 text-emerald-400" />
          <span>24/7 Dedicated Care & Resolution Desk</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-heading tracking-tight leading-tight">
          How can we help you today?
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Comprehensive, round-the-clock protection and support tailored for both <strong>Receivers (Borrowers)</strong> and <strong>Renters (Equipment Owners)</strong>.
        </p>

        {/* Dual Role Selector Switcher */}
        <div className="pt-2">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <button
              onClick={() => {
                setActiveRole('receiver');
                setIssueCategory('Security Deposit Refund');
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeRole === 'receiver'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>I am a Receiver (Borrower)</span>
            </button>

            <button
              onClick={() => {
                setActiveRole('renter');
                setIssueCategory('Damage Claim & Protection');
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeRole === 'renter'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>I am a Renter (Item Owner / Lender)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Direct Contact Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-emerald-500/40 transition-colors">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit border border-emerald-500/20">
            <PhoneCall className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Toll-Free Helpline</h3>
          <p className="text-xs text-slate-400">Instant connection to our support agents</p>
          <p className="text-sm font-mono font-bold text-emerald-400 pt-1">1800-RENT-BUDDY</p>
          <span className="text-[10px] text-slate-500 block">Toll-free • Hindi, English & Regional</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-emerald-500/40 transition-colors">
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 w-fit border border-teal-500/20">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">WhatsApp Live Desk</h3>
          <p className="text-xs text-slate-400">Share handover photos & quick questions</p>
          <p className="text-sm font-mono font-bold text-teal-400 pt-1">+91 98765 43210</p>
          <span className="text-[10px] text-slate-500 block">Avg reply: under 5 minutes</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-emerald-500/40 transition-colors">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 w-fit border border-sky-500/20">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Direct Email Support</h3>
          <p className="text-xs text-slate-400">Escrow verification & claim requests</p>
          <p className="text-sm font-mono font-bold text-sky-400 pt-1">care@rentbuddy.in</p>
          <span className="text-[10px] text-slate-500 block">Ticket logged with tracking ID</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-emerald-500/40 transition-colors">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit border border-amber-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Escrow & Damage Desk</h3>
          <p className="text-xs text-slate-400">₹2,00,000 claim guarantee & deposit safety</p>
          <p className="text-sm font-bold text-amber-400 pt-1">Zero-Liability Guarantee</p>
          <span className="text-[10px] text-slate-500 block">100% deposit return assurance</span>
        </div>
      </div>

      {/* Role-Specific Focus Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Sparkles className="w-4 h-4" />
            {activeRole === 'receiver' ? 'Receiver Protection Guarantee' : 'Lender Asset Protection Guarantee'}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
            {activeRole === 'receiver'
              ? 'Borrow with peace of mind. Your deposit is 100% protected.'
              : 'Earn safely. Your equipment is protected up to ₹2,00,000.'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {activeRole === 'receiver'
              ? 'Security deposits are held strictly in neutral escrow and released automatically within 24 hours of return. You are never liable for pre-existing defects, and cancellations 24h prior are 100% free.'
              : 'Our verified borrower vetting, biometric OTP authentication, and damage guarantee ensure your gear is treated with utmost care. If damage occurs, our community insurance covers repairs swiftly.'}
          </p>
        </div>

        <div className="shrink-0 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-right space-y-1">
          <span className="text-[11px] text-slate-400 block">Average Claim Resolution</span>
          <span className="text-2xl font-black text-emerald-400 font-heading block">Under 24 Hours</span>
          <span className="text-[10px] text-teal-400 flex items-center justify-end gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Disputed Escrow Retained
          </span>
        </div>
      </div>

      {/* Two Column Layout: Interactive Ticket Form + FAQs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Raise a Support Ticket Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <FileQuestion className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    {activeRole === 'receiver' ? 'Receiver Support Desk' : 'Lender / Owner Support Desk'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    File a request, report an issue, or ask a question directly
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                Avg Response: 6 mins
              </span>
            </div>

            {submittedTicket ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Ticket Submitted Successfully!</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Your Ticket ID is <span className="font-mono font-bold text-emerald-400 text-sm">{submittedTicket.id}</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto">
                    We have dispatched an email confirmation to <strong>{submittedTicket.userEmail}</strong>. An authorized RentBuddy care officer will reach out shortly.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 max-w-sm mx-auto text-left space-y-1">
                  <div><strong>Category:</strong> {submittedTicket.category}</div>
                  <div><strong>Role:</strong> {submittedTicket.role === 'receiver' ? 'Receiver (Borrower)' : 'Renter (Owner)'}</div>
                  <div><strong>Urgency:</strong> <span className="uppercase text-emerald-400 font-bold">{submittedTicket.urgency}</span></div>
                </div>

                <button
                  onClick={handleResetForm}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-4">
                
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={ticketName}
                      onChange={(e) => setTicketName(e.target.value)}
                      placeholder="e.g. Aarav Gupta"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Your Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={ticketEmail}
                      onChange={(e) => setTicketEmail(e.target.value)}
                      placeholder="e.g. aarav@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Category & Urgency */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Issue Category *
                    </label>
                    <select
                      value={issueCategory}
                      onChange={(e) => setIssueCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      {activeRole === 'receiver' ? (
                        <>
                          <option value="Security Deposit Refund">Security Deposit Refund Query</option>
                          <option value="Item Condition / Defect at Handover">Item Defect or Scratches at Handover</option>
                          <option value="Pickup / Delivery Delay">Pickup or Delivery Coordination Issue</option>
                          <option value="Rental Extension Request">Rental Extension Request</option>
                          <option value="Cancellation & Full Refund">Cancellation & Full Refund</option>
                          <option value="General Support">General Borrower Inquiry</option>
                        </>
                      ) : (
                        <>
                          <option value="Damage Claim & Protection">Item Damage Claim & Insurance (₹2 Lakh)</option>
                          <option value="Late Return by Borrower">Late Return by Borrower & Penalty Payout</option>
                          <option value="Earnings Payout Query">Rental Earnings Payout (Bank / UPI)</option>
                          <option value="Borrower Verification & Dispute">Borrower Verification / Dispute</option>
                          <option value="Listing & Photo Assistance">Listing & Photos Assistance</option>
                          <option value="General Owner Support">General Lender Inquiry</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Urgency Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['normal', 'high', 'urgent'] as const).map((lvl) => (
                        <button
                          type="button"
                          key={lvl}
                          onClick={() => setUrgency(lvl)}
                          className={`py-2 text-xs font-bold rounded-xl border capitalize transition-colors text-center ${
                            urgency === lvl
                              ? lvl === 'urgent'
                                ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                                : lvl === 'high'
                                ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                                : 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Booking ID & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Booking Reference ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={bookingId}
                      onChange={(e) => setBookingId(e.target.value)}
                      placeholder="e.g. booking-101"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Need quick verification for pickup today"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Detailed Message */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    How can our care team assist you? *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      activeRole === 'receiver'
                        ? 'Explain your query, delivery status, or deposit timeline question in detail...'
                        : 'Describe your item condition upon return, claim details, or payout query...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 placeholder-slate-500"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Support Request</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Categorized FAQs Accordion (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              <span>{activeRole === 'receiver' ? 'Receiver FAQs' : 'Owner / Lender FAQs'}</span>
            </h3>
            <span className="text-xs text-slate-400">
              {activeFaqs.length} answers
            </span>
          </div>

          <div className="space-y-3">
            {activeFaqs.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? 'bg-slate-900 border-emerald-500/50 shadow-lg shadow-emerald-500/5'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-start justify-between gap-3 text-xs sm:text-sm font-bold text-white"
                  >
                    <span>{faq.q}</span>
                    <span className="p-1 rounded-lg bg-slate-800 text-slate-400 shrink-0 mt-0.5">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Help Tip */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-slate-200 font-semibold">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Urgent In-Hand Issue?</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              If you are at the physical pickup point or returning equipment right now, call our toll-free hotline <strong>1800-RENT-BUDDY</strong> for instant live override support.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
