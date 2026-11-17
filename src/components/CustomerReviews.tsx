"use client";

import { useRef, useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export function CustomerReviews() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const reviews = [
    {
      name: "মোহাম্মদ আরিফুর রহমান",
      location: "উত্তরা, ঢাকা",
      comment: "সুন্দরবনের চাকের মধুটা সত্যি অসাধারণ! এর আগে অনেক জায়গা থেকে নিয়েছি কিন্তু এমন প্রাকৃতিক সুবাস পাইনি। প্যাকেজিংও খুব প্রিমিয়াম ছিল।",
      rating: 5,
      product: "সুন্দরবনের কাঁচা মধু",
      date: "২ দিন আগে",
    },
    {
      name: "ফারহানা ইয়াসমিন",
      location: "ধানমন্ডি, ঢাকা",
      comment: "বরই আচার আর তেঁতুল আচারের স্বাদ একদম ছোটবেলার নানী-দাদীর হাতের রান্নার মতো। পুরো পরিবার ভীষণ পছন্দ করেছে। ধন্যবাদ স্বাদের ভুবন!",
      rating: 5,
      product: "বরই ও তেঁতুল আচার কম্বো",
      date: "১ সপ্তাহ আগে",
    },
    {
      name: "ইঞ্জিনিয়ার জহিরুল ইসলাম",
      location: "পাঁচলাইশ, চট্টগ্রাম",
      comment: "খেজুরের ঝোলা গুড় নিয়েছিলাম পিঠার জন্য। গুড়ের ঘ্রাণ আর স্বাদ ১০০% খাঁটি ছিল। সবচেয়ে ভালো লেগেছে ক্যাশ অন ডেলিভারিতে দ্রুত পেয়েছি।",
      rating: 5,
      product: "খেজুরের ঝোলা গুড়",
      date: "৩ দিন আগে",
    },
    {
      name: "ড. সামসুল আলম",
      location: "উপশহর, রাজশাহী",
      comment: "কাঠের ঘানির সরিষার তেল ও গাওয়া ঘির খাঁটি ঝাঁঝ ও ঘ্রাণ পেয়ে মুগ্ধ হয়েছি। নিয়মিত রান্নায় এখন কেবল স্বাদের ভুবনের তেলই ব্যবহার করি।",
      rating: 5,
      product: "ঘানির সরিষার তেল",
      date: "৪ দিন আগে",
    },
    {
      name: "তানজিলা সুলতানা",
      location: "মিরপুর-১০, ঢাকা",
      comment: "রসুনের আচারটি পেটের সমস্যার জন্য দারুণ উপকারী। স্বাদও খুব চমৎকার। অনলাইনে খাবারের ক্ষেত্রে এত বিশ্বস্ত পেজ সত্যিই বিরল।",
      rating: 5,
      product: "ঔষধি রসুনের আচার",
      date: "৫ দিন আগে",
    },
    {
      name: "মাহবুবুল হক",
      location: "জিন্দাবাজার, সিলেট",
      comment: "আমের সিজনে হিমসাগর আম অর্ডার করেছিলাম। একটি আমেও কোনো ফরমালিন বা দাগ ছিল না। এবার গুড় অর্ডার দিয়েছি, কোয়ালিটি সেরা!",
      rating: 5,
      product: "খেজুরের পাটালি গুড়",
      date: "২ সপ্তাহ আগে",
    },
  ];

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
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 360;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#f9f8f4] to-white relative overflow-hidden">
      {/* Decorative Blur Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-amber-400/5 blur-3xl pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-xs mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-extrabold text-emerald-800 tracking-wider uppercase">
                গ্রাহক মূল্যায়ন
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight font-heading">
              আমাদের সম্মানিত গ্রাহকদের মতামত
            </h2>
          </div>

          {/* Slider Arrow Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="পূর্ববর্তী রিভিউ"
              className={`w-11 h-11 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? "hover:bg-emerald-800 hover:text-white cursor-pointer active:scale-90"
                  : "opacity-40 cursor-default"
              }`}
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="পরবর্তী রিভিউ"
              className={`w-11 h-11 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? "hover:bg-emerald-800 hover:text-white cursor-pointer active:scale-90"
                  : "opacity-40 cursor-default"
              }`}
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={sliderRef}
          onScroll={checkScroll}
          className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth py-3 px-1 snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="shrink-0 w-[290px] sm:w-[350px] md:w-[380px] p-6 rounded-3xl bg-white border border-gray-200/90 hover:border-emerald-400 shadow-xs hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 flex flex-col justify-between snap-start relative group"
            >
              <div>
                {/* Quote Icon & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-emerald-100 group-hover:text-emerald-200 transition-colors" />
                </div>

                {/* Comment Text */}
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-gray-900 text-sm sm:text-base font-heading">
                      {rev.name}
                    </h4>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                  </div>
                  <span className="text-xs text-gray-500 block">
                    {rev.location}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  {rev.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
