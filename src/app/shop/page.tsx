import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { ShopClientView } from "./ShopClientView";
import { getFilteredProductsWithPagination, getLiveCategories } from "@/lib/woocommerce";

export const metadata: Metadata = {
  title: "শপ - সকল প্রাকৃতিক খাদ্য সামগ্রী | স্বাদের ভুবন",
  description: "গ্রাম-বাংলার ১০০% খাঁটি ও বিশুদ্ধ প্রাকৃতিক খাদ্য সামগ্রী। সুন্দরবনের চাকভাঙা মধু, খাঁটি খেজুরের গুড়, ঘানির সরিষার তেল ও ঘরোয়া আচার।",
};

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    min_price?: string;
    max_price?: string;
    page?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams.category || "all";
  const currentSort = resolvedParams.sort || "newest";
  const minPrice = resolvedParams.min_price;
  const maxPrice = resolvedParams.max_price;
  const page = resolvedParams.page ? Number(resolvedParams.page) : 1;

  const categories = await getLiveCategories();

  // Determine category ID if filtering by slug
  let categoryId: number | undefined;
  if (currentCategory && currentCategory !== "all") {
    const matched = categories.find(
      (c) => c.slug.toLowerCase() === currentCategory.toLowerCase()
    );
    if (matched) {
      categoryId = matched.id;
    }
  }

  // Determine sort parameters
  let orderby: "date" | "price" | "popularity" | "title" = "date";
  let order: "asc" | "desc" = "desc";

  if (currentSort === "price_asc") {
    orderby = "price";
    order = "asc";
  } else if (currentSort === "price_desc") {
    orderby = "price";
    order = "desc";
  }

  const { products, total, totalPages, currentPage } = await getFilteredProductsWithPagination({
    category: categoryId,
    min_price: minPrice,
    max_price: maxPrice,
    orderby,
    order,
    page,
    per_page: 12,
  });

  return (
    <div className="bg-gray-50 flex-1 py-6 sm:py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* 1. Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4 sm:mb-6 font-medium">
          <Link href="/" className="hover:text-brand-green transition">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">শপ (সকল পণ্য)</span>
        </nav>

        {/* 2. Page Header Banner */}
        <div className="bg-gradient-to-r from-[#062b1e] via-[#083a29] to-[#062b1e] rounded-3xl p-6 sm:p-10 text-white shadow-sm mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-yellow text-xs font-black mb-3 border border-brand-yellow/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>১০০% প্রাকৃতিক ও বিশুদ্ধ খাদ্যসম্ভার</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white mb-2">
              স্বাদের ভুবন শপ (সকল পণ্য)
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm sm:leading-relaxed">
              সরাসরি নির্ভরযোগ্য কৃষক ও মৌয়ালদের থেকে সংগৃহীত নির্ভেজাল প্রাকৃতিক পণ্য। সারা দেশে ক্যাশ অন ডেলিভারিতে দ্রুত পৌঁছে দিচ্ছি আপনার দরজায়।
            </p>
          </div>
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
        </div>

        {/* 3. 2-Column Layout with Filter Sidebar & AJAX Pagination */}
        <ShopClientView
          categories={categories}
          products={products}
          currentCategory={currentCategory}
          currentSort={currentSort}
          minPrice={minPrice}
          maxPrice={maxPrice}
          total={total}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
