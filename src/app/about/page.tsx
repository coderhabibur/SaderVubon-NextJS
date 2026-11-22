import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  HeartHandshake,
  Sprout,
  Award,
  Phone,
  CheckCircle2,
  Truck,
  Star,
  ArrowRight,
  Sparkles,
  MapPin,
  Mail,
  ShoppingBag,
  Leaf,
  Users,
  Flame,
  Check,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে | স্বাদের ভুবন (Sader Vubon)",
  description:
    "জানুন স্বাদের ভুবনের গল্প, উদ্দেশ্য ও অঙ্গীকার। গ্রাম-বাংলার বিশ্বস্ত কৃষক ও গাছিদের কাছ থেকে ১০০% নির্ভেজাল ও প্রাকৃতিক খাদ্য উপাদান সরাসরি আপনার দোরগোড়ায়।",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: "আমাদের সম্পর্কে | স্বাদের ভুবন (Sader Vubon)",
    description:
      "গ্রাম-বাংলার বিশ্বস্ত কৃষক ও গাছিদের কাছ থেকে ১০০% নির্ভেজাল ও প্রাকৃতিক খাদ্য উপাদান।",
    url: `${siteConfig.url}/about`,
    type: "website",
    images: [
      {
        url: "/images/hero-gur-farmer.jpg",
        width: 1200,
        height: 800,
        alt: "স্বাদের ভুবন - কৃষক ও গাছিদের খাঁটি খাদ্য",
      },
    ],
  },
};

