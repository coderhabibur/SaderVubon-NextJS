"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, ChevronDown, User, Phone, Menu, X, MessageCircle, Heart } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { SearchAutocomplete } from "@/components/SearchAutocomplete";
import { MobileOffcanvasMenu } from "@/components/MobileOffcanvasMenu";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Jaggery (Gur)", href: "/category/gur" },
  { label: "Raw Honey", href: "/category/honey" },
  { label: "Mustard Oil", href: "/category/oil" },
  { label: "Pickles", href: "/category/pickle" },
  { label: "Mangoes", href: "/category/mango" },
  { label: "🔥 Offers", href: "/category/offer", isSpecial: true },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, openDrawer } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { user } = useAuth();
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="w-full bg-white shadow-xs z-50">
      {/* 0. Top Header / Announcement Bar */}
      <div className="bg-[#062b1e] text-gray-200 text-xs py-2 px-4 border-b border-emerald-900/60 font-medium">
        <div className="container mx-auto flex items-center justify-between gap-4">
          {/* Left: Tagline / Brand welcome */}
          <div className="flex items-center gap-2">
            <span className="text-brand-yellow font-black">🌾 স্বাদের ভুবন</span>
            <span className="hidden sm:inline text-gray-500">|</span>
            <span className="hidden sm:inline text-gray-300">১০০% খাঁটি ও নিরাপদ প্রাকৃতিক খাদ্য সামগ্রী</span>
          </div>

          {/* Center: Free delivery notice */}
          <div className="hidden lg:flex items-center gap-1.5 text-gray-300">
            <span>🚚 সারা দেশে ক্যাশ অন ডেলিভারি</span>
            <span className="text-gray-500">•</span>
            <span className="text-brand-yellow font-bold">২৫০০৳+ অর্ডারে ফ্রি ডেলিভারি!</span>
          </div>

          {/* Right: Contact Hotline & WhatsApp links */}
          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${siteConfig.contact.hotline}`}
              className="flex items-center gap-1.5 text-gray-300 hover:text-brand-yellow transition"
            >
              <Phone className="w-3.5 h-3.5 text-brand-yellow" />
              <span>হটলাইন: <strong className="text-white font-bold">{siteConfig.contact.hotline}</strong></span>
            </a>

            <span className="text-gray-600 hidden md:inline">|</span>

            <a
              href={siteConfig.social.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-gray-300 hover:text-brand-yellow transition"
            >
              <MessageCircle className="w-3.5 h-3.5 text-green-400" />
              <span>হোয়াটসঅ্যাপ: <strong className="text-white font-bold">{siteConfig.contact.phone}</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* 1. Main Header Row (Logo, Search, Cart & Account) */}
      <div className="container mx-auto px-4 py-3.5 sm:py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo - Increased Size */}
          <Link href="/" className="shrink-0 flex items-center">
            <div className="relative w-48 sm:w-56 md:w-60 h-14 sm:h-16">
              <Image
                src="/logo.webp"
                alt="স্বাদের ভুবন (Sader Vubon)"
                fill
                sizes="(max-width: 640px) 192px, 240px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Centered Search Bar with Autocomplete */}
          <div className="hidden lg:block flex-1 max-w-2xl mx-auto">
            <SearchAutocomplete />
          </div>

          {/* Right Actions: Solid Filled Hotline Button, Cart & User */}
          <div className="flex items-center gap-5 shrink-0">
            {/* Solid Filled Brand-Green Hotline Button */}
            <a
              href={`tel:${siteConfig.contact.hotline}`}
              className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-brand-green hover:bg-brand-green-hover text-white shadow-md hover:shadow-lg transition-all duration-300 group active:scale-95"
              title="কল করতে ক্লিক করুন"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-brand-green transition-colors">
                <Phone className="w-4 h-4 transition-transform group-hover:scale-110" />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-green-100 block tracking-wider leading-none">
                  Hotline
                </span>
                <strong className="text-white font-black text-sm tracking-tight leading-none">
                  {siteConfig.contact.hotline}
                </strong>
              </div>
            </a>

            {/* Wishlist Link with Live Count Badge */}
            <Link
              href="/wishlist"
              className="relative p-1 text-gray-800 hover:text-brand-green transition group"
              title="My Wishlist"
              aria-label="View Wishlist"
            >
              <div className="relative">
                <Heart className="w-7 h-7 text-gray-800 group-hover:text-brand-green transition stroke-[1.8]" />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-green text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {totalWishlistItems}
                  </span>
                )}
              </div>
            </Link>

            {/* Cart Icon with Live Count Badge & Drawer Trigger */}
            <button
              type="button"
              onClick={openDrawer}
              className="relative cursor-pointer group flex items-center p-1 text-gray-800 hover:text-brand-green transition"
              title="Shopping Cart"
              aria-label="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-7 h-7 text-gray-800 group-hover:text-brand-green transition stroke-[1.8]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-green text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {totalItems}
                  </span>
                )}
              </div>
            </button>

            {/* User Icon -> My Account / Profile */}
            <Link
              href="/account"
              className="flex items-center gap-1.5 p-1 text-gray-800 hover:text-brand-green transition group"
              title={user ? `Logged in as ${user.name}` : "Login / Register"}
              aria-label="User Account"
            >
              <div className="relative">
                <User className="w-7 h-7 stroke-[1.8]" />
                {user && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>
              {user && (
                <span className="hidden xl:inline text-xs font-bold text-gray-700 max-w-[85px] truncate">
                  {user.firstName || user.name.split(" ")[0]}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle (Opens Offcanvas Drawer) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 text-gray-800 hover:bg-gray-100 rounded-md cursor-pointer"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Search Input with Autocomplete */}
        <div className="mt-3 lg:hidden">
          <SearchAutocomplete isMobile placeholder="Search honey, jaggery, mustard oil, pickles..." />
        </div>
      </div>

      {/* 2. Navigation Menu Bar - Clean Centered Menu with Active State */}
      <nav className="border-t border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <div className="flex items-center justify-start lg:justify-center gap-1 sm:gap-2 text-sm font-semibold text-gray-800 overflow-x-auto no-scrollbar py-0.5 whitespace-nowrap">
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item.href);

              if (item.isSpecial) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3.5 py-3 transition flex items-center gap-1 border-b-2 shrink-0 ${
                      active
                        ? "text-red-600 border-red-600 bg-red-50/70 font-black rounded-t-lg"
                        : "text-red-600 hover:text-red-700 border-transparent hover:border-red-600 hover:bg-red-50/30 font-bold"
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 sm:px-4 py-3 transition border-b-2 shrink-0 ${
                    active
                      ? "text-brand-green border-brand-green bg-emerald-50/70 font-black rounded-t-lg"
                      : "text-gray-700 hover:text-brand-green border-transparent hover:border-brand-green/60 hover:bg-gray-50/60 font-semibold"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Offcanvas Drawer Menu */}
      <MobileOffcanvasMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
