import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText, CheckCircle2, AlertCircle, Scale, ShieldAlert, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `শর্তাবলী ও নিয়মাবলী (Terms & Conditions) | ${siteConfig.name}`,
  description: `স্বাদের ভুবন থেকে নির্ভেজাল খাদ্যপণ্য ক্রয় ও ওয়েবসাইট ব্যবহারের যাবতীয় নীতিমালা ও গ্রাহক শর্তাবলী।`,
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="bg-gray-50 flex-1 py-8 sm:py-14">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-brand-green transition">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">শর্তাবলী ও নিয়মাবলী</span>
        </nav>

        {/* Page Header Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-xs mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-brand-green text-xs font-bold mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>আইনি ও সেবা নির্দেশিকা</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-gray-950 mb-3">
            ব্যবহারের শর্তাবলী ও নিয়মাবলী (Terms & Conditions)
          </h1>
          <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
            স্বাদের ভুবন (sadervubon.com)-এ আপনাকে স্বাগতম। আমাদের প্ল্যাটফর্ম ব্যবহার করে পণ্য অনুসন্ধান বা অর্ডার সম্পন্ন করার মাধ্যমে আপনি নিচের শর্তাবলীর সাথে সম্মতি প্রকাশ করছেন। আমাদের সাথে আপনার কেনাকাটার প্রতিটি ধাপ যেন স্বচ্ছ ও নির্ভরযোগ্য হয়, তাই এই নিয়মগুলো তৈরি করা হয়েছে।
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
            <span>সর্বশেষ পরিমার্জন: জানুয়ারি ২০২৬</span>
            <span className="text-emerald-700 font-semibold">গ্রাহকবান্ধব ও স্বচ্ছ সেবা</span>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center shrink-0 text-brand-green">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-950 text-sm mb-1">১০০% খাঁটি পণ্য</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                কোনো প্রকার রাসায়নিক ও ভেজালমুক্ত প্রাকৃতিক খাদ্যপণ্য সরাসরি সংগ্রহ ও সরবরাহের প্রতিশ্রুতি।
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0 text-amber-600">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-950 text-sm mb-1">স্বচ্ছ মূল্য তালিকা</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                পণ্য ও ডেলিভারি চার্জের বাইরে কোনো গোপন বা অনাকাঙ্ক্ষিত অতিরিক্ত ফি যুক্ত করা হয় না।
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center shrink-0 text-blue-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-950 text-sm mb-1">নিরাপদ ক্যাশ অন ডেলিভারি</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                সারা দেশে কোনো অগ্রিম পেমেন্ট ছাড়াই পার্সেল হাতে পেয়ে নিশ্চিত হয়ে মূল্য পরিশোধের সুযোগ।
              </p>
            </div>
          </div>
        </div>

        {/* Main Terms Sections */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-xs space-y-8 text-gray-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ১
              </span>
              <span>সাধারণ চুক্তি ও গ্রহণযোগ্যতা</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>
                স্বাদের ভুবনের ওয়েবসাইট ব্যবহারের মাধ্যমে আপনি এই মর্মে নিশ্চয়তা দিচ্ছেন যে আপনি অন্তত ১৮ বছর বয়সী অথবা অভিভাবকের তত্ত্বাবধানে কেনাকাটা করছেন। আপনি প্রদত্ত তথ্যের নির্ভুলতা ও সঠিকতার জন্য সম্পূর্ণ দায়ী থাকবেন।
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ২
              </span>
              <span>পণ্যের বিবরণ, গুণগত মান ও মৌসুমী প্রাপ্যতা</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>
                আমরা সবসময় পণ্যের সঠিক ছবি, উপাদান, নেট ওজন ও মূল্য প্রদর্শন করতে সচেষ্ট থাকি। তবে যেহেতু সুন্দরবনের মধু, যশোরের খাঁটি খেজুরের গুড় কিংবা রাজশাহীর আম প্রাকৃতিক ও মৌসুমী পণ্য, তাই আবহাওয়া ও মৌসুমভেদে সামান্য প্রাকৃতিক বৈচিত্র্য (যেমন গুড়ের রঙ বা মধুর ঘনত্বে সামান্য ভিন্নতা) পরিলক্ষিত হতে পারে, যা প্রাকৃতিক খাঁটি পণ্যের সহজাত বৈশিষ্ট্য।
              </p>
              <p>
                যদি কোনো কারণে স্টক স্বল্পতা দেখা দেয়, আমাদের সাপোর্ট টিম অর্ডার কনফার্মেশনের আগেই আপনাকে অবগত করবে এবং বিকল্প সমাধান প্রস্তাব করবে।
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ৩
              </span>
              <span>মূল্য তালিকা ও মূল্য পরিশোধ পদ্ধতি</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>
                ওয়েবসাইটে উল্লিখিত সকল মূল্য বাংলাদেশি টাকা (৳)-তে নির্ধারিত। আমরা মূলত <strong>ক্যাশ অন ডেলিভারি (Cash on Delivery)</strong> পদ্ধতিতে পণ্য সরবরাহ করে থাকি। পার্সেল ডেলিভারিম্যান থেকে গ্রহণের সময় আপনি নগদ টাকায় বা ডেলিভারিম্যানের সাথে সমন্বয় করে বিকাশ/নগদে মূল্য পরিশোধ করতে পারেন।
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ৪
              </span>
              <span>অর্ডার কনফার্মেশন ও ডেলিভারি কার্যক্রম</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>
                ওয়েবসাইটে অর্ডার সাবমিট করার পর আমাদের কাস্টমার রিলেশন প্রতিনিধি ফোন কলের মাধ্যমে অর্ডারটি কনফার্ম করবেন। কনফার্মেশনের পর ঢাকার ভেতরে ২৪-৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ৪৮-৭২ ঘণ্টার মধ্যে অনুমোদিত কুরিয়ারের মাধ্যমে ডেলিভারি করা হয়। প্রতিকূল আবহাওয়া বা কুরিয়ার সংক্রান্ত অনাকাঙ্ক্ষিত কোনো বিলম্ব ঘটলে আমরা কাস্টমারকে যথাসময়ে অবহিত করব।
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ৫
              </span>
              <span>অর্ডার পরিবর্তন বা বাতিলকরণ</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>
                পার্সেল কুরিয়ারে হস্তান্তরের পূর্ব পর্যন্ত আপনি আমাদের হটলাইনে যোগাযোগ করে বিনামূল্যে যেকোনো অর্ডার বাতিল বা ঠিকানা সংশোধন করতে পারবেন। কুরিয়ারে বুকিং হয়ে যাওয়ার পর অর্ডার বাতিল করতে চাইলে দ্রুত সাপোর্ট টিমের সাথে কথা বলতে হবে।
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-brand-green flex items-center justify-center text-xs font-black shrink-0">
                ৬
              </span>
              <span>বৌদ্ধিক সম্পদ ও স্বত্বাধিকার (Copyright)</span>
            </h2>
            <div className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2 pl-9">
              <p>
                স্বাদের ভুবন (sadervubon.com)-এর লোগো, গ্রাফিক্স, পণ্যের ছবি, ব্যানার, ভিডিও এবং টেক্সচুয়াল কনটেন্ট স্বাদের ভুবনের নিজস্ব সম্পত্তি। অনুমতি ব্যতীত বাণিজ্যিক উদ্দেশ্যে এগুলোর নকল, অনুলিপি বা পুনরুৎপাদন কঠোরভাবে নিষিদ্ধ ও আইনত দণ্ডনীয়।
              </p>
            </div>
          </section>

          {/* Support Section */}
          <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div>
              <h3 className="text-sm sm:text-base font-black text-gray-950">
                শর্তাবলী বা নিয়ম নিয়ে কোনো জিজ্ঞাসা আছে?
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                আমরা আপনার প্রতিটি প্রশ্নের খোলামেলা ও আন্তরিক উত্তর দিতে প্রস্তুত।
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
