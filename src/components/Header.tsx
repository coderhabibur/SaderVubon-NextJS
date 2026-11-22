"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, ChevronDown, ChevronRight, User, Phone, Menu, X, MessageCircle, Heart, Sparkles, Search } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { SearchAutocomplete } from "@/components/SearchAutocomplete";
import { MobileOffcanvasMenu } from "@/components/MobileOffcanvasMenu";
import { NavMenuItem, FALLBACK_NAV_ITEMS, buildMenuTree, normalizeCategorySlug, doCategorySlugsMatch } from "@/lib/woocommerce";

interface HeaderProps {
  navItems?: NavMenuItem[];
}

export function Header({ navItems: initialNavItems }: HeaderProps = {}) {
  const [navItems, setNavItems] = useState<NavMenuItem[]>(
    initialNavItems && initialNavItems.length > 0 ? initialNavItems : FALLBACK_NAV_ITEMS
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, openDrawer } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { user } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (initialNavItems && initialNavItems.length > 0) {
      setNavItems(initialNavItems);
      return;
    }

    // Fallback: If not provided by server layout, fetch from same-origin Next.js API
    fetch("/api/menu")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setNavItems(data);
        }
      })
      .catch(() => {
        // Silently keep fallback items
      });
  }, [initialNavItems]);

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

  const [searchCategory, setSearchCategory] = useState<string | null>(null);

  // Sync category filter from URL (works across standard navigation and AJAX history pushState)
  useEffect(() => {
    const updateSearchCategory = () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        setSearchCategory(params.get("category"));
      }
    };
    updateSearchCategory();
    window.addEventListener("popstate", updateSearchCategory);
    return () => window.removeEventListener("popstate", updateSearchCategory);
  }, [pathname]);

  const isLinkActive = (href: string) => {
    if (!href) return false;

    const normHref = normalizeCategorySlug(href);
    const normPath = normalizeCategorySlug(pathname);

    // Exact match for homepage
    if (href === "/" || normHref === "") {
      return pathname === "/" || normPath === "";
    }

    // Category Links (/category/...)
    if (href.includes("/category/")) {
      const itemSlug = href.split("/category/")[1]?.split("/")[0]?.split("?")[0];

      // If current page is /category/[slug]
      if (pathname.includes("/category/")) {
        const pageSlug = pathname.split("/category/")[1]?.split("/")[0]?.split("?")[0];
        return doCategorySlugsMatch(itemSlug, pageSlug);
      }

      // If current page is /shop?category=...
      if (pathname === "/shop" && searchCategory && searchCategory !== "all") {
        return doCategorySlugsMatch(itemSlug, searchCategory);
      }

      return false;
    }

    // All Products (/shop)
    if (href === "/shop" || normHref === "shop") {
      if (pathname === "/shop") {
        return !searchCategory || searchCategory === "all";
      }
      return false;
    }

    // Other standard pages: /about, /contact, /terms, etc.
    return (
      normPath === normHref ||
      pathname === href ||
      (normHref.length > 1 && normPath.startsWith(normHref))
    );
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
          <div className="flex items-center gap-2.5 sm:gap-4 text-xs">
            <a
              href={`tel:${siteConfig.contact.hotline}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-gray-950 font-extrabold shadow-xs transition-all active:scale-95 text-[11px] sm:text-xs tracking-wide group"
              aria-label={`Call hotline ${siteConfig.contact.hotline}`}
            >
              <div className="w-4 h-4 rounded-full bg-emerald-950 text-amber-400 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform">
                <Phone className="w-2.5 h-2.5 stroke-[2.8]" />
              </div>
              <span className="hidden md:inline font-bold text-gray-900">হটলাইন:</span>
              <span className="font-black text-gray-950">{siteConfig.contact.hotline}</span>
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

              <Link href="/" prefetch={true} className="flex items-center gap-3 group">
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
                  <span className="text-[7px] sm:text-[9px] font-bold text-amber-600 tracking-wider uppercase mt-0.5 sm:mt-1">
                    best in taste & purity
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
                prefetch={true}
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

              {/* Wishlist (Desktop / Tablet only, hidden on mobile) */}
              <Link
                href="/wishlist"
                prefetch={true}
                className="hidden sm:flex relative p-2.5 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-rose-600 transition"
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
      <nav className="hidden lg:block bg-[#fcfbf9] border-b border-gray-200/80 relative z-40 overflow-visible">
        <div className="container mx-auto px-4 lg:px-8 overflow-visible">
          <ul className="flex flex-wrap items-center justify-center gap-1 py-1 overflow-visible">
            {navItems.map((item, idx) => {
              const hasChildren = item.children && item.children.length > 0;
              const active = isLinkActive(item.href);

              return (
                <li key={item.id ?? idx} className="relative group shrink-0">
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
                    <span>{item.label}</span>
                    {hasChildren && (
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-800 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </Link>

                  {/* Luxury Dropdown Menu on Desktop Hover */}
                  {hasChildren && (
                    <div className="absolute top-full left-0 pt-1 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="min-w-[230px] bg-white rounded-2xl shadow-[0_20px_40px_-8px_rgba(0,0,0,0.2)] border border-gray-200/80 overflow-hidden">
                        {/* Decorative Top Accent Bar */}
                        <div className="h-1 bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-700" />

                        <ul className="p-1.5 space-y-0.5">
                          {item.children!.map((child, cIdx) => (
                            <li key={child.id ?? cIdx}>
                              <Link
                                href={child.href}
                                prefetch={true}
                                className="group/child flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 hover:text-emerald-900 hover:bg-gradient-to-r hover:from-emerald-50/90 hover:to-amber-50/50 transition-all duration-150"
                              >
                                <div className="flex items-center gap-2.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 group-hover/child:bg-emerald-600 group-hover/child:scale-125 transition-all" />
                                  <span>{child.label}</span>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover/child:text-emerald-700 group-hover/child:translate-x-0.5 transition-all" />
                              </Link>
                            </li>
                          ))}
                        </ul>

                        {/* Dropdown Footer: View All in this Category */}
                        <div className="border-t border-gray-100 bg-[#FAF9F6] px-3.5 py-2.5">
                          <Link
                            href={item.href}
                            prefetch={true}
                            className="flex items-center justify-between text-[11px] font-extrabold text-emerald-800 hover:text-amber-700 transition"
                          >
                            <span>সকল {item.label} দেখুন</span>
                            <ChevronRight className="w-3 h-3 text-emerald-700" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
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
        navItems={navItems}
      />
    </header>
  );
}
