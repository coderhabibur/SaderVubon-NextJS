"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sparkles,
  Phone,
  MessageCircle,
  Star,
  Plus,
  Minus,
  Check,
  ArrowRight,
  AlertCircle,
  ChevronDown,
  ShoppingBag,
  Award,
  Zap,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { LandingConfig, FunnelProduct } from "@/types/landing";
import { OrderBump } from "./OrderBump";

interface LandingTemplateProps {
  config: LandingConfig;
}

export function LandingTemplate({ config }: LandingTemplateProps) {
  const router = useRouter();
  const orderFormRef = useRef<HTMLDivElement>(null);

  // Initial Product selection (default or first item)
  const defaultId = config.defaultSelectedProductId || config.products[0]?.id;
  const [selectedItems, setSelectedItems] = useState<Record<number, number>>({
    [defaultId]: 1,
  });

  // Order Bump selection state
  const [isBumpSelected, setIsBumpSelected] = useState(false);

  // Form Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryZone, setDeliveryZone] = useState<"inside_dhaka" | "outside_dhaka">("inside_dhaka");
  const [customerNote, setCustomerNote] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Scroll to form helper
  const scrollToOrderForm = (focusProductId?: number) => {
    if (focusProductId) {
      setSelectedItems((prev) => ({
        ...prev,
        [focusProductId]: (prev[focusProductId] || 0) > 0 ? prev[focusProductId] : 1,
      }));
    }
    if (orderFormRef.current) {
      orderFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Toggle product selection
  const handleToggleProduct = (product: FunnelProduct) => {
    setSelectedItems((prev) => {
      const currentQty = prev[product.id] || 0;
      if (currentQty > 0) {
        const remainingKeys = Object.keys(prev).filter(
          (k) => Number(k) !== product.id && prev[Number(k)] > 0
        );
        if (remainingKeys.length === 0) {
          return prev; // keep at least 1 selected
        }
        const copy = { ...prev };
        delete copy[product.id];
        return copy;
      } else {
        return { ...prev, [product.id]: 1 };
      }
    });
  };

  // Change quantity
  const handleQuantityChange = (productId: number, delta: number) => {
    setSelectedItems((prev) => {
      const current = prev[productId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const activeCount = Object.values(prev).filter((q) => q > 0).length;
        if (activeCount <= 1) {
          return { ...prev, [productId]: 1 };
        }
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: next };
    });
  };

  // Calculations
  const selectedProductList = config.products
    .filter((p) => (selectedItems[p.id] || 0) > 0)
    .map((p) => ({
      product: p,
      quantity: selectedItems[p.id],
      lineTotal: p.salePrice * selectedItems[p.id],
    }));

  // Combine with Order Bump if selected
  const allOrderItems =
    isBumpSelected && config.orderBump
      ? [
          ...selectedProductList,
          {
            product: {
              id: config.orderBump.id,
              name: config.orderBump.title,
              weight: "",
              regularPrice: config.orderBump.regularPrice,
              salePrice: config.orderBump.salePrice,
              image: config.orderBump.image,
              badge: "অর্ডার বাম্প",
            },
            quantity: 1,
            lineTotal: config.orderBump.salePrice,
          },
        ]
      : selectedProductList;

  const subtotal = allOrderItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const totalItemCount = allOrderItems.reduce((sum, item) => sum + item.quantity, 0);

  const hasFreeDeliveryItem = allOrderItems.some(
    (item) => item.product.badge === "ফ্রি ডেলিভারি"
  );
  const isFreeShipping = hasFreeDeliveryItem || subtotal >= 2500;
  const shippingFee = isFreeShipping ? 0 : deliveryZone === "inside_dhaka" ? 70 : 130;
  const grandTotal = subtotal + shippingFee;

  // Order Submission
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError("অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।");
      return;
    }

    const cleanPhone = phone.replace(/[^\d+]/g, "");
    const bdPhoneRegex = /^(?:\+88|88)?01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(cleanPhone)) {
      setFormError("অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নাম্বার লিখুন (যেমন: 017XXXXXXXX)।");
      return;
    }

    if (!address.trim() || address.trim().length < 5) {
      setFormError("অনুগ্রহ করে আপনার বিস্তারিত ডেলিভারি ঠিকানা (বাসা, রোড, এলাকা) লিখুন।");
      return;
    }

    if (allOrderItems.length === 0) {
      setFormError("অনুগ্রহ করে অন্তত একটি পণ্য সিলেক্ট করুন।");
      return;
    }

    setIsSubmitting(true);

    try {
      const payloadItems = allOrderItems.map(({ product, quantity }) => ({
        productId: product.id,
        name: product.name,
        price: product.salePrice,
        quantity,
        image: product.image,
      }));

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: cleanPhone,
          address: address.trim(),
          city: deliveryZone === "inside_dhaka" ? "Dhaka" : "Outside Dhaka",
          deliveryZone,
          customerNote: customerNote.trim(),
          items: payloadItems,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "অর্ডার প্রক্রিয়াকরণে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }

      router.push(`/order-success/${data.orderId}`);
    } catch (err: any) {
      console.error("Landing order submission error:", err);
      setFormError(err.message || "দুঃখিত, সংযোগে ত্রুটি হয়েছে। অনুগ্রহ করে মোবাইল নম্বর চেক করে আবার চেষ্টা করুন।");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#faf9f6] text-gray-900 font-sans min-h-screen">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-brand-green text-white text-xs sm:text-sm py-2 px-4 text-center font-bold flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-brand-yellow shrink-0" />
        <span>সারা দেশে ক্যাশ অন ডেলিভারি ও টেস্ট করে রিসিভ করার পূর্ণ নিশ্চয়তা!</span>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/60 via-white to-amber-50/30 py-8 sm:py-14 border-b border-amber-200/60">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-100/80 border border-amber-300 text-amber-900 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black shadow-2xs">
              <Award className="w-4 h-4 text-amber-700" />
              <span>{config.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#042418] font-heading leading-tight">
              {config.headline}{" "}
              <span className="text-brand-green underline decoration-amber-400 decoration-wavy decoration-2">
                {config.highlightText}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              {config.subheadline}
            </p>

            {/* Hero Image Showcase */}
            <div className="relative mx-auto w-full max-w-xl aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white mt-6">
              <Image
                src={config.heroImage}
                alt={config.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-left text-xs sm:text-sm font-bold flex items-center justify-between">
                <span className="bg-brand-green/90 px-3 py-1 rounded-full backdrop-blur-xs">
                  ১০০% খাঁটি ও নির্ভেজাল
                </span>
                <span className="bg-black/60 px-3 py-1 rounded-full backdrop-blur-xs">
                  ক্যাশ অন ডেলিভারি
                </span>
              </div>
            </div>

            {/* Hero CTA Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => scrollToOrderForm()}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-green to-[#083a29] hover:from-[#083a29] hover:to-brand-green text-white font-black text-base sm:text-lg shadow-xl shadow-brand-green/20 hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-emerald-400/30"
              >
                <ShoppingBag className="w-5 h-5 text-brand-yellow" />
                <span>অর্ডার করতে এখানে ক্লিক করুন</span>
                <ArrowRight className="w-5 h-5 text-brand-yellow" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KEY FEATURES / WHY CHOOSE US */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {config.features.map((f, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 flex items-start gap-3 hover:bg-amber-50 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-gray-900 leading-snug">
                    {f.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE 2-COLUMN FAST CHECKOUT FORM */}
      <section ref={orderFormRef} className="py-12 sm:py-16 bg-[#faf9f6]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-3xl border-2 border-amber-300 shadow-xl overflow-hidden">
            {/* Form Top Header */}
            <div className="bg-gradient-to-b from-amber-50 via-amber-50/40 to-white px-6 py-6 text-center border-b border-amber-200">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#042418] font-heading leading-tight mb-2">
                অর্ডার করতে নিচের ফর্মে আপনার তথ্য লিখুন
              </h2>
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>
                  {config.guaranteeNotice ||
                    "ডেলিভারি ম্যানের সামনে দেখে, খেয়ে, টেস্ট করে রিসিভ করতে পারবেন।"}
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-8 space-y-8">
              {/* STEP 1: PRODUCT SELECTION GRID */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-brand-green text-white flex items-center justify-center text-xs font-black">
                      ১
                    </span>
                    <h3 className="text-base sm:text-xl font-black text-gray-950 font-heading">
                      আপনার পছন্দের প্যাকেজ সিলেক্ট করুনঃ
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-gray-500">
                    সিলেক্টেড: <span className="text-brand-green font-black">{totalItemCount} টি</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {config.products.map((p) => {
                    const isSelected = (selectedItems[p.id] || 0) > 0;
                    const qty = selectedItems[p.id] || 1;

                    return (
                      <div
                        key={p.id}
                        className={`relative p-3 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? "bg-amber-50/40 border-amber-500 shadow-sm"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {p.badge && (
                          <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full shadow-xs">
                            {p.badge}
                          </span>
                        )}

                        <div
                          onClick={() => handleToggleProduct(p)}
                          className="flex items-center gap-3 cursor-pointer flex-1 select-none min-w-0"
                        >
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 transition-colors ${
                              isSelected
                                ? "bg-brand-green border-brand-green text-white"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>

                          <div className="relative w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0 pr-1">
                            <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug line-clamp-2">
                              {p.name}
                            </h4>

                            {/* Quantity Stepper */}
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white w-fit mt-1.5"
                            >
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuantityChange(p.id, -1);
                                }}
                                className="w-6 h-6 bg-gray-50 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition cursor-pointer text-xs"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-black text-gray-900 select-none">
                                {isSelected ? qty : 1}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuantityChange(p.id, 1);
                                }}
                                className="w-6 h-6 bg-gray-50 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition cursor-pointer text-xs"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="shrink-0 text-right">
                          <span className="text-sm sm:text-base font-black text-gray-900 block">
                            ৳{p.salePrice}
                          </span>
                          {p.regularPrice > p.salePrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ৳{p.regularPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: CHECKOUT FORM (CUSTOMER DETAILS + ORDER SUMMARY) */}
              <form
                onSubmit={handleSubmitOrder}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 border-t border-gray-200"
              >
                {/* LEFT COLUMN: CUSTOMER DETAILS */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <span className="w-7 h-7 rounded-full bg-brand-green text-white flex items-center justify-center text-xs font-black">
                      ২
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-gray-950 font-heading">
                      আপনার ডেলিভারির তথ্য দিন
                    </h3>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      আপনার নাম <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="আপনার পূর্ণ নাম লিখুন"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      মোবাইল নাম্বার <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="১১ ডিজিটের সচল মোবাইল নাম্বার (যেমন: 017XXXXXXXX)"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      পূর্ণ ডেলিভারি ঠিকানা <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="বাসা নং, রোড নং, এলাকা, থানা ও জেলার নাম বিস্তারিত লিখুন"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm transition resize-none"
                    />
                  </div>

                  {/* Delivery Zone Selector */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      ডেলিভারি এরিয়া সিলেক্ট করুন <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setDeliveryZone("inside_dhaka")}
                        className={`p-3 rounded-xl border-2 text-left transition cursor-pointer ${
                          deliveryZone === "inside_dhaka"
                            ? "border-brand-green bg-emerald-50/50 ring-1 ring-brand-green"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <span className="block text-xs font-bold text-gray-900">ঢাকার ভেতরে</span>
                        <span className="block text-xs font-black text-brand-green mt-0.5">
                          {isFreeShipping ? "ফ্রি ডেলিভারি" : "৭০৳"}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryZone("outside_dhaka")}
                        className={`p-3 rounded-xl border-2 text-left transition cursor-pointer ${
                          deliveryZone === "outside_dhaka"
                            ? "border-brand-green bg-emerald-50/50 ring-1 ring-brand-green"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <span className="block text-xs font-bold text-gray-900">ঢাকার বাইরে</span>
                        <span className="block text-xs font-black text-brand-green mt-0.5">
                          {isFreeShipping ? "ফ্রি ডেলিভারি" : "১৩০৳"}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      বিশেষ কোনো নির্দেশনা (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      value={customerNote}
                      onChange={(e) => setCustomerNote(e.target.value)}
                      placeholder="ডেলিভারি সংক্রান্ত কোনো নোট থাকলে লিখুন"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-brand-green outline-none text-xs transition"
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN: ORDER SUMMARY & SUBMIT */}
                <div className="md:col-span-5 flex flex-col justify-between">
                  <div className="bg-[#faf9f6] rounded-2xl border-2 border-amber-300 p-4 sm:p-6 space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-amber-200">
                      <span className="w-7 h-7 rounded-full bg-brand-green text-white flex items-center justify-center text-xs font-black">
                        ৩
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-gray-950 font-heading">
                        অর্ডার সামারি
                      </h3>
                    </div>

                    {/* Products breakdown */}
                    <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                      {allOrderItems.map(({ product, quantity, lineTotal }) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between gap-2 text-xs sm:text-sm py-2 border-b border-gray-200/80"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="relative w-8 h-8 rounded bg-gray-100 overflow-hidden shrink-0">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="32px"
                                className="object-cover"
                              />
                            </div>
                            <div className="truncate">
                              <div className="flex items-center gap-1 truncate">
                                <p className="font-bold text-gray-900 truncate">{product.name}</p>
                                {product.badge === "অর্ডার বাম্প" && (
                                  <span className="shrink-0 text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded font-black">
                                    বাম্প অফার
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-gray-500">
                                ৳{product.salePrice} × {quantity}
                              </p>
                            </div>
                          </div>
                          <span className="font-black text-gray-950 shrink-0">৳{lineTotal}</span>
                        </div>
                      ))}
                    </div>

                    {/* ORDER BUMP (CartFlows Style) */}
                    {config.orderBump && (
                      <div className="pt-1">
                        <OrderBump
                          bump={config.orderBump}
                          isSelected={isBumpSelected}
                          onToggle={setIsBumpSelected}
                        />
                      </div>
                    )}

                    {/* Calculations */}
                    <div className="space-y-2 pt-2 border-t border-amber-200 text-xs sm:text-sm">
                      <div className="flex items-center justify-between text-gray-600">
                        <span>সাবটোটাল</span>
                        <span className="font-bold text-gray-900">৳{subtotal}</span>
                      </div>

                      <div className="flex items-center justify-between text-gray-600">
                        <span>ডেলিভারি চার্জ</span>
                        <span className="font-bold text-gray-900">
                          {shippingFee === 0 ? (
                            <span className="text-brand-green font-black">ফ্রি (০৳)</span>
                          ) : (
                            `৳${shippingFee}`
                          )}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-base sm:text-lg font-black text-gray-950 pt-2 border-t border-amber-300">
                        <span>সর্বমোট বিল</span>
                        <span className="text-xl sm:text-2xl font-black text-brand-green">
                          ৳{grandTotal}
                        </span>
                      </div>
                    </div>

                    {/* COD Banner */}
                    <div className="bg-amber-100/70 border border-amber-300 rounded-xl p-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <input type="radio" checked readOnly className="w-4 h-4 text-brand-green" />
                        <span className="text-xs sm:text-sm font-black text-gray-900">
                          ক্যাশ অন ডেলিভারি (Cash on Delivery)
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-700 pl-6">
                        পণ্য হাতে পেয়ে দেখে ডেলিভারি ম্যানের কাছে মূল্য পরিশোধ করুন।
                      </p>
                    </div>

                    {formError && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{formError}</span>
                      </div>
                    )}

                    {/* SUBMIT BUTTON */}
                    <button
                      type="submit"
                      disabled={isSubmitting || allOrderItems.length === 0}
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-green via-[#083a29] to-brand-green hover:from-[#083a29] hover:to-brand-green text-white font-black text-base sm:text-lg shadow-xl shadow-brand-green/30 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-2 border-emerald-400/30"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>অর্ডার প্রসেস হচ্ছে...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-5 h-5 text-brand-yellow stroke-[3]" />
                          <span>অর্ডার কনফার্ম করুন (৳{grandTotal})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQS ACCORDION */}
      {config.faqs && config.faqs.length > 0 && (
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 max-w-3xl">
            <h3 className="text-xl sm:text-2xl font-black text-center text-gray-900 mb-8 font-heading">
              সাধারণ জিজ্ঞাসা (FAQs)
            </h3>
            <div className="space-y-3">
              {config.faqs.map((faq, i) => {
                const isOpen = openFaqIndex === i;
                return (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50/50"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                      className="w-full px-5 py-4 text-left font-bold text-sm text-gray-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-100/50 transition"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 transition-transform ${
                          isOpen ? "rotate-180 text-brand-green" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-200/60 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6. MOBILE STICKY BUY BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-gray-500 block">মোট প্রদেয় বিল</span>
          <span className="text-base font-black text-brand-green">৳{grandTotal}</span>
        </div>
        <button
          type="button"
          onClick={() => scrollToOrderForm()}
          className="flex-1 py-3 px-4 rounded-xl bg-brand-green hover:bg-brand-green-hover text-white font-black text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition"
        >
          <ShoppingBag className="w-4 h-4 text-brand-yellow" />
          <span>অর্ডার করুন</span>
        </button>
      </div>
    </div>
  );
}
