"use client";

import Link from "next/link";
import { Check, X, RotateCcw, Filter, Sparkles, Truck, ShieldCheck, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface ShopFilterSidebarProps {
  categories: Category[];
  currentCategory?: string;
  currentSort?: string;
  minPrice?: string;
  maxPrice?: string;
  onFilterChange?: (category?: string, minPrice?: string, maxPrice?: string) => void;
  onCloseMobile?: () => void;
}

const CATEGORY_MAP: Record<string, string> = {
  all: "সকল পণ্য",
  gur: "খেজুর ও আখের গুড়",
  honey: "সুন্দরবনের মধু",
  oil: "ঘানির সরিষার তেল",
  pickle: "ঘরোয়া স্পেশাল আচার",
  mango: "রাজশাহীর আম",
  offer: "স্পেশাল অফার",
};

const PRICE_PRESETS = [
  { label: "সকল মূল্য", min: "", max: "" },
  { label: "৳৫০০ এর নিচে", min: "0", max: "500" },
  { label: "৳৫০০ — ৳১,০০০", min: "500", max: "1000" },
  { label: "৳১,০০০ — ৳২,০০০", min: "1000", max: "2000" },
  { label: "৳২,০০০ এর বেশি", min: "2000", max: "10000" },
];

export function ShopFilterSidebar({
  categories,
  currentCategory = "all",
  currentSort = "newest",
  minPrice = "",
  maxPrice = "",
  onFilterChange,
  onCloseMobile,
}: ShopFilterSidebarProps) {
  const isPriceActive = (presetMin: string, presetMax: string) => {
    if (!presetMin && !presetMax) return !minPrice && !maxPrice;
    return minPrice === presetMin && maxPrice === presetMax;
  };

  const buildUrl = (newCat?: string, newMin?: string, newMax?: string) => {
    const params = new URLSearchParams();
    const cat = newCat !== undefined ? newCat : currentCategory;
    const s = currentSort;
    const min = newMin !== undefined ? newMin : minPrice;
    const max = newMax !== undefined ? newMax : maxPrice;

    if (cat && cat !== "all") params.set("category", cat);
    if (s && s !== "newest") params.set("sort", s);
    if (min) params.set("min_price", min);
    if (max) params.set("max_price", max);

    const queryString = params.toString();
    return `/shop${queryString ? `?${queryString}` : ""}`;
  };

  const handleCategoryClick = (e: React.MouseEvent, catSlug: string) => {
    if (onFilterChange) {
      e.preventDefault();
      onFilterChange(catSlug, minPrice, maxPrice);
      if (onCloseMobile) onCloseMobile();
    }
  };

  const handlePriceClick = (e: React.MouseEvent, min: string, max: string) => {
    if (onFilterChange) {
      e.preventDefault();
      onFilterChange(currentCategory, min, max);
      if (onCloseMobile) onCloseMobile();
    }
  };

  const handleResetClick = (e: React.MouseEvent) => {
    if (onFilterChange) {
      e.preventDefault();
      onFilterChange("all", "", "");
      if (onCloseMobile) onCloseMobile();
    }
  };

  // Clean and filter valid user-facing categories
  const displayCategories = categories.filter((cat) => {
    const slug = cat.slug.toLowerCase();
    const name = cat.name.toLowerCase();
    if (slug === "all-products" || name === "all products") return false;
    if (slug === "uncategorized" || name === "uncategorized") return false;
    if (slug.includes("%e0%a6") || slug === "taler-gur") return false;
    return true;
  });

  const hasActiveFilters = (currentCategory && currentCategory !== "all") || minPrice || maxPrice;

  return (
    <div className="space-y-6">
      {/* Mobile Header with Close button */}
      {onCloseMobile && (
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 lg:hidden">
          <div className="flex items-center gap-2 text-gray-900 font-black text-lg">
            <Filter className="w-5 h-5 text-brand-green" />
            <span>ফিল্টার নির্বাচন করুন</span>
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Active Filters Reset Bar */}
      {hasActiveFilters && (
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-black text-brand-dark">সক্রিয় ফিল্টারসমূহ</span>
            <Link
              href="/shop"
              onClick={handleResetClick}
              className="text-[11px] font-bold text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>রিসেট করুন</span>
            </Link>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {currentCategory && currentCategory !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-xs font-bold text-gray-800 shadow-2xs">
                <span>{CATEGORY_MAP[currentCategory] || currentCategory}</span>
                <Link
                  href={buildUrl("all")}
                  onClick={(e) => handleCategoryClick(e, "all")}
                  className="text-gray-400 hover:text-red-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </Link>
              </span>
            )}
            {(minPrice || maxPrice) && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-xs font-bold text-gray-800 shadow-2xs">
                <span>দাম: ৳{minPrice || 0} - ৳{maxPrice || "অসীম"}</span>
                <Link
                  href={buildUrl(undefined, "", "")}
                  onClick={(e) => handlePriceClick(e, "", "")}
                  className="text-gray-400 hover:text-red-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </Link>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Widget 1: Categories Filter */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
        <h3 className="text-sm font-black text-gray-950 pb-3 mb-3 border-b border-gray-100 flex items-center justify-between">
          <span>পণ্যের ক্যাটাগরি</span>
          <span className="text-xs font-semibold text-gray-400">{displayCategories.length} টি</span>
        </h3>

        <ul className="space-y-1">
          {/* All Products Option */}
          <li>
            <Link
              href={buildUrl("all")}
              onClick={(e) => handleCategoryClick(e, "all")}
              className={`flex items-center justify-between py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                currentCategory === "all"
                  ? "bg-brand-green text-white shadow-2xs"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                    currentCategory === "all"
                      ? "border-white bg-white text-brand-green"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {currentCategory === "all" && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>সকল পণ্য (All Products)</span>
              </div>
            </Link>
          </li>

          {/* Real WooCommerce Clean Categories */}
          {displayCategories.map((cat) => {
            const isActive = currentCategory.toLowerCase() === cat.slug.toLowerCase();
            return (
              <li key={cat.id}>
                <Link
                  href={buildUrl(cat.slug)}
                  onClick={(e) => handleCategoryClick(e, cat.slug)}
                  className={`flex items-center justify-between py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                    isActive
                      ? "bg-brand-green text-white shadow-2xs"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <div
                      className={`w-4 h-4 rounded-md border shrink-0 flex items-center justify-center ${
                        isActive
                          ? "border-white bg-white text-brand-green"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {isActive && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="truncate">{CATEGORY_MAP[cat.slug] || cat.name}</span>
                  </div>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full shrink-0 font-extrabold ${
                      isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {cat.count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Widget 2: Price Filter */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
        <h3 className="text-sm font-black text-gray-950 pb-3 mb-3 border-b border-gray-100">
          মূল্যের সীমা (Price Range)
        </h3>

        <ul className="space-y-1">
          {PRICE_PRESETS.map((preset, idx) => {
            const active = isPriceActive(preset.min, preset.max);
            return (
              <li key={idx}>
                <Link
                  href={buildUrl(undefined, preset.min, preset.max)}
                  onClick={(e) => handlePriceClick(e, preset.min, preset.max)}
                  className={`flex items-center justify-between py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                    active
                      ? "bg-emerald-50 text-brand-green border border-emerald-200"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        active
                          ? "border-brand-green bg-brand-green text-white"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span>{preset.label}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Widget 3: Trust & Support Sidebar Card */}
      <div className="bg-gradient-to-br from-[#062b1e] to-[#0a4731] rounded-2xl p-5 text-white shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-yellow" />
          <h4 className="text-sm font-black text-brand-yellow">কেন স্বাদের ভুবন?</h4>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">
          ১০০% খাঁটি ও নির্ভেজাল খাবার সরাসরি গ্রাম থেকে আপনার টেবিলে।
        </p>

        <div className="space-y-2.5 text-xs text-gray-200 pt-1">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-brand-yellow shrink-0" />
            <span>২৫০০৳+ অর্ডারে ফ্রি ডেলিভারি</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-yellow shrink-0" />
            <span>১০০% ক্যাশ অন ডেলিভারি</span>
          </div>
        </div>

        <div className="pt-3 border-t border-emerald-800/80">
          <p className="text-[11px] text-gray-400">অর্ডার সংক্রান্ত সহায়তা:</p>
          <a
            href={`tel:${siteConfig.contact.hotline}`}
            className="flex items-center gap-1.5 text-brand-yellow font-black text-sm hover:underline mt-0.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{siteConfig.contact.hotline}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
