import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { ShopClientView } from "@/app/shop/ShopClientView";
import { getFilteredProductsWithPagination, getLiveCategories, LiveProduct } from "@/lib/woocommerce";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    sort?: string;
    min_price?: string;
    max_price?: string;
    page?: string;
  }>;
}

const CATEGORY_NAMES_BN: Record<string, { title: string; subtitle: string }> = {
  gur: {
    title: "খেজুর ও আখের খাঁটি গুড়",
    subtitle: "যশোরের ঐতিহ্যবাহী দানাদার ও ঝোলা খেজুরের গুড় এবং অর্গানিক আখের গুড়। কোনো প্রকার চিনি বা হাইড্রোজ ছাড়া ১০০% খাঁটি।",
  },
  honey: {
    title: "সুন্দরবনের প্রাকৃতিক চাকভাঙা মধু",
    subtitle: "সুন্দরবনের গভীর অরণ্যের খলিসা, গরান ও কালোজিরা ফুলের ১০০% অপরিশোধিত ও খাঁটি চাকের মধু।",
  },
  oil: {
    title: "কাঠের ঘানির খাঁটি সরিষার তেল",
    subtitle: "দেশি মাঘী সরিষা থেকে কাঠের ঘানিতে ভাঙানো প্রথম চাপের শতভাগ ঝাঁঝালো ও প্রাকৃতিক সরিষার তেল।",
  },
  pickle: {
    title: "মুখরোচক ঘরোয়া স্পেশাল আচার",
    subtitle: "ঘরোয়া পরিবেশে রৌদ্রে শুকিয়ে তৈরি জিভে জল আনা বরই, তেঁতুল, বোম্বাই মরিচ ও রসুনের আচার।",
  },
  mango: {
    title: "রাজশাহীর মিষ্টি ও নির্ভেজাল আম",
    subtitle: "বাগান থেকে সরাসরি পেড়ে আনা ফরমালিন ও কেমিক্যালমুক্ত মিষ্টি এবং সুস্বাদু জাতের আম।",
  },
  offer: {
    title: "স্পেশাল অফার ও কম্বো প্যাকেজ",
    subtitle: "স্বাদের ভুবনের সেরা পণ্যগুলোর সমন্বয়ে আকর্ষণীয় সাশ্রয়ী কম্বো প্যাকেজ ও বিশেষ ছাড়।",
  },
  "all-products": {
    title: "সকল পণ্য সম্ভার",
    subtitle: "গ্রাম-বাংলার খাঁটি ও বিশুদ্ধ প্রাকৃতিক খাদ্য সামগ্রী এক ঠিকানায়।",
  },
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const bnInfo = CATEGORY_NAMES_BN[decodedSlug.toLowerCase()];

  const title = bnInfo ? `${bnInfo.title} | স্বাদের ভুবন` : `${decodedSlug} ক্যাটাগরি | স্বাদের ভুবন`;
  const description = bnInfo?.subtitle || "স্বাদের ভুবনের ১০০% খাঁটি ও প্রাকৃতিক খাদ্য সামগ্রী।";

  return {
    title,
    description,
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const decodedSlug = decodeURIComponent(slug);
  const currentSort = resolvedSearchParams.sort || "newest";
  const minPrice = resolvedSearchParams.min_price;
  const maxPrice = resolvedSearchParams.max_price;
  const page = resolvedSearchParams.page ? Number(resolvedSearchParams.page) : 1;

  const categories = await getLiveCategories();
  const currentCat = categories.find(
    (c) => c.slug.toLowerCase() === decodedSlug.toLowerCase()
  );

  // If no category found in WC, still check if it matches our supported slugs
  const categoryId = currentCat?.id;

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

  const { products, total, totalPages, currentPage } = await getFilteredProductsWithPagination({
    category: categoryId,
    min_price: minPrice,
    max_price: maxPrice,
    orderby,
    order,
    page,
    per_page: 12,
  });

  const bnInfo = CATEGORY_NAMES_BN[decodedSlug.toLowerCase()] || {
    title: currentCat?.name || decodedSlug,
    subtitle: "স্বাদের ভুবনের ১০০% খাঁটি ও ভেজালমুক্ত প্রাকৃতিক পণ্য।",
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 sm:py-10">
      <div className="container mx-auto px-4 max-w-7xl">
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
          <span className="text-gray-900 font-bold">{bnInfo.title}</span>
        </nav>

        {/* 2. Category Hero Banner */}
        <div className="bg-gradient-to-r from-[#062b1e] via-[#083a29] to-[#062b1e] rounded-3xl p-6 sm:p-10 text-white shadow-sm mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-yellow text-xs font-black mb-3 border border-brand-yellow/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ক্যাটাগরি সংগ্রহ</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white mb-2">
              {bnInfo.title}
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm sm:leading-relaxed">
              {bnInfo.subtitle}
            </p>
          </div>
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
        </div>

        {/* 3. 2-Column Layout with Filter Sidebar & AJAX Pagination */}
        <ShopClientView
          categories={categories}
          products={products}
          currentCategory={decodedSlug}
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
