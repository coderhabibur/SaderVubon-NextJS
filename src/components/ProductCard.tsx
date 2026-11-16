"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LiveProduct } from "@/lib/woocommerce";
import { ShoppingCart, Check, Loader2, Heart } from "lucide-react";
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (btnState !== "idle") return;

    setBtnState("adding");

    // Add item without auto opening drawer immediately
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

    // Show checkmark animation then trigger drawer slide-in
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
    <div className="group bg-white rounded-2xl border border-gray-200/90 hover:border-brand-green hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Area with Link */}
      <Link href={`/product/${product.slug}`} className="relative w-full pt-[90%] bg-gray-50 overflow-hidden block">
        <Image
          src={product.images[0]?.src || "/placeholder.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Premium Save Badge */}
        {savings > 0 && (
          <div className="absolute top-3 right-3 z-10">
            <div className="flex items-center gap-1 bg-gradient-to-r from-red-600 via-rose-600 to-red-500 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md shadow-red-500/30 border border-white/25 backdrop-blur-xs tracking-wide">
              <span>Save ৳{savings}</span>
            </div>
          </div>
        )}

        {/* Wishlist Heart Toggle Button */}
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
          className={`absolute top-3 left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
            isFav
              ? "bg-rose-50 text-rose-600 opacity-100 scale-105"
              : "bg-white/90 hover:bg-white text-gray-500 hover:text-rose-500 sm:opacity-0 sm:group-hover:opacity-100 opacity-90"
          }`}
          aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
          title={isFav ? "উইশলিস্ট থেকে মুছুন" : "উইশলিস্টে যুক্ত করুন"}
        >
          <Heart className={`w-4 h-4 transition-transform active:scale-125 ${isFav ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>
      </Link>

      {/* Product Info Section */}
      <div className="p-4 flex flex-col flex-1 text-center sm:text-left">
        {/* Title linked to Single Product Page (18px) */}
        <h3 className="font-bold text-gray-950 text-[17px] sm:text-[18px] leading-snug line-clamp-2 hover:text-brand-green transition-colors mb-2 min-h-[2.9rem]">
          <Link href={`/product/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        {/* Price Row */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3 mt-auto">
          {/* Current Price */}
          <span className="text-lg sm:text-xl font-black text-gray-950">
            ৳{current}
          </span>

          {/* Regular Price with Strikethrough */}
          {savings > 0 && (
            <span className="text-sm text-gray-400 line-through font-medium">
              ৳{regular}
            </span>
          )}

          {/* Subtle Inline Savings Chip */}
          {savings > 0 && (
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
              ৳{savings} OFF
            </span>
          )}
        </div>

        {/* Animated "Add to Cart" Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={btnState !== "idle"}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-sm sm:text-base tracking-wide shadow-xs transition-all duration-300 cursor-pointer ${
            btnState === "added"
              ? "bg-brand-green text-white scale-[1.02] shadow-emerald-600/30"
              : btnState === "adding"
              ? "bg-amber-400 text-brand-dark opacity-90 scale-95"
              : "bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark hover:shadow-md active:scale-[0.98]"
          }`}
        >
          {btnState === "adding" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-brand-dark" />
              <span>Adding...</span>
            </>
          ) : btnState === "added" ? (
            <>
              <Check className="w-4 h-4 stroke-[3] text-white animate-in zoom-in-50 duration-200" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
