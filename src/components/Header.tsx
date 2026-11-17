"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, ChevronDown, User, Phone, Menu, X, MessageCircle, Heart, Sparkles, Search } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { SearchAutocomplete } from "@/components/SearchAutocomplete";
import { MobileOffcanvasMenu } from "@/components/MobileOffcanvasMenu";

const NAV_ITEMS = [
  { label: "হোম", href: "/" },
  { label: "সকল পণ্য", href: "/shop" },
  { label: "খেজুরের গুড়", href: "/category/gur" },
  { label: "খাঁটি মধু", href: "/category/honey" },
  { label: "ঘানির তেল", href: "/category/oil" },
  { label: "ঘরোয়া আচার", href: "/category/pickle" },
  { label: "রাজশাহীর আম", href: "/category/mango" },
  { label: "🔥 ধামাকা অফার", href: "/category/offer", isSpecial: true },
  { label: "আমাদের কথা", href: "/about" },
  { label: "যোগাযোগ", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, openDrawer } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { user } = useAuth();
  const pathname = usePathname();

  // Close mobile search when navigating to a new page
  useEffect(() => {
    setMobileSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Standalone funnel landing pages render their own dedicated sales header
  const isFunnelPage =
    pathname === "/khejur-gur-patali-jhola" ||
    pathname?.startsWith("/khejur-gur-patali-jhola") ||
    pathname === "/order" ||
    pathname === "/landing";
  if (isFunnelPage) {
    return null;
  }

  return (
    <header className="w-full z-50 sticky top-0 transition-all duration-300">
      {/* 1. Top Bar / Notice Bar - Deep Emerald Gradient */}
      <div className="bg-gradient-to-r from-[#042418] via-[#063b27] to-[#042418] text-gray-200 text-xs py-2 px-4 border-b border-emerald-800/40 relative overflow-hidden font-sans">
        <div className="container mx-auto flex items-center justify-between gap-4 relative z-10">
          {/* Left: Brand Tagline */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full text-xs font-bold border border-amber-500/30">
              <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
              স্বাদের ভুবন
            </span>
            <span className="hidden sm:inline text-emerald-600/70">|</span>
            <span className="hidden sm:inline text-emerald-100 font-medium">
              ১০০% খাঁটি, প্রাকৃতিক ও নির্ভেজাল খাদ্যের নিশ্চয়তা
            </span>
          </div>

          {/* Center: Free Delivery Promo */}
          <div className="hidden lg:flex items-center gap-2 text-emerald-100 font-medium text-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>সারা দেশে হোম ডেলিভারি</span>
            <span className="text-emerald-500">•</span>
            <span className="text-amber-300 font-bold bg-amber-400/15 px-2.5 py-0.5 rounded-full border border-amber-400/30">
              ৳২৫০০+ অর্ডারে ডেলিভারি ফ্রি!
            </span>
          </div>

          {/* Right: Helpline & WhatsApp */}
          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${siteConfig.contact.hotline}`}
              className="flex items-center gap-1.5 text-gray-200 hover:text-amber-300 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-800/80 flex items-center justify-center text-amber-400">
                <Phone className="w-3 h-3" />
              </div>
              <span className="hidden md:inline text-emerald-300">হটলাইন:</span>
              <strong className="text-white font-bold tracking-wide">{siteConfig.contact.hotline}</strong>
            </a>

            <span className="text-emerald-700 hidden md:inline">|</span>

            <a
              href={siteConfig.social.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-emerald-200 hover:text-green-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-green-400" />
              <span>হোয়াটসঅ্যাপ: <strong className="text-white font-bold">{siteConfig.contact.phone}</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar with Glassmorphic Effect on Scroll */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-emerald-950/5 py-3 border-b border-gray-100"
            : "bg-white py-4 border-b border-gray-100"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Left: Mobile Hamburger & Logo */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-gray-100 hover:bg-emerald-50 text-gray-800 hover:text-emerald-800 transition"
                aria-label="মেনু খুলুন"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-tr from-emerald-50 via-white to-amber-50 p-1 border border-emerald-100 shadow-sm group-hover:shadow-md transition-all duration-300">
                  <div className="relative w-full h-full">
                    <Image
                      src="/logo.webp"
                      alt="স্বাদের ভুবন"
                      fill
                      priority
                      sizes="(max-width: 640px) 44px, 52px"
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-black text-gray-900 group-hover:text-emerald-800 transition-colors leading-none font-heading">
                    স্বাদের ভুবন
                  </span>
                  <span className="text-[8px] sm:text-xs font-bold text-amber-600 tracking-widest uppercase mt-1">
                    Pure & Organic Food
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Live Search Autocomplete */}
            <div className="hidden md:flex flex-1 max-w-xl mx-2">
              <SearchAutocomplete />
            </div>

            {/* Right: User Actions (Order Call, Account, Search, Wishlist, Cart) */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-3.5">
              {/* Order Call Button (Desktop) - Filled Pill */}
              <a
                href={`tel:${siteConfig.contact.hotline}`}
                className="hidden lg:flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-gray-950 shadow-md shadow-amber-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group shrink-0 border border-amber-300/60"
              >
                <div className="w-7 h-7 rounded-full bg-white text-amber-600 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform shrink-0">
                  <Phone className="w-3.5 h-3.5 animate-pulse stroke-[2.5]" />
                </div>
                <div className="text-left leading-tight pr-1">
                  <span className="text-[10px] font-extrabold text-amber-950/85 block">
                    অর্ডার করতে কল করুন
                  </span>
                  <span className="text-xs font-black text-gray-950 block tracking-wide">
                    {siteConfig.contact.hotline}
                  </span>
                </div>
              </a>

              {/* Account (Icon Only) */}
              <Link
                href="/account"
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50/90 hover:bg-emerald-100 text-emerald-800 transition-all duration-200 hover:scale-105 border border-emerald-200/50 shadow-2xs"
                title={user ? user.firstName || user.name || "মাই একাউন্ট" : "লগইন / সাইন আপ"}
                aria-label="লগইন বা একাউন্ট"
              >
                <User className="w-5 h-5 stroke-[2]" />
              </Link>

              {/* Mobile Search Toggle Icon - Right beside Wishlist */}
              <button
                type="button"
                onClick={() => setMobileSearchOpen((prev) => !prev)}
                className={`md:hidden relative p-2.5 rounded-xl transition cursor-pointer ${
                  mobileSearchOpen
                    ? "bg-emerald-50 text-emerald-800"
                    : "hover:bg-gray-50 text-gray-700 hover:text-emerald-800"
                }`}
                aria-label={mobileSearchOpen ? "সার্চ বন্ধ করুন" : "সার্চ খুলুন"}
              >
                {mobileSearchOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                ) : (
                  <Search className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                )}
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2.5 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-rose-600 transition"
                aria-label="পছন্দের তালিকা"
              >
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                {totalWishlistItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 sm:w-5 sm:h-5 bg-rose-500 text-white text-[9px] sm:text-[10px] font-black rounded-full flex items-center justify-center shadow-sm">
                    {totalWishlistItems}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger Button */}
              <button
                type="button"
                onClick={openDrawer}
                className="flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-md shadow-emerald-900/20 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                aria-label="কার্ট দেখুন"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                      {totalItems}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left leading-none">
                  <span className="text-[10px] text-emerald-200 font-medium">শপিং কার্ট</span>
                  <span className="text-xs font-bold text-amber-300 mt-0.5">
                    {totalItems} টি পণ্য
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Search Autocomplete - Toggled by Search Icon */}
          {mobileSearchOpen && (
            <div className="md:hidden mt-3 pt-1 pb-1 animate-in fade-in slide-in-from-top-2 duration-200">
              <SearchAutocomplete isMobile autoFocus />
            </div>
          )}
        </div>
      </div>

      {/* 3. Category Navbar - Desktop Only */}
      <nav className="hidden lg:block bg-[#fcfbf9] border-b border-gray-200/80">
        <div className="container mx-auto px-4 lg:px-8">
          <ul className="flex items-center justify-center gap-1 overflow-x-auto py-1">
            {NAV_ITEMS.map((item, idx) => {
              const active = isLinkActive(item.href);
              return (
                <li key={idx} className="shrink-0">
                  <Link
                    href={item.href}
                    prefetch={true}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${
                      active
                        ? "text-emerald-800 bg-emerald-100/70 shadow-2xs font-extrabold"
                        : item.isSpecial
                        ? "text-amber-700 hover:bg-amber-100/60 font-extrabold animate-pulse-subtle"
                        : "text-gray-700 hover:text-emerald-800 hover:bg-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Offcanvas Drawer */}
      <MobileOffcanvasMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
