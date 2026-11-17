import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailsView } from "@/components/ProductDetailsView";
import { SectionTitle } from "@/components/SectionTitle";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { getProductBySlug, getRelatedProducts, getProductVariations, getLiveProducts } from "@/lib/woocommerce";
import { siteConfig } from "@/config/site";
import { ChevronRight, Home } from "lucide-react";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const products = await getLiveProducts(30);
    return products.map((p) => ({
      slug: p.slug,
    }));
  } catch {
    return [];
  }
}

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ").trim();
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const product = await getProductBySlug(decodedSlug);

  if (!product) {
    return {
      title: "পণ্য পাওয়া যায়নি | স্বাদের ভুবন",
      description: "স্বাদের ভুবনে এই মুহূর্তে পণ্যটি খুঁজে পাওয়া যায়নি।",
    };
  }

  const cleanDesc = product.short_description
    ? stripHtml(product.short_description)
    : `${product.name} - ১০০% খাঁটি ও প্রাকৃতিক উপাদান দিয়ে তৈরি। ক্যাশ অন ডেলিভারিতে অর্ডার করুন স্বাদের ভুবন থেকে।`;

  const primaryImage = product.images[0]?.src || `${siteConfig.url}/logo.webp`;
  const productUrl = `${siteConfig.url}/product/${encodeURIComponent(slug)}`;

  return {
    title: `${product.name} (মূল্য: ৳${product.price})`,
    description: cleanDesc,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${product.name} - ৳${product.price} | ${siteConfig.name}`,
      description: cleanDesc,
      url: productUrl,
      type: "website",
      images: [
        {
          url: primaryImage,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - ৳${product.price} | ${siteConfig.name}`,
      description: cleanDesc,
      images: [primaryImage],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const product = await getProductBySlug(decodedSlug);

  if (!product) {
    notFound();
  }

  // Fetch variations if product is variable
  const variations = product.type === "variable" ? await getProductVariations(product.id) : [];

  const categoryIds = product.categories.map((c) => c.id);
  const relatedProducts = await getRelatedProducts(categoryIds, product.id);

  // Schema.org Product structured data
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) => img.src),
    description: product.short_description ? stripHtml(product.short_description) : product.name,
    sku: product.sku || `SV-${product.id}`,
    brand: {
      "@type": "Brand",
      name: siteConfig.englishName,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "28",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/product/${encodeURIComponent(slug)}`,
      priceCurrency: "BDT",
      price: product.price || "0",
      itemCondition: "https://schema.org/NewCondition",
      availability: product.stock_status === "instock" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    },
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      ...(product.categories.length > 0
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: product.categories[0].name,
              item: `${siteConfig.url}/category/${product.categories[0].slug}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: product.name,
              item: `${siteConfig.url}/product/${encodeURIComponent(slug)}`,
            },
          ]
        : [
            {
              "@type": "ListItem",
              position: 2,
              name: product.name,
              item: `${siteConfig.url}/product/${encodeURIComponent(slug)}`,
            },
          ]),
    ],
  };

  return (
    <div className="bg-white font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-200/80 py-3">
        <div className="container mx-auto px-4 lg:px-8">
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 overflow-x-auto">
              <Link href="/" className="hover:text-brand-green flex items-center gap-1 shrink-0">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />

              {product.categories.length > 0 && (
                <>
                  <Link href={`/#${product.categories[0].slug}`} className="hover:text-brand-green shrink-0">
                    {product.categories[0].name}
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                </>
              )}

              <span className="text-gray-900 font-bold truncate max-w-xs sm:max-w-md">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Product Details Section */}
      <section className="container mx-auto px-4 lg:px-8 py-3 sm:py-6">
          <ProductDetailsView product={product} variations={variations} />
          <RecentlyViewed
            currentProduct={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: parseFloat(product.price || "0"),
              regularPrice: product.regular_price ? parseFloat(product.regular_price) : undefined,
              image: product.images[0]?.src || "/placeholder.jpg",
            }}
          />
        </section>

        {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="bg-gray-50/70 border-t border-gray-200 py-8 sm:py-12">
          <div className="container mx-auto px-4 lg:px-8">
              <SectionTitle
                badge="সংশ্লিষ্ট পণ্য"
                title="আপনার আরও পছন্দ হতে পারে"
                subtitle="খাঁটি ও প্রাকৃতিক খাদ্য সামগ্রীর আরও কিছু পণ্য পরখ করে দেখুন"
              />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
    </div>
  );
}
