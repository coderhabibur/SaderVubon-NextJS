"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export interface CategoryItem {
  name: string;
  englishName: string;
  itemCount: string;
  image: string;
  link: string;
}

interface CategorySliderProps {
  categories: CategoryItem[];
}

export function CategorySlider({ categories }: CategorySliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [categories]);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 320;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative group/slider">
      {/* Left Arrow Button */}
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        aria-label="Previous Categories"
        className={`absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-gray-800 shadow-xl border border-gray-100 flex items-center justify-center transition-all duration-300 ${
          canScrollLeft
            ? "hover:bg-brand-yellow hover:text-brand-dark opacity-90 hover:opacity-100 hover:scale-105 cursor-pointer"
            : "opacity-0 pointer-events-none cursor-default"
        }`}
      >
        <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        aria-label="Next Categories"
        className={`absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-gray-800 shadow-xl border border-gray-100 flex items-center justify-center transition-all duration-300 ${
          canScrollRight
            ? "hover:bg-brand-yellow hover:text-brand-dark opacity-90 hover:opacity-100 hover:scale-105 cursor-pointer"
            : "opacity-0 pointer-events-none cursor-default"
        }`}
      >
        <ChevronRight className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* Scrollable Container with Smooth Native Snapping */}
      <div
        ref={sliderRef}
        onScroll={checkScroll}
        className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth no-scrollbar py-2 px-1 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            href={cat.link}
            className="group relative shrink-0 w-[175px] sm:w-[210px] md:w-[230px] h-[260px] sm:h-[280px] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-xl hover:border-brand-yellow transition-all duration-300 flex flex-col justify-between snap-start"
          >
            {/* Background Image with Zoom */}
            <div className="absolute inset-0 z-0">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 175px, (max-width: 1024px) 210px, 230px"
                className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-95"
              />
              {/* Gradient Overlay for high text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/15 group-hover:from-black/95 transition-all duration-300"></div>
            </div>

            {/* Top Category Badge */}
            <div className="relative z-10 p-3 flex justify-between items-start">
              <span className="bg-white/90 backdrop-blur-xs text-gray-800 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                {cat.englishName}
              </span>
            </div>

            {/* Bottom Title & Details */}
            <div className="relative z-10 p-3.5 text-white">
              <h3 className="font-extrabold text-sm sm:text-base leading-snug group-hover:text-brand-yellow transition-colors mb-1">
                {cat.name}
              </h3>
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>{cat.itemCount}</span>
                <span className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-brand-yellow group-hover:text-brand-dark flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
