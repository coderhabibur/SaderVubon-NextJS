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
  revalidate?: number;
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

    const revalidateTime = typeof params.revalidate === "number" ? params.revalidate : 120;
    const fetchOptions: RequestInit = revalidateTime === 0 
      ? { headers: getAuthHeader(), cache: "no-store" } 
      : { headers: getAuthHeader(), next: { revalidate: revalidateTime } };

    const res = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products?${query.toString()}`, fetchOptions);

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

    const revalidateTime = typeof params.revalidate === "number" ? params.revalidate : 120;
    const fetchOptions: RequestInit = revalidateTime === 0 
      ? { headers: getAuthHeader(), cache: "no-store" } 
      : { headers: getAuthHeader(), next: { revalidate: revalidateTime } };

    const res = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/products?${query.toString()}`, fetchOptions);

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

export interface ACFHomepageSection {
  section_top_title?: string;
  section_title: string;
  section_subtitle?: string;
  select_category?: {
    term_id: number;
    name: string;
    slug: string;
    count: number;
  } | number;
  products_limit?: string | number;
}

export interface NavMenuItem {
  id?: number | string;
  label: string;
  href: string;
  isSpecial?: boolean;
  parent?: number | string;
  children?: NavMenuItem[];
}

export function buildMenuTree(items: any[]): NavMenuItem[] {
  const itemMap = new Map<number | string, NavMenuItem>();
  const roots: NavMenuItem[] = [];

  const cleanHref = (rawHref: string): string => {
    if (!rawHref) return "/";
    let path = rawHref.split("?")[0].split("#")[0];
    if (path.includes("/category/") || path.includes("/product-category/")) {
      const prefix = path.includes("/category/") ? "/category/" : "/product-category/";
      const parts = path.split(prefix)[1].split("/").filter(Boolean);
      const lastSlug = parts[parts.length - 1];
      if (!lastSlug || lastSlug === "all-products") return "/shop";
      try {
        return `/category/${decodeURIComponent(lastSlug)}`;
      } catch {
        return `/category/${lastSlug}`;
      }
    }
    return path;
  };

  items.forEach((item, idx) => {
    const id = item.id ?? idx;
    itemMap.set(id, {
      id,
      label: item.label || item.title || "",
      href: cleanHref(item.href || item.url || "/"),
      isSpecial: Boolean(item.isSpecial),
      parent: item.parent ? Number(item.parent) : 0,
      children: [],
    });
  });

  items.forEach((item, idx) => {
    const id = item.id ?? idx;
    const current = itemMap.get(id);
    if (!current) return;

    const parentId = current.parent ? Number(current.parent) : 0;
    if (parentId !== 0 && itemMap.has(parentId)) {
      itemMap.get(parentId)!.children!.push(current);
    } else {
      roots.push(current);
    }
  });

  return roots;
}

export const FALLBACK_NAV_ITEMS: NavMenuItem[] = [
  { label: "সকল পণ্য", href: "/shop" },
  { label: "খেজুরের গুড়", href: "/category/khejur-gur" },
  { label: "তালের গুড়", href: "/category/taler-gur" },
  { label: "আখের গুড়", href: "/category/akher-gur" },
  { label: "ঘরোয়া আচার", href: "/category/pickle" },
  { label: "মধু", href: "/category/honey" },
  { label: "রাজশাহীর আম", href: "/category/mango" },
  { label: "🔥 ধামাকা অফার", href: "/category/offer", isSpecial: true },
  { label: "আমাদের সম্পর্কে", href: "/about" },
  { label: "যোগাযোগ", href: "/contact" },
];

export async function getNavigationMenu(): Promise<NavMenuItem[]> {
  try {
    const res = await fetch(`${WORDPRESS_URL}/wp-json/custom/v1/menu`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return FALLBACK_NAV_ITEMS;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return buildMenuTree(data);
    }
    return FALLBACK_NAV_ITEMS;
  } catch (error) {
    console.error("Error fetching navigation menu:", error);
    return FALLBACK_NAV_ITEMS;
  }
}

