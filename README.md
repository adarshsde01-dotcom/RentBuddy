# RentLoop 🔄

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

## 💡 Proposed Solution: RentLoop

**RentLoop** is a circular economy peer-to-peer marketplace that transforms underutilized personal assets into community resources.

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
   - Detailed specifications table, owner rules, verified owner trust score, and escrow protection guarantee.

4. **Dynamic Rental Duration & Price Calculator:**
   - Interactive pickup and return date selector.
   - Automatic duration calculation in days.
   - Multi-tier progressive discounts: **10% off** for 3+ days, up to **30% off** for weekly rentals.
   - Itemized transparent breakdown: Base fee, platform protection fee (5%), refundable escrow security deposit, and estimated savings vs retail.

5. **Booking Request Workflow:**
   - Handover preference selector: *Local In-Person Pickup (Free)* vs *Eco-Courier Delivery (+₹199)*.
   - Message to lender and borrower contact capture.
   - Confetti celebratory feedback and automatic redirection to the User Dashboard.

6. **Dual-Perspective Dashboard:**
   - **Renter View ("My Borrowings"):** View active, pending, and completed bookings, confirm handovers, mark items returned, and view escrow deposit receipts.
   - **Owner View ("Owner Hub"):** Approve or decline incoming borrower requests in real time and toggle listing availability (*Active* vs *Paused*).
   - **Impact Tab:** Detailed circular economy metrics (CO₂e saved, equivalent trees planted, financial savings kept in community).

7. **Product Listing Modal & Cloudinary Uploader:**
   - Form to list any item with title, category, description, rates, deposit, retail value, and condition.
   - Drag-and-drop Cloudinary photo uploader with real-time preview, progress tracking, and multiple image management.

8. **Transparent Demo / Simulation Mode:**
   - Pre-seeded with 8 diverse, realistic items and initial bookings.
   - Full client-side `localStorage` persistence with one-click reset to factory defaults.
   - Clear identification that transactions are simulated and no real credit cards are charged.

---

## 🛠 Technology Stack

- **Frontend Core:** React 19, TypeScript
- **Build Tool:** Vite 8 (sub-200ms production builds)
- **Styling:** Tailwind CSS v4, Vanilla CSS tokens, Glassmorphism utilities
- **Icons:** Lucide React
- **Animations & Effects:** Canvas Confetti
- **Media Management:** Cloudinary API (Unsigned Upload Preset workflow & dynamic URL transformations)
- **Persistence:** LocalStorage with typed state management engine

---

## ☁️ Cloudinary Integration

RentLoop utilizes Cloudinary for secure, scalable product image uploads and CDN delivery:

### 1. Direct Unsigned Upload Workflow
RentLoop implements direct browser-to-Cloudinary uploads via `POST https://api.cloudinary.com/v1_1/<cloud_name>/image/upload` using an **unsigned upload preset**:
- Eliminates the need to expose private API secrets on the client side.
- Uploads images directly into a dedicated folder (`rentloop_products`).
- Provides real-time upload progress percentage feedback.

### 2. URL Transformation & Optimization Engine
The `getOptimizedImageUrl` service automatically rewrites Cloudinary URLs to apply on-the-fly transformations:
```ts
// Example transformation parameters applied:
// c_fill,w_800,h_600,q_auto,f_auto
```
- `f_auto`: Automatically serves modern AVIF or WebP format based on the user's browser.
- `q_auto`: Automatically adjusts compression to achieve the optimal balance between visual fidelity and file size.
- `c_fill`, `c_thumb`: Generates perfect aspect-ratio thumbnails for gallery strips.

### 3. Graceful Fallback Mode
When Cloudinary credentials are not yet configured in `.env`, the application automatically falls back to an in-memory client `FileReader` with a clear status indicator, allowing evaluators to test listing and image previews without setup barriers.

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

> **Quick Cloudinary Setup (Free):**
> 1. Sign up at [Cloudinary](https://cloudinary.com/) (free 25GB tier).
> 2. Navigate to **Settings** &rarr; **Upload** &rarr; scroll to **Upload Presets**.
> 3. Click **Add upload preset**, choose **Signing Mode: Unsigned**, name it `rentloop_preset`, and click **Save**.
> *Alternatively, click the **Media: Demo** pill in the RentLoop navbar to test or enter credentials directly in the app UI without restarting Vite!*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production
```bash
npm run build
```

---

## 📸 Screenshots

| View | Description |
|---|---|
| **Homepage & Hero** | Hero section with tagline, live impact counter, search bar, and category quick-picks |
| **Product Catalog** | Filterable grid of rental items with daily rates, savings tags, and availability badges |
| **Price Calculator** | Interactive date picker calculating multi-day discounts, platform fees, and escrow deposits |
| **Booking Flow** | Handover preference selector, message to owner, and confetti confirmation |
| **User & Owner Dashboard** | Dual tabs for managing incoming borrower approvals and active rental returns |
| **Cloudinary Pipeline** | Drag-and-drop media uploader and in-app Cloudinary configuration dialog |

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

Built for the Hackathon by senior full-stack development team. Open source under the MIT License.
