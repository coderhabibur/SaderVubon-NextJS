"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, ShieldCheck, ArrowRight, Award } from "lucide-react";

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
    badge: "🥣 যশোরের ঐতিহ্যবাহী শীতের গুড়",
    titlePrimary: "শীতের পিঠা-পায়েসের আসল সুবাস",
    titleHighlight: "খাঁটি খেজুরের পাটালি ও ঝোলা গুড়",
    description: "কোনো প্রকার চিনি, হাইড্রোজ বা কেমিক্যাল ছাড়া মাটির চুলায় গাঢ় করা শতভাগ খাঁটি ও প্রাকৃতিক খেজুরের গুড়।",
    image: "https://sadervubon.com/wp-content/uploads/2025/12/combo-package-photo-min-scaled.jpg",
    imageTag: "TRADITIONAL KHEJUR GUR",
    imageTitle: "স্বাদে ও ঘ্রাণে অতুলনীয় সেরা খেজুরের গুড়",
    btnPrimaryText: "খেজুরের গুড় অর্ডার করুন",
    btnPrimaryLink: "/category/gur",
    btnSecondaryText: "সকল পণ্য দেখুন",
    btnSecondaryLink: "/shop",
  },
  {
    badge: "🌴 গ্রাম-বাংলার ঐতিহ্যবাহী মিষ্টি",
    titlePrimary: "অকৃত্রিম স্বাদ ও মনমাতানো ঘ্রাণ",
    titleHighlight: "প্রাকৃতিক খাঁটি তালের গুড়",
    description: "গাছের খাঁটি তালের রস কাঠের আগুনে ঘণ্টার পর ঘণ্টা জ্বাল দিয়ে প্রস্তুতকৃত নির্ভেজাল ও সুস্বাদু তালের পাটালি ও দানাদার গুড়।",
    image: "https://sadervubon.com/wp-content/uploads/2025/05/6fc90ced-cce5-4276-bbd3-46f4c1d87841.jpeg",
    imageTag: "AUTHENTIC TALER GUR",
    imageTitle: "গ্রামের আসল সুস্বাদু তালের গুড়",
    btnPrimaryText: "তালের গুড় কিনুন",
    btnPrimaryLink: "/category/taler-gur",
    btnSecondaryText: "সকল গুড় কালেকশন",
    btnSecondaryLink: "/category/gur",
  },
  {
    badge: "🥭 জিভে জল আনা স্পেশাল রেসিপি",
    titlePrimary: "টক-মিষ্টি-ঝাল ঘরোয়া স্বাদ",
    titleHighlight: "মুখরোচক আমসত্ত্বের আচার",
    description: "রোদে শুকানো খাঁটি আমসত্ত্ব, কাঠের ঘানির সরিষার তেল ও বাছাইকৃত পাঁচফোড়ন মসলায় তৈরি ঐতিহ্যবাহী ঘরোয়া আমসত্ত্বের আচার।",
    image: "https://sadervubon.com/wp-content/uploads/2025/08/DSC05987-scaled.jpg",
    imageTag: "AMSHOTTER ACHAR",
    imageTitle: "ঘরোয়া পরিবেশে রোদে শুকিয়ে তৈরি",
    btnPrimaryText: "আমসত্ত্ব আচার অর্ডার করুন",
    btnPrimaryLink: "/product/%e0%a6%86%e0%a6%ae%e0%a6%b8%e0%a6%a4%e0%a7%8d%e0%a6%ac-%e0%a6%86%e0%a6%9a%e0%a6%be%e0%a6%b0-%e0%a7%ab%e0%a7%a6%e0%a7%a6-%e0%a6%97%e0%a7%8d%e0%a6%b0%e0%a6%be%e0%a6%ae",
    btnSecondaryText: "সকল আচার দেখুন",
    btnSecondaryLink: "/category/pickle",
  },
  {
    badge: "🍯 সেরা সাশ্রয়ী প্যাকেজ",
    titlePrimary: "রোগ প্রতিরোধে প্রাকৃতিক মহৌষধ",
    titleHighlight: "খাঁটি মধু কম্বো প্যাকেজ (Honey Combo)",
    description: "সুন্দরবনের খলিসা, গরান ও কালোজিরা ফুলের ১০০% অপরিশোধিত ও খাঁটি চাকের মধুর বিশেষ সাশ্রয়ী কম্বো অফার।",
    image: "https://sadervubon.com/wp-content/uploads/2023/10/k-honey.jpg",
    imageTag: "HONEY COMBO PACK",
    imageTitle: "১০০% প্রাকৃতিক খাঁটি চাকভাঙা মধু কম্বো",
    btnPrimaryText: "মধু কম্বো কিনুন",
    btnPrimaryLink: "/category/offer",
    btnSecondaryText: "সকল মধু কালেকশন",
    btnSecondaryLink: "/category/honey",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (!isPaused) {
      slideInterval.current = setInterval(nextSlide, 6500);
    }
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [isPaused, current]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div
      className="relative overflow-hidden bg-gradient-to-b from-[#fbf9f4] via-[#f7f5ed] to-[#ffffff] pt-4 pb-8 sm:py-12 lg:py-16 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Decorative Luxury Abstract Background Blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none animate-blob" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none animate-blob animation-delay-2000" />
      <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-emerald-600/5 rounded-full blur-2xl pointer-events-none" />

      {/* Decorative Geometric Rings / Shapes */}
      <div className="absolute top-10 right-10 w-48 h-48 border border-amber-300/30 rounded-full pointer-events-none animate-float hidden xl:block" />
      <div className="absolute bottom-10 left-10 w-32 h-32 border-2 border-dashed border-emerald-300/40 rounded-full pointer-events-none animate-float-reverse hidden xl:block" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 grid-rows-1 items-center">
          {slides.map((slide, index) => {
            const isActive = index === current;
            return (
              <div
                key={index}
                style={{ gridArea: "1 / 1" }}
                className={`transition-all duration-700 ease-out w-full ${
                  isActive
                    ? "opacity-100 translate-x-0 pointer-events-auto z-10"
                    : "opacity-0 translate-x-8 pointer-events-none z-0 invisible"
                }`}
              >
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                  {/* Left Column: Text & CTAs */}
                  <div className="lg:col-span-7 flex flex-col justify-center text-left">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-emerald-200/90 text-emerald-800 text-xs sm:text-sm font-extrabold px-3.5 py-1.5 rounded-full shadow-xs w-max mb-3">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{slide.badge}</span>
                    </div>

                    {/* Headings */}
                    <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-[44px] font-black text-gray-900 leading-[1.25] tracking-tight mb-2">
                      {slide.titlePrimary} <br className="hidden sm:inline" />
                      <span className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-amber-600 bg-clip-text text-transparent">
                        {slide.titleHighlight}
                      </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xs sm:text-base md:text-lg text-gray-600 font-medium leading-relaxed mb-4 sm:mb-6 max-w-xl">
                      {slide.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-1">
                      <Link
                        href={slide.btnPrimaryLink}
                        className="group/btn relative overflow-hidden inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#063b23] via-[#0d6437] to-[#063b23] hover:from-[#09472b] hover:via-[#117641] hover:to-[#09472b] text-white font-extrabold text-xs sm:text-base px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.32),0_4px_12px_rgba(6,59,35,0.22)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_8px_20px_rgba(6,59,35,0.32)] border border-emerald-600/30 hover:border-emerald-400/50 hover:scale-[1.02] active:scale-95 transition-all duration-300"
                      >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                        <span>{slide.btnPrimaryText}</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>

                      <Link
                        href={slide.btnSecondaryLink}
                        className="inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-gray-800 hover:text-amber-600 font-extrabold text-xs sm:text-base px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl border border-gray-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95"
                      >
                        <span>{slide.btnSecondaryText}</span>
                      </Link>
                    </div>

                    {/* Small Trust Metrics */}
                    <div className="flex items-center gap-4 sm:gap-8 mt-5 sm:mt-7 pt-4 sm:pt-5 border-t border-gray-200/60 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center gap-1.5 font-bold text-gray-800">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>১০০% খাঁটি পণ্য</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-bold text-gray-800">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span>সেরা মান নিয়ন্ত্রণ</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-1.5 font-bold text-gray-800">
                        <span className="text-emerald-700 font-black">★ 4.9/5</span>
                        <span>গ্রাহক সন্তুষ্টি</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Hero Visual Card with Glowing Accent */}
                  <div className="lg:col-span-5 relative mt-4 lg:mt-0">
                    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[420px] aspect-[16/10] sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 group">
                      <Image
                        src={slide.image}
                        alt={slide.imageTitle}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 1024px) 100vw, 420px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Subtle Dark Gradient Overlay at Bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
                        <span className="inline-flex items-center gap-1 bg-amber-500 text-gray-950 text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider w-max mb-1.5 shadow-md">
                          {slide.imageTag}
                        </span>
                        <h4 className="text-sm sm:text-lg font-black leading-snug drop-shadow-sm">
                          {slide.imageTitle}
                        </h4>
                      </div>

                      {/* Floating Discount/Purity Tag */}
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-2xl shadow-lg border border-emerald-100 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-[11px] sm:text-xs font-black text-emerald-900">VERIFIED PURE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Arrows & Indicators */}
        <div className="flex items-center justify-between pt-6 sm:pt-8">
          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                aria-label={`স্লাইড ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  current === idx
                    ? "w-8 h-2.5 bg-gradient-to-r from-emerald-800 to-amber-500 shadow-sm"
                    : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="পূর্ববর্তী স্লাইড"
              className="w-10 h-10 rounded-full bg-white hover:bg-emerald-800 hover:text-white text-gray-700 border border-gray-200 shadow-sm flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-90"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="পরবর্তী স্লাইড"
              className="w-10 h-10 rounded-full bg-white hover:bg-emerald-800 hover:text-white text-gray-700 border border-gray-200 shadow-sm flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-90"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