export interface CategoryItem {
  name: string;
  englishName?: string;
  itemCount: string;
  image: string;
  link: string;
}

export interface ACFHomepageCategoryItem {
  select_category?: {
    term_id?: number;
    name?: string;
    slug?: string;
    count?: number;
  } | number;
  name?: string;
  category_name?: string;
  english_name?: string;
  englishName?: string;
  item_count?: string;
  custom_count?: string;
  image?: string | { url?: string };
  custom_image?: string | { url?: string };
  link?: string;
  custom_link?: string;
}

export const DEFAULT_HOMEPAGE_CATEGORIES: CategoryItem[] = [
  {
    name: "খেজুরের গুড়",
    englishName: "Date Palm Gur",
    itemCount: "১০টি পণ্য",
    image: "https://sadervubon.com/wp-content/uploads/2025/12/combo-package-photo-min-scaled.jpg",
    link: "/category/khejur-gur",
  },
  {
    name: "তালের গুড়",
    englishName: "Palm Gur",
    itemCount: "৬টি পণ্য",
    image: "https://sadervubon.com/wp-content/uploads/2025/05/6fc90ced-cce5-4276-bbd3-46f4c1d87841.jpeg",
    link: "/category/taler-gur",
  },
  {
    name: "আখের গুড়",
    englishName: "Sugarcane Gur",
    itemCount: "৪টি পণ্য",
    image: "https://sadervubon.com/wp-content/uploads/2025/02/IMG_E0957-scaled.jpg",
    link: "/category/akher-gur",
  },
  {
    name: "ঘরোয়া আচার",
    englishName: "Homemade Pickles",
    itemCount: "১১টি পণ্য",
    image: "https://sadervubon.com/wp-content/uploads/2025/08/DSC05987-scaled.jpg",
    link: "/category/pickle",
  },
  {
    name: "মধু",
    englishName: "Raw Honey",
    itemCount: "১৬টি পণ্য",
    image: "https://sadervubon.com/wp-content/uploads/2023/10/k-honey.jpg",
    link: "/category/honey",
  },
  {
    name: "রাজশাহীর আম",
    englishName: "Rajshahi Mango",
    itemCount: "৮টি পণ্য",
    image: "https://sadervubon.com/wp-content/uploads/2024/05/IMG_9094-scaled.jpg",
    link: "/category/mango",
  },
  {
    name: "ঘানির সরিষার তেল",
    englishName: "Cold Pressed Oil",
    itemCount: "২টি পণ্য",
    image: "https://sadervubon.com/wp-content/uploads/2023/10/সরিষার-তেল-৫-লিটার.jpg",
    link: "/category/oil",
  },
  {
    name: "ধামাকা অফার ও কম্বো",
    englishName: "Special Combos",
    itemCount: "৩টি পণ্য",
    image: "https://sadervubon.com/wp-content/uploads/2025/12/১৭৫০-টাকা-ডেলিভারি-চার্জ-ফ্রি-1-1.png",
    link: "/category/offer",
  },
];

