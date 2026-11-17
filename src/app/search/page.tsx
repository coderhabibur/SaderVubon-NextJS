import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Search, ShoppingBag } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { getFilteredProducts, LiveProduct } from "@/lib/woocommerce";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    sort?: string;
  }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `"${q}" এর অনুসন্ধান ফলাফল | স্বাদের ভুবন` : "পণ্য অনুসন্ধান | স্বাদের ভুবন",
    description: "স্বাদের ভুবনে আপনার পছন্দের খাঁটি ও পুষ্টিকর খাবারগুলো সহজেই খুঁজে নিন।",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, sort } = await searchParams;
  const query = q?.trim() || "";
  const currentSort = sort || "newest";

  // Sorting
  let orderby: "date" | "price" | "popularity" | "title" = "date";
  let order: "asc" | "desc" = "desc";

  if (currentSort === "price_asc") {
    orderby = "price";
    order = "asc";
  } else if (currentSort === "price_desc") {
    orderby = "price";
    order = "desc";
  }

  const products: LiveProduct[] = query
    ? await getFilteredProducts({
        search: query,
        orderby,
        order,
        per_page: 36,
      })
    : [];

  const popularKeywords = ["মধু", "খেজুরের গুড়", "সরিষার তেল", "আচার", "ঘি", "পাটালি গুড়"];

  return (
    <div className="bg-gray-50 flex-1 py-6 sm:py-10">
      <div className="container mx-auto px-4 lg:px-8">
        {/* 1. Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4 sm:mb-6 font-medium">
          <Link href="/" className="hover:text-brand-green transition">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/shop" className="hover:text-brand-green transition">
            শপ
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">অনুসন্ধান ফলাফল</span>
        </nav>

        {/* 2. Search Query Title Banner */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                অনুসন্ধান
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-950 mt-1">
                {query ? (
                  <>
                    <span className="text-brand-green">“{query}”</span> সংক্রান্ত ফলাফল
                  </>
                ) : (
                  "পণ্য অনুসন্ধান করুন"
                )}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {query
                  ? `মোট ${products.length} টি পণ্য খুঁজে পাওয়া গেছে`
                  : "আপনার কাঙ্ক্ষিত পণ্যের নাম লিখে সার্চ করুন"}
              </p>
            </div>

            {/* Popular search pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-gray-400">জনপ্রিয় সার্চ:</span>
              {popularKeywords.map((kw) => (
                <Link
                  key={kw}
                  href={`/search?q=${encodeURIComponent(kw)}`}
                  className="px-3 py-1 rounded-full bg-gray-100 hover:bg-emerald-50 hover:text-brand-green text-gray-700 text-xs font-bold transition"
                >
                  {kw}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Product Grid or Empty State */}
        {products.length > 0 ? (
          <div>
            {/* Sort Controls */}
            <div className="bg-white rounded-2xl border border-gray-200 p-3.5 mb-6 shadow-xs flex items-center justify-between">
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                প্রদর্শিত হচ্ছে <strong className="text-gray-950 font-bold">{products.length}</strong> টি পণ্য
              </p>

              <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs font-bold">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}&sort=newest`}
                  className={`px-3 py-1 rounded-lg transition ${
                    currentSort === "newest"
                      ? "bg-white text-gray-900 shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  নতুন
                </Link>
                <Link
                  href={`/search?q=${encodeURIComponent(query)}&sort=price_asc`}
                  className={`px-3 py-1 rounded-lg transition ${
                    currentSort === "price_asc"
                      ? "bg-white text-gray-900 shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  দাম: কম ➔ বেশি
                </Link>
                <Link
                  href={`/search?q=${encodeURIComponent(query)}&sort=price_desc`}
                  className={`px-3 py-1 rounded-lg transition ${
                    currentSort === "price_desc"
                      ? "bg-white text-gray-900 shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  দাম: বেশি ➔ কম
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center max-w-md mx-auto my-12 shadow-xs">
            <div className="w-20 h-20 bg-emerald-50 text-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 stroke-[1.8]" />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-2">
              {query ? `“${query}” দিয়ে কোনো পণ্য পাওয়া যায়নি` : "অনুসন্ধানের জন্য কীওয়ার্ড লিখুন"}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
              বানান সঠিক আছে কিনা নিশ্চিত করুন অথবা অন্য কোনো কি-ওয়ার্ড (যেমন: মধু, গুড়, তেল) দিয়ে চেষ্টা করুন।
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-xs transition"
            >
              সকল পণ্য দেখুন
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
