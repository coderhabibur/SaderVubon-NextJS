"use client";

import Image from "next/image";
import { Sparkles, Check, ArrowRight, Zap, ShieldCheck } from "lucide-react";
import { OrderBumpData } from "@/types/landing";

interface OrderBumpProps {
  bump: OrderBumpData;
  isSelected: boolean;
  onToggle: (selected: boolean) => void;
}

export function OrderBump({ bump, isSelected, onToggle }: OrderBumpProps) {
  const discountAmount = Math.max(0, bump.regularPrice - bump.salePrice);

  return (
    <div
      onClick={() => onToggle(!isSelected)}
      className={`relative rounded-2xl border-2 transition-all duration-300 p-4 sm:p-5 cursor-pointer select-none overflow-hidden ${
        isSelected
          ? "border-emerald-500 bg-emerald-50/60 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-400/30"
          : "border-dashed border-amber-400 bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-amber-50/60 hover:border-amber-500 hover:shadow-md"
      }`}
    >
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-full shadow-xs">
          <Zap className="w-3 h-3 fill-current animate-bounce" />
          <span>{bump.badge || "এককালীন বিশেষ অফার (Order Bump)"}</span>
        </div>

        {discountAmount > 0 && (
          <span className="text-[11px] font-black text-rose-600 bg-rose-100/80 px-2 py-0.5 rounded-md border border-rose-200">
            ৳{discountAmount} সাশ্রয়
          </span>
        )}
      </div>

      {/* Main Row: Checkbox + Product Info */}
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Animated Checkbox */}
        <div
          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shrink-0 border-2 transition-all duration-200 mt-0.5 ${
            isSelected
              ? "bg-emerald-600 border-emerald-600 text-white shadow-sm scale-105"
              : "border-amber-400 bg-white shadow-inner"
          }`}
        >
          {isSelected ? (
            <Check className="w-4 h-4 stroke-[3]" />
          ) : (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          )}
        </div>

        {/* Product Details & Pitch */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <h4
              className={`text-xs sm:text-sm font-black leading-snug transition-colors ${
                isSelected ? "text-emerald-950" : "text-gray-950"
              }`}
            >
              <span className="text-amber-800 font-extrabold mr-1">
                {isSelected ? "✓ যোগ করা হয়েছে:" : "⚡ হ্যাঁ! যোগ করুন:"}
              </span>
              {bump.title}
            </h4>

            {/* Price Preview */}
            <div className="flex items-baseline gap-1.5 shrink-0">
              {bump.regularPrice > bump.salePrice && (
                <span className="text-xs text-gray-400 line-through">
                  ৳{bump.regularPrice}
                </span>
              )}
              <span
                className={`text-sm sm:text-base font-black ${
                  isSelected ? "text-emerald-700" : "text-amber-800"
                }`}
              >
                ৳{bump.salePrice}
              </span>
            </div>
          </div>

          {/* Subtitle / Pitch */}
          {bump.subtitle && (
            <p className="text-[11px] font-bold text-gray-700 mt-0.5">
              {bump.subtitle}
            </p>
          )}

          <p className="text-[11px] sm:text-xs text-gray-600 mt-1 leading-relaxed">
            {bump.pitch}
          </p>

          {/* Small thumbnail & micro trust tag */}
          <div className="flex items-center gap-3 mt-2.5 pt-2 border-t border-amber-200/60">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-200 bg-white shrink-0 shadow-2xs">
              <Image
                src={bump.image}
                alt={bump.title}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div className="text-[11px] text-gray-500 font-medium">
              <span className="font-bold text-gray-700">ক্লিক করলেই</span> অর্ডারের সাথে যুক্ত হয়ে যাবে।
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
