"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Loader2, ArrowRight, X, Sparkles } from "lucide-react";
import { LiveProduct } from "@/lib/woocommerce";

interface SearchAutocompleteProps {
  placeholder?: string;
  isMobile?: boolean;
}

export function SearchAutocomplete({
  placeholder = "Search honey, jaggery, mustard oil, pickles...",
  isMobile = false,
}: SearchAutocompleteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LiveProduct[]>([]);
  const [totalMatches, setTotalMatches] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch search results with debouncing
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setTotalMatches(0);
      setIsOpen(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/products?search=${encodeURIComponent(trimmed)}&per_page=5`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.products)) {
            setResults(data.products);
            setTotalMatches(data.total || data.products.length);
            setIsOpen(true);
          } else {
            setResults([]);
            setTotalMatches(0);
            setIsOpen(true);
          }
        }
      } catch (err) {
        console.error("Autocomplete fetch error:", err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  const handleSelectProduct = () => {
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className={`relative w-full ${isMobile ? "" : "max-w-2xl mx-auto"}`}>
      <form onSubmit={handleSubmit} className="w-full">
        <div
          className={`flex w-full border-2 rounded-full overflow-hidden bg-white shadow-xs transition-all ${
            isOpen
              ? "border-brand-green ring-2 ring-brand-green/20 shadow-md"
              : "border-brand-green hover:border-brand-green-hover focus-within:ring-2 focus-within:ring-brand-green/20 hover:shadow-md"
          }`}
        >
          {/* Category Pill (Desktop only) */}
          {!isMobile && (
            <div className="hidden sm:flex items-center gap-1.5 pl-5 pr-3.5 bg-gray-50/80 border-r border-gray-200 text-xs font-semibold text-gray-700 select-none">
              <span>All</span>
            </div>
          )}

          {/* Input field */}
          <div className="relative flex-1 flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                if (results.length > 0 && query.trim().length >= 2) {
                  setIsOpen(true);
                }
              }}
              placeholder={placeholder}
              className={`w-full text-gray-800 placeholder-gray-400 focus:outline-none ${
                isMobile ? "pl-4 pr-9 py-2 text-xs sm:text-sm" : "px-4 py-2.5 text-sm"
              }`}
            />

            {/* Loading or Clear icon inside input */}
            <div className="absolute right-3 flex items-center gap-1.5">
              {loading && <Loader2 className="w-4 h-4 animate-spin text-brand-green" />}
              {query && !loading && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-100 transition"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Search CTA button */}
          <button
            type="submit"
            className={`bg-brand-green hover:bg-brand-green-hover text-white font-bold tracking-wide transition flex items-center justify-center cursor-pointer active:scale-95 shrink-0 ${
              isMobile ? "px-4 text-xs" : "px-7 text-sm"
            }`}
          >
            <Search className={`${isMobile ? "w-3.5 h-3.5" : "w-4 h-4 mr-1.5"}`} />
            <span className={isMobile ? "hidden sm:inline" : ""}>Search</span>
          </button>
        </div>
      </form>

      {/* Dropdown Results Box */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
          {results.length > 0 ? (
            <div>
              {/* Dropdown Header */}
              <div className="px-4 py-2.5 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500 font-bold">
                <span className="flex items-center gap-1.5 text-gray-700">
                  <Sparkles className="w-3.5 h-3.5 text-brand-green" />
                  <span>Product Suggestions ({results.length})</span>
                </span>
                {totalMatches > results.length && (
                  <span className="text-gray-400">Total {totalMatches} products</span>
                )}
              </div>

              {/* Items List */}
              <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                {results.map((product) => {
                  const currentPrice = parseFloat(product.price || "0");
                  const regularPrice = parseFloat(product.regular_price || product.price || "0");
                  const hasDiscount = regularPrice > currentPrice;

                  return (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={handleSelectProduct}
                      className="flex items-center gap-3 p-3 hover:bg-emerald-50/40 transition group"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-50 border border-gray-200 shrink-0 group-hover:scale-105 transition-transform">
                        <Image
                          src={product.images[0]?.src || "/placeholder.jpg"}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-brand-green transition truncate">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-sm font-black text-gray-950">
                            ৳{currentPrice}
                          </span>
                          {hasDiscount && (
                            <span className="text-[11px] text-gray-400 line-through">
                              ৳{regularPrice}
                            </span>
                          )}
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
                            In Stock
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-green group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  );
                })}
              </div>

              {/* Dropdown Footer: See all results */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-3 px-4 bg-gray-50 hover:bg-emerald-50 text-brand-green hover:text-brand-green-hover text-xs font-black flex items-center justify-center gap-2 border-t border-gray-100 transition cursor-pointer"
              >
                <span>See all results for &ldquo;{query}&rdquo; ({totalMatches} products)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : !loading ? (
            /* No results state */
            <div className="p-6 text-center text-gray-500">
              <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-xs sm:text-sm font-bold text-gray-800 mb-1">
                No products found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-gray-400">
                Try searching with honey, jaggery, mustard oil, or pickles.
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
