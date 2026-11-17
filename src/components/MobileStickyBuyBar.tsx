"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ShoppingBag, ShoppingCart, Loader2, Check } from "lucide-react";

interface MobileStickyBuyBarProps {
  name: string;
  price: number;
  image: string;
  onAddToCart: () => void;
  btnState?: "idle" | "adding" | "added";
}

export function MobileStickyBuyBar({
  name,
  price,
  image,
  onAddToCart,
  btnState = "idle",
}: MobileStickyBuyBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar once scrolled down past the main gallery/hero area (~450px)
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/90 shadow-[0_-6px_20px_rgba(0,0,0,0.08)] px-4 py-2.5 transition-all duration-300 ease-out transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* Product Info Preview */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
            <Image
              src={image || "/placeholder.jpg"}
              alt={name}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-900 truncate leading-snug">
              {name}
            </p>
            <p className="text-sm font-black text-brand-green leading-none mt-0.5">
              ৳{price}
            </p>
          </div>
        </div>

        {/* Quick Buy CTA */}
        <button
          type="button"
          onClick={onAddToCart}
          disabled={btnState !== "idle"}
          className={`group/btn relative overflow-hidden flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-3.5 sm:px-5 rounded-xl font-black text-xs sm:text-sm transition-all active:scale-95 shrink-0 cursor-pointer select-none whitespace-nowrap ${
            btnState === "added"
              ? "bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 text-white shadow-[0_4px_14px_rgba(5,150,105,0.4)] border border-emerald-400/50 scale-[1.02]"
              : btnState === "adding"
              ? "bg-emerald-800 text-white opacity-90 cursor-wait shadow-sm"
              : "bg-gradient-to-r from-[#063b23] via-[#0d6437] to-[#063b23] hover:from-[#09472b] hover:via-[#117641] hover:to-[#09472b] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_4px_12px_rgba(6,59,35,0.25)] border border-emerald-600/30"
          }`}
        >
          {/* Shimmer sweep */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

          {btnState === "adding" ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span className="whitespace-nowrap">যোগ হচ্ছে...</span>
            </>
          ) : btnState === "added" ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3] text-white" />
              <span className="whitespace-nowrap">যুক্ত হয়েছে!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5 text-white" />
              <span className="whitespace-nowrap font-extrabold">অর্ডার করুন</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
