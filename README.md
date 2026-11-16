# 🌾 স্বাদের ভুবন (Sader Vubon) - Headless eCommerce Frontend

A modern, high-performance headless eCommerce frontend for **Sader Vubon (স্বাদের ভুবন)** built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS**, and **TypeScript**, seamlessly connected to a live WooCommerce backend.

---

## ✨ Features

- **⚡ Lightning-Fast Performance:** Static generation with Incremental Static Regeneration (ISR) and Turbopack.
- **🛒 Dynamic WooCommerce Shopping Cart & Wishlist:** Real-time cart drawer, instant subtotal calculation, free shipping progress bar, and persistent wishlist.
- **🛍️ 1-Step Guest & Logged-in Checkout:** Instant Cash on Delivery (COD) order placement with dynamic Dhaka/Outside Dhaka shipping calculations.
- **🔐 Customer Authentication & Portal:**
  - Fast Sign In & Registration synced with WooCommerce Customer API.
  - Live Order History with delivery status tracking.
  - Saved Delivery Addresses with 1-click checkout auto-fill.
- **📦 Live Order Tracking:** Real-time tracking of WooCommerce orders via Order ID & phone number.
- **🔍 Intelligent Search & Autocomplete:** Debounced real-time product search with direct category filters.
- **📱 100% Mobile Optimized:** Sticky mobile buy bar, bottom navigation, responsive touch sliders, and accessible layouts.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI & Styling:** Tailwind CSS, Lucide React Icons
- **Language:** TypeScript
- **Backend / CMS:** WooCommerce REST API + WordPress
- **State Management:** React Context API (Cart, Wishlist, Auth)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/sader-vubon.git
cd sader-vubon
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local` and add your WooCommerce API credentials:
```bash
cp .env.example .env.local
```

Inside `.env.local`:
```env
NEXT_PUBLIC_WORDPRESS_URL=https://sadervubon.com
WC_CONSUMER_KEY=your_woocommerce_consumer_key
WC_CONSUMER_SECRET=your_woocommerce_consumer_secret
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```
