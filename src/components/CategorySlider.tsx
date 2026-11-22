"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

export interface CategoryItem {
  name: string;
  englishName?: string;
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
        aria-label="পূর্ববর্তী ক্যাটাগরি"
        className={`absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md text-emerald-900 shadow-xl border border-emerald-100 flex items-center justify-center transition-all duration-300 ${
          canScrollLeft
            ? "hover:bg-emerald-800 hover:text-white hover:scale-110 cursor-pointer"
            : "opacity-0 pointer-events-none cursor-default"
        }`}
      >
        <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        aria-label="পরবর্তী ক্যাটাগরি"
        className={`absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md text-emerald-900 shadow-xl border border-emerald-100 flex items-center justify-center transition-all duration-300 ${
          canScrollRight
            ? "hover:bg-emerald-800 hover:text-white hover:scale-110 cursor-pointer"
            : "opacity-0 pointer-events-none cursor-default"
        }`}
      >
        <ChevronRight className="w-6 h-6 stroke-[2.5]" />
      </button>

      {/* Scrollable Container */}
      <div
        ref={sliderRef}
        onScroll={checkScroll}
        className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth py-3 px-1 snap-x snap-mandatory no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            href={cat.link}
            prefetch={true}
            className="group relative shrink-0 w-[180px] sm:w-[220px] md:w-[240px] h-[280px] sm:h-[300px] rounded-3xl overflow-hidden border border-emerald-900/10 shadow-xs hover:shadow-2xl transition-all duration-500 flex flex-col justify-between snap-start"
          >
            {/* Background Image with Zoom */}
            <div className="absolute inset-0 z-0">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 240px"
                className="object-cover group-hover:scale-112 transition-transform duration-700 ease-out"
              />
              {/* Dynamic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#042418]/90 via-[#042418]/30 to-transparent group-hover:from-[#042418]/95 transition-all duration-300" />
            </div>

            {/* Top Pill / Item Count */}
            <div className="relative z-10 p-4 flex justify-between items-center">
              <span className="bg-white/90 backdrop-blur-md text-emerald-900 text-[11px] font-black px-3 py-1 rounded-full shadow-xs">
                {cat.itemCount}
              </span>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 p-5 transform group-hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-xl font-black text-white leading-tight font-heading group-hover:text-amber-300 transition-colors">
                {cat.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
