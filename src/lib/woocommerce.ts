const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://sadervubon.com";
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

function getAuthHeader(): Record<string, string> {
  if (!CONSUMER_KEY || !CONSUMER_SECRET) {
    return {
      "Content-Type": "application/json",
    };
  }
  const token = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString("base64");
  return {
    Authorization: `Basic ${token}`,
    "Content-Type": "application/json",
  };
}

export interface ProductVariation {
  id: number;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: string;
  attributes: { id: number; name: string; option: string }[];
  image?: { src: string };
}

export interface LiveProduct {
  id: number;
  name: string;
  slug: string;
  type: "simple" | "variable" | "grouped";
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  short_description: string;
  description: string;
  categories: { id: number; name: string; slug: string }[];
  images: { id: number; src: string; alt: string }[];
  stock_status: "instock" | "outofstock";
  sku?: string;
  date_modified?: string;
  rating_count: number;
  average_rating: string;
  attributes?: { id: number; name: string; options: string[]; visible: boolean; variation: boolean }[];
  variations?: number[];
}

export interface ProductQueryParams {
  category?: string | number;
  search?: string;
  min_price?: string | number;
  max_price?: string | number;
  attribute?: string;
  attribute_term?: string | number;
  per_page?: number;
  page?: number;
  orderby?: "date" | "price" | "popularity" | "rating" | "title";
  order?: "asc" | "desc";
  featured?: boolean;
  on_sale?: boolean;
}