export default function AboutPage() {
  const metrics = [
    {
      value: "১০,০০০+",
      label: "সন্তুষ্ট পরিবার",
      englishLabel: "Happy Families",
      icon: Users,
      color: "text-brand-green",
      bg: "bg-emerald-50",
    },
    {
      value: "১০০%",
      label: "খাঁটি ও প্রাকৃতিক",
      englishLabel: "Pure & Organic",
      icon: ShieldCheck,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      value: "৬৪ জেলায়",
      label: "দ্রুত হোম ডেলিভারি",
      englishLabel: "Nationwide Delivery",
      icon: Truck,
      color: "text-emerald-700",
      bg: "bg-emerald-50",
    },
    {
      value: "৪.৯ / ৫",
      label: "গ্রাহক সন্তুষ্টি রেটিং",
      englishLabel: "Customer Rating",
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-50",
      hasStarIcon: true,
    },
  ];

  const coreValues = [
    {
      title: "সরাসরি মাঠ ও গাছিদের থেকে সংগ্রহ",
      englishTitle: "Direct Farm Sourcing",
      description:
        "কোনো মধ্যস্বত্বভোগী বা সিন্ডিকেট নয়। আমরা সুন্দরবনের মৌয়াল এবং রাজশাহী-যশোরের দক্ষ গাছিদের সাথে সরাসরি কাজ করি, যাতে খাঁটি পণ্য নিশ্চিত হয় এবং কৃষকরা ন্যায্য পারিশ্রমিক পান।",
      icon: Sprout,
    },
    {
      title: "শতভাগ কেমিক্যাল ও ভেজালমুক্ত",
      englishTitle: "Zero Chemical Guarantee",
      description:
        "কৃত্রিম রঙ, প্রিজারভেটিভ, চিনি বা হাইড্রোজের কোনো স্থান স্বাদের ভুবনে নেই। প্রতিটি পণ্য প্রাকৃতিক উপাদান ও আদি পদ্ধতিতে প্রস্তুত, যা সম্পূর্ণ নিরাপদ ও স্বাস্থ্যসম্মত।",
      icon: ShieldCheck,
    },
    {
      title: "ঐতিহ্যবাহী প্রস্তুতপ্রণালী",
      englishTitle: "Traditional Craftsmanship",
      description:
        "মাটির চুলায় খেজুরের রস জ্বালানো, কাঠের ঘানিতে খাঁটি সরিষা পেষা কিংবা সনাতন রেসিপিতে রোদে শুকিয়ে আচার তৈরি — প্রতিটি পদক্ষেপে বজায় রাখা হয় আসল স্বাদ ও পুষ্টিগুণ।",
      icon: Flame,
    },
    {
      title: "গ্রাহক সন্তুষ্টি ও শতভাগ নিরাপত্তা",
      englishTitle: "Customer-First Policy",
      description:
        "অগ্রিম পেমেন্ট ছাড়াই সারা দেশে ক্যাশ অন ডেলিভারি সুবিধা। ডেলিভারিম্যানের সামনে পার্সেল খুলে দেখে নিশ্চিত হয়ে মূল্য পরিশোধের সুযোগ ও সার্বক্ষণিক সহায়তা।",
      icon: HeartHandshake,
    },
  ];

  const qualitySteps = [
    {
      step: "০১",
      title: "উৎসের সততা যাচাই",
      description:
        "প্রকৃতি ও মাটির সংস্পর্শে থাকা বিশ্বস্ত চাষী ও গাছিদের চিহ্নিত করে সরাসরি তাদের সাথে চুক্তি করা হয়।",
    },
    {
      step: "০২",
      title: "সনাতন ও প্রাকৃতিক প্রক্রিয়াজাতকরণ",
      description:
        "কোনো রাসায়নিক প্রসেসিং ছাড়াই প্রাচীন পদ্ধতিতে রস থেকে গুড়, ঘানি থেকে তেল ও রোদে শুকিয়ে আচার প্রস্তুত হয়।",
    },
    {
      step: "০৩",
      title: "কঠোর মান ও হাইজিন নিশ্চিতকরণ",
      description:
        "প্রতিটি ব্যাচ প্যাকিংয়ের আগে স্বাদ, গন্ধ ও গুণগত মান নিবিড়ভাবে পরীক্ষা করা হয় এবং নিরাপদ পাত্রে সিল করা হয়।",
    },
    {
      step: "০৪",
      title: "দ্রুত ও নিরাপদ ডেলিভারি",
      description:
        "সারা দেশের গ্রাহকদের ঠিকানায় সর্বোচ্চ সুরক্ষায় প্যাকেটজাত খাবার পৌঁছে দেওয়া হয় মাত্র ২-৩ কার্যদিবসে।",
    },
  ];

  const categories = [
    {
      name: "খাঁটি খেজুরের গুড়",
      sub: "দানাদার, পাটালি ও ঝোলা গুড়",
      link: "/category/gur",
    },
    {
      name: "সুন্দরবনের খাঁটি মধু",
      sub: "প্রাকৃতিক চাকভাঙা অপরিশোধিত মধু",
      link: "/category/honey",
    },
    {
      name: "ঘানির সরিষার তেল",
      sub: "কাঠের ঘানিতে ভাঙা খাঁটি ঝাঁঝ",
      link: "/category/oil",
    },
    {
      name: "ঘরোয়া মুখরোচক আচার",
      sub: "আম, বরই, তেঁতুল ও রসুনের আচার",
      link: "/category/pickle",
    },
  ];

  return (
    <div className="bg-[#fcfbf7] min-h-screen py-6 sm:py-12">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-brand-green transition">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">আমাদের সম্পর্কে</span>
        </nav>

        {/* HERO SECTION */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#042618] via-[#063d27] to-[#031d13] text-white p-6 sm:p-10 lg:p-14 shadow-luxury mb-12 border border-emerald-900/40">
          {/* Subtle Ambient Background Orbs */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 translate-y-12 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Left Content Column (order-2 on mobile, order-1 on desktop) */}
            <div className="lg:col-span-6 space-y-5 text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-bold tracking-wide">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>প্রকৃতির বিশুদ্ধতা ও ঐতিহ্যের অঙ্গীকার</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-heading">
                গ্রাম-বাংলার খাঁটি স্বাদ নিয়ে আপনার পরিবারের সুস্থতায়{" "}
                <span className="text-amber-400">স্বাদের ভুবন</span>
              </h1>

              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                আমরা বিশ্বাস করি, সুস্থ জীবনের শুরু খাঁটি খাবারে। ভেজাল ও রাসায়নিকের যুগে
                স্বাদের ভুবন পৌঁছে দিচ্ছে সরাসরি কৃষক ও দক্ষ গাছিদের হাতে তৈরি ১০০%
                প্রাকৃতিক, ভেজালমুক্ত এবং নিরাপদ খাদ্য উপাদান।
              </p>

              {/* Trust Checkpoints */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm text-emerald-50 font-medium">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>কোনো চিনি, হাইড্রোজ বা কেমিক্যাল নেই</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>সরাসরি কৃষক ও গাছিদের থেকে সংগৃহীত</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>দেখে নেওয়ার সুবিধাসহ ক্যাশ অন ডেলিভারি</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>সারা দেশে ৬৪ জেলায় দ্রুততম হোম ডেলিভারি</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-4">
                <Link
                  href="/shop"
                  className="bg-brand-yellow hover:bg-brand-yellow-hover text-gray-950 font-black px-6 sm:px-8 py-3.5 rounded-xl shadow-glow-gold transition flex items-center gap-2 text-sm sm:text-base active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>পণ্যসমূহ দেখুন</span>
                </Link>
                <a
                  href={`tel:${siteConfig.contact.hotline}`}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 sm:px-6 py-3.5 rounded-xl border border-white/20 transition flex items-center gap-2 text-sm sm:text-base backdrop-blur-sm"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>হটলাইন: {siteConfig.contact.hotline}</span>
                </a>
              </div>
            </div>

            {/* Right Image Column (order-1 on mobile so image appears first, order-2 on desktop) */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-full max-w-[540px] lg:max-w-[580px] xl:max-w-[620px] group">
                {/* Glowing Luxury Ambient Aura */}
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-amber-400/30 via-emerald-400/25 to-amber-500/10 blur-xl -z-10 group-hover:scale-105 transition-transform duration-700" />

                {/* Main Image Frame - Prominent, High-Resolution & Clear */}
                <div className="relative overflow-hidden rounded-3xl border-4 border-amber-400/40 shadow-2xl bg-emerald-950/70 aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3.2] min-h-[280px] sm:min-h-[400px] lg:min-h-[460px]">
                  <Image
                    src="/images/hero-gur-farmer.jpg"
                    alt="স্বাদের ভুবনের দক্ষ গাছি ও খাঁটি গুড় তৈরির দৃশ্য"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 620px"
                    className="object-cover object-center transform group-hover:scale-105 transition duration-700 ease-out"
                  />

                  {/* Floating Clean Top-Right Badge (Compact on mobile) */}
                  <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-amber-400 text-gray-950 font-black text-[10px] sm:text-xs px-2 sm:px-3.5 py-0.5 sm:py-1.5 rounded-full shadow-md border border-amber-200/80 flex items-center gap-1 sm:gap-1.5 z-10">
                    <Leaf className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-gray-950" />
                    <span>১০০% ন্যাচারাল গ্যারান্টি</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* METRICS / STATS STRIP */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 mb-12 sm:mb-16">
          {metrics.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition text-center group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <p className={`text-2xl sm:text-3xl font-black ${item.color} font-heading`}>
                  {item.value}
                </p>
                <p className="text-xs sm:text-sm font-bold text-gray-800 mt-1">
                  {item.label}
                </p>
                <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                  {item.englishLabel}
                </p>
              </div>
            );
          })}
        </div>

        {/* OUR STORY & JOURNEY */}
        <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-10 lg:p-14 shadow-xs mb-12 sm:mb-16">
          <div className="max-w-3xl mb-8">
            <span className="text-brand-green font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100">
              আমাদের গল্প ও পথচলা
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 mt-3 font-heading">
              কীভাবে শুরু হলো স্বাদের ভুবনের এই ভালোবাসার যাত্রা?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center text-gray-700 text-sm sm:text-base leading-relaxed">
            <div className="space-y-4">
              <p>
                বর্তমান যান্ত্রিক যুগে বাজার যখন কৃত্রিম রঙ, অতিরিক্ত চিনি, কেমিক্যাল প্রিজারভেটিভ
                এবং ভেজালে সয়লাব, তখন পরিবার ও সন্তানের মুখে এক মুঠো নিরাপদ ও খাঁটি খাবার তুলে
                দেওয়া যেন এক কঠিন চ্যালেঞ্জ।
              </p>
              <p>
                সেই দায়বদ্ধতা এবং নিজ পরিবারের জন্য খাঁটি খাবার খোঁজার তাড়না থেকেই জন্ম নিয়েছে{" "}
                <strong className="text-brand-green font-black">স্বাদের ভুবন (Sader Vubon)</strong>।
                আমাদের লক্ষ্য অত্যন্ত সুস্পষ্ট — মধ্যস্বত্বভোগীদের দৌরাত্ম্য এড়িয়ে প্রত্যন্ত
                গ্রামাঞ্চলের নিবেদিতপ্রাণ চাষী, অভিজ্ঞ গাছি ও মৌয়ালদের সরাসরি যুক্ত করে প্রকৃতির
                অনাবিল স্বাদ মানুষের ঘরে ঘরে পৌঁছে দেওয়া।
              </p>
              <div className="bg-amber-50/70 border-l-4 border-amber-500 p-4 rounded-r-2xl text-gray-800 text-sm italic">
                “খাবারের বিশুদ্ধতায় কোনো আপস নয় — আমাদের প্রতিটি পণ্য এমনভাবে তৈরি ও নির্বাচিত হয়,
                যা আমরা নির্দ্বিধায় আমাদের নিজেদের পরিবারের জন্য ব্যবহার করি।”
              </div>
            </div>

            <div className="space-y-4 bg-gray-50/80 rounded-2xl p-6 sm:p-8 border border-gray-100">
              <h3 className="text-lg sm:text-xl font-black text-gray-900 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-brand-green" />
                <span>আমাদের পণ্যগুলোর বিশেষত্ব</span>
              </h3>
              <p className="text-gray-600 text-sm">
                সুন্দরবনের গহীন অরণ্য থেকে সংগ্রহ করা অপরিশোধিত কাঁচা মধু, যশোর ও রাজশাহীর
                ঐতিহ্যবাহী গাছিদের মাটির চুলায় ঘন করা আসল খেজুরের গুড়, কাঠের ঘানিতে ভাঙা খাঁটি
                সরিষার তেল এবং গ্রামীণ মা-বোনদের হাতে নিখুঁত পরিচ্ছন্নতায় তৈরি ঘরোয়া আচার।
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                  <span>কোনো ধরনের চিনি, স্যাকারিন বা ফ্লেভার মুক্ত</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                  <span>হাইড্রোজ, ফিটকিরি বা ব্লিচিং এজেন্টমুক্ত প্রাকৃতিক গুড়</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                  <span>কোল্ড-প্রেসড কাঠের ঘানির তেল (পুষ্টিগুণ অক্ষুণ্ণ)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                  <span>সীমিত ব্যাচে সর্বোচ্চ সতেজতা বজায় রেখে উৎপাদন</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CORE VALUES / 4 PILLARS */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-brand-green font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100">
              আমাদের মূল স্তম্ভ
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 mt-2 font-heading">
              কেন আপনি স্বাদের ভুবনে আস্থা রাখবেন?
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-2">
              আমাদের প্রতিটি সিদ্ধান্ত পরিচালিত হয় সততা, স্বচ্ছতা এবং গ্রাহকের সুস্বাস্থ্যের অঙ্গীকার নিয়ে।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs hover:border-brand-green/30 hover:shadow-md transition duration-300 flex flex-col sm:flex-row gap-5 items-start"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center shrink-0 border border-emerald-100">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-gray-950 mb-1">
                      {val.title}
                    </h3>
                    <p className="text-xs font-semibold text-brand-green mb-2">
                      {val.englishTitle}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* QUALITY PROCESS / HOW WE ENSURE PURITY */}
        <div className="bg-gradient-to-br from-emerald-900 to-[#042618] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-luxury mb-12 sm:mb-16 relative overflow-hidden">
          <div className="max-w-2xl mb-8 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black border border-amber-400/30">
              গুণমান নিয়ন্ত্রণ ও সততা
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-3 font-heading">
              যেভাবে প্রতিটি পণ্য পৌঁছায় আপনার টেবিলে
            </h2>
            <p className="text-emerald-100/80 text-xs sm:text-sm mt-2">
              মাঠ থেকে আপনার খাবার টেবিল পর্যন্ত প্রতিটি ধাপে কঠোরভাবে বজায় রাখা হয় বিশুদ্ধতা ও স্বাস্থ্যবিধি।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {qualitySteps.map((q, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-black text-amber-400/80 font-heading">
                    {q.step}
                  </span>
                  <h3 className="text-base font-black text-white mt-2 mb-2">
                    {q.title}
                  </h3>
                  <p className="text-xs text-emerald-100/70 leading-relaxed">
                    {q.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* POPULAR CATEGORIES SHORTCUT */}
        <div className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-brand-green font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100">
                আমাদের সিগনেচার পণ্য
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mt-2 font-heading">
                যে পণ্যগুলোর জন্য মানুষ স্বাদের ভুবন বেছে নেয়
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs sm:text-sm font-bold text-brand-green hover:underline flex items-center gap-1"
            >
              <span>সকল পণ্য দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((c, i) => (
              <Link
                key={i}
                href={c.link}
                className="group bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs hover:border-brand-green hover:shadow-md transition block"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-gray-900 group-hover:text-brand-green transition text-base">
                    {c.name}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-green group-hover:translate-x-1 transition" />
                </div>
                <p className="text-xs text-gray-500 mt-1">{c.sub}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* LOCATION & CONTACT CARD */}
        <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-10 shadow-xs mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-brand-green font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-md border border-emerald-100">
                আমাদের সাথে থাকুন
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-950 font-heading">
                সরাসরি যোগাযোগ ও সহায়তা
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                পণ্য অর্ডার, বাল্ক ক্রয়, পরামর্শ কিংবা যেকোনো তথ্যের জন্য সরাসরি কল করুন আমাদের ডেডিকেটেড সাপোর্ট লাইনে। আপনার সন্তুষ্টিই আমাদের সর্বোচ্চ প্রেরণা।
              </p>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                  <span>
                    <strong>প্রধান কার্যালয়:</strong> {siteConfig.contact.addressBangla}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-green shrink-0" />
                  <span>
                    <strong>হটলাইন ও হোয়াটসঅ্যাপ:</strong>{" "}
                    <a
                      href={`tel:${siteConfig.contact.hotline}`}
                      className="text-brand-green font-bold hover:underline"
                    >
                      {siteConfig.contact.hotline}
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brand-green shrink-0" />
                  <span>
                    <strong>ইমেইল:</strong>{" "}
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-brand-green hover:underline"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-50 to-amber-50/60 rounded-2xl p-6 border border-emerald-100 text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-xs text-brand-green">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-black text-gray-950 text-base mb-1">
                নিশ্চিন্ত কেনাকাটার নিশ্চয়তা
              </h3>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                কোনো অগ্রিম চার্জ নেই। পার্সেল ডেলিভারি পাওয়ার পর দেখে মূল্য দিন। কোনো অসঙ্গতি থাকলে ৭ দিনের মধ্যে সহজ রিটার্ন সুবিধা।
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                <a
                  href={`https://wa.me/88${siteConfig.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition"
                >
                  হোয়াটসঅ্যাপে চ্যাট করুন
                </a>
                <Link
                  href="/contact"
                  className="bg-white hover:bg-gray-50 text-gray-900 font-bold px-4 py-2.5 rounded-xl text-xs border border-gray-300 transition"
                >
                  যোগাযোগ পেজে যান
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CTA BANNER */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 rounded-3xl p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 font-heading">
              আজই আপনার পরিবারের জন্য বেছে নিন খাঁটি স্বাদ
            </h2>
            <p className="text-gray-900/90 text-xs sm:text-sm max-w-lg mx-auto font-medium">
              ভেজালহীন খাবার উপহার দিন আপনার প্রিয়জনদের। আমাদের অনলাইন শপ ভিজিট করে ঘরে বসেই গ্রহণ করুন সেরা পণ্য।
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <Link
                href="/shop"
                className="bg-emerald-900 hover:bg-emerald-950 text-white font-black px-8 py-3.5 rounded-xl shadow-md transition text-sm active:scale-95"
              >
                এখনই অর্ডার করুন
              </Link>
              <a
                href={`tel:${siteConfig.contact.hotline}`}
                className="bg-white hover:bg-gray-50 text-gray-950 font-black px-6 py-3.5 rounded-xl transition text-sm shadow-xs flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-800" />
                <span>কল করুন: {siteConfig.contact.hotline}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}