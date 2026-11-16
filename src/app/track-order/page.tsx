"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  AlertCircle,
  Phone,
  MessageCircle,
  ChevronRight,
  ShieldCheck,
  MessageSquare,
  Headphones,
} from "lucide-react";
import { siteConfig } from "@/config/site";

interface TrackedOrder {
  id: number;
  status: string;
  date_created: string;
  total: string;
  currency: string;
  payment_method_title: string;
  customer_name: string;
  customer_phone: string;
  address: string;
  city?: string;
  items: {
    name: string;
    quantity: number;
    total: string;
  }[];
  shipping_title: string;
  shipping_total: string;
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackedOrder, setTrackedOrder] = useState<TrackedOrder | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setTrackedOrder(null);

    if (!orderId.trim()) {
      setError("Please enter your Order ID number.");
      return;
    }

    setLoading(true);
    try {
      const url = `/api/track-order?id=${encodeURIComponent(orderId.trim())}${
        phone.trim() ? `&phone=${encodeURIComponent(phone.trim())}` : ""
      }`;
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Order not found. Please double-check your Order ID.");
      }

      setTrackedOrder(data.order);
    } catch (err: any) {
      setError(err.message || "Failed to retrieve order tracking information.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
      case "on-hold":
        return 1;
      case "processing":
        return 2;
      case "completed":
        return 4;
      default:
        return 2;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "Delivered";
      case "processing":
        return "Processing & Packaging";
      case "pending":
      case "on-hold":
        return "Order Received (On Hold)";
      case "cancelled":
        return "Cancelled";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  const currentStep = trackedOrder ? getStatusStep(trackedOrder.status) : 1;

  return (
    <div className="bg-gray-50 py-8 sm:py-12">
      <div className={`container mx-auto px-4 ${trackedOrder ? "max-w-3xl" : "max-w-2xl"} transition-all duration-300`}>
        {/* 1. Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-brand-green transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">Track Order</span>
        </nav>

        {/* 2. Header & Search Box */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs mb-6">
          <div className="text-center max-w-lg mx-auto mb-6">
            <div className="w-14 h-14 bg-emerald-50 text-brand-green rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-2xs border border-emerald-100/60">
              <Package className="w-7 h-7 stroke-[1.8]" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-950 mb-1.5">
              Track Your Order Status
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              Enter your <strong className="text-gray-800">Order ID</strong> and the associated <strong className="text-gray-800">Mobile Number</strong> to check your live packaging and delivery status.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleTrack} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Order ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. 36630"
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Mobile Number (Optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 017XXXXXXXX"
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-brand-green hover:bg-brand-green-hover text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  <span>Searching Order...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Track Order</span>
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-xs sm:text-sm font-semibold">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* 3. Helpful Guidance Cards (Shown when no order tracked yet) */}
        {!trackedOrder && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center mb-2.5">
                <MessageSquare className="w-4 h-4 stroke-[2]" />
              </div>
              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                Where is my Order ID?
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Check the SMS sent to your phone or your order invoice received immediately after placing your order.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center mb-2.5">
                <Truck className="w-4 h-4 stroke-[2]" />
              </div>
              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                Fast Doorstep Delivery
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Inside Dhaka: 24–48 Hours (৳70) & Nationwide Outside Dhaka: 2–3 Days (৳130).
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center mb-2.5">
                <Headphones className="w-4 h-4 stroke-[2]" />
              </div>
              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">
                Need Help Tracking?
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Call our direct helpline at <strong className="text-gray-800">{siteConfig.contact.hotline}</strong> or message us on WhatsApp.
              </p>
            </div>
          </div>
        )}

        {/* 3. Tracked Order Result View */}
        {trackedOrder && (
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-xs space-y-8 animate-fadeIn">
            {/* Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black mb-2">
                  Order ID: #{trackedOrder.id}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-gray-950">
                  Current Status:{" "}
                  <span className="text-brand-green">
                    {getStatusLabel(trackedOrder.status)}
                  </span>
                </h2>
              </div>

              <div className="text-xs text-gray-500 sm:text-right">
                <p>Order Date</p>
                <p className="font-bold text-gray-800 text-sm">
                  {new Date(trackedOrder.date_created).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="py-4">
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center relative">
                {/* Step 1 */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm mb-2 transition shadow-2xs ${
                      currentStep >= 1
                        ? "bg-brand-green text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    ✓
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-gray-900 leading-tight">Order Placed</span>
                  <span className="text-[10px] sm:text-[11px] text-gray-400 hidden sm:inline">Order confirmed</span>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm mb-2 transition shadow-2xs ${
                      currentStep >= 2
                        ? "bg-brand-green text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    2
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-gray-900 leading-tight">Processing</span>
                  <span className="text-[10px] sm:text-[11px] text-gray-400 hidden sm:inline">Packing parcel</span>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm mb-2 transition shadow-2xs ${
                      currentStep >= 3
                        ? "bg-brand-green text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    3
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-gray-900 leading-tight">On the Way</span>
                  <span className="text-[10px] sm:text-[11px] text-gray-400 hidden sm:inline">With courier</span>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm mb-2 transition shadow-2xs ${
                      currentStep >= 4
                        ? "bg-brand-green text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    4
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-gray-900 leading-tight">Delivered</span>
                  <span className="text-[10px] sm:text-[11px] text-gray-400 hidden sm:inline">Delivered to door</span>
                </div>
              </div>
            </div>

            {/* Delivery Address & Customer Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-200 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-500">Customer & Shipping Address</p>
                  <p className="font-bold text-gray-900 mt-0.5">
                    {trackedOrder.customer_name} ({trackedOrder.customer_phone})
                  </p>
                  <p className="text-gray-600 mt-0.5">
                    {trackedOrder.address}
                    {trackedOrder.city ? `, ${trackedOrder.city}` : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-500">Payment & Bill Total</p>
                  <p className="font-bold text-gray-900 mt-0.5">
                    {trackedOrder.payment_method_title || "Cash on Delivery (COD)"}
                  </p>
                  <p className="text-brand-green font-black text-base mt-0.5">
                    Total Payable: ৳{trackedOrder.total}
                  </p>
                </div>
              </div>
            </div>

            {/* Items Summary */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <div className="bg-gray-100/70 px-4 py-3 font-bold text-xs text-gray-700">
                Ordered Items
              </div>
              <div className="divide-y divide-gray-100 text-xs sm:text-sm">
                {trackedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-black text-gray-900">৳{item.total}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Box */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-black text-gray-900">Need urgent delivery update or address change?</h4>
                <p className="text-xs text-gray-600 mt-0.5">
                  Speak directly with our customer support agents.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <a
                  href={`tel:${siteConfig.contact.hotline}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-gray-300 text-gray-800 text-xs font-bold hover:bg-gray-50 transition shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-yellow" />
                  <span>{siteConfig.contact.hotline}</span>
                </a>

                <a
                  href={siteConfig.social.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-green text-white text-xs font-bold hover:bg-brand-green-hover transition shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
