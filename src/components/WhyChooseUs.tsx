import { ShieldCheck, HeartHandshake, Award, Truck, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function WhyChooseUs() {
  const points = [
    {
      title: "সরাসরি মাঠ ও বন থেকে সংগৃহীত",
      desc: "সুন্দরবনের মৌয়ালদের চাকভাঙা মধু এবং রাজশাহীর নিজস্ব বাগানের খাঁটি খাদ্যশস্য। কোনো মধ্যস্বত্বভোগী নেই।",
      icon: Award,
    },
    {
      title: "১০০% রাসায়নিক ও ভেজালমুক্ত",
      desc: "কোনো প্রকার কেমিক্যাল, কৃত্রিম সুবাস বা প্রিজারভেটিভ ব্যবহার করা হয় না। সম্পূর্ণ নিরাপদ স্বাস্থ্যকর খাদ্য।",
      icon: ShieldCheck,
    },
    {
      title: "ঐতিহ্যবাহী কাঠের ঘানিতে প্রস্তুত",
      desc: "আমাদের সরিষার তেল ও গাওয়া ঘি তৈরি হয় দেশি সনাতন পদ্ধতিতে, যাতে পুষ্টিগুণ ও খাঁটি সুবাস অটুট থাকে।",
      icon: HeartHandshake,
    },
    {
      title: "ক্যাশ অন ডেলিভারি ও দ্রুত সার্ভিস",
      desc: "সারা বাংলাদেশে পণ্য হাতে পেয়ে টাকা পরিশোধ করার সুবিধা। পণ্য পছন্দ না হলে সহজ সমাধানের প্রতিশ্রুতি।",
      icon: Truck,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Text & Points (7 Cols on desktop for plenty of space) */}
          <div className="lg:col-span-7">
            <span className="inline-block text-xs sm:text-sm font-extrabold text-brand-green uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full mb-3 shadow-2xs">
              🌾 আমাদের বৈশিষ্ট্য
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.3] sm:leading-[1.35] mb-5">
              কেন পরিবার ও স্বাস্থ্যের জন্য <br />
              <span className="text-brand-green">স্বাদের ভুবন</span>-ই সেরা পছন্দ?
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 font-medium max-w-2xl">
              আমরা শুধু পণ্য বিক্রি করি না, প্রতিটি পরিবারের কাছে খাঁটি গ্রাম-বাংলার বিশুদ্ধ স্বাদ ও সুস্বাস্থ্য পৌঁছে দিতে অঙ্গীকারবদ্ধ।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {points.map((pt, i) => {
                const Icon = pt.icon;
                return (
                  <div
                    key={i}
                    className="flex gap-4 p-4 sm:p-5 rounded-2xl bg-gray-50/80 border border-gray-200/90 hover:bg-emerald-50/50 hover:border-emerald-300 transition-all duration-300 shadow-xs hover:shadow-md group"
                  >
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white text-brand-green flex items-center justify-center shrink-0 border border-emerald-100 shadow-sm group-hover:scale-105 group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-base sm:text-lg mb-1.5 leading-snug">
                        {pt.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Visual Image Card (5 Cols on desktop) */}
          <div className="lg:col-span-5 relative h-96 sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-100">
            <Image
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&auto=format&fit=crop&q=80"
              alt="খাঁটি গ্রামীণ প্রকৃতি ও খাবার"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
              <span className="bg-brand-yellow text-brand-dark text-xs sm:text-sm font-black px-4 py-1.5 rounded-full w-max mb-3 shadow-md">
                Best in Taste & Purity
              </span>
              <h3 className="text-2xl sm:text-3xl font-black mb-2 leading-snug">
                প্রকৃতির খাঁটি ছোঁয়া আপনার খাবার টেবিলে
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 font-medium leading-relaxed">
                রাজশাহীর ঐতিহ্য ও সুন্দরবনের বিশুদ্ধতার সমন্বয়ে স্বাদের ভুবন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
