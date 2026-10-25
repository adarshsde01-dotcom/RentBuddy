# RentBuddy 🔄

> **Borrow Smart. Save More. Waste Less.**  
> A modern universal rental marketplace connecting neighbors to share cameras, drones, tools, academic textbooks, luggage, and kitchen equipment for short durations instead of purchasing them.

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Image_Pipeline-0070F3.svg)](https://cloudinary.com/)
[![Status](https://img.shields.io/badge/Hackathon-Submission_Ready-10b981.svg)]()

---

## 📌 Problem Statement

In today's consumption-driven economy:
1. **Financial Waste:** Consumers frequently spend hundreds or thousands of rupees on expensive products they only need for a few days or weeks (e.g., a ₹2,50,000 mirrorless camera for a wedding, a ₹4,500 CS algorithm textbook for a single semester, or a ₹38,000 6-person tent for one camping trip).
2. **Environmental & Material Waste:** The average power drill is used for **just 13 minutes in its entire lifespan**. Idle manufacturing drives massive CO₂ emissions, e-waste, and landfill accumulation.
3. **High Barriers for Students & Creators:** Young professionals, indie creators, and students are priced out of high-end equipment necessary for commercial projects, courses, or travel adventures.

---

## 💡 Proposed Solution: RentBuddy

**RentBuddy** is a circular economy peer-to-peer marketplace that transforms underutilized personal assets into community resources.

- **For Renters / Borrowers:** Access premium gear at up to **85% savings** compared to retail, with transparent daily rates, multi-day discounts, and protected escrow security deposits.
- **For Lenders / Owners:** Earn passive income from idle equipment safely, backed by damage protection guarantees and verified borrower identities.
- **For the Planet:** Measurably reduce carbon emissions and divert consumer electronics and plastics from landfills.

---

## ✨ Core Features

1. **Modern Responsive Homepage:**
   - Dark-mode glassmorphism design with responsive navigation, quick category pills, and community stats.
   - Live platform impact counters: Rupees saved, CO₂e avoided, landfill waste diverted, and active listings.

2. **Universal Category Catalog & Search:**
   - 7 Core Categories: *Cameras & Optics*, *Electronics & Drones*, *Travel & Luggage*, *Books & Textbooks*, *Kitchen & Hosting*, *Tools & DIY*, and *Outdoor & Camping*.
   - Dynamic real-time search across titles, descriptions, tags, and neighborhood locations.
   - Comprehensive filters: Price slider (₹99–₹3,000+/day), item condition (*Like New*, *Excellent*, *Good*), availability toggle, and multi-criteria sorting (Price, Rating, Popularity).

3. **Product Detail Experience:**
   - Multi-photo gallery preview with thumbnail carousel.
   - Detailed specifications table, owner guidelines, verified owner trust badge, and escrow protection guarantee.
   - One-click link sharing and item favoriting.

4. **Dynamic Rental Duration & Price Calculator:**
   - Interactive pickup and return date selector with automated date validation.
   - Automatic duration calculation in days.
   - Multi-tier progressive discounts: **10% off** for 3+ days, up to **30% off** for weekly rentals.
   - Itemized transparent breakdown: Base rental fee, platform protection fee (5%), refundable escrow security deposit, and estimated savings vs retail.

5. **Validated Booking Request Workflow:**
   - Strict field validation (minimum name length, regex email format validation) with inline error alerts.
   - Handover preference selector: *Local In-Person Pickup (Free)* vs *Eco-Courier Delivery (+₹199)*.
   - Transparent simulation disclaimer informing users that requests enter simulated owner approval in the dashboard rather than misrepresenting payment settlement.
   - Confetti celebratory feedback and automatic redirection to the User Dashboard.

6. **Dual-Perspective Dashboard:**
   - **Renter View ("My Borrowings"):** View active, pending, and completed bookings, confirm handovers, mark items returned, and view printable Escrow Deposit Receipts.
   - **Owner View ("Owner Hub"):** Approve or decline incoming borrower requests in real time and toggle listing availability (*Listing Active* vs *Paused*).
   - **Impact Tab:** Detailed circular economy metrics (CO₂e saved, equivalent trees planted, financial savings kept in community).

7. **Product Listing Modal & Cloudinary Uploader:**
   - Complete item creation form with title, category, description, rates, deposit, retail value, condition, and location.
   - Interactive technical specs adder and custom owner rental rules builder.
   - Cloudinary image uploader with real-time preview, drag-and-drop, progress tracking, and transparent demo mode status callout when API keys are absent.

8. **24/7 Customer Care Desk:**
   - Dual-perspective support hub with dedicated tabs for **Borrowers (Receivers)** and **Lenders (Renters)**.
   - Interactive FAQs addressing deposits, pre-existing damages, late returns, damage claims, and identity verification.
   - In-app support ticket submission system with urgency tiers and instant confirmation.

9. **Science-Grounded Social Impact Section:**
   - Transparent circular economy explanations: *Amortizing Embodied Carbon* (70–85% of electronics emissions happen during manufacture), *Extending Usable Lifecycle* (e.g., drills used just 13 minutes in their lifespan), and *Zero Packaging Freight Waste*.
   - Interactive beneficiary persona case studies (*Students*, *Travelers*, *Indie Creators*) comparing retail MSRP vs rental costs without inventing unverified empirical statistics.

---

## 🛠 Technology Stack

- **Frontend Core:** React 19, TypeScript (~6.0)
- **Build Tool:** Vite 8.3 (sub-150ms production builds)
- **Styling:** Tailwind CSS v4, Vanilla CSS tokens, Glassmorphism utilities
- **Linter & Formatter:** Oxlint (0 warnings, 0 errors across 24 files)
- **Icons:** Lucide React
- **Animations & Effects:** Canvas Confetti
- **Media Management:** Cloudinary API (Unsigned Upload Preset workflow & dynamic URL transformations)
- **Persistence:** LocalStorage with typed state management engine and one-click demo data reset

---

## ☁️ Cloudinary Integration

RentBuddy utilizes Cloudinary for secure, scalable product image uploads and CDN delivery:

### 1. Direct Unsigned Upload Workflow
RentBuddy implements direct browser-to-Cloudinary uploads via `POST https://api.cloudinary.com/v1_1/<cloud_name>/image/upload` using an **unsigned upload preset**:
- Eliminates the need to expose private API secrets in client-side code.
- Uploads images directly into a dedicated folder (`rentbuddy_products`).
- Provides real-time upload progress percentage feedback.

### 2. URL Transformation & Optimization Engine
The `getOptimizedImageUrl` service automatically rewrites Cloudinary URLs to apply on-the-fly transformations:
```ts
// Example transformation parameters applied:
// c_fill,w_800,h_600,q_auto,f_auto
```
- `f_auto`: Automatically serves modern AVIF or WebP format based on the user's browser.
- `q_auto`: Automatically adjusts compression to achieve the optimal balance between visual fidelity and file size.
- `c_fill`, `c_thumb`: Generates responsive thumbnails for gallery strips.

### 3. Transparent Fallback Mode
When Cloudinary credentials are not yet configured in `.env`, the application automatically falls back to an in-browser `FileReader` with a clear status callout, allowing evaluators to test listing and image previews without setup barriers while explaining exactly what is needed for live CDN hosting.

---

## 🚀 Setup & Installation Instructions

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or pnpm

### 1. Clone the repository
```bash
git clone https://github.com/adarsh1820/rentObject.git
cd rentObject
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables (Optional for Cloudinary)
Copy the example environment file:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Cloudinary credentials:
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
```

> **Quick Cloudinary Setup (Free 25GB tier):**
> 1. Sign up at [Cloudinary](https://cloudinary.com/).
> 2. Navigate to **Settings** &rarr; **Upload** &rarr; scroll to **Upload Presets**.
> 3. Click **Add upload preset**, choose **Signing Mode: Unsigned**, name it `rentbuddy_preset`, and click **Save**.
> *Alternatively, click the **Media: Demo** pill in the RentBuddy navbar to test or enter credentials directly in the app UI without restarting Vite!*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production & Lint Check
```bash
npm run lint    # Verifies oxlint (0 warnings, 0 errors)
npm run build   # TypeScript compilation & Vite bundle creation
npm run preview # Previews the optimized production bundle
```

---

## ♿ Mobile Responsiveness & Accessibility

- **Responsive Breakpoints:** Tailored fluid layouts across mobile (`<640px`), tablet (`640–1024px`), desktop (`1024–1280px`), and ultra-wide screens (`1280px+`).
- **Touch-Friendly Controls:** Minimum touch target sizes (≥44×44px) across navigation buttons, filter pills, and modal close triggers.
- **Accessible Form Elements:** Explicit `<label>` elements connected via `htmlFor` and unique `useId()` identifiers.
- **Keyboard Navigation & Modal Dismissal:** Native `Escape` key listeners and backdrop click handlers with background scroll lock on all modals.
- **Color Contrast:** High-contrast dark theme (WCAG AA compliant) with distinct state indicators for availability, errors, and approvals.

---

## ⚠️ Known Limitations & Assumptions

1. **Client-Side Simulation:** User bookings and item listings persist in browser `localStorage`. Real payment processing (e.g., Stripe Escrow) is deliberately simulated to adhere to hackathon rules prohibiting fake or unauthenticated live charges.
2. **Peer-to-Peer Geolocation:** Current locations are demonstrated with city/neighborhood strings rather than live GPS tracking or map SDK tiles.
3. **Signed Uploads:** Signed uploads requiring server-side API secret signature generation are designed for future backend integration; the frontend currently utilizes the secure unsigned preset workflow recommended for single-page applications.

---

## 🔮 Future Improvements

- [ ] **Supabase Backend Integration:** Connect PostgreSQL tables with Row-Level Security (RLS) for authenticated user accounts and real-time messaging.
- [ ] **Stripe Custom Connect:** Implement real escrow authorization holds on credit cards, capturing funds only upon owner approval and releasing deposits upon return.
- [ ] **Mapbox / Google Maps Geolocation:** Interactive map view showing nearby gear within 5 miles with radius filtering.
- [ ] **AI-Powered Item Valuation:** Auto-suggest optimal daily rental rates and deposits based on Cloudinary image recognition and retail item lookup.
- [ ] **QR Code Handover Verification:** Generate secure time-sensitive QR codes scanned by both parties during physical item exchange.

---

## 📄 License & Hackathon Submission

Built for the **Tech for Social Good Hackathon** by senior full-stack development team. Open source under the MIT License.
