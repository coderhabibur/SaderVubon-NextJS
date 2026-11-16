"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  SlidersHorizontal,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ShopFilterSidebar } from "@/components/ShopFilterSidebar";
import { LiveProduct } from "@/lib/woocommerce";

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface ShopClientViewProps {
  categories: Category[];
  products: LiveProduct[];
  currentCategory: string;
  currentSort: string;
  minPrice?: string;
  maxPrice?: string;
  total?: number;
  totalPages?: number;
  currentPage?: number;
}

export function ShopClientView({
  categories,
  products: initialProducts,
  currentCategory: initialCategory,
  currentSort: initialSort,
  minPrice: initialMinPrice = "",
  maxPrice: initialMaxPrice = "",
  total: initialTotal = 0,
  totalPages: initialTotalPages = 1,
  currentPage: initialPage = 1,
}: ShopClientViewProps) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [products, setProducts] = useState<LiveProduct[]>(initialProducts);
  const [category, setCategory] = useState<string>(initialCategory);
  const [sort, setSort] = useState<string>(initialSort);
  const [minPrice, setMinPrice] = useState<string>(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState<string>(initialMaxPrice);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(initialTotalPages);
  const [totalCount, setTotalCount] = useState<number>(initialTotal || initialProducts.length);
  const [loading, setLoading] = useState(false);

  const gridTopRef = useRef<HTMLDivElement>(null);

  // AJAX Fetch Handler
  const fetchFilteredProducts = async (
    newCategory: string,
    newMin: string,
    newMax: string,
    newSort: string,
    targetPage = 1
  ) => {
    setLoading(true);
    setCategory(newCategory);
    setMinPrice(newMin);
    setMaxPrice(newMax);
    setSort(newSort);
    setCurrentPage(targetPage);

    // Build URL for browser history update without full page reload
    const params = new URLSearchParams();
    if (newCategory && newCategory !== "all") params.set("category", newCategory);
    if (newMin) params.set("min_price", newMin);
    if (newMax) params.set("max_price", newMax);
    if (newSort && newSort !== "newest") params.set("sort", newSort);
    if (targetPage > 1) params.set("page", String(targetPage));

    const queryString = params.toString();
    const newUrl = `/shop${queryString ? `?${queryString}` : ""}`;
    window.history.pushState(null, "", newUrl);

    try {
      const apiUrl = `/api/products?${queryString}&per_page=12`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
        setTotalCount(data.total || data.products.length);
        setTotalPages(data.totalPages || 1);
        setCurrentPage(data.currentPage || targetPage);
      }
    } catch (err) {
      console.error("AJAX filter/pagination failed:", err);
    } finally {
      setLoading(false);
      // Scroll to grid top smoothly
      if (gridTopRef.current) {
        gridTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleFilterChange = (
    newCat?: string,
    newMin?: string,
    newMax?: string
  ) => {
    const updatedCat = newCat !== undefined ? newCat : category;
    const updatedMin = newMin !== undefined ? newMin : minPrice;
    const updatedMax = newMax !== undefined ? newMax : maxPrice;
    // Reset to page 1 when filters change
    fetchFilteredProducts(updatedCat, updatedMin, updatedMax, sort, 1);
  };

  const handleSortChange = (e: React.MouseEvent, newSort: string) => {
    e.preventDefault();
    if (newSort === sort) return;
    // Reset to page 1 when sort changes
    fetchFilteredProducts(category, minPrice, maxPrice, newSort, 1);
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages || loading) return;
    fetchFilteredProducts(category, minPrice, maxPrice, sort, page);
  };

  const hasActiveFilters = (category && category !== "all") || minPrice || maxPrice;

  // Pagination Range Generator
  const getPaginationNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  // Showing range calculation
  const startItem = (currentPage - 1) * 12 + 1;
  const endItem = Math.min(currentPage * 12, totalCount);

  return (
    <div ref={gridTopRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* 1. Desktop Left Sidebar (3 Cols - Natural Scrolling) */}
      <aside className="hidden lg:block lg:col-span-3">
        <ShopFilterSidebar
          categories={categories}
          currentCategory={category}
          currentSort={sort}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onFilterChange={handleFilterChange}
        />
      </aside>

      {/* 2. Mobile Filter Drawer (Slide-over Modal) */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl p-5 overflow-y-auto flex flex-col z-10 animate-in slide-in-from-right duration-200">
            <ShopFilterSidebar
              categories={categories}
              currentCategory={category}
              currentSort={sort}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onFilterChange={handleFilterChange}
              onCloseMobile={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

      {/* 3. Right Product Listing Area (9 Cols) */}
      <div className="lg:col-span-9 space-y-6">
        {/* Top Control Bar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-emerald-50 text-gray-900 hover:text-brand-green font-bold text-xs sm:text-sm border border-gray-200 transition cursor-pointer active:scale-95"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-green" />
            <span>ফিল্টার সাইডবার</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-brand-green" />
            )}
          </button>

          {/* Product Count & Live Ajax Indicator */}
          <div className="flex items-center gap-2.5">
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              মোট <strong className="text-gray-950 font-bold">{totalCount}</strong> টি পণ্যের মধ্যে{" "}
              <strong className="text-brand-green font-bold">
                {totalCount > 0 ? `${startItem}–${endItem}` : "০"}
              </strong>{" "}
              টি প্রদর্শিত হচ্ছে
            </p>
            {loading && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-brand-green text-[11px] font-bold border border-emerald-200">
                <Loader2 className="w-3 h-3 animate-spin text-brand-green" />
                <span>লোড হচ্ছে...</span>
              </div>
            )}
          </div>

          {/* Sort Controls (AJAX Enabled) */}
          <div className="flex items-center gap-2 shrink-0 text-xs sm:text-sm">
            <span className="text-gray-500 font-medium hidden sm:inline">সাজান:</span>
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={(e) => handleSortChange(e, "newest")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  sort === "newest"
                    ? "bg-white text-gray-900 shadow-2xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                নতুন পণ্য
              </button>
              <button
                type="button"
                onClick={(e) => handleSortChange(e, "price_asc")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  sort === "price_asc"
                    ? "bg-white text-gray-900 shadow-2xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                দাম: কম ➔ বেশি
              </button>
              <button
                type="button"
                onClick={(e) => handleSortChange(e, "price_desc")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  sort === "price_desc"
                    ? "bg-white text-gray-900 shadow-2xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                দাম: বেশি ➔ কম
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid Area with Shimmer / Loading State */}
        <div className="relative min-h-[300px]">
          {loading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-2xs rounded-3xl z-20 flex items-center justify-center transition-all">
              <div className="bg-white/90 shadow-xl border border-gray-200 rounded-2xl px-6 py-4 flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-brand-green" />
                <span className="text-sm font-bold text-gray-800">পণ্য লোড হচ্ছে...</span>
              </div>
            </div>
          )}

          {products.length > 0 ? (
            <div
              className={`grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 transition-opacity duration-200 ${
                loading ? "opacity-40" : "opacity-100"
              }`}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-md mx-auto my-12 shadow-xs">
              <div className="w-20 h-20 bg-emerald-50 text-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">
                এই ফিল্টারে কোনো পণ্য পাওয়া যায়নি
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
                অনুগ্রহ করে অন্য কোনো ক্যাটাগরি বা দামের সীমা নির্বাচন করুন অথবা ফিল্টার রিসেট করুন।
              </p>
              <button
                type="button"
                onClick={() => handleFilterChange("all", "", "")}
                className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-xs transition cursor-pointer"
              >
                সকল ফিল্টার রিসেট করুন
              </button>
            </div>
          )}
        </div>

        {/* 4. AJAX Pagination Bar */}
        {totalPages > 1 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <span className="text-xs text-gray-500 font-medium">
              পেজ <strong className="text-gray-900 font-bold">{currentPage}</strong> /{" "}
              {totalPages} (মোট {totalCount} টি পণ্য)
            </span>

            <div className="flex items-center gap-1.5">
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1 || loading}
                className="flex items-center gap-1 px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">পূর্ববর্তী</span>
              </button>

              {/* Number Buttons */}
              <div className="flex items-center gap-1">
                {getPaginationNumbers().map((num, idx) => {
                  if (num === "...") {
                    return (
                      <span
                        key={`ellipsis-${idx}`}
                        className="w-8 h-8 flex items-center justify-center text-xs text-gray-400 select-none"
                      >
                        ...
                      </span>
                    );
                  }

                  const pageNum = Number(num);
                  const isActive = pageNum === currentPage;

                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => handlePageChange(pageNum)}
                      disabled={loading}
                      className={`w-9 h-9 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center ${
                        isActive
                          ? "bg-brand-green text-white shadow-xs"
                          : "border border-gray-200 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages || loading}
                className="flex items-center gap-1 px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <span className="hidden sm:inline">পরবর্তী</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
