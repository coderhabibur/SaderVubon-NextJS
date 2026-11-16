"use client";

import { useRef, useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

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
    <section className="bg-gradient-to-b from-amber-50/40 via-white to-emerald-50/30 py-14 border-t border-b border-gray-100 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-green uppercase tracking-wider block mb-1">
            গ্রাহক সন্তুষ্টি
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2">
            আমাদের গ্রাহকরা কী বলছেন?
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            দেশজুড়ে হাজারো সন্তুষ্ট পরিবার প্রতিনিয়ত বেছে নিচ্ছে স্বাদের ভুবনের খাঁটি পণ্য
          </p>
        </div>

        {/* Carousel Slider with Navigation Arrows */}
        <div className="relative group/reviews">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous Reviews"
            className={`absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-gray-800 shadow-xl border border-gray-100 flex items-center justify-center transition-all duration-300 ${
              canScrollLeft
                ? "hover:bg-brand-yellow hover:text-brand-dark opacity-90 hover:opacity-100 hover:scale-105 cursor-pointer"
                : "opacity-0 pointer-events-none cursor-default"
            }`}
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next Reviews"
            className={`absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-gray-800 shadow-xl border border-gray-100 flex items-center justify-center transition-all duration-300 ${
              canScrollRight
                ? "hover:bg-brand-yellow hover:text-brand-dark opacity-90 hover:opacity-100 hover:scale-105 cursor-pointer"
                : "opacity-0 pointer-events-none cursor-default"
            }`}
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Horizontal Scrollable Carousel Container */}
          <div
            ref={sliderRef}
            onScroll={checkScroll}
            className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar py-2 px-1 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="group relative shrink-0 w-[290px] sm:w-[350px] md:w-[380px] bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-brand-yellow transition-all duration-300 flex flex-col justify-between snap-start"
              >
                <Quote className="w-10 h-10 text-amber-200 absolute right-5 top-5 opacity-40 group-hover:opacity-80 transition-opacity" />

                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-3 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-gray-700 ml-1.5">৫.০</span>
                  </div>

                  {/* Comment Text */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
                    “{rev.comment}”
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{rev.name}</h4>
                    <p className="text-xs text-gray-500">{rev.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200 block mb-0.5">
                      {rev.product}
                    </span>
                    <span className="text-[10px] text-gray-400">{rev.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
