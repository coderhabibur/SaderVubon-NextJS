"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Tag,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, subtotal, totalItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const FREE_SHIPPING_THRESHOLD = 2500;
  const isFreeDelivery = subtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const deliveryProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code.");
      return;
    }
    // Demo / placeholder validation for now
    if (couponCode.trim().toUpperCase() === "SADER10") {
      setCouponApplied(true);
      setCouponError(null);
    } else {
      setCouponError("This coupon code is invalid or has expired.");
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 flex-1 flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 max-w-lg w-full text-center shadow-xs">
          <div className="w-24 h-24 bg-emerald-50 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xs">
            <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
            Your Cart is Currently Empty!
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 max-w-sm mx-auto">
            Explore our collection of pure honey, natural jaggery, mustard oil, and organic pickles.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-brand-green hover:bg-brand-green-hover text-white font-black px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95 text-base"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 flex-1 py-6 sm:py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* 1. Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4 sm:mb-6 font-medium">
          <Link href="/" className="hover:text-brand-green transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">Shopping Cart</span>
        </nav>

        {/* 2. Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-950">
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Total <strong className="text-gray-900 font-bold">{totalItems} {totalItems === 1 ? "item" : "items"}</strong> in your cart
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="self-start sm:self-auto text-xs font-bold text-gray-400 hover:text-red-600 transition flex items-center gap-1.5 cursor-pointer py-1 px-2.5 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        </div>

        {/* 3. Free Delivery Threshold Banner */}
        <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 mb-8 shadow-2xs">
          <div className="flex items-center justify-between gap-4 mb-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-green text-white flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                {!isFreeDelivery ? (
                  <p className="text-xs sm:text-sm font-bold text-gray-900">
                    Add <strong className="text-brand-green font-black">৳{remainingForFree}</strong> more to get <strong className="text-brand-green font-black">Free Delivery!</strong>
                  </p>
                ) : (
                  <p className="text-xs sm:text-sm font-bold text-emerald-800 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Congratulations! You qualify for Free Delivery nationwide! 🎉</span>
                  </p>
                )}
              </div>
            </div>
            <span className="text-xs font-black text-brand-green hidden sm:inline">
              Target: ৳{FREE_SHIPPING_THRESHOLD}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-emerald-200/60 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-brand-green h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${deliveryProgress}%` }}
            />
          </div>
        </div>

        {/* 4. Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Items Table (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
              <table className="w-full text-left">
                <thead className="bg-gray-100/70 border-b border-gray-200 text-xs font-bold text-gray-700">
                  <tr>
                    <th className="py-3.5 px-5">Product</th>
                    <th className="py-3.5 px-4 text-center">Price</th>
                    <th className="py-3.5 px-4 text-center">Quantity</th>
                    <th className="py-3.5 px-5 text-right">Total</th>
                    <th className="py-3.5 px-4 text-center w-12">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <tr
                      key={`${item.id}-${item.variationOption || "std"}`}
                      className="hover:bg-gray-50/60 transition group"
                    >
                      {/* Product details */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-4">
                          <Link
                            href={`/product/${item.slug}`}
                            className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0 group-hover:scale-105 transition-transform"
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </Link>
                          <div className="min-w-0">
                            <Link
                              href={`/product/${item.slug}`}
                              className="font-bold text-gray-900 hover:text-brand-green transition text-sm line-clamp-1"
                            >
                              {item.name}
                            </Link>
                            {item.variationOption && (
                              <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
                                Size/Weight: {item.variationOption}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Unit Price */}
                      <td className="py-4 px-4 text-center">
                        <span className="font-bold text-gray-800 text-sm">৳{item.price}</span>
                      </td>

                      {/* Quantity Stepper */}
                      <td className="py-4 px-4 text-center">
                        <div className="inline-flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white shadow-2xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition cursor-pointer"
                            title="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-extrabold text-gray-900 select-none">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition cursor-pointer"
                            title="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Total Price */}
                      <td className="py-4 px-5 text-right">
                        <span className="font-black text-brand-green text-base">
                          ৳{item.price * item.quantity}
                        </span>
                      </td>

                      {/* Remove Button */}
                      <td className="py-4 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition mx-auto cursor-pointer"
                          title="Remove from cart"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.variationOption || "std"}`}
                  className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs flex gap-3.5"
                >
                  <Link
                    href={`/product/${item.slug}`}
                    className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.slug}`}
                          className="font-bold text-gray-900 text-sm line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-600 p-1 -mr-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.variationOption && (
                        <p className="text-xs text-gray-500 font-medium mt-0.5">
                          Size/Weight: {item.variationOption}
                        </p>
                      )}

                      <p className="text-xs font-bold text-gray-600 mt-1">
                        Unit Price: ৳{item.price}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-2xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-black text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-black text-brand-green text-sm">
                        Total: ৳{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Back Button */}
            <div className="pt-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-700 hover:text-brand-green transition py-2 px-3 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary Card (4 Cols - Sticky) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm">
              <h2 className="text-lg font-black text-gray-950 pb-3 mb-4 border-b border-gray-100">
                Order Summary
              </h2>

              {/* Price Details */}
              <div className="space-y-3 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-gray-900">৳{subtotal}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Shipping:</span>
                  <span className="font-bold text-gray-900">
                    {isFreeDelivery ? (
                      <span className="text-brand-green font-black">৳0 (Free Delivery)</span>
                    ) : (
                      <span className="text-gray-500 font-medium">Calculated at checkout</span>
                    )}
                  </span>
                </div>

                {couponApplied && (
                  <div className="flex items-center justify-between text-brand-green font-bold">
                    <span>Coupon Discount (10%):</span>
                    <span>-৳{Math.round(subtotal * 0.1)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-base sm:text-lg font-black text-gray-950">
                  <span>Estimated Total:</span>
                  <span className="text-2xl text-brand-green font-black">
                    ৳{couponApplied ? subtotal - Math.round(subtotal * 0.1) : subtotal}
                  </span>
                </div>
              </div>

              {/* Checkout CTA Button */}
              <Link
                href="/checkout"
                className="w-full mt-6 py-4 px-6 rounded-xl font-black text-base sm:text-lg flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white shadow-lg shadow-emerald-900/10 transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              {/* Coupon / Discount Code Input */}
              <div className="mt-6 pt-5 border-t border-gray-100">
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <label className="block text-xs font-bold text-gray-700">
                    Coupon or Promo Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Tag className="w-3.5 h-3.5" />
                      </div>
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon code (e.g. SADER10)"
                        disabled={couponApplied}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none text-xs text-gray-900 transition disabled:bg-gray-100"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={couponApplied}
                      className="px-4 py-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 text-white font-bold rounded-xl text-xs transition cursor-pointer"
                    >
                      {couponApplied ? "Applied" : "Apply"}
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-red-600 font-medium">{couponError}</p>
                  )}
                  {couponApplied && (
                    <p className="text-[11px] text-brand-green font-bold">
                      ✓ Coupon code applied successfully!
                    </p>
                  )}
                </form>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-5 border-t border-gray-100 space-y-2.5 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                  <span>100% Cash on Delivery (Pay upon delivery)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-brand-green shrink-0" />
                  <span>Fast & reliable nationwide home delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                  <span>7-day easy replacement & return guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
