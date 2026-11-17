"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, ShoppingCart, Truck, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/site";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { totalItems, openDrawer } = useCart();

  const isFunnelPage =
    pathname === "/khejur-gur-patali-jhola" ||
    pathname?.startsWith("/khejur-gur-patali-jhola") ||
    pathname === "/order" ||
    pathname === "/landing";
  if (isFunnelPage) {
    return null;
  }

  const isHome = pathname === "/";
  const isShop = pathname === "/shop" || pathname.startsWith("/category");
  const isTrack = pathname === "/track-order";

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            isHome ? "text-brand-green font-bold" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 ${isHome ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
          <span className="text-[12.5px] font-semibold leading-tight">Home</span>
        </Link>

        {/* 2. Shop */}
        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            isShop ? "text-brand-green font-bold" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <Store className={`w-5 h-5 mb-0.5 ${isShop ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
          <span className="text-[12.5px] font-semibold leading-tight">Shop</span>
        </Link>

        {/* 3. Cart Trigger (Center Prominent) */}
        <button
          type="button"
          onClick={openDrawer}
          className="relative flex flex-col items-center justify-center py-1 text-gray-700 hover:text-brand-green transition-colors cursor-pointer"
          aria-label="Open Cart"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-brand-green hover:bg-brand-green-hover text-white flex items-center justify-center shadow-md active:scale-95 transition-transform -mt-3 border-2 border-white">
              <ShoppingCart className="w-5 h-5 stroke-[2.3]" />
            </div>

            {totalItems > 0 && (
              <span className="absolute -top-4 -right-1 bg-red-600 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs border-2 border-white animate-in zoom-in-75 duration-200">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </div>
          <span className="text-[12.5px] font-bold text-gray-800 leading-tight mt-0.5">Cart</span>
        </button>

        {/* 4. Track Order */}
        <Link
          href="/track-order"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            isTrack ? "text-brand-green font-bold" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <Truck className={`w-5 h-5 mb-0.5 ${isTrack ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
          <span className="text-[12.5px] font-semibold leading-tight">Track</span>
        </Link>

        {/* 5. WhatsApp Support */}
        <a
          href={siteConfig.social.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-emerald-600 hover:text-emerald-700 transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 mb-0.5 stroke-[2.2]" />
          <span className="text-[12.5px] font-semibold leading-tight">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
