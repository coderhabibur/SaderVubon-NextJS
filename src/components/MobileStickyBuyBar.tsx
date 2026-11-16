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
          className={`flex items-center justify-center gap-1.5 py-2.5 px-5 rounded-xl font-black text-xs shadow-md transition-all active:scale-95 shrink-0 cursor-pointer ${
            btnState === "added"
              ? "bg-brand-green text-white scale-[1.02]"
              : btnState === "adding"
              ? "bg-amber-400 text-brand-dark opacity-90"
              : "bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark"
          }`}
        >
          {btnState === "adding" ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Adding...</span>
            </>
          ) : btnState === "added" ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3] text-white" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
