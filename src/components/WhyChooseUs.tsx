import { ShieldCheck, HeartHandshake, Award, Truck, Sparkles, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function WhyChooseUs() {
  const points = [
    {
      title: "সরাসরি মাঠ ও বন থেকে সংগৃহীত",
      desc: "সুন্দরবনের মৌয়ালদের চাকভাঙা মধু এবং রাজশাহীর নিজস্ব বাগানের খাঁটি খাদ্যশস্য। কোনো মধ্যস্বত্বভোগী নেই।",
      icon: Award,
      badge: "উৎস থেকে সংগ্রহ",
    },
    {
      title: "১০০% রাসায়নিক ও ভেজালমুক্ত",
      desc: "কোনো প্রকার প্রিজারভেটিভ, কেমিক্যাল বা কৃত্রিম রঙ ব্যবহার করা হয় না। সম্পূর্ণ নিরাপদ প্রাকৃতিক খাবার।",
      icon: ShieldCheck,
      badge: "ল্যাব ভেরিফায়েড",
    },
    {
      title: "সনাতন কাঠের ঘানিতে প্রস্তুত",
      desc: "আমাদের সরিষার তেল সনাতন কাঠের ঘানিতে ঠান্ডা চাপে প্রস্তুত হয়, যাতে তেলের খাঁটি ঝাঁঝ ও পুষ্টি অক্ষুণ্ণ থাকে।",
      icon: HeartHandshake,
      badge: "ঐতিহ্যবাহী পদ্ধতি",
    },
    {
      title: "ক্যাশ অন ডেলিভারি ও দ্রুত সার্ভিস",
      desc: "সারা বাংলাদেশে পণ্য হাতে পেয়ে মূল্য পরিশোধের সুবিধা। পণ্য দেখে নেওয়ার ১০০% নিশ্চয়তা।",
      icon: Truck,
      badge: "নিরাপদ লেনদেন",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-[#faf9f5] to-white relative overflow-hidden">
      {/* Decorative Background Shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Text & Cards */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-4 py-1.5 rounded-full mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs sm:text-sm font-extrabold text-emerald-800 tracking-wider uppercase">
                আমাদের বিশেষত্ব
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.3] mb-5 font-heading">
              কেন পরিবারের সুস্থতায় <br />
              <span className="bg-gradient-to-r from-emerald-800 to-amber-600 bg-clip-text text-transparent">
                স্বাদের ভুবন
              </span>-ই সেরা পছন্দ?
            </h2>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 font-medium max-w-2xl">
              আমরা কেবল খাবার সরবরাহ করি না, আপনার পরিবারের প্রতিটি সদস্যের মুখে গ্রাম-বাংলার আসল, প্রাকৃতিক ও স্বাস্থ্যকর খাবার তুলে দেওয়ার নিশ্চয়তা দিই।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {points.map((pt, i) => {
                const Icon = pt.icon;
                return (
                  <div
                    key={i}
                    className="p-5 rounded-3xl bg-white border border-gray-200/80 hover:border-emerald-500/50 shadow-xs hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100/80 group-hover:scale-110 group-hover:bg-emerald-800 group-hover:text-white transition-all duration-300 shadow-xs">
                          <Icon className="w-6 h-6 stroke-[2]" />
                        </div>
                        <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                          {pt.badge}
                        </span>
                      </div>

                      <h4 className="font-extrabold text-gray-900 text-base sm:text-lg mb-2 font-heading leading-snug">
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

          {/* Right Visual Image Card with Floating Trust Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto h-[440px] sm:h-[500px] lg:h-[540px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
              <Image
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&auto=format&fit=crop&q=80"
                alt="খাঁটি গ্রামীণ প্রকৃতি ও খাবার"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#042418]/90 via-[#042418]/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 text-xs font-black px-4 py-1.5 rounded-full w-max mb-3 shadow-md">
                  Best in Taste & Purity
                </span>
                <h3 className="text-2xl sm:text-3xl font-black mb-2 leading-snug font-heading">
                  প্রকৃতির খাঁটি ছোঁয়া আপনার খাবার টেবিলে
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
                  সুন্দরবনের গভীর বনানী ও রাজশাহীর ঐতিহ্যবাহী সুবাসের মেলবন্ধন।
                </p>
              </div>

              {/* Floating Counter Badge */}
              <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-emerald-100">
                <div className="text-xs text-gray-500 font-medium">সন্তুষ্ট গ্রাহক</div>
                <div className="text-lg font-black text-emerald-800">১০,০০০+ পরিবার</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