export async function getHomepageCategories(): Promise<CategoryItem[]> {
  try {
    const res = await fetch(`${WORDPRESS_URL}/wp-json/custom/v1/homepage-categories`, {
      next: { revalidate: 120 },
    });
    if (!res.ok) return DEFAULT_HOMEPAGE_CATEGORIES;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return DEFAULT_HOMEPAGE_CATEGORIES;
    }

    const toBanglaNum = (num: number | string) =>
      String(num).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d, 10)] || d);

    const categories: CategoryItem[] = data.map((raw: any, idx: number) => {
      // In ACF, raw can be the category term object directly, or wrapped in product_categories / select_category
      const item =
        raw?.product_categories && typeof raw.product_categories === "object"
          ? raw.product_categories
          : raw?.select_category && typeof raw.select_category === "object"
          ? raw.select_category
          : raw;

      const name =
        (typeof raw?.custom_title === "string" && raw.custom_title.trim() !== "" ? raw.custom_title.trim() : null) ||
        (typeof raw?.custom_name === "string" && raw.custom_name.trim() !== "" ? raw.custom_name.trim() : null) ||
        (typeof raw?.category_name === "string" && raw.category_name.trim() !== "" ? raw.category_name.trim() : null) ||
        item?.name ||
        item?.category_name ||
        `ক্যাটাগরি ${toBanglaNum(idx + 1)}`;

      const countNum =
        typeof item?.count === "number"
          ? item.count
          : typeof item?.item_count === "number"
          ? item.item_count
          : null;
      const count =
        countNum !== null
          ? `${toBanglaNum(countNum)}টি পণ্য`
          : typeof item?.item_count === "string"
          ? item.item_count
          : "";

      const slug = item?.slug || "";
      const link = slug ? `/category/${slug}` : item?.link || "/shop";

      // Category image from WooCommerce / fallback
      let imageUrl = "";
      if (typeof item?.image === "string" && item.image.trim() !== "") {
        imageUrl = item.image;
      } else if (item?.image && typeof item.image === "object" && item.image.url) {
        imageUrl = item.image.url;
      } else {
        const matched = DEFAULT_HOMEPAGE_CATEGORIES.find(
          (d) => d.name === name || (slug && d.link.includes(slug))
        );
        imageUrl = matched ? matched.image : "/logo.webp";
      }

      return {
        name,
        itemCount: count,
        image: imageUrl,
        link,
      };
    });

    return categories.length > 0 ? categories : DEFAULT_HOMEPAGE_CATEGORIES;
  } catch (error) {
    console.error("Error fetching ACF homepage categories:", error);
    return DEFAULT_HOMEPAGE_CATEGORIES;
  }
}

