"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, X, RotateCcw, Filter, Sparkles, Truck, ShieldCheck, Phone, Scale, Palette, Sliders } from "lucide-react";
import { siteConfig } from "@/config/site";
import { AttributeFilterGroup } from "@/lib/woocommerce";

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface ShopFilterSidebarProps {
  categories: Category[];
  attributes?: AttributeFilterGroup[];
  currentCategory?: string;
  currentSort?: string;
  minPrice?: string;
  maxPrice?: string;
  currentAttribute?: string;
  currentAttributeTerm?: string;
  onFilterChange?: (
    category?: string,
    minPrice?: string,
    maxPrice?: string,
    attribute?: string,
    attributeTerm?: string
  ) => void;
  onCloseMobile?: () => void;
}

const CATEGORY_MAP: Record<string, string> = {
  all: "সকল পণ্য",
  gur: "খেজুর ও আখের গুড়",
  "taler-gur": "তালের গুড়",
  honey: "সুন্দরবনের মধু",
  oil: "ঘানির সরিষার তেল",
  pickle: "ঘরোয়া স্পেশাল আচার",
  mango: "রাজশাহীর আম",
  offer: "স্পেশাল অফার",
};

// Helper to convert Bengali numbers & weights into grams for perfect numeric sorting
function parseWeightToGrams(str: string): number {
  const bnToEnMap: Record<string, string> = {
    "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
    "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
  };
  const normalized = str.replace(/[০-৯]/g, (char) => bnToEnMap[char] || char);
  const numMatch = normalized.match(/[\d.]+/);
  const val = numMatch ? parseFloat(numMatch[0]) : 0;

  if (normalized.includes("গ্রাম") || normalized.toLowerCase().includes("gm")) {
    return val;
  }
  if (normalized.toLowerCase().includes("ml") || normalized.toLowerCase().includes("মিলি")) {
    return val;
  }
  if (normalized.includes("কেজি") || normalized.toLowerCase().includes("kg")) {
    return val * 1000;
  }
  return val;
}

