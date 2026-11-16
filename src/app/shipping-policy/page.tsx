import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Truck, Clock, ShieldCheck, Sparkles, CheckCircle2, Phone, MessageCircle, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `শিপিং ও ডেলিভারি পলিসি | ${siteConfig.name}`,
  description: `স্বাদের ভুবনের দ্রুত ও নিরাপদ ডেলিভারি সংক্রান্ত বিস্তারিত তথ্য ও চার্জসমূহ। সারা দেশে হোম ডেলিভারি ও ক্যাশ অন ডেলিভারি সুবিধা।`,
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
          <span className="text-gray-900 font-bold">শিপিং ও ডেলিভারি পলিসি</span>
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-xs mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-brand-green text-xs font-bold mb-3">
            <Truck className="w-3.5 h-3.5" />
            <span>সারা দেশে হোম ডেলিভারি</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-gray-950 mb-3">
            শিপিং ও ডেলিভারি সংক্রান্ত নিয়মাবলী
          </h1>
          <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
            স্বাদের ভুবন সবসময় গ্রাহকের কাছে খাঁটি, তাজা এবং অক্ষত অবস্থায় খাদ্যপণ্য পৌঁছে দিতে অঙ্গীকারবদ্ধ। আমাদের ডেলিভারি চার্জ, সময়সীমা ও প্রক্রিয়া সম্পর্কে নিচে বিস্তারিত দেওয়া হলো।
          </p>
        </div>

        {/* Quick Rate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Inside Dhaka */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
            <span className="text-xs font-bold text-gray-500 block mb-1">ঢাকার ভেতরে</span>
            <p className="text-2xl font-black text-gray-950 mb-1">৳৭০</p>
            <p className="text-xs text-gray-600 flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-brand-green" />
              <span>১-২ কার্যদিবস</span>
            </p>
          </div>

          {/* Outside Dhaka */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
            <span className="text-xs font-bold text-gray-500 block mb-1">ঢাকার বাইরে (সারা দেশ)</span>
            <p className="text-2xl font-black text-gray-950 mb-1">৳১৩০</p>
            <p className="text-xs text-gray-600 flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-brand-green" />
              <span>২-৩ কার্যদিবস</span>
            </p>
          </div>

          {/* Free Shipping Offer */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/60 p-5 rounded-2xl border border-emerald-200 shadow-xs">
            <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-black mb-1">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>স্পেশাল অফার</span>
            </div>
            <p className="text-2xl font-black text-brand-green mb-1">ফ্রি ডেলিভারি!</p>
            <p className="text-xs text-emerald-900 font-bold">
              ৳২৫০০ বা তদূর্ধ্ব অর্ডারে সারা দেশে ডেলিভারি চার্জ ফ্রি।
            </p>
          </div>
        </div>

        {/* Detailed Guidelines */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-xs space-y-8">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black">১</span>
              <span>ডেলিভারি এলাকা ও সময়সীমা</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>
                • <strong>ঢাকা সিটির ভেতর:</strong> অর্ডার কনফার্মেশনের পর ২৪ থেকে ৪৮ ঘণ্টার মধ্যে নিজস্ব হোম ডেলিভারি রাইডার বা এক্সপ্রেস কুরিয়ার সার্ভিসের মাধ্যমে ডেলিভারি করা হয়।
              </p>
              <p>
                • <strong>সমগ্র বাংলাদেশ (উপজেলা পর্যায় পর্যন্ত):</strong> দেশের যেকোনো জেলা ও সদর উপজেলায় ৪৮ থেকে ৭২ ঘণ্টার মধ্যে কুরিয়ার সার্ভিসের মাধ্যমে সরাসরি কাস্টমারের ঠিকানায় হোম ডেলিভারি পৌঁছে দেওয়া হয়।
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black">২</span>
              <span>প্যাকেজিং ও সুরক্ষার নিশ্চয়তা</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>
                যেহেতু মধু, গুড়, সরিষার তেল ও আচার তরল বা আধা-তরল খাদ্যপণ্য, তাই পরিবহনকালে যেন কোনো প্রকার লিকেজ বা ক্ষতি না হয় সেজন্য আমরা উচ্চমানের <strong>ফুড-গ্রেড জার, সিকিউরিটি ক্যাপ, বাবল র‍্যাপ এবং মজবুত মাস্টার কার্টন</strong> ব্যবহার করি।
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black">৩</span>
              <span>পণ্য গ্রহণের সময় করণীয় (ক্যাশ অন ডেলিভারি)</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>
                • ডেলিভারিম্যানের সামনে পার্সেলটি রিসিভ করার সময় প্যাকেট বা জার অক্ষত আছে কি না তা দেখে নিন।
              </p>
              <p>
                • কোনো কারণে পণ্য ক্ষতিগ্রস্ত থাকলে সাথে সাথে ডেলিভারিম্যানকে জানান এবং আমাদের হটলাইনে ফোন দিন।
              </p>
              <p>
                • কাস্টমার সম্পূর্ণ সন্তুষ্ট হয়ে মূল্য পরিশোধ করবেন। অগ্রিম কোনো টাকা দিতে হবে না।
              </p>
            </div>
          </section>

          {/* Section 4: Support */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-black text-gray-900">ডেলিভারি সংক্রান্ত যেকোনো তথ্যের জন্য</h3>
              <p className="text-xs text-gray-500 mt-0.5">আমাদের সাপোর্ট টিম প্রতিদিন সকাল ৯টা থেকে রাত ১০টা পর্যন্ত সক্রিয়।</p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href={`tel:${siteConfig.contact.hotline}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-gray-300 text-gray-800 text-xs font-bold hover:bg-gray-100 transition shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-brand-green" />
                <span>{siteConfig.contact.hotline}</span>
              </a>

              <a
                href={siteConfig.social.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-green text-white text-xs font-bold hover:bg-brand-green-hover transition shadow-2xs"
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
