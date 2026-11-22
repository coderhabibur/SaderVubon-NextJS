"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, ShoppingCart, Truck, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

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
  const isAccount = pathname === "/account" || pathname?.startsWith("/account");

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {/* 1. Shop */}
        <Link
          href="/shop"
          prefetch={true}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            isShop ? "text-brand-green font-bold" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <Store className={`w-5 h-5 mb-0.5 ${isShop ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
          <span className="text-[12px] font-semibold leading-tight">Shop</span>
        </Link>

        {/* 2. Cart */}
        <button
          type="button"
          onClick={openDrawer}
          className="relative flex flex-col items-center justify-center py-1 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          aria-label="Open Cart"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 mb-0.5 stroke-[1.8]" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-red-600 text-white text-[10px] font-black min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-xs border border-white animate-in zoom-in-75 duration-200">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </div>
          <span className="text-[12px] font-semibold leading-tight">Cart</span>
        </button>

        {/* 3. Home (Center Prominent) */}
        <Link
          href="/"
          prefetch={true}
          className="relative flex flex-col items-center justify-center py-1 text-gray-700 hover:text-brand-green transition-colors cursor-pointer"
          aria-label="Home"
        >
          <div className="relative">
            <div
              className={`w-10 h-10 rounded-2xl ${
                isHome ? "bg-brand-green ring-2 ring-emerald-300" : "bg-brand-green hover:bg-brand-green-hover"
              } text-white flex items-center justify-center shadow-md active:scale-95 transition-transform -mt-3 border-2 border-white`}
            >
              <Home className="w-5 h-5 stroke-[2.3]" />
            </div>
          </div>
          <span
            className={`text-[12px] font-bold leading-tight mt-0.5 ${
              isHome ? "text-brand-green" : "text-gray-800"
            }`}
          >
            Home
          </span>
        </Link>

        {/* 4. Track */}
        <Link
          href="/track-order"
          prefetch={true}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            isTrack ? "text-brand-green font-bold" : "text-gray-500 hover:text-gray-900"
          }`}
        >
          <Truck className={`w-5 h-5 mb-0.5 ${isTrack ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
          <span className="text-[12px] font-semibold leading-tight">Track</span>
        </Link>

        {/* 5. My Account */}
        <Link
          href="/account"
          prefetch={true}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            isAccount ? "text-brand-green font-bold" : "text-gray-500 hover:text-gray-900"
          }`}
          aria-label="My Account"
        >
          <User className={`w-5 h-5 mb-0.5 ${isAccount ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
          <span className="text-[11.5px] font-semibold leading-tight whitespace-nowrap">My Account</span>
        </Link>
      </div>
    </nav>
  );
}
