"use client";

import { useEffect, useState } from "react";
import { History, Trash2 } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { LiveProduct } from "@/lib/woocommerce";

export interface ViewedProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  regularPrice?: number;
  image: string;
}

interface RecentlyViewedProps {
  currentProduct?: ViewedProduct;
}

const STORAGE_KEY = "sader_vubon_recently_viewed_v1";

export function RecentlyViewed({ currentProduct }: RecentlyViewedProps) {
  const [viewedItems, setViewedItems] = useState<ViewedProduct[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let list: ViewedProduct[] = stored ? JSON.parse(stored) : [];

      // If a current product is passed, push it to top (max 8 items)
      if (currentProduct && currentProduct.id) {
        list = [currentProduct, ...list.filter((item) => item.id !== currentProduct.id)].slice(0, 8);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      }

      // Filter out current product for display
      const displayList = currentProduct
        ? list.filter((item) => item.id !== currentProduct.id)
        : list;

      setViewedItems(displayList);
    } catch (e) {
      console.error("Failed to load recently viewed products", e);
    }
  }, [currentProduct]);

  const handleClearHistory = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setViewedItems([]);
    } catch (e) {
      console.error("Failed to clear recently viewed products", e);
    }
  };

  if (viewedItems.length === 0) return null;

  return (
    <section className="mt-14 pt-8 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center shadow-2xs">
            <History className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-950">
              Recently Viewed Products
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Products you browsed earlier on Sader Vubon
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClearHistory}
          className="self-start sm:self-auto text-xs font-bold text-gray-400 hover:text-red-600 transition flex items-center gap-1.5 cursor-pointer py-1.5 px-3 rounded-lg hover:bg-red-50"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear History</span>
        </button>
      </div>

      {/* Grid of recently viewed items - 100% same ProductCard design */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {viewedItems.map((item) => {
          const productObj: LiveProduct = {
            id: item.id,
            name: item.name,
            slug: item.slug,
            type: "simple",
            price: String(item.price),
            regular_price: item.regularPrice ? String(item.regularPrice) : String(item.price),
            sale_price: String(item.price),
            on_sale: Boolean(item.regularPrice && item.regularPrice > item.price),
            short_description: "",
            description: "",
            categories: [],
            images: [{ id: 0, src: item.image, alt: item.name }],
            stock_status: "instock",
            rating_count: 5,
            average_rating: "5.0",
          };

          return <ProductCard key={item.id} product={productObj} />;
        })}
      </div>
    </section>
  );
}
