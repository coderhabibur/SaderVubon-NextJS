"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Trash2, ArrowRight, ChevronRight, ShoppingCart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { RecentlyViewed } from "@/components/RecentlyViewed";

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
          <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xs">
            <Heart className="w-12 h-12 stroke-[1.5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
            Your Wishlist is Empty!
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 max-w-sm mx-auto">
            You haven&apos;t saved any products to your wishlist yet. Browse our pure and authentic organic food items and save your favorites!
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
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4 sm:mb-6 font-medium">
          <Link href="/" className="hover:text-brand-green transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">Wishlist</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-950 flex items-center gap-2.5">
              <span>My Wishlist</span>
              <span className="text-xs bg-rose-50 text-rose-600 border border-rose-200 px-2.5 py-0.5 rounded-full font-bold">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Save your favorite authentic products to order anytime.
            </p>
          </div>

          <button
            type="button"
            onClick={clearWishlist}
            className="self-start sm:self-auto text-xs font-bold text-gray-400 hover:text-red-600 transition flex items-center gap-1.5 cursor-pointer py-1.5 px-3 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Wishlist</span>
          </button>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => {
            const savings = item.regularPrice && item.regularPrice > item.price ? item.regularPrice - item.price : 0;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200/90 hover:border-brand-green hover:shadow-lg transition-all flex flex-col overflow-hidden group"
              >
                {/* Image Area */}
                <div className="relative w-full pt-[90%] bg-gray-50 overflow-hidden">
                  <Link href={`/product/${item.slug}`}>
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-red-50 text-gray-400 hover:text-red-600 flex items-center justify-center shadow-xs transition cursor-pointer"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Savings Badge */}
                  {savings > 0 && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                        Save ৳{savings}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-2 hover:text-brand-green transition mb-2 min-h-[2.5rem]">
                    <Link href={`/product/${item.slug}`}>{item.name}</Link>
                  </h3>

                  {/* Price Row */}
                  <div className="flex items-center gap-2 mb-4 mt-auto">
                    <span className="text-base sm:text-lg font-black text-gray-950">
                      ৳{item.price}
                    </span>
                    {item.regularPrice && item.regularPrice > item.price && (
                      <span className="text-xs text-gray-400 line-through">
                        ৳{item.regularPrice}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(
                        {
                          id: item.id,
                          productId: item.id,
                          name: item.name,
                          slug: item.slug,
                          price: item.price,
                          regularPrice: item.regularPrice,
                          image: item.image,
                        },
                        1,
                        true
                      );
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-black text-xs sm:text-sm shadow-xs transition active:scale-95 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recently Viewed Products */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <RecentlyViewed />
        </div>
      </div>
    </div>
  );
}
