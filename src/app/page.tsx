import { ProductCard } from "@/components/ProductCard";
import { HeroSlider } from "@/components/HeroSlider";
import { CategorySlider, CategoryItem } from "@/components/CategorySlider";
import { SectionTitle } from "@/components/SectionTitle";
import { CustomerReviews } from "@/components/CustomerReviews";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { getLiveProducts, getHomepageSections, getFilteredProducts, LiveProduct } from "@/lib/woocommerce";
import { Rocket, RefreshCw, CreditCard, Headphones, ArrowRight, Sparkles, Flame, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  // 1. Fetch dynamic ACF Homepage Sections configured in WordPress Theme Options
  const acfSections = await getHomepageSections();

  let dynamicSections: {
    badge?: string;
    title: string;
    subtitle?: string;
    categorySlug?: string;
    categoryName?: string;
    products: LiveProduct[];
  }[] = [];

  if (acfSections.length > 0) {
    dynamicSections = await Promise.all(
      acfSections.map(async (sec) => {
        const cat = sec.select_category;
        const catId = typeof cat === "object" && cat !== null ? cat.term_id : (typeof cat === "number" ? cat : undefined);
        const catSlug = typeof cat === "object" && cat !== null ? cat.slug : undefined;
        const catName = typeof cat === "object" && cat !== null ? cat.name : undefined;
        const limit = Number(sec.products_limit) || 8;

        const products = catId
          ? await getFilteredProducts({ category: catId, per_page: limit })
          : [];

        return {
          badge: sec.section_top_title,
          title: sec.section_title,
          subtitle: sec.section_subtitle,
          categorySlug: catSlug,
          categoryName: catName,
          products,
        };
      })
    );
  }

  // Fallback: If ACF is not populated yet, fetch general live products
  const allProducts = dynamicSections.length === 0 ? await getLiveProducts(32) : [];

  const comboOffers = allProducts.filter(
    (p) =>
      p.name.includes("কম্বো") ||
      p.name.includes("প্যাকেজ") ||
      p.categories.some((c) => c.slug === "offer" || c.slug === "combo-package")
  );

  const pickleProducts = allProducts.filter(
    (p) =>
      p.name.includes("আচার") ||
      p.categories.some((c) => c.slug === "pickle")
  );

  const gurAndHoneyProducts = allProducts.filter(
    (p) =>
      p.name.includes("গুড়") ||
      p.name.includes("মধু") ||
      p.name.includes("তেল") ||
      p.categories.some((c) => c.slug === "gur" || c.slug === "honey" || c.slug === "oil")
  );

  const displayCombos = comboOffers.length > 0 ? comboOffers : allProducts.slice(0, 4);

  // Categories list for slider
  const richCategories: CategoryItem[] = [
    {
      name: "খেজুরের গুড়",
      englishName: "Date Palm Gur",
      itemCount: "১০টি পণ্য",
      image: "https://sadervubon.com/wp-content/uploads/2025/12/combo-package-photo-min-scaled.jpg",
      link: "/category/gur",
    },
    {
      name: "তালের গুড়",
      englishName: "Palm Gur",
      itemCount: "৬টি পণ্য",
      image: "https://sadervubon.com/wp-content/uploads/2025/05/6fc90ced-cce5-4276-bbd3-46f4c1d87841.jpeg",
      link: "/category/taler-gur",
    },
    {
      name: "ঘরোয়া আচার",
      englishName: "Homemade Pickles",
      itemCount: "১১টি পণ্য",
      image: "https://sadervubon.com/wp-content/uploads/2025/08/DSC05987-scaled.jpg",
      link: "/category/pickle",
    },
    {
      name: "খাঁটি মধু",
      englishName: "Raw Honey",
      itemCount: "১৬টি পণ্য",
      image: "https://sadervubon.com/wp-content/uploads/2023/10/k-honey.jpg",
      link: "/category/honey",
    },
    {
      name: "ঘানির সরিষার তেল",
      englishName: "Cold Pressed Oil",
      itemCount: "২টি পণ্য",
      image: "https://sadervubon.com/wp-content/uploads/2023/10/সরিষার-তেল-৫-লিটার.jpg",
      link: "/category/oil",
    },
    {
      name: "আখের গুড়",
      englishName: "Sugarcane Gur",
      itemCount: "৪টি পণ্য",
      image: "https://sadervubon.com/wp-content/uploads/2025/02/IMG_E0957-scaled.jpg",
      link: "/category/gur",
    },
    {
      name: "রাজশাহীর আম",
      englishName: "Rajshahi Mango",
      itemCount: "৮টি পণ্য",
      image: "https://sadervubon.com/wp-content/uploads/2024/05/IMG_9094-scaled.jpg",
      link: "/category/mango",
    },
    {
      name: "ধামাকা অফার ও কম্বো",
      englishName: "Special Combos",
      itemCount: "৩টি পণ্য",
      image: "https://sadervubon.com/wp-content/uploads/2025/12/১৭৫০-টাকা-ডেলিভারি-চার্জ-ফ্রি-1-1.png",
      link: "/category/offer",
    },
  ];

  return (
    <div className="bg-white font-sans overflow-hidden">
      {/* 1. Hero Carousel Slider */}
      <HeroSlider />

      {/* 2. Trust Feature Badges - Floating Glassmorphic Strip */}
      <section className="relative z-20 mt-2 sm:-mt-8 container mx-auto px-4 lg:px-8">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 shadow-xl shadow-emerald-950/5 border border-emerald-100/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* 1. Free Delivery */}
            <div className="flex items-center gap-3 sm:gap-4 group">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-tr from-emerald-50 to-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200/60 group-hover:scale-105 group-hover:bg-emerald-800 group-hover:text-white transition-all duration-300 shadow-2xs">
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <h4 className="font-extrabold text-gray-900 text-sm sm:text-base leading-tight group-hover:text-emerald-800 transition-colors font-heading truncate">
                  সারা দেশে ডেলিভারি
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 font-medium leading-snug mt-0.5">
                  ৳২৫০০+ অর্ডারে ডেলিভারি ফ্রি
                </p>
              </div>
            </div>

            {/* 2. 7 Days Return */}
            <div className="flex items-center gap-3 sm:gap-4 group">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-tr from-emerald-50 to-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200/60 group-hover:scale-105 group-hover:bg-emerald-800 group-hover:text-white transition-all duration-300 shadow-2xs">
                <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <h4 className="font-extrabold text-gray-900 text-sm sm:text-base leading-tight group-hover:text-emerald-800 transition-colors font-heading truncate">
                  সহজ রিটার্ন সুবিধা
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 font-medium leading-snug mt-0.5">
                  পছন্দ না হলে সমাধান গ্যারান্টি
                </p>
              </div>
            </div>

            {/* 3. Secure Payment */}
            <div className="flex items-center gap-3 sm:gap-4 group">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-tr from-emerald-50 to-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200/60 group-hover:scale-105 group-hover:bg-emerald-800 group-hover:text-white transition-all duration-300 shadow-2xs">
                <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <h4 className="font-extrabold text-gray-900 text-sm sm:text-base leading-tight group-hover:text-emerald-800 transition-colors font-heading truncate">
                  ক্যাশ অন ডেলিভারি
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 font-medium leading-snug mt-0.5">
                  পণ্য হাতে পেয়ে টাকা পরিশোধ
                </p>
              </div>
            </div>

            {/* 4. 24/7 Support */}
            <div className="flex items-center gap-3 sm:gap-4 group">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-tr from-emerald-50 to-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200/60 group-hover:scale-105 group-hover:bg-emerald-800 group-hover:text-white transition-all duration-300 shadow-2xs">
                <Headphones className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <h4 className="font-extrabold text-gray-900 text-sm sm:text-base leading-tight group-hover:text-emerald-800 transition-colors font-heading truncate">
                  ডেডিকেটেড সাপোর্ট
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 font-medium leading-snug mt-0.5">
                  হটলাইন: 01305762659
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Popular Categories Carousel */}
      <section id="categories" className="container mx-auto px-4 lg:px-8 py-16 relative">
        <SectionTitle
          badge="পণ্য সম্ভার"
          title="জনপ্রিয় ক্যাটাগরি সমূহ"
          subtitle="আপনার পরিবারের জন্য বিশুদ্ধ ও স্বাস্থ্যকর খাবার বেছে নিন সহজে"
        />
        <CategorySlider categories={richCategories} />
      </section>

      {/* 4. Dynamic ACF Product Sections or Fallback */}
      {dynamicSections.length > 0 ? (
        dynamicSections.map((section, idx) => {
          if (section.products.length === 0) return null;

          // First section: special luxury gradient accent (great for Deals / Combos / Highlights)
          if (idx === 0) {
            return (
              <section
                key={idx}
                id={`section-${idx}`}
                className="py-20 relative overflow-hidden bg-gradient-to-b from-[#fbf8f0] via-[#f7f2e4] to-[#fbf8f0] border-y border-amber-200/60"
              >
                <div className="absolute top-10 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none animate-blob" />
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-blob animation-delay-2000" />

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                  <div className="text-center max-w-2xl mx-auto mb-12">
                    {section.badge && (
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-900 text-xs sm:text-sm font-black mb-3 shadow-xs">
                        <Flame className="w-4 h-4 text-amber-600 animate-bounce" />
                        <span>{section.badge}</span>
                      </div>
                    )}
                    <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight font-heading mb-2.5">
                      {section.title}
                    </h2>
                    {section.subtitle && (
                      <p className="text-sm sm:text-base text-gray-600 font-medium">
                        {section.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
                    {section.products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {section.categorySlug && (
                    <div className="text-center">
                      <Link
                        href={`/category/${section.categorySlug}`}
                        className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-600 text-white px-8 py-3.5 rounded-2xl font-extrabold text-sm sm:text-base shadow-lg shadow-amber-900/20 hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                      >
                        <span>সকল {section.categoryName || "পণ্য"} দেখুন</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </section>
            );
          }

          // Subsequent sections: clean alternating white & ivory background
          const isEven = idx % 2 === 0;
          return (
            <section
              key={idx}
              id={`section-${idx}`}
              className={`${isEven ? "bg-[#faf9f5] border-t border-gray-200/70" : "bg-white"} py-20 relative`}
            >
              <div className="container mx-auto px-4 lg:px-8">
                <SectionTitle
                  badge={section.badge || "আমাদের সংগ্রহ"}
                  title={section.title}
                  subtitle={section.subtitle || ""}
                />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
                  {section.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {section.categorySlug && (
                  <div className="text-center">
                    <Link
                      href={`/category/${section.categorySlug}`}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <span>সব {section.categoryName || "পণ্য"} দেখুন</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </section>
          );
        })
      ) : (
        /* Fallback Static Sections if ACF is not available */
        <>
          {/* Flash Deals / Special Combo Packages */}
          <section id="combos" className="py-20 relative overflow-hidden bg-gradient-to-b from-[#fbf8f0] via-[#f7f2e4] to-[#fbf8f0] border-y border-amber-200/60">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-900 text-xs sm:text-sm font-black mb-3 shadow-xs">
                  <Flame className="w-4 h-4 text-amber-600 animate-bounce" />
                  <span>ধামাকা অফার ও সাশ্রয়</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight font-heading mb-2.5">
                  স্পেশাল ডিল ও কম্বো প্যাকেজ
                </h2>
                <p className="text-sm sm:text-base text-gray-600 font-medium">
                  সবচেয়ে জনপ্রিয় পণ্যগুলো এক সাথে কিনুন অবিশ্বাস্য সাশ্রয়ী মূল্যে
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
                {displayCombos.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/category/offer"
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-600 text-white px-8 py-3.5 rounded-2xl font-extrabold text-sm sm:text-base shadow-lg shadow-amber-900/20 hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span>সকল কম্বো অফার দেখুন</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Traditional Pickles Collection */}
          {pickleProducts.length > 0 && (
            <section id="pickle" className="container mx-auto px-4 lg:px-8 py-20 relative">
              <SectionTitle
                badge="ঘরোয়া খাঁটি রেসিপি"
                title="ঐতিহ্যবাহী মুখরোচক আচার"
                subtitle="কোনো প্রকার কৃত্রিম রঙ ও রাসায়নিক ছাড়া শতভাগ স্বাস্থ্যসম্মত ঘরোয়া আচার"
              />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
                {pickleProducts.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="text-center">
                <Link
                  href="/category/pickle"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span>সব আচার দেখুন</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          )}

          {/* Gur, Honey & Oil Collection */}
          {gurAndHoneyProducts.length > 0 && (
            <section id="gur" className="bg-[#faf9f5] py-20 border-t border-gray-200/70 relative">
              <div className="container mx-auto px-4 lg:px-8">
                <SectionTitle
                  badge="প্রাকৃতিক মিষ্টি ও পুষ্টি"
                  title="খাঁটি গুড়, চাকভাঙা মধু ও ঘানির তেল"
                  subtitle="সুন্দরবনের গভীর অরণ্যের মধু, রাজশাহীর ঐতিহ্যবাহী খেজুরের গুড় ও কাঠের ঘানির সরিষার তেল"
                />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
                  {gurAndHoneyProducts.slice(0, 8).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <div className="text-center">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <span>আরও পণ্য এক্সপ্লোর করুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* 7. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 8. Customer Reviews & Social Proof */}
      <CustomerReviews />
    </div>
  );
}
