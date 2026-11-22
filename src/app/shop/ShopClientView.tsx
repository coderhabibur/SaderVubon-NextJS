"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  SlidersHorizontal,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowUpDown,
  Check,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ShopFilterSidebar } from "@/components/ShopFilterSidebar";
import { LiveProduct, AttributeFilterGroup } from "@/lib/woocommerce";

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface ShopClientViewProps {
  categories: Category[];
  attributes?: AttributeFilterGroup[];
  products: LiveProduct[];
  currentCategory?: string;
  currentSort?: string;
  minPrice?: string;
  maxPrice?: string;
  currentAttribute?: string;
  currentAttributeTerm?: string;
  total?: number;
  totalPages?: number;
  currentPage?: number;
}

const SORT_OPTIONS = [
  { value: "newest", label: "নতুন পণ্য" },
  { value: "popularity", label: "জনপ্রিয় পণ্য" },
  { value: "price_asc", label: "দাম: কম ➔ বেশি" },
  { value: "price_desc", label: "দাম: বেশি ➔ কম" },
];

export function ShopClientView({
  categories,
  attributes = [],
  products: initialProducts,
  currentCategory: initialCategory = "all",
  currentSort: initialSort = "newest",
  minPrice: initialMinPrice = "",
  maxPrice: initialMaxPrice = "",
  currentAttribute: initialAttribute = "",
  currentAttributeTerm: initialAttributeTerm = "",
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
  const [attribute, setAttribute] = useState<string>(initialAttribute);
  const [attributeTerm, setAttributeTerm] = useState<string>(initialAttributeTerm);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(initialTotalPages);
  const [totalCount, setTotalCount] = useState<number>(initialTotal || initialProducts.length);
  const [loading, setLoading] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const gridTopRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setSortDropdownOpen(false);
      }
    };
    if (sortDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortDropdownOpen]);

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label || "নতুন পণ্য";

  // AJAX Fetch Handler
  const fetchFilteredProducts = async (
    newCategory: string,
    newMin: string,
    newMax: string,
    newSort: string,
    newAttr: string,
    newTerm: string,
    targetPage = 1,
    shouldScroll = false
  ) => {
    setLoading(true);
    setCategory(newCategory);
    setMinPrice(newMin);
    setMaxPrice(newMax);
    setSort(newSort);
    setAttribute(newAttr);
    setAttributeTerm(newTerm);
    setCurrentPage(targetPage);

    // Build URL for browser history update without full page reload
    const params = new URLSearchParams();
    if (newCategory && newCategory !== "all") params.set("category", newCategory);
    if (newMin) params.set("min_price", newMin);
    if (newMax) params.set("max_price", newMax);
    if (newSort && newSort !== "newest") params.set("sort", newSort);
    if (newAttr && newTerm) {
      params.set("attribute", newAttr);
      params.set("attribute_term", newTerm);
    }
    if (targetPage > 1) params.set("page", String(targetPage));

    const queryString = params.toString();
    const newUrl = `/shop${queryString ? `?${queryString}` : ""}`;
    window.history.pushState(null, "", newUrl);
    window.dispatchEvent(new Event("popstate"));

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
      // Only scroll when explicitly needed (e.g. pagination clicks from the bottom)
      // Never scroll on filter clicks to avoid jitter / layout jump
      if (shouldScroll && gridTopRef.current) {
        const headerOffset = window.innerWidth >= 1024 ? 165 : 110;
        const elementPosition = gridTopRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        if (Math.abs(window.pageYOffset - offsetPosition) > 100) {
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: "smooth",
          });
        }
      }
    }
  };

  const handleFilterChange = (
    newCat?: string,
    newMin?: string,
    newMax?: string,
    newAttr?: string,
    newTerm?: string
  ) => {
    const updatedCat = newCat !== undefined ? newCat : category;
    const updatedMin = newMin !== undefined ? newMin : minPrice;
    const updatedMax = newMax !== undefined ? newMax : maxPrice;
    const updatedAttr = newAttr !== undefined ? newAttr : attribute;
    const updatedTerm = newTerm !== undefined ? newTerm : attributeTerm;
    // Reset to page 1 when filters change (no page jump)
    fetchFilteredProducts(updatedCat, updatedMin, updatedMax, sort, updatedAttr, updatedTerm, 1, false);
  };

  const handleSortChange = (newSort: string) => {
    if (newSort === sort) return;
    // Reset to page 1 when sort changes (no page jump)
    fetchFilteredProducts(category, minPrice, maxPrice, newSort, attribute, attributeTerm, 1, false);
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages || loading) return;
    fetchFilteredProducts(category, minPrice, maxPrice, sort, attribute, attributeTerm, page, true);
  };

  // Sync with initial URL search params on mount if directly loaded with query params
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const urlCat = params.get("category");
    const urlMin = params.get("min_price") || "";
    const urlMax = params.get("max_price") || "";
    const urlSort = params.get("sort") || "newest";
    const urlAttr = params.get("attribute") || "";
    const urlTerm = params.get("attribute_term") || "";
    const urlPage = parseInt(params.get("page") || "1", 10);

    if (urlCat || urlMin || urlMax || urlSort !== "newest" || urlAttr || urlTerm || urlPage > 1) {
      fetchFilteredProducts(
        urlCat || initialCategory,
        urlMin,
        urlMax,
        urlSort,
        urlAttr,
        urlTerm,
        urlPage,
        false
      );
    }
  }, []);

  const hasActiveFilters =
    (category && category !== "all") || minPrice || maxPrice || attributeTerm;

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
          attributes={attributes}
          currentCategory={category}
          currentSort={sort}
          minPrice={minPrice}
          maxPrice={maxPrice}
          currentAttribute={attribute}
          currentAttributeTerm={attributeTerm}
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
              attributes={attributes}
              currentCategory={category}
              currentSort={sort}
              minPrice={minPrice}
              maxPrice={maxPrice}
              currentAttribute={attribute}
              currentAttributeTerm={attributeTerm}
              onFilterChange={handleFilterChange}
              onCloseMobile={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

      {/* 3. Right Product Listing Area (9 Cols) */}
      <div className="lg:col-span-9 space-y-6">
        {/* Top Control Bar */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200/80 p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-emerald-50 text-gray-900 hover:text-emerald-800 font-bold text-xs sm:text-sm border border-gray-200 transition cursor-pointer active:scale-95"
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-800" />
            <span>ফিল্টার সাইডবার</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-emerald-800" />
            )}
          </button>

          {/* Product Count & Live Ajax Indicator */}
          <div className="flex items-center gap-2.5">
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              মোট <strong className="text-gray-950 font-bold">{totalCount}</strong> টি পণ্যের মধ্যে{" "}
              <strong className="text-emerald-800 font-bold">
                {totalCount > 0 ? `${startItem}–${endItem}` : "০"}
              </strong>{" "}
              টি প্রদর্শিত হচ্ছে
            </p>
            {loading && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                <Loader2 className="w-3 h-3 animate-spin text-emerald-800" />
                <span>লোড হচ্ছে...</span>
              </div>
            )}
          </div>

          {/* Custom Sort Dropdown (Luxury Brand Styled) */}
          <div ref={sortDropdownRef} className="relative flex items-center gap-2 shrink-0">
            <span className="text-xs sm:text-sm font-semibold text-gray-500 hidden sm:inline-flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-emerald-800" />
              <span>সাজান:</span>
            </span>

            <button
              type="button"
              onClick={() => setSortDropdownOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={sortDropdownOpen}
              className={`inline-flex items-center justify-between gap-2.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer select-none border shadow-2xs ${
                sortDropdownOpen
                  ? "bg-white text-emerald-900 border-emerald-600 ring-2 ring-emerald-600/20"
                  : "bg-white hover:bg-gray-50 text-gray-800 border-gray-200/90 hover:border-emerald-300"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="sm:hidden text-emerald-800">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </span>
                <span className="text-gray-900 font-extrabold">{currentSortLabel}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                  sortDropdownOpen ? "rotate-180 text-emerald-700" : ""
                }`}
              />
            </button>

            {/* Custom Floating Menu */}
            {sortDropdownOpen && (
              <div
                role="listbox"
                className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl shadow-emerald-950/10 border border-emerald-100 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 ease-out"
              >
                <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-850/80 border-b border-gray-100 mb-1">
                  পণ্য সাজানোর ক্রম
                </div>
                {SORT_OPTIONS.map((option) => {
                  const isSelected = sort === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        handleSortChange(option.value);
                        setSortDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer text-left ${
                        isSelected
                          ? "bg-gradient-to-r from-emerald-50 to-emerald-100/60 text-emerald-900 font-extrabold shadow-2xs"
                          : "text-gray-700 hover:bg-gray-100 hover:text-emerald-900"
                      }`}
                    >
                      <span>{option.label}</span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-emerald-700 stroke-[2.5]" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Product Cards Grid with Smooth Transition */}
        {products.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200/80 p-12 text-center shadow-xs min-h-[450px] flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <ShoppingBag className="w-8 h-8 stroke-[1.8]" />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-1 font-heading">
              কোনো পণ্য পাওয়া যায়নি
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto mb-6">
              আপনার নির্বাচিত ফিল্টারের সাথে মিলে এমন কোনো পণ্য এই মুহূর্তে নেই। ফিল্টার রিসেট করে আবার চেষ্টা করুন।
            </p>
            <button
              type="button"
              onClick={() => handleFilterChange("all", "", "", "", "")}
              className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition cursor-pointer active:scale-95"
            >
              <span>সকল ফিল্টার রিসেট করুন</span>
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 transition-opacity duration-200 min-h-[500px] ${
              loading ? "opacity-40 pointer-events-none" : "opacity-100"
            }`}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* AJAX Pagination Controls - Strictly 1 Line */}
        {totalPages > 1 && (
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200/80 p-2.5 sm:p-4 shadow-xs flex items-center justify-between gap-1 sm:gap-3 overflow-hidden">
            {/* Previous Button */}
            <button
              type="button"
              disabled={currentPage <= 1 || loading}
              onClick={() => handlePageChange(currentPage - 1)}
              className="inline-flex items-center justify-center gap-1.5 p-2 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer shrink-0"
              aria-label="পূর্ববর্তী পৃষ্ঠা"
            >
              <ChevronLeft className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">পূর্ববর্তী</span>
            </button>

            {/* Page Number Buttons */}
            <div className="flex items-center justify-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none py-1 mx-1">
              {getPaginationNumbers().map((num, i) => {
                if (typeof num === "string") {
                  return (
                    <span key={i} className="px-1 sm:px-2 py-1 text-gray-400 text-xs font-bold shrink-0">
                      {num}
                    </span>
                  );
                }

                const isActive = num === currentPage;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={loading}
                    onClick={() => handlePageChange(num)}
                    className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center justify-center shrink-0 ${
                      isActive
                        ? "bg-emerald-800 text-white shadow-xs"
                        : "border border-gray-200 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              type="button"
              disabled={currentPage >= totalPages || loading}
              onClick={() => handlePageChange(currentPage + 1)}
              className="inline-flex items-center justify-center gap-1.5 p-2 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer shrink-0"
              aria-label="পরবর্তী পৃষ্ঠা"
            >
              <span className="hidden sm:inline">পরবর্তী</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
