import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Truck, Clock, ShieldCheck, Sparkles, CheckCircle2, Phone, MessageCircle, MapPin, PackageCheck, AlertCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `ডেলিভারি সংক্রান্ত তথ্য (Shipping Policy) | ${siteConfig.name}`,
  description: `স্বাদের ভুবনের দ্রুত ও নিরাপদ ডেলিভারি সংক্রান্ত বিস্তারিত তথ্য ও চার্জসমূহ। সারা দেশে হোম ডেলিভারি ও ক্যাশ অন ডেলিভারি সুবিধা।`,
  alternates: {
    canonical: `${siteConfig.url}/shipping-policy`,
  },
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-gray-50 flex-1 py-8 sm:py-14">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-brand-green transition">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">ডেলিভারি সংক্রান্ত তথ্য</span>
        </nav>

        {/* Page Header Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-xs mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-brand-green text-xs font-bold mb-3">
            <Truck className="w-3.5 h-3.5" />
            <span>সারা দেশে দ্রুত ও নিরাপদ হোম ডেলিভারি</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-gray-950 mb-3">
            ডেলিভারি সংক্রান্ত তথ্য ও নিয়মাবলী (Shipping Policy)
          </h1>
          <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
            স্বাদের ভুবন সবসময় গ্রাহকের কাছে খাঁটি, তাজা এবং অক্ষত অবস্থায় খাদ্যপণ্য পৌঁছে দিতে অঙ্গীকারবদ্ধ। আমাদের ডেলিভারি চার্জ, সময়সীমা, ফুড-গ্রেড প্যাকেজিং ও প্রক্রিয়া সম্পর্কে নিচে বিস্তারিত দেওয়া হলো।
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
            <span>সর্বশেষ পরিমার্জন: জানুয়ারি ২০২৬</span>
            <span className="text-emerald-700 font-semibold">সারা দেশে ক্যাশ অন ডেলিভারি</span>
          </div>
        </div>

        {/* Quick Rate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Inside Dhaka */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-gray-500">ঢাকার সিটির মধ্যে</span>
              <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">হোম ডেলিভারি</span>
            </div>
            <p className="text-3xl font-black text-gray-950 mb-1">৳৮০</p>
            <p className="text-xs text-gray-600 flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-brand-green" />
              <span>১-২ কার্যদিবস (২৪-৪৮ ঘণ্টা)</span>
            </p>
          </div>

          {/* Outside Dhaka */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-gray-500">ঢাকার সিটির বাইরে</span>
              <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">সারা দেশে</span>
            </div>
            <p className="text-3xl font-black text-gray-950 mb-1">৳১০০</p>
            <p className="text-xs text-gray-600 flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-brand-green" />
              <span>২-৩ কার্যদিবস (৪৮-৭২ ঘণ্টা)</span>
            </p>
          </div>

          {/* Inside Rajshahi */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-gray-500">রাজশাহীর মধ্যে</span>
              <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">লোকাল এক্সপ্রেস</span>
            </div>
            <p className="text-3xl font-black text-gray-950 mb-1">৳৫০</p>
            <p className="text-xs text-gray-600 flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-brand-green" />
              <span>২৪ ঘণ্টার মধ্যে হোম ডেলিভারি</span>
            </p>
          </div>

          {/* Free Shipping Offer */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/70 p-5 rounded-2xl border border-emerald-200 shadow-xs relative overflow-hidden">
            <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-black mb-1">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>স্পেশাল অফার</span>
            </div>
            <p className="text-3xl font-black text-brand-green mb-1">ফ্রি ডেলিভারি!</p>
            <p className="text-xs text-emerald-950 font-bold">
              ৳২৫০০ বা তদূর্ধ্ব অর্ডারে সারা দেশে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি।
            </p>
          </div>
        </div>

        {/* Detailed Guidelines */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-xs space-y-8 text-gray-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ১
              </span>
              <span>ডেলিভারি এলাকা ও সম্ভাব্য সময়সীমা</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2.5 pl-9">
              <p>
                • <strong>ঢাকা সিটির ভেতর:</strong> অর্ডার কনফার্মেশনের পর ২৪ থেকে ৪৮ ঘণ্টার মধ্যে নিজস্ব হোম ডেলিভারি রাইডার বা এক্সপ্রেস কুরিয়ার সার্ভিসের মাধ্যমে সরাসরি আপনার বাসার ঠিকানায় পণ্য পৌঁছে দেওয়া হয়।
              </p>
              <p>
                • <strong>সমগ্র বাংলাদেশ (সকল জেলা ও উপজেলা পর্যায়):</strong> দেশের যেকোনো জেলা সদর ও উপজেলা পর্যায়ে ৪৮ থেকে ৭২ ঘণ্টার মধ্যে নির্ভরযোগ্য কুরিয়ার সার্ভিসের মাধ্যমে সরাসরি হোম ডেলিভারি পৌঁছে দেওয়া হয়।
              </p>
              <p className="text-xs text-emerald-800 bg-emerald-50/70 p-3 rounded-xl border border-emerald-100">
                টিপস: অর্ডার করার সময় পূর্ণ ঠিকানা এবং সক্রিয় মোবাইল নম্বর উল্লেখ করলে ডেলিভারি আরও দ্রুত সম্পন্ন হয়।
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ২
              </span>
              <span>ফুড-গ্রেড ও লিক-প্রুফ নিরাপদ প্যাকেজিং</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>
                যেহেতু সুন্দরবনের মধু, খাঁটি খেজুরের গুড়, ঘানির সরিষার তেল ও ঘরোয়া আচার সংবেদনশীল খাদ্যপণ্য, তাই পরিবহনকালে কোনো প্রকার লিকেজ বা ভাঙন রোধে আমরা সর্বোচ্চ সতর্কতামূলক প্যাকেজিং ব্যবহার করি:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>ফুড-গ্রেড ভার্জিন প্লাস্টিক বা কাঁচের নিরাপদ জার।</li>
                <li>লিক-প্রুফ সিকিউরিটি ক্যাপ সিল ও হিট-শ্রিঙ্ক র‍্যাপ।</li>
                <li>শক-অ্যাবজরবিং পুরু এয়ার বাবল র‍্যাপ লেয়ারিং।</li>
                <li>মজবুত ও ওয়াটার-রেজিস্ট্যান্ট মাস্টার কার্টন বক্স।</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ৩
              </span>
              <span>পার্সেল ট্র্যাকিং ও ডেলিভারি আপডেট</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>
                আপনার অর্ডারটি কুরিয়ারে বুকিং হওয়ার সাথে সাথে আপনার ফোনে একটি ট্র্যাকিং নম্বর সহ কনফার্মেশন এসএমএস পৌঁছে যাবে। এছাড়াও আমাদের ওয়েবসাইটের <strong>অর্ডার ট্র্যাকিং</strong> পেজে গিয়ে আপনার ফোন নম্বর বা ইনভয়েস নম্বর দিয়ে পার্সেলের রিয়েল-টাইম অবস্থান যেকোনো সময় দেখতে পারবেন।
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ৪
              </span>
              <span>পণ্য গ্রহণের সময় করণীয় (ক্যাশ অন ডেলিভারি)</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>ডেলিভারিম্যানের সামনে পার্সেলটি রিসিভ করার সময় প্যাকেট বা জার অক্ষত আছে কি না তা দেখে নিন।</li>
                <li>কোনো কারণে প্যাকেটে ভাঙা বা লিকেজ পরিলক্ষিত হলে ডেলিভারিম্যানকে জানান এবং সাথে সাথে আমাদের হটলাইনে অবহিত করুন।</li>
                <li>কাস্টমার সম্পূর্ণ সন্তুষ্ট হয়ে মূল্য পরিশোধ করবেন। অগ্রিম কোনো টাকা দিতে হয় না।</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ৫
              </span>
              <span>প্রতিকূল পরিস্থিতি ও জরুরি নোটিশ</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>
                প্রাকৃতিক দুর্যোগ, ভারী বর্ষণ, রাজনৈতিক কর্মসূচি বা সরকারি ছুটির কারণে কুরিয়ার সার্ভিসে সাময়িক বিলম্ব হতে পারে। এ ধরনের ক্ষেত্রে আমাদের সাপোর্ট টিম নিয়মিত কাস্টমারের সাথে যোগাযোগ রেখে দ্রুততম সময়ে ডেলিভারি নিশ্চিত করতে তৎপর থাকে।
              </p>
            </div>
          </section>

          {/* Section 6: Support Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div>
              <h3 className="text-sm sm:text-base font-black text-gray-950">
                ডেলিভারি সংক্রান্ত যেকোনো তথ্যের জন্য
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                আমাদের সাপোর্ট টিম প্রতিদিন সকাল ৯টা থেকে রাত ১০টা পর্যন্ত আন্তরিক সেবা প্রদান করে।
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href={`tel:${siteConfig.contact.hotline}`}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-800 text-xs font-bold hover:bg-gray-100 transition shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-brand-green" />
                <span>{siteConfig.contact.hotline}</span>
              </a>

              <a
                href={siteConfig.social.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-green text-white text-xs font-bold hover:bg-brand-green-hover transition shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>হোয়াটসঅ্যাপ</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
