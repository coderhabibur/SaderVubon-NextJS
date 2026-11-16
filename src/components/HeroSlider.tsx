"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface HeroSlide {
  badge: string;
  titlePrimary: string;
  titleHighlight: string;
  description: string;
  image: string;
  imageTag: string;
  imageTitle: string;
  btnPrimaryText: string;
  btnPrimaryLink: string;
  btnSecondaryText: string;
  btnSecondaryLink: string;
}

const slides: HeroSlide[] = [
  {
    badge: "🌾 ১০০% ফ্রেশ ও কেমিক্যাল ফ্রি খাদ্য",
    titlePrimary: "খাঁটি স্বাদ ও স্বাস্থ্য",
    titleHighlight: "স্বাদের ভুবন-এ",
    description: "রাজশাহীর ঐতিহ্যবাহী খেজুরের গুড়, সুন্দরবনের চাকভাঙা মধু ও কাঠের ঘানির খাঁটি সরিষার তেল।",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=900&auto=format&fit=crop&q=80",
    imageTag: "PURE & ORGANIC",
    imageTitle: "সরাসরি মৌয়াল ও ঘানি থেকে সংগৃহীত",
    btnPrimaryText: "SHOP NOW",
    btnPrimaryLink: "#products",
    btnSecondaryText: "🔥 স্পেশাল অফার",
    btnSecondaryLink: "#combos",
  },
  {
    badge: "🍯 সুন্দরবনের প্রাকৃতিক চাকভাঙা মধু",
    titlePrimary: "প্রাকৃতিক অ্যান্টিঅক্সিডেন্ট",
    titleHighlight: "খাঁটি কাঁচা মধু",
    description: "সুন্দরবনের গভীর অরণ্য থেকে সংগৃহীত শতভাগ খাঁটি ও কাঁচা মধু, রোগ প্রতিরোধে অতুলনীয়।",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=900&auto=format&fit=crop&q=80",
    imageTag: "RAW & PURE",
    imageTitle: "১০০% প্রাকৃতিক ঔষধি গুণসম্পন্ন",
    btnPrimaryText: "মধু কিনুন",
    btnPrimaryLink: "#honey",
    btnSecondaryText: "কম্বো অফার",
    btnSecondaryLink: "#combos",
  },
  {
    badge: "🥣 রাজশাহীর ঐতিহ্যবাহী গুড়",
    titlePrimary: "শীতের আসল আমেজ",
    titleHighlight: "খেজুরের ঝোলা গুড়",
    description: "কোনো প্রকার চিনি বা হাইড্রোজ ছাড়াই মাটির চুলায় গাঢ় করা আসল দানাদার খেজুরের পাটালি ও ঝোলা গুড়।",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=900&auto=format&fit=crop&q=80",
    imageTag: "TRADITIONAL GUR",
    imageTitle: "সুঘ্রাণযুক্ত ও আসল স্বাদের নিশ্চয়তা",
    btnPrimaryText: "গুড় অর্ডার করুন",
    btnPrimaryLink: "#gur",
    btnSecondaryText: "সকল গুড় দেখুন",
    btnSecondaryLink: "#products",
  },
  {
    badge: "🫙 সম্পূর্ণ ঘরোয়া রেসিপিতে তৈরি",
    titlePrimary: "মুখরোচক খাঁটি স্বাদ",
    titleHighlight: "স্পেশাল আচার সম্ভার",
    description: "রোদে শুকানো বরই, খাঁটি সরিষার তেলে ভেজানো রসুন ও জিভে জল আনা তেঁতুলের ঘরোয়া আচার।",
    image: "https://sadervubon.com/wp-content/uploads/2026/07/boroi-.webp",
    imageTag: "HOMEMADE PICKLE",
    imageTitle: "কেমিক্যাল ও ভিনেগারমুক্ত নিরাপদ আচার",
    btnPrimaryText: "আচার কিনুন",
    btnPrimaryLink: "#pickle",
    btnSecondaryText: "কম্বো প্যাকেজ",
    btnSecondaryLink: "#combos",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto-play every 5 seconds (pauses on mouse hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full bg-[#f3ede4] overflow-hidden border-b border-gray-200 select-none"
    >
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        type="button"
        aria-label="Previous Slide"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-xl border border-gray-200 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
      </button>

      <button
        onClick={nextSlide}
        type="button"
        aria-label="Next Slide"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-xl border border-gray-200 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
      </button>

      {/* Smooth Sliding Track Container */}
      <div
        className="flex transition-transform duration-700 ease-out will-change-transform"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div key={idx} className="w-full shrink-0">
            <div className="container mx-auto px-4 sm:px-14 py-10 md:py-16 lg:py-20">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 min-h-[380px] lg:min-h-[440px]">
                {/* Left Text Area */}
                <div className="flex-1 max-w-2xl text-center lg:text-left">
                  {/* Badge */}
                  <div className="inline-block bg-white/95 border border-green-200 px-3.5 py-1 rounded-full mb-3 shadow-xs">
                    <span className="text-brand-green font-bold text-xs sm:text-sm">
                      {slide.badge}
                    </span>
                  </div>

                  {/* Compact, Clean Line Height */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.12] sm:leading-[1.16] tracking-tight mb-4">
                    <span className="block mb-1 sm:mb-2">{slide.titlePrimary}</span>
                    <span className="text-brand-green block">{slide.titleHighlight}</span>
                  </h1>

                  {/* Description */}
                  <p className="text-gray-700 text-sm sm:text-base lg:text-lg font-medium leading-relaxed mb-6 max-w-xl">
                    {slide.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                    <Link
                      href={slide.btnPrimaryLink}
                      className="bg-brand-green hover:bg-brand-green-hover text-white font-black px-7 sm:px-8 py-3 sm:py-3.5 rounded-xl shadow-lg transition text-xs sm:text-sm uppercase tracking-wider active:scale-95"
                    >
                      {slide.btnPrimaryText}
                    </Link>
                    <Link
                      href={slide.btnSecondaryLink}
                      className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-black px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl shadow-md transition text-xs sm:text-sm uppercase tracking-wider active:scale-95"
                    >
                      {slide.btnSecondaryText}
                    </Link>
                  </div>
                </div>

                {/* Right Image Card */}
                <div className="relative w-full max-w-md lg:max-w-lg h-64 sm:h-80 lg:h-[390px] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-200/90 group shrink-0">
                  <Image
                    src={slide.image}
                    alt={slide.titleHighlight}
                    fill
                    sizes="(max-width: 1024px) 100vw, 540px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority={idx === 0}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-7 text-white">
                    <span className="bg-brand-yellow text-brand-dark font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-2 w-max shadow-sm">
                      {slide.imageTag}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-black">
                      {slide.imageTitle}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Slide Dots */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              current === idx
                ? "w-8 sm:w-9 h-2.5 sm:h-3 bg-brand-green shadow-xs"
                : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-400/60 hover:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