export interface AttributeTerm {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface AttributeFilterGroup {
  id: number;
  name: string;
  slug: string;
  terms: AttributeTerm[];
}

export interface PaginatedProductsResult {
  products: LiveProduct[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export async function getFilteredProductsWithPagination(
  params: ProductQueryParams = {}
): Promise<PaginatedProductsResult> {
  const currentPage = Number(params.page) || 1;
  const perPage = Number(params.per_page) || 12;

  try {
    const query = new URLSearchParams();
    query.set("status", "publish");
    query.set("per_page", String(perPage));
    query.set("page", String(currentPage));
    if (params.search) query.set("search", params.search);
    if (params.category) query.set("category", String(params.category));
    if (params.min_price) query.set("min_price", String(params.min_price));
    if (params.max_price) query.set("max_price", String(params.max_price));
    if (params.attribute) query.set("attribute", params.attribute);
    if (params.attribute_term) query.set("attribute_term", String(params.attribute_term));
    if (params.orderby) query.set("orderby", params.orderby);
    if (params.order) query.set("order", params.order);
    if (params.featured) query.set("featured", "true");
    if (params.on_sale) query.set("on_sale", "true");

    const res = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products?${query.toString()}`, {
      headers: getAuthHeader(),
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return { products: [], total: 0, totalPages: 1, currentPage };
    }

    const total = Number(res.headers.get("x-wp-total")) || 0;
    const totalPages = Number(res.headers.get("x-wp-totalpages")) || 1;
    const products: LiveProduct[] = await res.json();

    return {
      products,
      total,
      totalPages,
      currentPage,
    };
  } catch (error) {
    console.error("Error fetching paginated products:", error);
    return { products: [], total: 0, totalPages: 1, currentPage };
  }
}

export async function getFilteredProducts(params: ProductQueryParams = {}): Promise<LiveProduct[]> {
  try {
    const query = new URLSearchParams();
    query.set("status", "publish");
    query.set("per_page", String(params.per_page || 24));
    if (params.page) query.set("page", String(params.page));
    if (params.search) query.set("search", params.search);
    if (params.category) query.set("category", String(params.category));
    if (params.min_price) query.set("min_price", String(params.min_price));
    if (params.max_price) query.set("max_price", String(params.max_price));
    if (params.attribute) query.set("attribute", params.attribute);
    if (params.attribute_term) query.set("attribute_term", String(params.attribute_term));
    if (params.orderby) query.set("orderby", params.orderby);
    if (params.order) query.set("order", params.order);
    if (params.featured) query.set("featured", "true");
    if (params.on_sale) query.set("on_sale", "true");

    const res = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products?${query.toString()}`, {
      headers: getAuthHeader(),
      next: { revalidate: 300 },
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<{ id: number; name: string; slug: string; count: number; description?: string } | null> {
  try {
    const res = await fetch(
      `${WORDPRESS_URL}/wp-json/wc/v3/products/categories?slug=${encodeURIComponent(slug)}`,
      {
        headers: getAuthHeader(),
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) return null;
    const cats = await res.json();
    return cats.length > 0 ? cats[0] : null;
  } catch (error) {
    console.error(`Error fetching category ${slug}:`, error);
    return null;
  }
}

export async function getLiveProducts(limit = 20): Promise<LiveProduct[]> {
  try {
    const res = await fetch(
      `${WORDPRESS_URL}/wp-json/wc/v3/products?per_page=${limit}&status=publish`,
      {
        headers: getAuthHeader(),
        next: { revalidate: 120 },
      }
    );

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching WooCommerce products:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<LiveProduct | null> {
  try {
    const res = await fetch(
      `${WORDPRESS_URL}/wp-json/wc/v3/products?slug=${encodeURIComponent(slug)}`,
      {
        headers: getAuthHeader(),
        next: { revalidate: 120 },
      }
    );

    if (!res.ok) return null;
    const products: LiveProduct[] = await res.json();
    return products.length > 0 ? products[0] : null;
  } catch (error) {
    console.error(`Error fetching product by slug ${slug}:`, error);
    return null;
  }
}

export async function getProductVariations(productId: number): Promise<ProductVariation[]> {
  try {
    const res = await fetch(
      `${WORDPRESS_URL}/wp-json/wc/v3/products/${productId}/variations?per_page=20`,
      {
        headers: getAuthHeader(),
        next: { revalidate: 120 },
      }
    );

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error(`Error fetching variations for product ${productId}:`, error);
    return [];
  }
}

export async function getRelatedProducts(categoryIds: number[], currentId: number): Promise<LiveProduct[]> {
  try {
    if (!categoryIds.length) return [];
    const res = await fetch(
      `${WORDPRESS_URL}/wp-json/wc/v3/products?category=${categoryIds[0]}&exclude=${currentId}&per_page=4`,
      {
        headers: getAuthHeader(),
        next: { revalidate: 120 },
      }
    );

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

export async function getLiveCategories(): Promise<{ id: number; name: string; slug: string; count: number }[]> {
  try {
    const res = await fetch(
      `${WORDPRESS_URL}/wp-json/wc/v3/products/categories?per_page=15&hide_empty=true`,
      {
        headers: getAuthHeader(),
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export interface CreateOrderPayload {
  customer_id?: number;
  payment_method: string;
  payment_method_title: string;
  set_paid?: boolean;
  status: "processing" | "pending" | "on-hold";
  billing: {
    first_name: string;
    last_name?: string;
    address_1: string;
    city: string;
    country: string;
    phone: string;
    email?: string;
  };
  shipping: {
    first_name: string;
    last_name?: string;
    address_1: string;
    city: string;
    country: string;
    phone?: string;
  };
  line_items: {
    product_id: number;
    variation_id?: number;
    quantity: number;
  }[];
  shipping_lines: {
    method_id: string;
    method_title: string;
    total: string;
  }[];
  customer_note?: string;
}

export interface WcOrderResponse {
  id: number;
  status: string;
  total: string;
  currency: string;
  date_created: string;
  billing: {
    first_name: string;
    phone: string;
    address_1: string;
    city?: string;
  };
  shipping: {
    first_name: string;
    address_1: string;
    city?: string;
  };
  line_items: {
    id: number;
    name: string;
    quantity: number;
    subtotal: string;
    total: string;
    price: number;
  }[];
  shipping_lines: {
    id: number;
    method_title: string;
    total: string;
  }[];
  payment_method_title: string;
  customer_note?: string;
}

export async function createWooCommerceOrder(payload: CreateOrderPayload): Promise<WcOrderResponse> {
  const res = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/orders`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`WooCommerce Order Error (${res.status}): ${errorText}`);
  }

  return await res.json();
}

export async function getLiveAttributesWithTerms(): Promise<AttributeFilterGroup[]> {
  try {
    const res = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products/attributes`, {
      headers: getAuthHeader(),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];
    const attributes: { id: number; name: string; slug: string }[] = await res.json();

    const groups: AttributeFilterGroup[] = await Promise.all(
      attributes.map(async (attr) => {
        try {
          const termsRes = await fetch(
            `${WORDPRESS_URL}/wp-json/wc/v3/products/attributes/${attr.id}/terms?per_page=50&hide_empty=true`,
            {
              headers: getAuthHeader(),
              next: { revalidate: 3600 },
            }
          );
          if (!termsRes.ok) return { ...attr, terms: [] };
          const terms: AttributeTerm[] = await termsRes.json();
          return {
            ...attr,
            terms: terms.filter((t) => t.count > 0),
          };
        } catch {
          return { ...attr, terms: [] };
        }
      })
    );

    return groups.filter((g) => g.terms.length > 0);
  } catch (err) {
    console.error("Error fetching attributes with terms:", err);
    return [];
  }
}

export async function getOrderById(orderId: number | string): Promise<WcOrderResponse | null> {
  try {
    const res = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/orders/${orderId}`, {
      headers: getAuthHeader(),
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    return null;
  }
}

