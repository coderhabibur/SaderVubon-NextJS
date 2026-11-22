import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Lock, EyeOff, Server, FileText, Phone, MessageCircle, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `প্রাইভেসি পলিসি (Privacy Policy) | ${siteConfig.name}`,
  description: `স্বাদের ভুবনে আপনার ব্যক্তিগত তথ্যের সর্বোচ্চ নিরাপত্তা ও গোপনীয়তা নিশ্চিতকরণ নীতি। জানুন আমরা কীভাবে গ্রাহকের তথ্য সুরক্ষা বজায় রাখি।`,
  alternates: {
    canonical: `${siteConfig.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 flex-1 py-8 sm:py-14">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-brand-green transition">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">প্রাইভেসি পলিসি</span>
        </nav>

        {/* Page Header Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-xs mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-brand-green text-xs font-bold mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>ডেটা প্রটেকশন ও তথ্যের গোপনীয়তা</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-gray-950 mb-3">
            গোপনীয়তা নীতি (Privacy Policy)
          </h1>
          <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
            স্বাদের ভুবনে আমরা আপনার বিশ্বাস ও ব্যক্তিগত তথ্যের নিরাপত্তাকে সর্বোচ্চ গুরুত্ব প্রদান করি। আমাদের ওয়েবসাইট ভিজিট করা বা পণ্য অর্ডারের সময় আপনার সংগৃহীত তথ্য কীভাবে সুরক্ষিত রাখা হয়, তা এই নীতিমালায় সুস্পষ্টভাবে উল্লেখ করা হয়েছে।
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
            <span>সর্বশেষ পরিমার্জন: জানুয়ারি ২০২৬</span>
            <span className="text-emerald-700 font-semibold">১০০% নিরাপদ শপিং অভিজ্ঞতা</span>
          </div>
        </div>

        {/* 3 Pillars / Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center shrink-0 text-brand-green">
              <EyeOff className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-950 text-sm mb-1">কোনো তথ্য বিক্রয় নয়</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                আপনার নাম, মোবাইল নম্বর কিংবা ঠিকানা কখনোই কোনো তৃতীয় পক্ষের কাছে বিক্রি বা ভাড়া দেওয়া হয় না।
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0 text-amber-600">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-950 text-sm mb-1">সুরক্ষিত সংরক্ষণ</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                অত্যাধুনিক সিকিউরিটি সার্ভারে এনক্রিপ্টেড পদ্ধতিতে আপনার অর্ডারের তথ্যসমূহ সংরক্ষিত থাকে।
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center shrink-0 text-blue-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-950 text-sm mb-1">শুধুমাত্র ডেলিভারিতে ব্যবহার</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                আপনার ঠিকানা কেবল পার্সেল আপনার ঠিকানায় সরাসরি পৌঁছানোর জন্যই কুরিয়ারের সাথে শেয়ার করা হয়।
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Details */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-xs space-y-8 text-gray-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ১
              </span>
              <span>আমরা কী কী তথ্য সংগ্রহ করি?</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>
                স্বাদের ভুবন থেকে পণ্য সফলভাবে অর্ডার করতে এবং গ্রাহকসেবা নিশ্চিত করতে আমরা সীমিত ও অত্যন্ত প্রয়োজনীয় কিছু তথ্য সংগ্রহ করি:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li><strong>ব্যক্তিগত পরিচয় ও যোগাযোগের তথ্য:</strong> আপনার পূর্ণ নাম, মোবাইল নম্বর এবং বিকল্প ফোন নম্বর (যদি প্রদান করেন)।</li>
                <li><strong>ডেলিভারি ঠিকানা:</strong> জেলা, থানা/উপজেলা, রোড নম্বর, বাসা নম্বর বা নির্দিষ্ট এলাকা।</li>
                <li><strong>অর্ডার বিবরণী:</strong> আপনি যে পণ্যগুলো অর্ডার করেছেন এবং অর্ডারের স্ট্যাটাস সংক্রান্ত তথ্য।</li>
                <li><strong>গ্রাহক যোগাযোগ:</strong> আমাদের ফেসবুক মেসেঞ্জার, হোয়াটসঅ্যাপ বা হটলাইনে কোনো প্রশ্ন কিংবা রিভিউ দিলে তার রেকর্ড।</li>
              </ul>
              <p className="text-xs text-emerald-800 bg-emerald-50/80 p-3 rounded-xl border border-emerald-100 mt-2 font-medium">
                বিশেষ দ্রষ্টব্য: আমরা কোনো অবস্থাতেই গ্রাহকের ডেবিট/ক্রেডিট কার্ডের পিন, পাসওয়ার্ড কিংবা গোপন ওটিপি (OTP) সংগ্রহ করি না।
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ২
              </span>
              <span>আপনার তথ্যের ব্যবহার ও প্রয়োজনীয়তা</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>
                সংগৃহীত তথ্যসমূহ কেবলমাত্র নিচের সুনির্দিষ্ট ক্ষেত্রগুলোতে ব্যবহৃত হয়:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
                <li>আপনার দেওয়া অর্ডারের সত্যতা যাচাই ও কনফার্মেশনের জন্য ফোন বা এসএমএস প্রদানের মাধ্যমে যোগাযোগ করতে।</li>
                <li>আপনার কাঙ্ক্ষিত ঠিকানায় বিশ্বস্ত কুরিয়ার প্রতিনিধির মাধ্যমে পার্সেল পৌঁছে দিতে।</li>
                <li>ডেলিভারির বর্তমান অবস্থা (লাইভ ট্র্যাকিং) জানাতে ও যেকোনো সমস্যা সমাধানে তাৎক্ষণিক সহায়তা দিতে।</li>
                <li>স্বাদের ভুবনের নতুন সিজনাল অফার ও বিশেষ ছাড় সম্পর্কে আপনাকে অবগত করতে (আপনি চাইলে যেকোনো সময় এসএমএস বন্ধ করতে পারেন)।</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ৩
              </span>
              <span>কুরিয়ার ও সহযোগী প্রতিষ্ঠানের সাথে তথ্য শেয়ারিং</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>
                হোম ডেলিভারি সফল করার জন্য আমরা দেশের নির্ভরযোগ্য অনুমোদিত কুরিয়ার পার্টনারদের (যেমন: Steadfast Courier, Pathao Courier ইত্যাদি) সাথে কেবলমাত্র প্রাপকের নাম, ফোন নম্বর এবং সম্পূর্ণ ডেলিভারি ঠিকানা শেয়ার করি। এই প্রতিষ্ঠানগুলো চুক্তি অনুযায়ী আপনার তথ্যের পূর্ণ সুরক্ষা নিশ্চিত করতে বাধ্য।
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ৪
              </span>
              <span>কুকিজ ও ব্রাউজার স্টোরেজ</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>
                আপনার ব্রাউজিংকে সহজ ও দ্রুত করতে আমাদের ওয়েবসাইটে হালকা লোকাল স্টোরেজ ও সেশন কুকি ব্যবহার করা হয়। এর মাধ্যমে আপনার শপিং কার্টে যুক্ত পণ্য ও পছন্দের তালিকা সাময়িকভাবে মনে রাখা হয়, যাতে পেজ রিফ্রেশ করলেও কার্ট খালি না হয়ে যায়। আমরা কখনোই কোনো ধরনের ব্যক্তিগত বা অনুপ্রবেশমূলক ট্র্যাকিং টুল ব্যবহার করি না।
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ৫
              </span>
              <span>আপনার তথ্যের ওপর আপনার অধিকার</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>
                একজন সম্মানিত গ্রাহক হিসেবে আপনার তথ্যের ওপর পূর্ণ নিয়ন্ত্রণ রয়েছে। আপনি যেকোনো সময় আমাদের ডাটাবেজে থাকা আপনার তথ্য সংশোধন, আপডেট অথবা স্থায়ীভাবে ডিলিট করার অনুরোধ জানাতে পারেন। আমাদের সাপোর্ট টিমে যোগাযোগ করলেই তাৎক্ষণিক ব্যবস্থা গ্রহণ করা হবে।
              </p>
            </div>
          </section>

          {/* Section 6: Support & Contact */}
          <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div>
              <h3 className="text-sm sm:text-base font-black text-gray-950">
                গোপনীয়তা বা তথ্য সুরক্ষা নিয়ে কোনো প্রশ্ন আছে?
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                আমাদের সাপোর্ট টিম সবসময় আপনার সহায়তায় প্রস্তুত। সরাসরি কথা বলুন অথবা হোয়াটসঅ্যাপে মেসেজ দিন।
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href={`tel:${siteConfig.contact.hotline}`}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-800 text-xs font-bold hover:bg-gray-100 transition shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-brand-green" />
                <span>হটলাইন: {siteConfig.contact.hotline}</span>
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
