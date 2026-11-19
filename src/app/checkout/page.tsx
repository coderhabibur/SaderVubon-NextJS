"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  Phone,
  User,
  MapPin,
  FileText,
  AlertCircle,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [deliveryZone, setDeliveryZone] = useState<"inside_dhaka" | "outside_dhaka">("inside_dhaka");
  const [customerNote, setCustomerNote] = useState("");

  // UI / Submission State
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (user) {
      if (user.name) setName(user.name);
      if (user.phone) setPhone(user.phone);
      if (user.address) setAddress(user.address);
      if (user.city) setCity(user.city);
    }
  }, [user]);

  // Shipping Calculations
  const isFreeDelivery = subtotal >= 2500;
  const shippingFee = isFreeDelivery ? 0 : deliveryZone === "inside_dhaka" ? 70 : 130;
  const grandTotal = subtotal + shippingFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!name.trim()) {
      setErrorMessage("অনুগ্রহ করে আপনার নাম লিখুন।");
      return;
    }

    const cleanPhone = phone.replace(/[^\d+]/g, "");
    const bdPhoneRegex = /^(?:\+88|88)?01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(cleanPhone)) {
      setErrorMessage("অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন (যেমন: 017XXXXXXXX)।");
      return;
    }

    if (!address.trim() || address.trim().length < 5) {
      setErrorMessage("অনুগ্রহ করে আপনার সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন (বাসা, রোড, এলাকা/গ্রাম)।");
      return;
    }

    if (items.length === 0) {
      setErrorMessage("আপনার কার্ট খালি। অনুগ্রহ করে পণ্য যোগ করুন।");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: user?.id,
          customerEmail: user?.email,
          name: name.trim(),
          phone: cleanPhone,
          address: address.trim(),
          city: city.trim(),
          deliveryZone,
          customerNote: customerNote.trim(),
          items,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to process your order. Please try again.");
      }

      // Success: Clear cart & redirect to order-success page
      clearCart();
      router.push(`/order-success/${data.orderId}`);
    } catch (err: any) {
      console.error("Order submission error:", err);
      setErrorMessage(err.message || "Could not complete your order. Please check your details or internet connection.");
      setLoading(false);
    }
  };

  if (!isClient) {
    return (
      <div className="bg-gray-50 flex-1 py-10 animate-pulse">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="h-8 w-48 bg-gray-200 rounded-xl mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 space-y-4">
              <div className="h-6 w-36 bg-gray-200 rounded" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 bg-gray-100 rounded-xl" />
                <div className="h-10 bg-gray-100 rounded-xl" />
              </div>
              <div className="h-10 bg-gray-100 rounded-xl" />
              <div className="h-20 bg-gray-100 rounded-xl" />
            </div>
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 space-y-4">
              <div className="h-6 w-36 bg-gray-200 rounded" />
              <div className="h-16 bg-gray-100 rounded-xl" />
              <div className="h-12 w-full bg-emerald-100 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="w-24 h-24 bg-emerald-50 text-brand-green rounded-full flex items-center justify-center mb-5 shadow-xs">
          <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
          Your Cart is Currently Empty
        </h1>
        <p className="text-gray-500 max-w-md mb-8 text-sm sm:text-base leading-relaxed">
          Please add your favorite authentic products to your cart before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white font-black px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 flex-1 py-6 sm:py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Step Indicator & Trust Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>100% Safe & Secure Checkout</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
              Confirm Order (1-Step Checkout)
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Pay with Cash on Delivery after receiving and verifying your products
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3 text-xs text-gray-600 bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-brand-green shrink-0" />
            <span>Nationwide Cash on Delivery & fast home delivery guarantee</span>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
            <div className="text-sm font-semibold">{errorMessage}</div>
          </div>
        )}

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Shipping & Customer Details (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Delivery Details Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs">
                <div className="flex items-center justify-between gap-2.5 pb-4 mb-5 border-b border-gray-100 text-gray-900">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center font-black text-sm">
                      1
                    </div>
                    <h2 className="text-lg font-black">Delivery Information</h2>
                  </div>
                  {user && (
                    <span className="text-xs bg-emerald-50 border border-emerald-200 text-brand-green font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-brand-green" />
                      <span>Saved details auto-filled</span>
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5">
                      আপনার নাম <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="আপনার নাম লিখুন"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition"
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5">
                      মোবাইল নাম্বার <span className="text-red-500">*</span>
                      <span className="text-gray-400 font-normal text-xs ml-1">
                        (ডেলিভারির যোগাযোগের জন্য)
                      </span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="১১ ডিজিটের মোবাইল নম্বর লিখুন (যেমন: 017XXXXXXXX)"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition"
                      />
                    </div>
                  </div>

                  {/* Address Field */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5">
                      সম্পূর্ণ ডেলিভারি ঠিকানা <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3.5 pointer-events-none text-gray-400">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <textarea
                        required
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="বাসা নং, রোড নং, এলাকা/গ্রাম, থানা ও জেলার নাম বিস্তারিত লিখুন..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition resize-none"
                      />
                    </div>
                  </div>

                  {/* Delivery Zone Selector */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">
                      ডেলিভারি এরিয়া নির্বাচন করুন <span className="text-red-500">*</span>
                    </label>

                    {isFreeDelivery && (
                      <div className="mb-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-brand-green font-bold">
                        <Sparkles className="w-4 h-4 shrink-0 text-emerald-600" />
                        <span>৳২৫০০-এর বেশি অর্ডারে ফ্রি ডেলিভারি! 🎉</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Inside Dhaka */}
                      <label
                        className={`cursor-pointer rounded-xl border-2 p-3.5 flex items-center justify-between transition ${
                          deliveryZone === "inside_dhaka"
                            ? "border-brand-green bg-emerald-50/60 shadow-xs"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="deliveryZone"
                            checked={deliveryZone === "inside_dhaka"}
                            onChange={() => setDeliveryZone("inside_dhaka")}
                            className="w-4 h-4 text-brand-green focus:ring-brand-green"
                          />
                          <div>
                            <p className="text-sm font-black text-gray-900">ঢাকার সিটির ভেতরে</p>
                            <p className="text-xs text-gray-500">হোম ডেলিভারি (১-২ দিন)</p>
                          </div>
                        </div>
                        <span className="text-sm font-black text-brand-green">
                          {isFreeDelivery ? "ফ্রি" : "৳৭০"}
                        </span>
                      </label>

                      {/* Outside Dhaka */}
                      <label
                        className={`cursor-pointer rounded-xl border-2 p-3.5 flex items-center justify-between transition ${
                          deliveryZone === "outside_dhaka"
                            ? "border-brand-green bg-emerald-50/60 shadow-xs"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="deliveryZone"
                            checked={deliveryZone === "outside_dhaka"}
                            onChange={() => setDeliveryZone("outside_dhaka")}
                            className="w-4 h-4 text-brand-green focus:ring-brand-green"
                          />
                          <div>
                            <p className="text-sm font-black text-gray-900">ঢাকার বাইরে সারা দেশে</p>
                            <p className="text-xs text-gray-500">হোম ডেলিভারি (২-৩ দিন)</p>
                          </div>
                        </div>
                        <span className="text-sm font-black text-brand-green">
                          {isFreeDelivery ? "ফ্রি" : "৳১৩০"}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Customer Note */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5">
                      অর্ডার নোট (ঐচ্ছিক)
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3.5 pointer-events-none text-gray-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={customerNote}
                        onChange={(e) => setCustomerNote(e.target.value)}
                        placeholder="যেমন: ডেলিভারির বিশেষ সময় বা মন্তব্য লিখুন..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-xs">
                <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-gray-100 text-gray-900">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center font-black text-sm">
                    2
                  </div>
                  <h2 className="text-lg font-black">Payment Method</h2>
                </div>

                <div className="p-4 rounded-xl border-2 border-brand-green bg-emerald-50/50 flex items-start gap-3.5">
                  <div className="mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 fill-emerald-100" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-black text-gray-950">Cash on Delivery (COD)</h4>
                      <span className="px-2 py-0.5 rounded-md bg-brand-yellow text-gray-950 text-[10px] font-black">
                        Popular
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Pay with cash after receiving and verifying your products at your doorstep. No advance payment required.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary & Confirmation CTA (5 Cols - Sticky) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                  <h2 className="text-lg font-black text-gray-900">
                    Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} {items.reduce((s, i) => s + i.quantity, 0) === 1 ? "item" : "items"})
                  </h2>
                  <Link href="/shop" className="text-xs font-bold text-brand-green hover:underline">
                    Add more items
                  </Link>
                </div>

                {/* Items List inside Checkout */}
                <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto pr-1 mb-5">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.variationOption || "std"}`}
                      className="py-3 flex items-center gap-3.5"
                    >
                      {/* Image */}
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                          {item.name}
                        </h4>
                        {item.variationOption && (
                          <p className="text-[11px] text-gray-500 font-medium">
                            Size / Weight: {item.variationOption}
                          </p>
                        )}
                        <p className="text-xs font-black text-brand-green mt-0.5">
                          ৳{item.price} × {item.quantity} = ৳{item.price * item.quantity}
                        </p>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden shrink-0 bg-gray-50">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"
                          title="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"
                          title="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Subtotal & Totals */}
                <div className="space-y-2.5 border-t border-gray-100 pt-4 text-xs sm:text-sm">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span className="font-bold text-gray-900">৳{subtotal}</span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>ডেলিভারি চার্জ:</span>
                    <span className="font-bold text-gray-900">
                      {isFreeDelivery ? (
                        <span className="text-brand-green font-black">ফ্রি</span>
                      ) : (
                        `৳${shippingFee}`
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-base sm:text-lg font-black text-gray-950">
                    <span>Grand Total:</span>
                    <span className="text-2xl text-brand-green font-black">৳{grandTotal}</span>
                  </div>
                </div>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`group/btn relative overflow-hidden w-full mt-6 py-4 px-6 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2 transition-all cursor-pointer select-none ${
                    loading
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-gradient-to-r from-[#063b23] via-[#0d6437] to-[#063b23] hover:from-[#09472b] hover:via-[#117641] hover:to-[#09472b] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_6px_20px_rgba(6,59,35,0.28)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_10px_28px_rgba(6,59,35,0.38)] border border-emerald-600/35 hover:border-emerald-400/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                  }`}
                >
                  {/* Shimmer sweep */}
                  {!loading && (
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                  )}
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      <span>Processing Order...</span>
                    </>
                  ) : (
                    <>
                      <span className="font-extrabold tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
                        Confirm Order (৳{grandTotal})
                      </span>
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="mt-5 pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                    <span>100% Pure & Authentic Quality Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Inspect items before paying upon delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Fast replacement & return if any issues arise</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
