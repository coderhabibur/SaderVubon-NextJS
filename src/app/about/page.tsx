import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, HeartHandshake, Sprout, Award, Phone, CheckCircle2, Truck, Star } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে | স্বাদের ভুবন (Sader Vubon)",
  description: "জানুন স্বাদের ভুবনের গল্প, উদ্দেশ্য ও অঙ্গীকার। গ্রাম-বাংলার বিশ্বস্ত কৃষক ও গাছিদের কাছ থেকে ১০০% নির্ভেজাল ও প্রাকৃতিক খাদ্য উপাদান।",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: "আমাদের সম্পর্কে | স্বাদের ভুবন (Sader Vubon)",
    description: "গ্রাম-বাংলার বিশ্বস্ত কৃষক ও গাছিদের কাছ থেকে ১০০% নির্ভেজাল ও প্রাকৃতিক খাদ্য উপাদান।",
    url: `${siteConfig.url}/about`,
    type: "website",
    images: ["/logo.webp"],
  },
};

export default function AboutPage() {
  return (
    <div className="bg-gray-50 flex-1 py-8 sm:py-14">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-brand-green transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">About Us</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#062b1e] via-[#083a29] to-[#062b1e] rounded-3xl p-8 sm:p-14 text-white shadow-sm mb-12 relative overflow-hidden text-center sm:text-left">
          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-yellow text-xs font-black mb-4 border border-brand-yellow/30">
              <Award className="w-3.5 h-3.5" />
              <span>100% Pure & Natural Food Guarantee</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
              Sader Vubon: The Pinnacle of Purity & Taste
            </h1>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              We are on a mission to connect every home with authentic, chemical-free, and wholesome traditional foods harvested directly from the fertile lands of Bengal.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-12 shadow-xs mb-12 space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-950 pb-2 border-b border-gray-100">
            Our Story & Journey
          </h2>
          <p>
            In a modern world flooded with synthetic additives and artificial processing, discovering pure, wholesome food has become a rare privilege. <strong className="text-brand-green font-bold">Sader Vubon (স্বাদের ভুবন)</strong> was founded with a singular, unwavering mission: to deliver 100% natural, unadulterated, and nutritious foods directly to your family&apos;s dining table.
          </p>
          <p>
            We partner directly with traditional honey collectors (Mowali) in the pristine mangroves of the Sundarbans to bring you completely unprocessed, raw hive honey. In heritage regions like Jessore and Rajshahi, we work hand-in-hand with veteran artisans (Gachhi) to produce authentic date palm jaggery (Patali & Jhola Gur) without an ounce of added sugar or chemical whitening agents. Our wooden cold-pressed mustard oil and handcrafted pickles are prepared in small batches following ancestral recipes to ensure unmatched purity, rich aroma, and wholesome nutrition.
          </p>
        </div>

        {/* 4 Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-2xl p-5 border border-gray-200 text-center shadow-xs">
            <p className="text-2xl sm:text-3xl font-black text-brand-green">10,000+</p>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Happy Families</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-200 text-center shadow-xs">
            <p className="text-2xl sm:text-3xl font-black text-brand-yellow">100%</p>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Natural & Organic</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-200 text-center shadow-xs">
            <p className="text-2xl sm:text-3xl font-black text-brand-green">64 Districts</p>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Nationwide Delivery</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-200 text-center shadow-xs">
            <p className="text-2xl sm:text-3xl font-black text-amber-500 flex items-center justify-center gap-1">
              4.9 <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            </p>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Customer Rating</p>
          </div>
        </div>

        {/* Pillars / Core Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs text-center">
            <div className="w-14 h-14 bg-emerald-50 text-brand-green rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sprout className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-2">Direct Farm Sourcing</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              No middle agents. We source authentic items directly from verified rural farmers, beekeepers, and indigenous producers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs text-center">
            <div className="w-14 h-14 bg-emerald-50 text-brand-green rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-2">Zero Chemical Guarantee</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Zero artificial preservatives, synthetic colors, chemicals, or essences. Pure, clean food just as nature intended.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs text-center">
            <div className="w-14 h-14 bg-emerald-50 text-brand-green rounded-2xl flex items-center justify-center mx-auto mb-4">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-2">Customer-First Service</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Full Cash on Delivery with transparent package inspection upon arrival, backed by our 7-day hassle-free return policy.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-brand-yellow/15 border border-brand-yellow/30 rounded-3xl p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-2">
            Experience Pure & Wholesome Living
          </h3>
          <p className="text-gray-600 text-sm max-w-lg mx-auto mb-6">
            Enjoy authentic flavors with complete confidence. No advance payment required — inspect your parcel upon arrival and pay cash at your doorstep.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="bg-brand-green hover:bg-brand-green-hover text-white font-black px-8 py-3.5 rounded-xl shadow-md transition text-sm active:scale-95"
            >
              Shop All Products
            </Link>
            <a
              href={`tel:${siteConfig.contact.hotline}`}
              className="bg-white hover:bg-gray-50 text-gray-900 font-bold px-6 py-3.5 rounded-xl border border-gray-300 transition text-sm flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-brand-yellow" />
              <span>Hotline: {siteConfig.contact.hotline}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
