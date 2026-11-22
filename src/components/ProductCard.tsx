"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LiveProduct } from "@/lib/woocommerce";
import { ShoppingCart, Check, Loader2, Heart, Sparkles, Eye, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: LiveProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, openDrawer } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [btnState, setBtnState] = useState<"idle" | "adding" | "added">("idle");

  const regular = parseFloat(product.regular_price || product.price || "0");
  const current = parseFloat(product.price || "0");
  const savings = regular > current ? regular - current : 0;
  const isFav = isInWishlist(product.id);

  // Pick the most specific category (ignoring generic categories like "All Products")
  const displayCategory =
    product.categories?.find((c) => {
      const norm = c.name.trim().toLowerCase();
      return !["all products", "all", "সকল পণ্য", "সকল-পণ্য", "uncategorized"].includes(norm);
    }) || product.categories?.[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (btnState !== "idle") return;

    setBtnState("adding");

    addToCart(
      {
        id: product.id,
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: current,
        regularPrice: regular > current ? regular : undefined,
        image: product.images[0]?.src || "/placeholder.jpg",
      },
      1,
      false
    );

    setTimeout(() => {
      setBtnState("added");
      setTimeout(() => {
        openDrawer();
      }, 350);

      setTimeout(() => {
        setBtnState("idle");
      }, 2000);
    }, 250);
  };

  return (
    <div className="group bg-white rounded-xl sm:rounded-2xl border border-gray-200/80 hover:border-emerald-500/50 shadow-xs hover:shadow-xl hover:shadow-emerald-950/8 transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Product Image Area */}
      <div className="relative w-full pt-[92%] bg-gradient-to-b from-gray-50/60 to-white overflow-hidden block">
        <Link href={`/product/${product.slug}`} prefetch={true} className="absolute inset-0 block">
          <Image
            src={product.images[0]?.src || "/placeholder.jpg"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Savings Badge - Left Aligned */}
        {savings > 0 && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 pointer-events-none">
            <div className="flex items-center gap-1 bg-gradient-to-r from-amber-600 to-rose-600 text-white text-[10px] sm:text-[11px] font-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-full shadow-md shadow-rose-900/20 border border-white/20 tracking-wide">
              <span>৳{savings} ছাড়</span>
            </div>
          </div>
        )}

        {/* Floating Quick Action: Wishlist - Top Right */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist({
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: current,
              regularPrice: regular > current ? regular : undefined,
              image: product.images[0]?.src || "/placeholder.jpg",
            });
          }}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer ${
            isFav
              ? "bg-rose-50 text-rose-600 scale-105 border border-rose-200"
              : "bg-white text-gray-600 hover:text-rose-500 hover:scale-110 border border-gray-100"
          }`}
          aria-label="পছন্দের তালিকায় রাখুন"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFav ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Name */}
          {displayCategory && (
            <span className="text-[11px] font-bold text-emerald-700 tracking-wider uppercase block mb-1">
              {displayCategory.name}
            </span>
          )}

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} prefetch={true} className="block">
            <h3 className="font-extrabold text-sm sm:text-base text-gray-900 hover:text-emerald-800 transition-colors line-clamp-2 leading-snug mb-2 font-heading">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="pt-2 border-t border-gray-100 mt-2">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base sm:text-xl font-black text-gray-900">
              ৳{current.toLocaleString()}
            </span>
            {regular > current && (
              <span className="text-xs sm:text-sm font-semibold text-gray-400 line-through">
                ৳{regular.toLocaleString()}
              </span>
            )}
          </div>

          {/* Premium Add to Cart / Order Button */}
          <button
            onClick={handleAddToCart}
            disabled={btnState === "adding"}
            className={`group/btn relative overflow-hidden w-full py-2 sm:py-2.5 px-2.5 sm:px-4 rounded-lg sm:rounded-xl font-black text-[12px] sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 cursor-pointer select-none whitespace-nowrap ${
              btnState === "added"
                ? "bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 text-white shadow-[0_4px_16px_rgba(5,150,105,0.4)] border border-emerald-400/50 scale-[1.01]"
                : btnState === "adding"
                ? "bg-emerald-800 text-white opacity-90 cursor-wait shadow-sm"
                : "bg-gradient-to-r from-[#063b23] via-[#0d6437] to-[#063b23] hover:from-[#09472b] hover:via-[#117641] hover:to-[#09472b] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.32),0_4px_12px_rgba(6,59,35,0.22)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_8px_20px_rgba(6,59,35,0.32)] border border-emerald-600/30 hover:border-emerald-400/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            }`}
          >
            {/* Shimmer light beam sweep on hover */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

            {btnState === "adding" ? (
              <>
                <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin text-white shrink-0" />
                <span className="tracking-tight sm:tracking-wide whitespace-nowrap">যোগ হচ্ছে...</span>
              </>
            ) : btnState === "added" ? (
              <>
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] text-white shrink-0" />
                <span className="tracking-tight sm:tracking-wide font-extrabold whitespace-nowrap">যুক্ত হয়েছে!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0 group-hover/btn:scale-110 transition-transform duration-300" />
                <span className="font-extrabold tracking-tight sm:tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] whitespace-nowrap">
                  অর্ডার করুন
                </span>
                <ArrowRight className="hidden sm:inline-block w-3.5 h-3.5 text-emerald-200/80 -ml-0.5 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all duration-300 shrink-0" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