export async function getHomepageSections(): Promise<ACFHomepageSection[]> {
  try {
    const res = await fetch(`${WORDPRESS_URL}/wp-json/custom/v1/homepage-sections`, {
      next: { revalidate: 120 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching ACF homepage sections:", error);
    return [];
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

export function normalizeCategorySlug(str: string): string {
  if (!str) return "";
  try {
    return decodeURIComponent(str).trim().normalize("NFC").toLowerCase().replace(/[\s_]+/g, "-");
  } catch {
    return str.trim().normalize("NFC").toLowerCase().replace(/[\s_]+/g, "-");
  }
}

export const CATEGORY_ALIAS_MAP: Record<string, string[]> = {
  "khejur-gur": [
    "khejur-gur",
    "khejurer-gur",
    "khejur",
    "gur",
    "date-palm-gur",
    "খেজুরের-গুড়",
    "খেজুরের-গুড়",
    "খেজুরের গুড়",
    "খেজুরের গুড়",
    "খেজরের-গুড়",
    "খেজরের-গুড়",
    "খেজরের গুড়",
    "খেজরের গুড়",
    "খেজুর",
  ],
  "taler-gur": [
    "taler-gur",
    "taler",
    "palm-gur",
    "তালের-গুড়",
    "তালের-গুড়",
    "তালের গুড়",
    "তালের গুড়",
    "তালের-রস",
    "তাল",
  ],
  "akher-gur": [
    "akher-gur",
    "aakher-gur",
    "akher",
    "sugarcane-gur",
    "আখের-গুড়",
    "আখের-গুড়",
    "আখের গুড়",
    "আখের গুড়",
    "আখ",
  ],
  honey: ["honey", "modhu", "সুন্দরবনের-মধু", "মধু", "খাঁটি-মধু", "চাকের-মধু"],
  pickle: ["pickle", "achar", "আচার", "ঘরোয়া-আচার", "ঘরোয়া-আচার", "ঘরোয়া আচার", "ঘরোয়া আচার"],
  oil: ["oil", "shorisha-tel", "সরিষার-তেল", "ঘানির-তেল", "ঘানির তেল", "ঘানির সরিষার তেল", "তেল"],
  mango: ["mango", "aam", "আম", "রাজশাহীর-আম", "রাজশাহীর আম"],
  offer: ["offer", "dhaka-offer", "অফার", "ধামাকা-অফার", "ধামাকা অফার"],
};

export function doCategorySlugsMatch(slugA?: string | null, slugB?: string | null): boolean {
  if (!slugA || !slugB) return false;
  const normA = normalizeCategorySlug(slugA);
  const normB = normalizeCategorySlug(slugB);
  if (normA === normB) return true;

  for (const [canonical, aliases] of Object.entries(CATEGORY_ALIAS_MAP)) {
    const normCanonical = normalizeCategorySlug(canonical);
    const normAliases = aliases.map(normalizeCategorySlug);
    const inA = normA === normCanonical || normAliases.includes(normA);
    const inB = normB === normCanonical || normAliases.includes(normB);
    if (inA && inB) {
      return true;
    }
  }
  return false;
}

export function findCategoryBySlugOrName(
  categories: { id: number; name: string; slug: string; count?: number }[],
  identifier: string
): { id: number; name: string; slug: string; count?: number } | undefined {
  if (!identifier || identifier === "all" || identifier === "all-products") return undefined;

  const target = normalizeCategorySlug(identifier);

  // If user requests gur or khejur-gur, prioritize specific khejur-gur category (not generic parent gur)
  if (target === "gur" || target === "khejur-gur" || target.includes("khejur") || target.includes("খেজুর")) {
    const khejur = categories.find((c) => {
      const s = normalizeCategorySlug(c.slug);
      const n = normalizeCategorySlug(c.name);
      return (s.includes("khejur") || n.includes("খেজুর")) && s !== "gur" && n !== "gur";
    });
    if (khejur) return khejur;
  }

  // 1. Direct slug match (normalized) - exclude generic 'gur'
  let found = categories.find(
    (c) => normalizeCategorySlug(c.slug) === target && normalizeCategorySlug(c.slug) !== "gur"
  );
  if (found) return found;

  // 2. Direct name match (normalized) - exclude generic 'gur'
  found = categories.find(
    (c) => normalizeCategorySlug(c.name) === target && normalizeCategorySlug(c.name) !== "gur"
  );
  if (found) return found;

  // 3. Match by numeric ID
  if (!isNaN(Number(identifier))) {
    found = categories.find((c) => c.id === Number(identifier));
    if (found) return found;
  }

  // 4. Fallback Aliases (in case URL uses English or Bengali synonyms / common typos)
  for (const [canonicalSlug, aliases] of Object.entries(CATEGORY_ALIAS_MAP)) {
    const normCanonical = normalizeCategorySlug(canonicalSlug);
    const normAliases = aliases.map(normalizeCategorySlug);
    if (target === normCanonical || normAliases.includes(target)) {
      found = categories.find((c) => {
        const cSlugNorm = normalizeCategorySlug(c.slug);
        const cNameNorm = normalizeCategorySlug(c.name);
        if (cSlugNorm === "gur" || cNameNorm === "gur") return false;
        return (
          cSlugNorm === normCanonical ||
          normAliases.includes(cSlugNorm) ||
          cNameNorm === normCanonical ||
          normAliases.includes(cNameNorm)
        );
      });
      if (found) return found;
    }
  }

  // 5. Final fallback to direct match
  return categories.find(
    (c) => normalizeCategorySlug(c.slug) === target || normalizeCategorySlug(c.name) === target
  );
}

export async function getLiveCategories(): Promise<{ id: number; name: string; slug: string; count: number }[]> {
  try {
    const res = await fetch(
      `${WORDPRESS_URL}/wp-json/wc/v3/products/categories?per_page=100&hide_empty=true`,
      {
        headers: getAuthHeader(),
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) return [];
    const list: any[] = await res.json();
    return list.map((c) => {
      let decodedSlug = c.slug;
      try {
        decodedSlug = decodeURIComponent(c.slug);
      } catch {}
      return {
        id: c.id,
        name: c.name,
        slug: decodedSlug,
        count: c.count,
      };
    });
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

