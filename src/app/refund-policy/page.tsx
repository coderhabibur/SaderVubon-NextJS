import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, RotateCcw, ShieldCheck, CheckCircle2, Phone, MessageCircle, AlertCircle, Clock, Truck, RefreshCw } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `রিফান্ড ও রিটার্ন নীতি (Return & Refund Policy) | ${siteConfig.name}`,
  description: `স্বাদের ভুবনের সহজ ৭ দিনের রিটার্ন ও রিফান্ড নীতি। পণ্যে কোনো ভাঙা, লিকেজ বা ত্রুটি থাকলে সাথে সাথে রিটার্ন বা ফ্রি পরিবর্তনের নিশ্চয়তা।`,
  alternates: {
    canonical: `${siteConfig.url}/refund-policy`,
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-gray-50 flex-1 py-8 sm:py-14">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-brand-green transition">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">রিফান্ড ও রিটার্ন নীতি</span>
        </nav>

        {/* Page Header Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-xs mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-brand-green text-xs font-bold mb-3">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>১০০% ক্রেতা সুরক্ষা ও সন্তুষ্টি নিশ্চয়তা</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-gray-950 mb-3">
            রিফান্ড ও রিটার্ন নীতি (Return & Refund Policy)
          </h1>
          <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
            স্বাদের ভুবন সবসময় শতভাগ খাঁটি ও নিরাপদ খাদ্যপণ্য সরবরাহ করতে দায়বদ্ধ। গ্রাহকের সন্তুষ্টিই আমাদের সর্বোচ্চ অগ্রাধিকার। কোনো অনাকাঙ্ক্ষিত কারণে আপনি পণ্যে কোনো ত্রুটি বা অসঙ্গতি পেলে আমরা অত্যন্ত দ্রুত ও ঝামেলামুক্ত রিটার্ন, রিপ্লেসমেন্ট এবং রিফান্ডের ব্যবস্থা করি।
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
            <span>সর্বশেষ পরিমার্জন: জানুয়ারি ২০২৬</span>
            <span className="text-emerald-700 font-semibold">৭ দিনের সহজ রিপ্লেসমেন্ট নিশ্চয়তা</span>
          </div>
        </div>

        {/* 3 Core Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center shrink-0 text-brand-green">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-950 text-sm mb-1">ডেলিভারির সময় যাচাই</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                ডেলিভারিম্যানের সামনে পার্সেল দেখে নেওয়ার পূর্ণ অধিকার। ত্রুটিযুক্ত পার্সেল সাথে সাথে রিটার্ন করতে পারেন।
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0 text-amber-600">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-950 text-sm mb-1">৭ দিনের ফ্রি রিপ্লেসমেন্ট</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                পণ্য গ্রহণের পর কোনো অভ্যন্তরীণ ত্রুটি পেলে ৭ দিনের মধ্যে নতুন ফ্রেশ পণ্য বিনামূল্যে পাঠানো হবে।
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center shrink-0 text-blue-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-950 text-sm mb-1">২৪-৭২ ঘণ্টায় রিফান্ড</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                রিটার্ন পার্সেল যাচাইয়ের পর সর্বোচ্চ ২৪ থেকে ৭২ ঘণ্টার মধ্যে আপনার বিকাশ, নগদ বা ব্যাংকে রিফান্ড প্রদান করা হয়।
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-xs space-y-8 text-gray-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ১
              </span>
              <span>ডেলিভারির সময় পার্সেল যাচাই করার নিশ্চয়তা</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>
                আমরা সারা দেশে <strong>ক্যাশ অন ডেলিভারি (COD)</strong> সুবিধা প্রদান করি। পার্সেলটি ডেলিভারিম্যানের সামনে খুলে পরীক্ষা করার পূর্ণ স্বাধীনতা আপনার রয়েছে। যদি জার ভাঙা, ক্যাপ আলগা, তেল বা মধু চুয়ে পড়া দেখতে পান, তবে এক পয়সাও ডেলিভারি চার্জ না দিয়ে পুরো পার্সেলটি ডেলিভারিম্যানকে তৎক্ষণাৎ ফেরত দিতে পারেন।
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ২
              </span>
              <span>যেসব কারণে রিটার্ন বা রিপ্লেসমেন্ট প্রযোজ্য হবে</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>পণ্য গ্রহণের পর নিচের যেকোনো পরিস্থিতি দেখা দিলে ডেলিভারির ৭ দিনের মধ্যে আমাদের জানালে আমরা ফ্রিতে পণ্য পরিবর্তন করে দেব:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>অর্ডারকৃত পণ্যের পরিবর্তে ভুল কোনো পণ্য বা ভুল ভ্যারিয়েন্ট ডেলিভারি হওয়া।</li>
                <li>পরিবহনকালে বোতল বা জারে কোনো ফাটল বা লিকেজ পরিলক্ষিত হওয়া।</li>
                <li>কম্বো অফারের কোনো নির্দিষ্ট আইটেম অনুপস্থিত থাকলে।</li>
                <li>পণ্যের ঘোষিত ওজন বা পরিমাণের তুলনায় উল্লেখযোগ্য গরমিল পাওয়া গেলে।</li>
                <li>খাদ্যপণ্যের স্বাভাবিক গুণমান ও স্বাদে অপ্রত্যাশিত কোনো বিচ্যুতি পাওয়া গেলে।</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ৩
              </span>
              <span>যেসব ক্ষেত্রে রিটার্ন প্রযোজ্য হবে না</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>প্রাকৃতিক খাদ্যপণ্যের স্বাস্থ্যগত ও হাইজিন সুরক্ষার স্বার্থে নিচের ক্ষেত্রগুলোতে রিটার্ন গ্রহণযোগ্য নয়:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>সিল খুলে অর্ধেকের বেশি পণ্য ব্যবহারের পর কোনো সুস্পষ্ট ত্রুটি ছাড়া ফেরত চাওয়া হলে।</li>
                <li>গ্রাহকের অনুপযুক্ত সংরক্ষণ বা অসাবধানতার কারণে পণ্য নষ্ট হলে (যেমন: খেজুরের গুড় স্যাঁতসেঁতে বা ভেজা জায়গায় রাখলে)।</li>
                <li>পণ্য হাতে পাওয়ার ৭ দিন অতিক্রান্ত হওয়ার পর যোগাযোগ করা হলে।</li>
              </ul>
            </div>
          </section>

          {/* Section 4: 4 Steps */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ৪
              </span>
              <span>সহজ ৪ ধাপে রিটার্ন বা রিপ্লেসমেন্ট নেওয়ার উপায়</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-9 pt-1">
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-[11px] font-black text-brand-green bg-emerald-100 px-2 py-0.5 rounded-md inline-block mb-1.5">ধাপ ১</span>
                <p className="text-xs text-gray-700 font-bold mb-1">ছবি বা ভিডিও ধারণ করুন</p>
                <p className="text-xs text-gray-500">পণ্যটির ত্রুটিপূর্ণ অংশের বা আনবক্সিংয়ের স্পষ্ট ছবি বা ছোট ভিডিও ক্লিপ সংগ্রহ করুন।</p>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-[11px] font-black text-brand-green bg-emerald-100 px-2 py-0.5 rounded-md inline-block mb-1.5">ধাপ ২</span>
                <p className="text-xs text-gray-700 font-bold mb-1">আমাদের সাপোর্ট টিমে পাঠান</p>
                <p className="text-xs text-gray-500">আমাদের হোয়াটসঅ্যাপ ({siteConfig.contact.whatsapp}) বা ফেসবুক ইনবক্সে ছবি ও আপনার অর্ডার নম্বর জানান।</p>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-[11px] font-black text-brand-green bg-emerald-100 px-2 py-0.5 rounded-md inline-block mb-1.5">ধাপ ৩</span>
                <p className="text-xs text-gray-700 font-bold mb-1">রিপ্লেসমেন্ট পার্সেল প্রেরণ</p>
                <p className="text-xs text-gray-500">অভিযোগ অনুমোদিত হলে তাৎক্ষণিক নতুন ইনট্যাক্ট পণ্য কুরিয়ারের মাধ্যমে পাঠিয়ে দেওয়া হবে।</p>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-[11px] font-black text-brand-green bg-emerald-100 px-2 py-0.5 rounded-md inline-block mb-1.5">ধাপ ৪</span>
                <p className="text-xs text-gray-700 font-bold mb-1">দ্রুত রিফান্ড নিষ্পত্তি</p>
                <p className="text-xs text-gray-500">যদি কাস্টমার রিফান্ড চান, তবে রিটার্ন পার্সেল যাচাইয়ের ২৪-৭২ ঘণ্টার মধ্যে বিকাশ/নগদে টাকা প্রদান করা হবে।</p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ৫
              </span>
              <span>রিটার্ন শিপিং চার্জ পলিসি</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>
                যদি পণ্যটি কোনো ত্রুটিযুক্ত বা ক্ষতিগ্রস্ত অবস্থায় ডেলিভারি হয় কিংবা আমাদের ভুলের কারণে অন্য পণ্য পাঠানো হয়ে থাকে, তবে রিটার্ন ও পুনরায় ডেলিভারির <strong>সম্পূর্ণ কুরিয়ার চার্জ স্বাদের ভুবন বহন করবে</strong>। ক্রেতাকে কোনো অতিরিক্ত খরচ বহন করতে হবে না।
              </p>
            </div>
          </section>

          {/* Bottom Action Support Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div>
              <h3 className="text-sm sm:text-base font-black text-gray-950">
                অর্ডার নিয়ে কোনো সমস্যা হলে সাথে সাথে জানান
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                হটলাইন: {siteConfig.contact.hotline} | হোয়াটসঅ্যাপ: {siteConfig.contact.whatsapp} (সকাল ৯টা – রাত ১০টা)
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href={`tel:${siteConfig.contact.hotline}`}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-800 text-xs font-bold hover:bg-gray-100 transition shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-brand-green" />
                <span>হটলাইনে কল</span>
              </a>

              <a
                href={siteConfig.social.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-green text-white text-xs font-bold hover:bg-brand-green-hover transition shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>হোয়াটসঅ্যাপে জানান</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
