import { ProductCard } from "@/components/ProductCard";
import { HeroSlider } from "@/components/HeroSlider";
import { CategorySlider, CategoryItem } from "@/components/CategorySlider";
import { SectionTitle } from "@/components/SectionTitle";
import { CustomerReviews } from "@/components/CustomerReviews";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { getLiveProducts } from "@/lib/woocommerce";
import { Rocket, RefreshCw, CreditCard, Headphones, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const allProducts = await getLiveProducts(32);

  // Categorize live products
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
      name: "খাঁটি মধু",
      englishName: "Honey",
      itemCount: "১৬টি পণ্য",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=700&auto=format&fit=crop&q=80",
      link: "#honey",
    },
    {
      name: "খেজুরের গুড়",
      englishName: "Date Palm Gur",
      itemCount: "১০টি পণ্য",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=700&auto=format&fit=crop&q=80",
      link: "#gur",
    },
    {
      name: "আখের গুড়",
      englishName: "Sugarcane Gur",
      itemCount: "৪টি পণ্য",
      image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=700&auto=format&fit=crop&q=80",
      link: "#gur",
    },
    {
      name: "তালের গুড়",
      englishName: "Palm Gur",
      itemCount: "৬টি পণ্য",
      image: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=700&auto=format&fit=crop&q=80",
      link: "#gur",
    },
    {
      name: "স্পেশাল আচার",
      englishName: "Pickle Collection",
      itemCount: "১১টি পণ্য",
      image: "https://sadervubon.com/wp-content/uploads/2026/07/boroi-.webp",
      link: "#pickle",
    },
    {
      name: "ঘানির সরিষার তেল",
      englishName: "Mustard Oil",
      itemCount: "২টি পণ্য",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=700&auto=format&fit=crop&q=80",
      link: "#oil",
    },
    {
      name: "রাজশাহীর আম",
      englishName: "Rajshahi Mango",
      itemCount: "৮টি পণ্য",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=700&auto=format&fit=crop&q=80",
      link: "#mango",
    },
    {
      name: "ধামাকা অফার ও কম্বো",
      englishName: "Special Offers",
      itemCount: "৩টি পণ্য",
      image: "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?w=700&auto=format&fit=crop&q=80",
      link: "#offer",
    },
  ];

  return (
    <div className="bg-white font-sans">
      {/* Section 1: Hero Carousel Slider */}
        <HeroSlider />

        {/* Section 2: Trust Feature Badges - Large, Clean, Modern Cards */}
        <section className="border-b border-gray-200/80 py-8 bg-gray-50/60">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {/* 1. Free Delivery */}
              <div className="flex items-center gap-2.5 sm:gap-4 p-3 sm:p-5 rounded-2xl bg-white border border-gray-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center shrink-0 border border-emerald-100 group-hover:scale-105 group-hover:bg-brand-green group-hover:text-white transition-all duration-300 shadow-2xs">
                  <Rocket className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-black text-gray-900 text-[13px] sm:text-base lg:text-lg leading-tight mb-0.5 sm:mb-1 group-hover:text-brand-green transition-colors truncate sm:whitespace-normal">
                    Free Delivery
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-snug line-clamp-2">
                    ২৫০০৳+ অর্ডারে ফ্রি ডেলিভারি
                  </p>
                </div>
              </div>

              {/* 2. 7 Days Return */}
              <div className="flex items-center gap-2.5 sm:gap-4 p-3 sm:p-5 rounded-2xl bg-white border border-gray-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center shrink-0 border border-emerald-100 group-hover:scale-105 group-hover:bg-brand-green group-hover:text-white transition-all duration-300 shadow-2xs">
                  <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-black text-gray-900 text-[13px] sm:text-base lg:text-lg leading-tight mb-0.5 sm:mb-1 group-hover:text-brand-green transition-colors truncate sm:whitespace-normal">
                    7 Days Return
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-snug line-clamp-2">
                    পণ্যে কোনো সমস্যা হলে রিটার্ন
                  </p>
                </div>
              </div>

              {/* 3. Secure Payment */}
              <div className="flex items-center gap-2.5 sm:gap-4 p-3 sm:p-5 rounded-2xl bg-white border border-gray-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center shrink-0 border border-emerald-100 group-hover:scale-105 group-hover:bg-brand-green group-hover:text-white transition-all duration-300 shadow-2xs">
                  <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-black text-gray-900 text-[13px] sm:text-base lg:text-lg leading-tight mb-0.5 sm:mb-1 group-hover:text-brand-green transition-colors truncate sm:whitespace-normal">
                    Secure Payment
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-snug line-clamp-2">
                    ক্যাশ অন ডেলিভারি সুবিধা
                  </p>
                </div>
              </div>

              {/* 4. 24/7 Support */}
              <div className="flex items-center gap-2.5 sm:gap-4 p-3 sm:p-5 rounded-2xl bg-white border border-gray-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl bg-emerald-50 text-brand-green flex items-center justify-center shrink-0 border border-emerald-100 group-hover:scale-105 group-hover:bg-brand-green group-hover:text-white transition-all duration-300 shadow-2xs">
                  <Headphones className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-black text-gray-900 text-[13px] sm:text-base lg:text-lg leading-tight mb-0.5 sm:mb-1 group-hover:text-brand-green transition-colors truncate sm:whitespace-normal">
                    24/7 Support
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-snug line-clamp-2">
                    হটলাইন: 09613-823813
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Categories Carousel Slider */}
        <section id="categories" className="container mx-auto px-4 py-14">
          <SectionTitle
            badge="পণ্য ক্যাটাগরি"
            title="জনপ্রিয় ক্যাটাগরি সমূহ"
            subtitle="আপনার পছন্দের পুষ্টিকর ও নির্ভেজাল খাবার বেছে নিন সহজে"
          />
          <CategorySlider categories={richCategories} />
        </section>

        {/* Section 4: Flash Deals / Combo Packages */}
        <section id="combos" className="bg-amber-50/40 py-14 border-t border-b border-amber-100/80">
          <div className="container mx-auto px-4">
            <SectionTitle
              badge="ধামাকা ছাড়"
              title="স্পেশাল ডিল ও কম্বো প্যাকেজ"
              subtitle="সাশ্রয়ী মূল্যে পরিবারের সবার জন্য সেরা কম্বো অফার"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {displayCombos.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {/* View All Deals - Brand Green Button */}
            <div className="text-center">
              <Link
                href="#products"
                className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white px-8 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition active:scale-95"
              >
                <span>View All Offers</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 5: Traditional Pickles */}
        {pickleProducts.length > 0 && (
          <section id="pickle" className="container mx-auto px-4 py-14">
            <SectionTitle
              badge="ঘরোয়া রেসিপি"
              title="ঐতিহ্যবাহী স্পেশাল আচার"
              subtitle="কোনো প্রকার কৃত্রিম রং ও রাসায়নিক ছাড়া শতভাগ স্বাস্থ্যসম্মত আচার"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {pickleProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {/* View More Pickles - Brand Green Button */}
            <div className="text-center">
              <Link
                href="#products"
                className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white px-8 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition active:scale-95"
              >
                <span>View More Pickles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        )}

        {/* Section 6: Gur, Honey & Oil */}
        {gurAndHoneyProducts.length > 0 && (
          <section id="gur" className="container mx-auto px-4 py-14 border-t border-gray-100">
            <SectionTitle
              badge="প্রাকৃতিক মিষ্টি ও পুষ্টি"
              title="খাঁটি গুড়, মধু ও ঘানির তেল"
              subtitle="সুন্দরবনের চাকভাঙা মধু, খেজুরের খাঁটি গুড় ও কাঠের ঘানির সরিষার তেল"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {gurAndHoneyProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {/* View More Products - Brand Green Button */}
            <div className="text-center">
              <Link
                href="#products"
                className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white px-8 py-3 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition active:scale-95"
              >
                <span>View More Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        )}

        {/* Section 7: Why Choose Us */}
        <WhyChooseUs />

        {/* Section 8: All Products */}
        <section id="products" className="container mx-auto px-4 py-14">
          <SectionTitle
            badge="আমাদের সম্পূর্ণ সম্ভার"
            title="সকল প্রিমিয়াম পণ্য"
            subtitle="নিরাপদ খাদ্য ও সুস্বাস্থ্যের জন্য বেছে নিন আপনার প্রয়োজনীয় উপাদান"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {allProducts.slice(0, 12).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {/* View All Products - Brand Green Button */}
          <div className="text-center">
            <Link
              href="#products"
              className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white px-9 py-3.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition active:scale-95"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Section 9: Customer Reviews */}
        <CustomerReviews />
    </div>
  );
}
