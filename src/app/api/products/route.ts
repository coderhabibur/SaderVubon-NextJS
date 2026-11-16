import { NextResponse } from "next/server";
import { getFilteredProductsWithPagination, getLiveCategories } from "@/lib/woocommerce";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const min_price = searchParams.get("min_price");
    const max_price = searchParams.get("max_price");
    const sort = searchParams.get("sort") || "newest";
    const search = searchParams.get("search");
    const page = searchParams.get("page") || "1";
    const per_page = searchParams.get("per_page") || "12";

    // Determine category ID if filtering by slug
    let categoryId: number | undefined;
    if (category && category !== "all") {
      const categories = await getLiveCategories();
      const matched = categories.find(
        (c) => c.slug.toLowerCase() === category.toLowerCase()
      );
      if (matched) {
        categoryId = matched.id;
      }
    }

    // Determine sort parameters
    let orderby: "date" | "price" | "popularity" | "title" = "date";
    let order: "asc" | "desc" = "desc";

    if (sort === "price_asc") {
      orderby = "price";
      order = "asc";
    } else if (sort === "price_desc") {
      orderby = "price";
      order = "desc";
    }

    const result = await getFilteredProductsWithPagination({
      category: categoryId,
      min_price: min_price || undefined,
      max_price: max_price || undefined,
      search: search || undefined,
      orderby,
      order,
      page: Number(page),
      per_page: Number(per_page),
    });

    return NextResponse.json(
      {
        success: true,
        products: result.products,
        total: result.total,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
        count: result.products.length,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error: any) {
    console.error("AJAX products fetch error:", error);
    return NextResponse.json(
      { success: false, error: "পণ্য লোড করতে সমস্যা হয়েছে।" },
      { status: 500 }
    );
  }
}