export function ShopFilterSidebar({
  categories,
  attributes = [],
  currentCategory = "all",
  currentSort = "newest",
  minPrice = "",
  maxPrice = "",
  currentAttribute = "",
  currentAttributeTerm = "",
  onFilterChange,
  onCloseMobile,
}: ShopFilterSidebarProps) {
  // Extract and sort weight terms
  const weightGroup = attributes.find(
    (g) => g.name.includes("ওজন") || g.slug.includes("weight")
  );

  const sortedWeightTerms = weightGroup
    ? [...weightGroup.terms].sort((a, b) => parseWeightToGrams(a.name) - parseWeightToGrams(b.name))
    : [];

  const maxWeightIndex = Math.max(0, sortedWeightTerms.length - 1);

  // Local state for Min & Max Weight Sliders
  const [minWeightIdx, setMinWeightIdx] = useState<number>(0);
  const [maxWeightIdx, setMaxWeightIdx] = useState<number>(maxWeightIndex);
  const [weightActive, setWeightActive] = useState<boolean>(false);

  // Initialize from props if present
  useEffect(() => {
    if (currentAttributeTerm) {
      const termIds = currentAttributeTerm.split(",");
      const firstIdx = sortedWeightTerms.findIndex((t) => termIds.includes(String(t.id)));
      const lastIdx = sortedWeightTerms.findLastIndex
        ? sortedWeightTerms.findLastIndex((t) => termIds.includes(String(t.id)))
        : sortedWeightTerms.reduce((acc, t, idx) => (termIds.includes(String(t.id)) ? idx : acc), -1);

      if (firstIdx >= 0) {
        setMinWeightIdx(firstIdx);
        setMaxWeightIdx(lastIdx >= 0 ? lastIdx : firstIdx);
        setWeightActive(true);
      }
    } else {
      setMinWeightIdx(0);
      setMaxWeightIdx(maxWeightIndex);
      setWeightActive(false);
    }
  }, [currentAttributeTerm, sortedWeightTerms.length]);

  // Dual Price Slider state (localMinPrice, localMaxPrice)
  const DEFAULT_MAX_PRICE = 5000;
  const [localMinPrice, setLocalMinPrice] = useState<number>(Number(minPrice) || 0);
  const [localMaxPrice, setLocalMaxPrice] = useState<number>(
    maxPrice ? Number(maxPrice) : DEFAULT_MAX_PRICE
  );

  useEffect(() => {
    setLocalMinPrice(Number(minPrice) || 0);
    setLocalMaxPrice(maxPrice ? Number(maxPrice) : DEFAULT_MAX_PRICE);
  }, [minPrice, maxPrice]);

  const handleCategoryClick = (e: React.MouseEvent, catSlug: string) => {
    if (onFilterChange) {
      e.preventDefault();
      onFilterChange(catSlug, minPrice, maxPrice, currentAttribute, currentAttributeTerm);
      if (onCloseMobile) onCloseMobile();
    }
  };

  // Helper to apply weight range
  const triggerWeightRangeFilter = (minI: number, maxI: number) => {
    if (!weightGroup || !onFilterChange) return;

    // Collect all terms that fall between minI and maxI
    const inRangeTerms = sortedWeightTerms.slice(minI, maxI + 1);
    if (inRangeTerms.length > 0) {
      const termIds = inRangeTerms.map((t) => t.id).join(",");
      onFilterChange(currentCategory, minPrice, maxPrice, weightGroup.slug, termIds);
    }
  };

  const handleMinWeightChange = (newMin: number) => {
    const safeMin = Math.min(newMin, maxWeightIdx);
    setMinWeightIdx(safeMin);
    setWeightActive(true);
    triggerWeightRangeFilter(safeMin, maxWeightIdx);
  };

  const handleMaxWeightChange = (newMax: number) => {
    const safeMax = Math.max(newMax, minWeightIdx);
    setMaxWeightIdx(safeMax);
    setWeightActive(true);
    triggerWeightRangeFilter(minWeightIdx, safeMax);
  };

  const handleResetWeight = () => {
    setWeightActive(false);
    setMinWeightIdx(0);
    setMaxWeightIdx(maxWeightIndex);
    if (onFilterChange) {
      onFilterChange(currentCategory, minPrice, maxPrice, "", "");
    }
  };

  // Debounced Auto Apply for Price Slider (Live AJAX)
  useEffect(() => {
    // If prices changed from defaults or active values, trigger AJAX with debounce
    const timer = setTimeout(() => {
      const minStr = localMinPrice > 0 ? String(localMinPrice) : "";
      const maxStr = localMaxPrice < DEFAULT_MAX_PRICE ? String(localMaxPrice) : "";

      // Only trigger if actually changed compared to URL props
      if (minStr !== (minPrice || "") || maxStr !== (maxPrice || "")) {
        if (onFilterChange) {
          onFilterChange(currentCategory, minStr, maxStr, currentAttribute, currentAttributeTerm);
        }
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [localMinPrice, localMaxPrice]);

  const handleMinPriceChange = (newMin: number) => {
    const val = Math.min(newMin, localMaxPrice - 50);
    setLocalMinPrice(Math.max(0, val));
  };

  const handleMaxPriceChange = (newMax: number) => {
    const val = Math.max(newMax, localMinPrice + 50);
    setLocalMaxPrice(Math.min(DEFAULT_MAX_PRICE, val));
  };

  const handleResetPrice = () => {
    setLocalMinPrice(0);
    setLocalMaxPrice(DEFAULT_MAX_PRICE);
    if (onFilterChange) {
      onFilterChange(currentCategory, "", "", currentAttribute, currentAttributeTerm);
      if (onCloseMobile) onCloseMobile();
    }
  };

  const handleResetClick = (e: React.MouseEvent) => {
    if (onFilterChange) {
      e.preventDefault();
      setWeightActive(false);
      setMinWeightIdx(0);
      setMaxWeightIdx(maxWeightIndex);
      setLocalMinPrice(0);
      setLocalMaxPrice(DEFAULT_MAX_PRICE);
      onFilterChange("all", "", "", "", "");
      if (onCloseMobile) onCloseMobile();
    }
  };

  // Clean and filter valid user-facing categories
  const displayCategories = categories.filter((cat) => {
    const slug = cat.slug.toLowerCase();
    const name = cat.name.toLowerCase();
    if (slug === "all-products" || name === "all products") return false;
    if (slug === "uncategorized" || name === "uncategorized") return false;
    if (slug.includes("%e0%a6")) return false;
    return true;
  });

  const hasActiveFilters =
    (currentCategory && currentCategory !== "all") ||
    minPrice ||
    maxPrice ||
    currentAttributeTerm;

  // Active Weight label display
  let activeWeightLabel = "";
  if (weightActive && sortedWeightTerms.length > 0) {
    const minName = sortedWeightTerms[minWeightIdx]?.name;
    const maxName = sortedWeightTerms[maxWeightIdx]?.name;
    activeWeightLabel = minName === maxName ? minName : `${minName} — ${maxName}`;
  }

  // Weight Percentage calculation for progress bar
  const weightMinPercent = maxWeightIndex > 0 ? (minWeightIdx / maxWeightIndex) * 100 : 0;
  const weightMaxPercent = maxWeightIndex > 0 ? (maxWeightIdx / maxWeightIndex) * 100 : 100;

  // Price Percentage calculation for progress bar
  const priceMinPercent = (localMinPrice / DEFAULT_MAX_PRICE) * 100;
  const priceMaxPercent = (localMaxPrice / DEFAULT_MAX_PRICE) * 100;

  return (
    <div className="space-y-6">
      {/* Mobile Header with Close button */}
      {onCloseMobile && (
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 lg:hidden">
          <div className="flex items-center gap-2 text-gray-900 font-black text-lg font-heading">
            <Filter className="w-5 h-5 text-emerald-800" />
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
        <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-black text-emerald-950 font-heading">সক্রিয় ফিল্টারসমূহ</span>
            <Link
              href="/shop"
              onClick={handleResetClick}
              className="text-[11px] font-bold text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
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
                  href="/shop"
                  onClick={(e) => handleCategoryClick(e, "all")}
                  className="text-gray-400 hover:text-rose-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </Link>
              </span>
            )}
            {(minPrice || maxPrice) && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-xs font-bold text-gray-800 shadow-2xs">
                <span>দাম: ৳{minPrice || 0} - ৳{maxPrice || DEFAULT_MAX_PRICE}</span>
                <Link
                  href="/shop"
                  onClick={(e) => {
                    e.preventDefault();
                    handleResetPrice();
                  }}
                  className="text-gray-400 hover:text-rose-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </Link>
              </span>
            )}
            {activeWeightLabel && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-xs font-bold text-gray-800 shadow-2xs">
                <span>ওজন: {activeWeightLabel}</span>
                <Link
                  href="/shop"
                  onClick={(e) => {
                    e.preventDefault();
                    handleResetWeight();
                  }}
                  className="text-gray-400 hover:text-rose-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </Link>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Widget 1: Categories */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-xs">
        <h3 className="text-sm font-black text-gray-950 pb-3 mb-3 border-b border-gray-100 flex items-center justify-between font-heading">
          <span>পণ্যের ক্যাটাগরি</span>
          <span className="text-xs text-gray-400 font-bold">{displayCategories.length} টি</span>
        </h3>

        <ul className="space-y-1">
          <li>
            <Link
              href="/shop"
              onClick={(e) => handleCategoryClick(e, "all")}
              className={`flex items-center justify-between py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                currentCategory === "all"
                  ? "bg-emerald-800 text-white shadow-2xs"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                    currentCategory === "all"
                      ? "border-white bg-white text-emerald-800"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {currentCategory === "all" && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>সকল পণ্য (All Products)</span>
              </div>
            </Link>
          </li>

          {displayCategories.map((cat) => {
            const isActive = currentCategory.toLowerCase() === cat.slug.toLowerCase();
            return (
              <li key={cat.id}>
                <Link
                  href={`/shop?category=${cat.slug}`}
                  onClick={(e) => handleCategoryClick(e, cat.slug)}
                  className={`flex items-center justify-between py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                    isActive
                      ? "bg-emerald-800 text-white shadow-2xs"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <div
                      className={`w-4 h-4 rounded-md border shrink-0 flex items-center justify-center ${
                        isActive
                          ? "border-white bg-white text-emerald-800"
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

      {/* Widget 2: Dual Weight Range Slider (নূন্যতম ও সর্বোচ্চ ওজন স্লাইডার) */}
      {sortedWeightTerms.length > 0 && weightGroup && (
        <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-sm font-black text-gray-950 flex items-center gap-2 font-heading">
              <Scale className="w-4 h-4 text-emerald-700" />
              <span>ওজন নির্বাচন (Weight Range)</span>
            </h3>
            {weightActive && (
              <button
                type="button"
                onClick={handleResetWeight}
                className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
              >
                রিসেট
              </button>
            )}
          </div>

          {/* Min & Max Display Boxes */}
          <div className="flex items-center justify-between gap-3 text-xs">
            <div className="flex-1 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-2.5 text-center">
              <span className="text-[10px] text-gray-500 block">নূন্যতম ওজন</span>
              <span className="font-black text-emerald-950 text-sm font-heading">
                {sortedWeightTerms[minWeightIdx]?.name || "প্রথম"}
              </span>
            </div>
            <span className="text-gray-400 font-bold">—</span>
            <div className="flex-1 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-2.5 text-center">
              <span className="text-[10px] text-gray-500 block">সর্বোচ্চ ওজন</span>
              <span className="font-black text-emerald-950 text-sm font-heading">
                {sortedWeightTerms[maxWeightIdx]?.name || "শেষ"}
              </span>
            </div>
          </div>

          {/* Dual Range Sliders with Colored Active Track */}
          <div className="relative h-6 flex items-center px-1 my-2">
            {/* Background Track */}
            <div className="w-full h-2 bg-gray-200 rounded-full relative overflow-hidden">
              {/* Active Green Track between Min and Max */}
              <div
                className="absolute h-full bg-emerald-800 rounded-full transition-all duration-75"
                style={{
                  left: `${weightMinPercent}%`,
                  width: `${Math.max(0, weightMaxPercent - weightMinPercent)}%`,
                }}
              />
            </div>

            {/* Min Range Slider Thumb (higher z-index when close to 0) */}
            <input
              type="range"
              min="0"
              max={maxWeightIndex}
              step="1"
              value={minWeightIdx}
              onChange={(e) => handleMinWeightChange(Number(e.target.value))}
              className="dual-range-slider"
              style={{ zIndex: minWeightIdx > maxWeightIndex - 2 ? 40 : 25 }}
              aria-label="Minimum weight slider"
            />

            {/* Max Range Slider Thumb */}
            <input
              type="range"
              min="0"
              max={maxWeightIndex}
              step="1"
              value={maxWeightIdx}
              onChange={(e) => handleMaxWeightChange(Number(e.target.value))}
              className="dual-range-slider"
              style={{ zIndex: 30 }}
              aria-label="Maximum weight slider"
            />
          </div>

          {/* Min & Max Labels */}
          <div className="flex justify-between items-center text-[11px] font-bold text-gray-400 pt-1">
            <span>{sortedWeightTerms[0]?.name}</span>
            <span className="text-emerald-700">উভয় বাটনে স্লাইড করুন ⇄</span>
            <span>{sortedWeightTerms[maxWeightIndex]?.name}</span>
          </div>
        </div>
      )}

      {/* Widget 3: Dual Price Range Slider (নূন্যতম ও সর্বোচ্চ মূল্য স্লাইডার) */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-sm font-black text-gray-950 flex items-center gap-2 font-heading">
            <Sliders className="w-4 h-4 text-emerald-700" />
            <span>মূল্যের সীমা (Price Slider)</span>
          </h3>
          {(minPrice || maxPrice) && (
            <button
              type="button"
              onClick={handleResetPrice}
              className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
            >
              রিসেট
            </button>
          )}
        </div>

        {/* Dynamic Display of Range Values */}
        <div className="flex items-center justify-between gap-3 text-xs">
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl p-2.5 text-center">
            <span className="text-[10px] text-gray-400 block">নূন্যতম মূল্য</span>
            <span className="font-black text-gray-900 text-sm">৳{localMinPrice}</span>
          </div>
          <span className="text-gray-400 font-bold">—</span>
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl p-2.5 text-center">
            <span className="text-[10px] text-gray-400 block">সর্বোচ্চ মূল্য</span>
            <span className="font-black text-gray-900 text-sm">৳{localMaxPrice}</span>
          </div>
        </div>

        {/* Dual Price Sliders with Colored Active Track */}
        <div className="relative h-6 flex items-center px-1 my-2">
          {/* Background Track */}
          <div className="w-full h-2 bg-gray-200 rounded-full relative overflow-hidden">
            {/* Active Green Track between Min and Max Price */}
            <div
              className="absolute h-full bg-emerald-800 rounded-full transition-all duration-75"
              style={{
                left: `${priceMinPercent}%`,
                width: `${Math.max(0, priceMaxPercent - priceMinPercent)}%`,
              }}
            />
          </div>

          {/* Min Price Slider Thumb */}
          <input
            type="range"
            min="0"
            max={DEFAULT_MAX_PRICE}
            step="50"
            value={localMinPrice}
            onChange={(e) => handleMinPriceChange(Number(e.target.value))}
            className="dual-range-slider"
            style={{ zIndex: localMinPrice > DEFAULT_MAX_PRICE - 200 ? 40 : 25 }}
            aria-label="Minimum price slider"
          />

          {/* Max Price Slider Thumb */}
          <input
            type="range"
            min="0"
            max={DEFAULT_MAX_PRICE}
            step="50"
            value={localMaxPrice}
            onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
            className="dual-range-slider"
            style={{ zIndex: 30 }}
            aria-label="Maximum price slider"
          />
        </div>

        <div className="flex justify-between items-center text-[11px] font-bold text-gray-400 pt-1">
          <span>৳০</span>
          <span className="text-emerald-700">উভয় বাটনে স্লাইড করুন ⇄</span>
          <span>৳{DEFAULT_MAX_PRICE}+</span>
        </div>
      </div>

      {/* Widget 4: Trust & Support Sidebar Card */}
      <div className="bg-gradient-to-br from-[#042418] via-[#063b27] to-[#042418] rounded-3xl p-5 text-white shadow-xs space-y-4 border border-emerald-800/40">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h4 className="text-sm font-black text-amber-300 font-heading">কেন স্বাদের ভুবন?</h4>
        </div>
        <p className="text-xs text-emerald-100/80 leading-relaxed font-sans">
          ১০০% খাঁটি ও নির্ভেজাল খাবার সরাসরি গ্রাম থেকে আপনার টেবিলে।
        </p>

        <div className="space-y-2.5 text-xs text-emerald-100 pt-1">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>২৫০০৳+ অর্ডারে ফ্রি ডেলিভারি</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>১০০% ক্যাশ অন ডেলিভারি</span>
          </div>
        </div>

        <div className="pt-3 border-t border-emerald-800/80">
          <p className="text-[11px] text-emerald-300/80">অর্ডার সংক্রান্ত সহায়তা:</p>
          <a
            href={`tel:${siteConfig.contact.hotline}`}
            className="flex items-center gap-1.5 text-amber-400 font-black text-sm hover:underline mt-0.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{siteConfig.contact.hotline}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
