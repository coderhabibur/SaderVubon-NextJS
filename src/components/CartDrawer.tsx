"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
  } = useCart();

  const [mounted, setMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  // Smooth slide-in and slide-out animation controller
  useEffect(() => {
    if (isDrawerOpen) {
      setMounted(true);
      const timer = setTimeout(() => setAnimateIn(true), 20);
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => setMounted(false), 320);
      return () => clearTimeout(timer);
    }
  }, [isDrawerOpen]);

  // Prevent background body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  // Free delivery threshold: 2500 Taka
  const FREE_DELIVERY_THRESHOLD = 2500;
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const deliveryProgress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop with smooth fade in/out */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-out ${
          animateIn ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer Container with smooth slide in/out */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
        <div
          className={`w-screen max-w-md bg-white shadow-2xl flex flex-col pointer-events-auto transform transition-transform duration-300 ease-out ${
            animateIn ? "translate-x-0" : "translate-x-full"
          }`}
        >
          
          {/* 1. Drawer Header */}
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center border border-emerald-100 shadow-2xs">
                <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 text-base leading-none">
                  Shopping Cart
                </h3>
                <span className="text-xs text-gray-500 font-bold">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={closeDrawer}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Free Delivery Meter */}
          <div className="bg-emerald-50/60 border-b border-emerald-100 px-5 py-3 shrink-0">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-800 mb-1.5">
              <Truck className="w-4 h-4 text-brand-green shrink-0" />
              {remainingForFreeDelivery > 0 ? (
                <span>
                  Add <strong className="text-brand-green font-black">৳{remainingForFreeDelivery}</strong> more for <strong className="text-emerald-800 font-black">Free Delivery!</strong>
                </span>
              ) : (
                <span className="text-brand-green font-black flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  Congratulations! You unlocked Free Delivery!
                </span>
              )}
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-emerald-200/60 rounded-full h-2 overflow-hidden">
              <div
                className="bg-brand-green h-full rounded-full transition-all duration-500"
                style={{ width: `${deliveryProgress}%` }}
              />
            </div>
          </div>

          {/* 3. Items List Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
                <div className="w-20 h-20 rounded-3xl bg-gray-100 text-gray-400 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h4 className="text-lg font-black text-gray-900 mb-1">
                  Your cart is empty
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 mb-6 max-w-xs leading-relaxed">
                  Explore our collection of pure honey, natural jaggery, mustard oil, and pickles.
                </p>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="bg-brand-green hover:bg-brand-green-hover text-white font-black px-6 py-3 rounded-xl shadow-md transition-all text-sm active:scale-95 cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.id}-${item.variationOption || "standard"}`}
                  className="flex gap-3.5 p-3.5 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 shadow-2xs transition group"
                >
                  {/* Thumbnail Image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-50 border border-gray-200/80 shrink-0">
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info & Quantity Stepper */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeDrawer}
                          className="font-bold text-gray-900 text-sm hover:text-brand-green transition line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-600 transition p-1 cursor-pointer shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Variation badge if present */}
                      {item.variationOption && (
                        <span className="inline-block bg-gray-100 text-gray-700 text-xs font-bold px-2.5 py-0.5 rounded-md mt-0.5">
                          Size/Weight: {item.variationOption}
                        </span>
                      )}
                    </div>

                    {/* Price and Stepper Row */}
                    <div className="flex items-center justify-between mt-2 pt-1">
                      <span className="font-black text-gray-950 text-base">
                        ৳{item.price * item.quantity}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-black text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 4. Drawer Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-gray-200 bg-white shadow-lg space-y-4 shrink-0">
              {/* Clear cart action */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Shipping calculated at checkout</span>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-gray-400 hover:text-red-600 transition font-bold cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>

              {/* Subtotal Row */}
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-gray-700">Subtotal:</span>
                <span className="text-2xl font-black text-gray-950">৳{subtotal}</span>
              </div>

              {/* Action Buttons: View Cart & Checkout */}
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="w-full flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition text-center cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>View Cart</span>
                </Link>

                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="group/btn relative overflow-hidden w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#063b23] via-[#0d6437] to-[#063b23] hover:from-[#09472b] hover:via-[#117641] hover:to-[#09472b] text-white py-3 px-3 rounded-xl font-black text-xs sm:text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_4px_14px_rgba(6,59,35,0.25)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_8px_20px_rgba(6,59,35,0.35)] border border-emerald-600/30 hover:border-emerald-400/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all text-center cursor-pointer select-none"
                >
                  {/* Shimmer sweep */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 font-medium pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
                <span>100% Cash on Delivery & Secure Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
