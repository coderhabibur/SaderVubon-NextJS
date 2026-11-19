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
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useWishlist } from "@/context/WishlistContext";

interface MobileOffcanvasMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileOffcanvasMenu({ isOpen, onClose }: MobileOffcanvasMenuProps) {
  const [mounted, setMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const { totalWishlistItems } = useWishlist();
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
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
            <Link href="/" onClick={onClose} className="flex items-center gap-2">
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
          <div className="flex-1 overflow-y-auto py-3 px-3 space-y-4">
            {/* Main Links */}
            <div className="space-y-1">
              <Link
                href="/"
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition ${
                  isLinkActive("/")
                    ? "bg-emerald-50 text-brand-green"
                    : "text-gray-900 hover:bg-emerald-50 hover:text-brand-green"
                }`}
              >
                <Home className="w-4 h-4 text-brand-green" />
                <span>Home</span>
              </Link>

              <Link
                href="/shop"
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition ${
                  isLinkActive("/shop")
                    ? "bg-emerald-50 text-brand-green"
                    : "text-gray-900 hover:bg-emerald-50 hover:text-brand-green"
                }`}
              >
                <Store className="w-4 h-4 text-brand-green" />
                <span>Shop (All Products)</span>
              </Link>
            </div>

            {/* Categories Section */}
            <div>
              <span className="px-3.5 text-[11px] font-black uppercase tracking-wider text-gray-400 block mb-1.5">
                Categories
              </span>
              <div className="space-y-0.5 text-xs sm:text-sm font-semibold text-gray-700">
                <Link
                  href="/category/gur"
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2 rounded-xl transition ${
                    isLinkActive("/category/gur")
                      ? "bg-emerald-50 text-brand-green font-bold"
                      : "hover:bg-gray-100 hover:text-brand-green"
                  }`}
                >
                  <span>Date & Sugarcane Jaggery</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>

                <Link
                  href="/category/taler-gur"
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2 rounded-xl transition ${
                    isLinkActive("/category/taler-gur")
                      ? "bg-emerald-50 text-brand-green font-bold"
                      : "hover:bg-gray-100 hover:text-brand-green"
                  }`}
                >
                  <span>Traditional Palm Jaggery (তালের গুড়)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>

                <Link
                  href="/category/pickle"
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2 rounded-xl transition ${
                    isLinkActive("/category/pickle")
                      ? "bg-emerald-50 text-brand-green font-bold"
                      : "hover:bg-gray-100 hover:text-brand-green"
                  }`}
                >
                  <span>Homemade Pickles</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>

                <Link
                  href="/category/honey"
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2 rounded-xl transition ${
                    isLinkActive("/category/honey")
                      ? "bg-emerald-50 text-brand-green font-bold"
                      : "hover:bg-gray-100 hover:text-brand-green"
                  }`}
                >
                  <span>Sundarban Raw Honey</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>

                <Link
                  href="/category/oil"
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2 rounded-xl transition ${
                    isLinkActive("/category/oil")
                      ? "bg-emerald-50 text-brand-green font-bold"
                      : "hover:bg-gray-100 hover:text-brand-green"
                  }`}
                >
                  <span>Pure Mustard Oil</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>

                <Link
                  href="/category/mango"
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2 rounded-xl transition ${
                    isLinkActive("/category/mango")
                      ? "bg-emerald-50 text-brand-green font-bold"
                      : "hover:bg-gray-100 hover:text-brand-green"
                  }`}
                >
                  <span>Rajshahi Fresh Mangoes</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>

                <Link
                  href="/category/offer"
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2 rounded-xl font-bold transition ${
                    isLinkActive("/category/offer")
                      ? "bg-red-50 text-red-600 font-black"
                      : "text-red-600 hover:bg-red-50"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    <span>Special Offers & Combos</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-red-400" />
                </Link>
              </div>
            </div>

            {/* Customer Care Section */}
            <div className="pt-2 border-t border-gray-100">
              <span className="px-3.5 text-[11px] font-black uppercase tracking-wider text-gray-400 block mb-1.5">
                Customer Care
              </span>
              <div className="space-y-0.5 text-xs sm:text-sm font-semibold text-gray-700">
                <Link
                  href="/track-order"
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
