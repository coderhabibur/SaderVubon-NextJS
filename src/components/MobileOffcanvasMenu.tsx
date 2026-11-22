"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  X,
  Home,
  Store,
  Flame,
  Truck,
  Heart,
  User,
  Phone,
  MessageCircle,
  FileText,
  Info,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useWishlist } from "@/context/WishlistContext";
import { NavMenuItem, FALLBACK_NAV_ITEMS, normalizeCategorySlug, doCategorySlugsMatch } from "@/lib/woocommerce";

interface MobileOffcanvasMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems?: NavMenuItem[];
}

export function MobileOffcanvasMenu({ isOpen, onClose, navItems }: MobileOffcanvasMenuProps) {
  const [mounted, setMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<Record<string | number, boolean>>({});
  const { totalWishlistItems } = useWishlist();
  const pathname = usePathname();
  const [searchCategory, setSearchCategory] = useState<string | null>(null);

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

  const toggleSubMenu = (id: string | number) => {
    setOpenSubMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const timer = setTimeout(() => setAnimateIn(true), 20);
      document.body.style.overflow = "hidden";
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setMounted(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Backdrop with smooth fade in/out */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-out ${
          animateIn ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Offcanvas Drawer Container */}
      <div className="fixed inset-y-0 left-0 max-w-full flex pr-12 pointer-events-none">
        <div
          className={`w-screen max-w-xs bg-white shadow-2xl flex flex-col pointer-events-auto transform transition-transform duration-300 ease-out ${
            animateIn ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* 1. Offcanvas Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
            <Link href="/" onClick={onClose} prefetch={true} className="flex items-center gap-2">
              <div className="relative w-36 h-10">
                <Image
                  src="/logo.webp"
                  alt="Sader Vubon Logo"
                  fill
                  sizes="144px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition cursor-pointer"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Menu Navigation Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto py-3 px-3 space-y-3">
            {/* Header Navigation Menu (Exact WordPress Header Menu) */}
            <nav className="space-y-1 text-xs sm:text-sm font-semibold text-gray-700">
              {(navItems && navItems.length > 0 ? navItems : FALLBACK_NAV_ITEMS).map((item, idx) => {
                const idKey = item.id ?? idx;
                const hasChildren = item.children && item.children.length > 0;
                const isOpen = Boolean(openSubMenus[idKey]);
                const active = isLinkActive(item.href);

                return (
                  <div
                    key={idKey}
                    className={`rounded-xl transition-all duration-200 ${
                      hasChildren && isOpen
                        ? "bg-[#FAF8F5] border border-amber-900/10 p-1"
                        : ""
                    }`}
                  >
                    <div
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${
                        active
                          ? "bg-emerald-50 text-brand-green font-bold"
                          : item.isSpecial
                          ? "text-red-600 hover:bg-red-50 font-bold"
                          : hasChildren && isOpen
                          ? "bg-white text-emerald-900 font-extrabold shadow-2xs"
                          : "hover:bg-gray-100 hover:text-brand-green text-gray-800 font-semibold"
                      }`}
                    >
                      <Link
                        href={item.href}
                        prefetch={true}
                        onClick={onClose}
                        className="flex-1 flex items-center gap-2"
                      >
                        {item.isSpecial && (
                          <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500 shrink-0" />
                        )}
                        <span className="text-sm">{item.label}</span>
                      </Link>

                      {hasChildren ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleSubMenu(idKey);
                          }}
                          className={`w-9 h-9 -mr-1 flex items-center justify-center rounded-lg transition cursor-pointer ${
                            isOpen
                              ? "bg-emerald-100/80 text-emerald-800"
                              : "hover:bg-gray-200/60 text-gray-400 hover:text-gray-700"
                          }`}
                          aria-label="Toggle Submenu"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-250 ease-out ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      )}
                    </div>

                    {/* Collapsible Submenu with Elevated Luxury Card */}
                    {hasChildren && isOpen && (
                      <div className="mt-1.5 pt-1 pb-1 px-1 bg-white rounded-lg border border-gray-100 shadow-2xs space-y-0.5 animate-in fade-in slide-in-from-top-1.5 duration-200">
                        {item.children!.map((child, cIdx) => {
                          const childActive = isLinkActive(child.href);
                          return (
                            <Link
                              key={child.id ?? cIdx}
                              href={child.href}
                              prefetch={true}
                              onClick={onClose}
                              className={`group/mobile-child flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition ${
                                childActive
                                  ? "bg-emerald-100/70 text-emerald-900 font-bold"
                                  : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-900"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span
                                  className={`w-1.5 h-1.5 rounded-full transition ${
                                    childActive
                                      ? "bg-emerald-600 scale-125"
                                      : "bg-amber-400/80 group-hover/mobile-child:bg-emerald-600"
                                  }`}
                                />
                                <span>{child.label}</span>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover/mobile-child:text-emerald-700 transition" />
                            </Link>
                          );
                        })}

                        {/* Quick All-Items Link */}
                        <div className="pt-1.5 mt-1 border-t border-gray-100 px-2">
                          <Link
                            href={item.href}
                            prefetch={true}
                            onClick={onClose}
                            className="flex items-center justify-between py-1 text-[11px] font-extrabold text-emerald-800 hover:text-amber-700 transition"
                          >
                            <span>সকল {item.label} দেখুন</span>
                            <ChevronRight className="w-3 h-3 text-emerald-700" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Customer Care Section */}
            <div className="pt-2 border-t border-gray-100">
              <span className="px-3.5 text-[11px] font-black uppercase tracking-wider text-gray-400 block mb-1.5">
                Customer Care
              </span>
              <div className="space-y-0.5 text-xs sm:text-sm font-semibold text-gray-700">
                <Link
                  href="/track-order"
                  prefetch={true}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3.5 py-2 rounded-xl transition ${
                    isLinkActive("/track-order")
                      ? "bg-emerald-50 text-brand-green font-bold"
                      : "hover:bg-gray-100 hover:text-brand-green"
                  }`}
                >
                  <Truck className="w-4 h-4 text-brand-green" />
                  <span>Track Order</span>
                </Link>

                <Link
                  href="/wishlist"
                  prefetch={true}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2 rounded-xl transition ${
                    isLinkActive("/wishlist")
                      ? "bg-emerald-50 text-brand-green font-bold"
                      : "hover:bg-gray-100 hover:text-rose-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>My Wishlist</span>
                  </div>
                  {totalWishlistItems > 0 && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                      {totalWishlistItems}
                    </span>
                  )}
                </Link>

                <Link
                  href="/account"
                  prefetch={true}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3.5 py-2 rounded-xl transition ${
                    isLinkActive("/account")
                      ? "bg-emerald-50 text-brand-green font-bold"
                      : "hover:bg-gray-100 hover:text-brand-green"
                  }`}
                >
                  <User className="w-4 h-4 text-brand-green" />
                  <span>My Account</span>
                </Link>

                <Link
                  href="/shipping-policy"
                  prefetch={true}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3.5 py-2 rounded-xl transition ${
                    isLinkActive("/shipping-policy")
                      ? "bg-emerald-50 text-brand-green font-bold"
                      : "hover:bg-gray-100 hover:text-brand-green"
                  }`}
                >
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span>Shipping Policy</span>
                </Link>

                <Link
                  href="/about"
                  prefetch={true}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3.5 py-2 rounded-xl transition ${
                    isLinkActive("/about")
                      ? "bg-emerald-50 text-brand-green font-bold"
                      : "hover:bg-gray-100 hover:text-brand-green"
                  }`}
                >
                  <Info className="w-4 h-4 text-gray-400" />
                  <span>About Us</span>
                </Link>

                <Link
                  href="/contact"
                  prefetch={true}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3.5 py-2 rounded-xl transition ${
                    isLinkActive("/contact")
                      ? "bg-emerald-50 text-brand-green font-bold"
                      : "hover:bg-gray-100 hover:text-brand-green"
                  }`}
                >
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 3. Offcanvas Footer (Hotline & WhatsApp) */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/80 space-y-2 shrink-0">
            <a
              href={`tel:${siteConfig.contact.hotline}`}
              className="w-full flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white text-xs font-black py-2.5 px-4 rounded-xl shadow-xs transition active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Hotline: {siteConfig.contact.hotline}</span>
            </a>

            <a
              href={siteConfig.social.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
