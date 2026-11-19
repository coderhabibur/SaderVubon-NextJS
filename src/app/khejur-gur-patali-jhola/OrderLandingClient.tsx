"use client";

import { useState, useId, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sparkles,
  Phone,
  MessageCircle,
  Star,
  Plus,
  Minus,
  Check,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  AlertCircle,
  HelpCircle,
  MapPin,
  User,
  FileText,
  Package,
  Layers,
  Flame,
  ZoomIn,
  X,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export interface FunnelProduct {
  id: number;
  name: string;
  weight: string;
  regularPrice: number;
  salePrice: number;
  image: string;
  badge?: string;
  isPopular?: boolean;
}

const DEFAULT_PRODUCTS: FunnelProduct[] = [
  {
    id: 21004,
    name: "খেজুরের গুড়ের কম্বো প্যাকেজ",
    weight: "কম্বো প্যাক",
    regularPrice: 1000,
    salePrice: 800,
    image: "https://sadervubon.com/wp-content/uploads/2025/12/combo-package-photo-min-scaled.jpg",
    badge: "ফ্রি ডেলিভারি",
    isPopular: true,
  },
  {
    id: 6175,
    name: "খেজুরের গোল পাটালি গুড় ১ কেজি",
    weight: "১ কেজি",
    regularPrice: 450,
    salePrice: 300,
    image: "https://sadervubon.com/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-14-at-11.36.57-PM.jpeg",
  },
  {
    id: 4527,
    name: "খেজুরের পাটালি গুড় (ফয়েল) ১ কেজি",
    weight: "১ কেজি",
    regularPrice: 450,
    salePrice: 300,
    image: "https://sadervubon.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-12-26-at-21.41.30_65faf0f2.jpg",
  },
  {
    id: 4529,
    name: "খেজুরের ঝোলা গুড় ১ কেজি",
    weight: "১ কেজি",
    regularPrice: 450,
    salePrice: 300,
    image: "https://sadervubon.com/wp-content/uploads/2025/12/ঝোলা-গুড়-3.jpg",
  },
  {
    id: 4691,
    name: "খেজুরের দানাদার গুড় ১ কেজি",
    weight: "১ কেজি",
    regularPrice: 450,
    salePrice: 300,
    image: "https://sadervubon.com/wp-content/uploads/2025/12/hari-1-1.jpg",
  },
  {
    id: 4532,
    name: "খেজুরের চকলেট গুড় ১ কেজি",
    weight: "১ কেজি",
    regularPrice: 550,
    salePrice: 450,
    image: "https://sadervubon.com/wp-content/uploads/2023/10/WhatsApp-Image-2025-01-14-at-11.15.34-PM.jpeg",
  },
  {
    id: 4530,
    name: "নারিকেল মিশ্রিত খেজুরের গুড় ১ কেজি",
    weight: "১ কেজি",
    regularPrice: 550,
    salePrice: 450,
    image: "https://sadervubon.com/wp-content/uploads/2023/10/WhatsApp-Image-2023-12-26-at-21.41.30_bcb6ad19.jpg",
  },
  {
    id: 20972,
    name: "হাড়িতে খেজুরের দানাদার গুড় (৩ কেজি)",
    weight: "৩ কেজি মাটির হাড়ি",
    regularPrice: 1400,
    salePrice: 900,
    image: "https://sadervubon.com/wp-content/uploads/2025/12/hari-1.jpg",
    badge: "ফ্রি ডেলিভারি",
  },
  {
    id: 20973,
    name: "হাঁড়িতে খেজুরের দানাদার গুড় (৫ কেজি)",
    weight: "৫ কেজি বড় হাড়ি",
    regularPrice: 2200,
    salePrice: 1500,
    image: "https://sadervubon.com/wp-content/uploads/2025/12/hari-1.jpg",
    badge: "ফ্রি ডেলিভারি",
  },
];

export interface ReviewScreenshot {
  id: number;
  image: string; // e.g. "/reviews/review-1.jpg" (public/reviews/ ফোল্ডারে রাখা ছবি)
  alt: string;
}

const REVIEWS: ReviewScreenshot[] = [
  { id: 1, image: "/reviews/review-1.jpeg", alt: "গ্রাহকের ফিডব্যাক রিভিউ ১" },
  { id: 2, image: "/reviews/review-2.jpeg", alt: "গ্রাহকের ফিডব্যাক রিভিউ ২" },
  { id: 3, image: "/reviews/review-3.jpeg", alt: "গ্রাহকের ফিডব্যাক রিভিউ ৩" },
  { id: 4, image: "/reviews/review-1.jpeg", alt: "গ্রাহকের ফিডব্যাক রিভিউ ৩" },
  { id: 5, image: "/reviews/review-2.jpeg", alt: "গ্রাহকের ফিডব্যাক রিভিউ ৩" },
  { id: 6, image: "/reviews/review-3.jpeg", alt: "গ্রাহকের ফিডব্যাক রিভিউ ৩" },
];

const FAQS = [
  {
    question: "আপনাদের খেজুরের গুড় কি সম্পূর্ণ চিনি ও হাইড্রোজ মুক্ত?",
    answer:
      "জ্বী, আলহামদুলিল্লাহ! স্বাদের ভুবনের খেজুরের গুড়ে কোনো প্রকার চিনি, হাইড্রোজ, রাসায়নিক বা কৃত্রিম মিষ্টি মেশানো হয় না। আমরা রাজশাহীর দক্ষ ও বিশ্বস্ত গাছিদের মাধ্যমে ভোরবেলার খাঁটি রস সংগ্রহ করে নিজস্ব তত্ত্বাবধানে মাটির চুলায় সনাতন পদ্ধতিতে জ্বাল দিয়ে গুড় তৈরি করি।",
  },
  {
    question: "ডেলিভারি পেতে কতদিন সময় লাগবে?",
    answer:
      "ঢাকা সিটি কর্পোরেশনের ভিতরে অর্ডার করার ২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডেলিভারি পাবেন। ঢাকা সিটির বাইরে সারা দেশের যেকোনো জেলা ও উপজেলা সদরে ২ থেকে ৩ কার্যদিবসের মধ্যে আপনার ঠিকানায় পার্সেল পৌঁছে যাবে।",
  },
  {
    question: "পণ্য হাতে পেয়ে চেক করে টাকা দেওয়ার সুযোগ আছে কি?",
    answer:
      "হ্যাঁ, অবশ্যই! আমাদের সম্পূর্ণ ক্যাশ অন ডেলিভারি সুবিধা রয়েছে। ডেলিভারি ম্যানের সামনে পার্সেলটি খুলে পণ্যের সঠিকতা ও মান দেখে নিশ্চিত হয়ে সম্পূর্ণ মূল্য পরিশোধ করবেন। অগ্রিম কোনো টাকা দিতে হবে না।",
  },
  {
    question: "ডেলিভারির সময় গুড়ের পাত্র ভেঙে বা নষ্ট হলে কী করবেন?",
    answer:
      "আমরা ফুড-গ্রেড কন্টেইনার এবং মাল্টিপল লেয়ার বাবল র‍্যাপ করে সর্বোচ্চ সুরক্ষায় প্যাকেট করি। এরপরেও ডেলিভারির সময় অনাকাঙ্ক্ষিত কোনো ক্ষতি হলে আমাদের হটলাইনে জানালে আমরা সম্পূর্ণ ফ্রিতে নতুন গুড় পাঠিয়ে দেব অথবা সম্পূর্ণ মূল্য ফেরত দেব।",
  },
  {
    question: "ডেলিভারি চার্জ কত এবং ফ্রি ডেলিভারি কীভাবে পাওয়া যাবে?",
    answer:
      "ঢাকার ভেতরে ডেলিভারি চার্জ মাত্র ৭০ টাকা এবং ঢাকার বাইরে সারা দেশে ১৩০ টাকা। তবে 'ফ্রি ডেলিভারি' চিহ্নিত কম্বো বা বিশেষ প্যাকেজগুলো অর্ডার করলে ডেলিভারি সম্পূর্ণ ফ্রি!",
  },
];

const HERO_SHOWCASES: Record<
  "artisan" | "combo" | "patali" | "jhola",
  {
    id: "artisan" | "combo" | "patali" | "jhola";
    tabLabel: string;
    title: string;
    subtitle: string;
    image: string;
    badge: string;
    productId: number | null;
  }
> = {
  artisan: {
    id: "artisan",
    tabLabel: "👨‍🌾 গাছিদের চুলা",
    title: "গাছিদের হাতে খাঁটি গুড় তৈরি",
    subtitle: "মাটির চুলায় কাঠের আগুনে জ্বাল দেওয়া আসল সুবাস",
    image: "/images/hero-gur-farmer.jpg",
    badge: "১০০% সনাতন ও খাঁটি",
    productId: null,
  },
  combo: {
    id: "combo",
    tabLabel: "🎁 স্পেশাল কম্বো",
    title: "খেজুরের গুড়ের অল-ইন-ওয়ান কম্বো",
    subtitle: "একসাথে পাটালি, ঝোলা ও দানাদার গুড়ের সেরা স্বাদ",
    image: "https://sadervubon.com/wp-content/uploads/2025/12/combo-package-photo-min-scaled.jpg",
    badge: "🔥 বেস্টসেলার • ফ্রি ডেলিভারি",
    productId: 21004,
  },
  patali: {
    id: "patali",
    tabLabel: "🫓 খাঁটি পাটালি",
    title: "ঐতিহ্যবাহী দানাদার গোল পাটালি",
    subtitle: "চিনি ছাড়া প্রাকৃতিকভাবে শক্ত জমাট বাঁধা আসল পাটালি গুড়",
    image: "https://sadervubon.com/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-14-at-11.36.57-PM.jpeg",
    badge: "শীতের সেরা পছন্দ",
    productId: 6175,
  },
  jhola: {
    id: "jhola",
    tabLabel: "🍯 সোনালী ঝোলা",
    title: "ঘন সোনালী তরল ঝোলা গুড়",
    subtitle: "চিতই ও ভাপা পিঠায় খাওয়ার জন্য অতুলনীয় আসল সুবাস",
    image: "https://sadervubon.com/wp-content/uploads/2025/12/ঝোলা-গুড়-3.jpg",
    badge: "পিঠার সেরা সঙ্গী",
    productId: 4529,
  },
};

export function OrderLandingClient({ initialProducts }: { initialProducts?: FunnelProduct[] }) {
  const router = useRouter();
  const products = initialProducts && initialProducts.length > 0 ? initialProducts : DEFAULT_PRODUCTS;

  // Selected products state: map of productId -> quantity (0 means unselected)
  // Default: pre-select the popular item (id 21904) with quantity 1
  const [selectedItems, setSelectedItems] = useState<Record<number, number>>(() => {
    const popular = products.find((p) => p.isPopular) || products[0];
    return { [popular.id]: 1 };
  });

  // Hero interactive tab state
  const [activeHeroTab] = useState<"artisan" | "combo" | "patali" | "jhola">("artisan");

  // Form Fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryZone, setDeliveryZone] = useState<"inside_dhaka" | "outside_dhaka">("inside_dhaka");
  const [customerNote, setCustomerNote] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [highlightedProductId, setHighlightedProductId] = useState<number | null>(null);

  const orderFormRef = useRef<HTMLDivElement>(null);
  const pricingSliderRef = useRef<HTMLDivElement>(null);
  const [canScrollPricingLeft, setCanScrollPricingLeft] = useState(false);
  const [canScrollPricingRight, setCanScrollPricingRight] = useState(true);
  const [pricingActiveIndex, setPricingActiveIndex] = useState(0);

  const checkPricingScroll = () => {
    if (pricingSliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = pricingSliderRef.current;
      setCanScrollPricingLeft(scrollLeft > 10);
      setCanScrollPricingRight(scrollLeft + clientWidth < scrollWidth - 10);
      const step = clientWidth >= 1024 ? clientWidth / 4 : clientWidth >= 640 ? clientWidth / 2.5 : clientWidth * 0.8;
      const index = Math.round(scrollLeft / (step || 280));
      setPricingActiveIndex(Math.min(products.length - 1, Math.max(0, index)));
    }
  };

  useEffect(() => {
    checkPricingScroll();
    window.addEventListener("resize", checkPricingScroll);
    return () => window.removeEventListener("resize", checkPricingScroll);
  }, [products]);

  // Typewriter Animation for "নিরাপদ খেজুরের গুড়" (text লেখার মতো টাইপিং অ্যানিমেশন)
  const TYPEWRITER_PHRASES = ["নিরাপদ খেজুরের গুড়"];
  const [typewriterText, setTypewriterText] = useState("নিরাপদ খেজুরের গুড়");
  const [isDeletingTypewriter, setIsDeletingTypewriter] = useState(false);
  const [typewriterIndex, setTypewriterIndex] = useState(0);

  // Start typing from empty after client mounts
  useEffect(() => {
    setTypewriterText("");
  }, []);

  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[typewriterIndex % TYPEWRITER_PHRASES.length];
    const segmenter = typeof Intl !== "undefined" && (Intl as any).Segmenter
      ? new (Intl as any).Segmenter("bn", { granularity: "grapheme" })
      : null;
    const graphemes: string[] = segmenter
      ? Array.from(segmenter.segment(currentPhrase)).map((s: any) => s.segment)
      : Array.from(currentPhrase);

    let timer: NodeJS.Timeout;

    if (!isDeletingTypewriter) {
      const currentGraphemes: string[] = segmenter
        ? Array.from(segmenter.segment(typewriterText)).map((s: any) => s.segment)
        : Array.from(typewriterText);

      if (currentGraphemes.length < graphemes.length) {
        timer = setTimeout(() => {
          setTypewriterText(graphemes.slice(0, currentGraphemes.length + 1).join(""));
        }, 140);
      } else {
        timer = setTimeout(() => {
          setIsDeletingTypewriter(true);
        }, 3200);
      }
    } else {
      const currentGraphemes: string[] = segmenter
        ? Array.from(segmenter.segment(typewriterText)).map((s: any) => s.segment)
        : Array.from(typewriterText);

      if (currentGraphemes.length > 0) {
        timer = setTimeout(() => {
          setTypewriterText(graphemes.slice(0, currentGraphemes.length - 1).join(""));
        }, 65);
      } else {
        timer = setTimeout(() => {
          setIsDeletingTypewriter(false);
          setTypewriterIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
        }, 400);
      }
    }

    return () => clearTimeout(timer);
  }, [typewriterText, isDeletingTypewriter, typewriterIndex]);

  const scrollPricing = (direction: "left" | "right") => {
    if (pricingSliderRef.current) {
      const scrollStep = pricingSliderRef.current.clientWidth >= 1024
        ? pricingSliderRef.current.clientWidth / 2
        : pricingSliderRef.current.clientWidth * 0.8;
      pricingSliderRef.current.scrollBy({
        left: direction === "left" ? -scrollStep : scrollStep,
        behavior: "smooth",
      });
      setTimeout(checkPricingScroll, 350);
    }
  };

  const scrollToPricingIndex = (index: number) => {
    if (pricingSliderRef.current) {
      const cards = pricingSliderRef.current.children;
      if (cards && cards[index]) {
        (cards[index] as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
        setTimeout(checkPricingScroll, 350);
        return;
      }
      const step = pricingSliderRef.current.clientWidth >= 640 ? 304 : 276;
      pricingSliderRef.current.scrollTo({
        left: index * step,
        behavior: "smooth",
      });
      setTimeout(checkPricingScroll, 350);
    }
  };

  // Review Slider State & Handlers
  const reviewSliderRef = useRef<HTMLDivElement>(null);
  const [canScrollReviewLeft, setCanScrollReviewLeft] = useState(false);
  const [canScrollReviewRight, setCanScrollReviewRight] = useState(true);
  const [reviewActiveIndex, setReviewActiveIndex] = useState(0);
  const [selectedReviewImage, setSelectedReviewImage] = useState<string | null>(null);

  const checkReviewScroll = () => {
    if (reviewSliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = reviewSliderRef.current;
      setCanScrollReviewLeft(scrollLeft > 10);
      setCanScrollReviewRight(scrollLeft + clientWidth < scrollWidth - 10);
      const cardWidth = clientWidth >= 1024 ? 310 : clientWidth >= 640 ? 280 : 240;
      const index = Math.round(scrollLeft / (cardWidth + 16));
      setReviewActiveIndex(Math.min(REVIEWS.length - 1, Math.max(0, index)));
    }
  };

  useEffect(() => {
    checkReviewScroll();
    window.addEventListener("resize", checkReviewScroll);
    return () => window.removeEventListener("resize", checkReviewScroll);
  }, []);

  const scrollReview = (direction: "left" | "right") => {
    if (reviewSliderRef.current) {
      const scrollStep = reviewSliderRef.current.clientWidth >= 1024
        ? 326
        : reviewSliderRef.current.clientWidth * 0.8;
      reviewSliderRef.current.scrollBy({
        left: direction === "left" ? -scrollStep : scrollStep,
        behavior: "smooth",
      });
      setTimeout(checkReviewScroll, 350);
    }
  };

  const scrollToReviewIndex = (index: number) => {
    if (reviewSliderRef.current) {
      const cardWidth = reviewSliderRef.current.clientWidth >= 1024 ? 310 : reviewSliderRef.current.clientWidth >= 640 ? 280 : 240;
      reviewSliderRef.current.scrollTo({
        left: index * (cardWidth + 16),
        behavior: "smooth",
      });
      setTimeout(checkReviewScroll, 350);
    }
  };

  // Scroll to checkout form helper
  const scrollToOrderForm = (focusProductId?: number) => {
    if (focusProductId) {
      setSelectedItems((prev) => ({
        ...prev,
        [focusProductId]: (prev[focusProductId] || 0) > 0 ? prev[focusProductId] : 1,
      }));
      setHighlightedProductId(focusProductId);
      setTimeout(() => setHighlightedProductId(null), 2500);
    }
    if (orderFormRef.current) {
      orderFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Toggle selection
  const handleToggleProduct = (product: FunnelProduct) => {
    setSelectedItems((prev) => {
      const currentQty = prev[product.id] || 0;
      if (currentQty > 0) {
        // If unchecking this would leave 0 items, warn or keep at least 1
        const remainingKeys = Object.keys(prev).filter((k) => Number(k) !== product.id && prev[Number(k)] > 0);
        if (remainingKeys.length === 0) {
          // Keep at least 1 item selected
          return prev;
        }
        const copy = { ...prev };
        delete copy[product.id];
        return copy;
      } else {
        return { ...prev, [product.id]: 1 };
      }
    });
  };

  // Change quantity
  const handleQuantityChange = (productId: number, delta: number) => {
    setSelectedItems((prev) => {
      const current = prev[productId] || 0;
      const next = current + delta;
      if (next <= 0) {
        // Don't unselect if it's the only one
        const activeCount = Object.values(prev).filter((q) => q > 0).length;
        if (activeCount <= 1) {
          return { ...prev, [productId]: 1 };
        }
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: next };
    });
  };

  // Calculations
  const selectedProductList = products
    .filter((p) => (selectedItems[p.id] || 0) > 0)
    .map((p) => ({
      product: p,
      quantity: selectedItems[p.id],
      lineTotal: p.salePrice * selectedItems[p.id],
    }));

  const subtotal = selectedProductList.reduce((sum, item) => sum + item.lineTotal, 0);
  const totalItemCount = selectedProductList.reduce((sum, item) => sum + item.quantity, 0);

  const hasFreeDeliveryItem = selectedProductList.some(
    (item) => item.product.badge === "ফ্রি ডেলিভারি"
  );
  const isFreeShipping = hasFreeDeliveryItem || subtotal >= 2500;
  const shippingFee = isFreeShipping ? 0 : deliveryZone === "inside_dhaka" ? 70 : 130;
  const grandTotal = subtotal + shippingFee;

  // Submit Order to API
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!name.trim()) {
      setFormError("অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।");
      return;
    }

    const cleanPhone = phone.replace(/[^\d+]/g, "");
    const bdPhoneRegex = /^(?:\+88|88)?01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(cleanPhone)) {
      setFormError("অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নাম্বার লিখুন (যেমন: 017XXXXXXXX)।");
      return;
    }

    if (!address.trim() || address.trim().length < 5) {
      setFormError("অনুগ্রহ করে আপনার বিস্তারিত ডেলিভারি ঠিকানা (বাসা, রোড, এলাকা) লিখুন।");
      return;
    }

    if (selectedProductList.length === 0) {
      setFormError("অনুগ্রহ করে অন্তত একটি গুড় বা কম্বো সিলেক্ট করুন।");
      return;
    }

    setIsSubmitting(true);

    try {
      const payloadItems = selectedProductList.map(({ product, quantity }) => ({
        productId: product.id,
        name: product.name,
        price: product.salePrice,
        quantity,
        image: product.image,
      }));

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: cleanPhone,
          address: address.trim(),
          city: deliveryZone === "inside_dhaka" ? "Dhaka" : "Outside Dhaka",
          deliveryZone,
          customerNote: customerNote.trim(),
          items: payloadItems,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "অর্ডার প্রক্রিয়াকরণে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }

      // Success redirect
      router.push(`/order-success/${data.orderId}`);
    } catch (err: any) {
      console.error("Funnel Order error:", err);
      setFormError(err.message || "দুঃখিত, সংযোগে ত্রুটি হয়েছে। অনুগ্রহ করে মোবাইল নম্বর চেক করে আবার চেষ্টা করুন।");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#faf9f6] text-[#18201a] font-sans min-h-screen">
      {/* 2. ULTRA-PREMIUM CLEAN LIGHT HERO FUNNEL SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F6EFE6] to-[#EFE4D4] text-gray-900 pt-6 pb-20 sm:pb-24 border-b border-[#E5D4C4]">
        {/* Soft Warm Khejur Gur Molasses Ambient Lighting */}
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-[#8B3A14]/[0.08] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-10 right-0 w-[600px] h-[600px] bg-[#B45309]/[0.07] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[400px] bg-[#5C240D]/[0.06] rounded-full blur-[130px] pointer-events-none" />

        {/* Delicate Texture Pattern */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #5C240D 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Light Glassmorphic Brand Navigation Bar */}
          <div className="flex items-center justify-between p-3.5 sm:px-6 sm:py-3.5 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-md border border-[#E5D4C4] shadow-md shadow-[#3B170B]/5 mb-8 sm:mb-12">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-md border border-[#DEC7B2] group-hover:scale-105 transition-transform duration-300">
                <div className="relative w-full h-full">
                  <Image
                    src="/logo.webp"
                    alt={siteConfig.name}
                    fill
                    sizes="52px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-gray-950 block leading-tight font-heading group-hover:text-[#8B3A14] transition-colors">
                  {siteConfig.name}
                </span>
                <span className="text-[7.5px] sm:text-[9px] font-bold text-[#8B3A14] block tracking-wider uppercase mt-0.5">
                  best in taste & purity
                </span>
              </div>
            </Link>

            {/* Middle Badge (Desktop) */}
            <div className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF2E8] border border-[#E5D4C4] text-[#522110] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
              <span>ঐতিহ্যবাহী রাজশাহীর খাঁটি গুড়</span>
            </div>

            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="group inline-flex items-center gap-2.5 sm:gap-3 bg-gradient-to-r from-[#7c2d12] via-[#993b16] to-[#7c2d12] hover:from-[#66230c] hover:to-[#66230c] text-white pl-2 sm:pl-2.5 pr-4 sm:pr-5 py-1.5 sm:py-2 rounded-full shadow-lg shadow-[#7c2d12]/30 hover:shadow-xl hover:shadow-[#7c2d12]/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-[#c25e18]/60"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#7c2d12] flex items-center justify-center shrink-0 shadow-md border border-white/60 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7c2d12] stroke-[2.5]" />
              </div>
              <div className="text-left leading-tight">
                <span className="text-[10px] sm:text-[11px] font-black text-[#FDECD5] block leading-none pb-0.5 tracking-wide">
                  অর্ডার করতে কল করুন
                </span>
                <span className="text-xs sm:text-sm font-black text-white font-mono block tracking-tight leading-tight">
                  {siteConfig.contact.phone}
                </span>
              </div>
            </a>
          </div>

          {/* Centered Luxury Hero Presentation Flow */}
          <div className="max-w-4xl xl:max-w-5xl mx-auto flex flex-col items-center text-center">
            {/* 1. Social Proof & Star Rating */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#FAF1E6] border border-[#E5D0BC] text-[#4A1D0B] text-xs sm:text-sm font-bold mb-4 shadow-2xs whitespace-nowrap">
              <div className="flex items-center text-[#D97706] shrink-0">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current text-[#D97706]" />
                ))}
              </div>
              <span className="font-bold">৪.৯/৫ রেটিং (৫,০০০+ পরিবারের বিশ্বস্ত পছন্দ)</span>
            </div>

            {/* 2. High-Impact Headline Banner (Our New Luxury Molasses Style) */}
            <div className="w-full max-w-3xl mx-auto bg-gradient-to-r from-[#7A2E12] via-[#943916] to-[#7A2E12] rounded-2xl sm:rounded-3xl p-4 sm:p-6 sm:px-8 border-2 border-[#C25E18]/80 shadow-xl shadow-[#7A2E12]/20 mb-5 sm:mb-6">
              <h1 className="text-lg sm:text-2xl md:text-[26px] font-black text-white leading-relaxed sm:leading-snug font-heading tracking-tight">
                আমাদের গ্রামের দক্ষ গাছি দ্বারা আমরা নিরাপদ খেজুর রস থেকে খেজুরের গুড় উৎপাদন করে থাকি।{" "}
                <span className="text-[#FFD88D] inline-block font-black underline decoration-amber-400/60 decoration-2 underline-offset-4">
                  তাই নিশ্চিন্তে অর্ডার করুন
                </span>
              </h1>
              <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/25 border border-white/15 text-xs sm:text-sm text-amber-200 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>শতভাগ খাঁটি ও নির্ভেজাল {typewriterText || "খেজুরের গুড়"}</span>
              </div>
            </div>

            {/* 3. Action CTA Button with Glace Animation */}
            <div className="mb-8 sm:mb-10 w-full flex justify-center">
              <button
                type="button"
                onClick={() => scrollToOrderForm()}
                className="animate-btn-pulse relative overflow-hidden group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#8B3A14] via-[#A8471B] to-[#8B3A14] hover:from-[#722E11] hover:to-[#722E11] text-white font-black text-base sm:text-xl px-10 py-4 sm:py-4.5 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_14px_28px_-6px_rgba(139,58,20,0.45)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_18px_34px_-6px_rgba(139,58,20,0.55)] transition-all duration-300 cursor-pointer border-2 border-[#C25E18]"
              >
                {/* Glace Shine Light Beam */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none w-full h-full overflow-hidden rounded-2xl"
                >
                  <span className="absolute top-0 -left-[150%] w-[120%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-[25deg] animate-glace" />
                </span>

                <ShoppingBag className="w-5 sm:w-6 h-5 sm:h-6 text-white stroke-[2.2] group-hover:scale-110 transition-transform duration-200 relative z-10" />
                <span className="relative z-10">অর্ডার করতে চাই</span>
                <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 stroke-[2.5] group-hover:translate-x-1.5 transition-transform duration-200 relative z-10" />
              </button>
            </div>

            {/* 4. Centerpiece Showcase Frame: Authentic Farmer & Gur Photo */}
            <div className="relative max-w-xl sm:max-w-2xl lg:max-w-3xl w-full mx-auto">
              {/* Multi-layered Ambient Animated Glow Behind Frame */}
              <div
                className="absolute -inset-4 bg-gradient-to-tr from-[#8B3A14]/25 via-amber-400/20 to-emerald-600/15 rounded-[2.5rem] blur-2xl pointer-events-none animate-pulse"
                style={{ animationDuration: "4s" }}
              />

              {/* Top Center Floating Sparkle Orb */}
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 w-8 h-8 rounded-full bg-white shadow-md border border-amber-200 flex items-center justify-center animate-bounce"
                style={{ animationDuration: "3.5s" }}
              >
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: "8s" }} />
              </div>

              {/* Luxury Light Frame */}
              <div className="relative rounded-[2rem] sm:rounded-[2.5rem] p-3 sm:p-4.5 bg-white border-2 border-[#E5D4C4] shadow-2xl shadow-[#3B170B]/10">
                {/* Floating Top Badges (Mobile-friendly: Diagonal placement on mobile to prevent overlap, corner-to-corner on desktop) */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 animate-float-slow">
                  <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/95 border border-amber-200/90 text-[#6B280F] text-[11px] sm:text-xs font-black shadow-lg backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                    🌾 ১০০% প্রাকৃতিক ও নির্ভেজাল
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 sm:bottom-auto sm:top-6 sm:right-6 z-20 animate-float-reverse">
                  <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-[#8B3A14] to-[#C25E18] text-white text-[11px] sm:text-xs font-black shadow-lg border border-amber-300/40">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                    </span>
                    🔥 আজকের তাজা স্টক
                  </span>
                </div>

                {/* Main Showcase Image Container */}
                <div className="relative aspect-[16/10] sm:aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#F8EFE4] border border-[#DEC7B2] group">
                  <Image
                    src="/images/hero-gur-farmer.jpg"
                    alt="আমাদের গ্রামের গাছি ও খাঁটি খেজুরের গুড়"
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover object-center transition-all duration-700 group-hover:scale-105"
                    priority
                    unoptimized
                  />
                  {/* Subtle aesthetic gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Shape 1: 5-Star Premium Quality Card (Bottom Left) */}
                <div className="hidden sm:flex absolute -bottom-4 -left-3 sm:-bottom-5 sm:-left-5 z-30 p-2.5 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-amber-200/90 shadow-[0_14px_35px_rgba(139,58,20,0.18)] items-center gap-2.5 sm:gap-3 hover:scale-105 transition-all duration-300 cursor-default animate-float-slow">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-[#8B3A14] to-[#C25E18] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#8B3A14]/30">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1 text-amber-500 text-xs mb-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-[10px] sm:text-[11px] font-black text-gray-800 ml-1">৫.০</span>
                    </div>
                    <p className="text-xs sm:text-sm font-black text-gray-950 font-heading leading-tight">
                      শতভাগ খাঁটি খেজুরের গুড়
                    </p>
                    <p className="text-[10px] text-emerald-700 font-bold">
                      ✓ প্রিমিয়াম কোয়ালিটি নিশ্চয়তা
                    </p>
                  </div>
                </div>

                {/* Floating Shape 2: Verified COD Purity Seal (Bottom Right) */}
                <div className="hidden sm:flex absolute -bottom-4 -right-3 sm:-bottom-5 sm:-right-5 z-30 p-2 sm:p-2.5 rounded-2xl bg-gradient-to-tr from-[#063b23] to-[#0d6437] text-white shadow-[0_14px_30px_rgba(6,59,35,0.25)] border-2 border-emerald-400/40 items-center gap-2 hover:scale-105 transition-all duration-300 cursor-default animate-float-reverse">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/15 backdrop-blur-xs flex items-center justify-center text-amber-300 shrink-0">
                    <ShieldCheck className="w-4 h-4 text-emerald-300 stroke-[2.5]" />
                  </div>
                  <div className="text-left pr-1">
                    <span className="text-[9px] font-bold text-emerald-200 block uppercase tracking-wider leading-none">
                      ক্যাশ অন ডেলিভারি
                    </span>
                    <span className="text-xs font-black text-white block mt-0.5 leading-tight">
                      টেস্ট করে টাকা দিন
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reassurance Text Under Image (Clean & unboxed like reference image) */}
            <p className="mt-7 sm:mt-9 text-sm sm:text-base md:text-lg font-bold text-[#4A1D0B] flex items-center justify-center gap-2 text-center px-4">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>কোনো অগ্রিম পেমেন্ট ছাড়াই অর্ডার করুন! ডেলিভারি ম্যানের সামনে দেখে ও টেস্ট করে টাকা পরিশোধ করুন</span>
            </p>
          </div>
        </div>
      </section>

      {/* 3. FOUR ELEVATED TRUST PILLARS RIBBON */}
      <section className="relative z-20 -mt-8 sm:-mt-10 max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-5 shadow-[0_20px_50px_rgba(59,23,11,0.06)] border border-[#E5D4C4]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
            {/* 1. Pure Product */}
            <div className="bg-[#FAF7F2] hover:bg-[#F6EDE2] border border-[#E5D4C4] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-3.5 flex items-center gap-2.5 sm:gap-3 transition-all">
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-lg sm:rounded-xl bg-[#8B3A14]/10 text-[#8B3A14] flex items-center justify-center shrink-0 border border-[#DEC7B2] shadow-2xs">
                <ShieldCheck className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm md:text-base font-black text-gray-950 leading-tight whitespace-nowrap">১০০% খাঁটি পণ্য</h4>
                <p className="text-[10px] sm:text-[11px] lg:text-xs text-gray-600 mt-0.5 leading-snug md:whitespace-nowrap">কোনো ক্ষতিকর কেমিক্যাল নেই</p>
              </div>
            </div>

            {/* 2. Cash on Delivery */}
            <div className="bg-[#FAF7F2] hover:bg-[#F6EDE2] border border-[#E5D4C4] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-3.5 flex items-center gap-2.5 sm:gap-3 transition-all">
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-lg sm:rounded-xl bg-emerald-500/10 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-300/60 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm md:text-base font-black text-gray-950 leading-tight whitespace-nowrap">ক্যাশ অন ডেলিভারি</h4>
                <p className="text-[10px] sm:text-[11px] lg:text-xs text-gray-600 mt-0.5 leading-snug md:whitespace-nowrap">পণ্য দেখে টাকা পরিশোধ</p>
              </div>
            </div>

            {/* 3. Fast Delivery */}
            <div className="bg-[#FAF7F2] hover:bg-[#F6EDE2] border border-[#E5D4C4] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-3.5 flex items-center gap-2.5 sm:gap-3 transition-all">
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-lg sm:rounded-xl bg-[#8B3A14]/10 text-[#8B3A14] flex items-center justify-center shrink-0 border border-[#DEC7B2] shadow-2xs">
                <Truck className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm md:text-base font-black text-gray-950 leading-tight whitespace-nowrap">দ্রুত ডেলিভারি</h4>
                <p className="text-[10px] sm:text-[11px] lg:text-xs text-gray-600 mt-0.5 leading-snug md:whitespace-nowrap">সারা দেশে হোম ডেলিভারি</p>
              </div>
            </div>

            {/* 4. Easy Return */}
            <div className="bg-[#FAF7F2] hover:bg-[#F6EDE2] border border-[#E5D4C4] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-3.5 flex items-center gap-2.5 sm:gap-3 transition-all">
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-lg sm:rounded-xl bg-emerald-500/10 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-300/60 shadow-2xs">
                <RotateCcw className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm md:text-base font-black text-gray-950 leading-tight whitespace-nowrap">সহজ রিটার্ন</h4>
                <p className="text-[10px] sm:text-[11px] lg:text-xs text-gray-600 mt-0.5 leading-snug md:whitespace-nowrap">সমস্যা হলে দ্রুত রিপ্লেসমেন্ট</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PRODUCT PRICING & DIRECT ORDER CARDS ("আমাদের গুড়ের মূল্য তালিকা") */}
      <section className="py-12 sm:py-16 bg-[#faf9f6]">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300 mb-2">
              খাঁটি ও তাজা স্টক
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-950 font-heading">
              আমাদের গুড়ের মূল্য তালিকা
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-brand-green to-amber-500 mx-auto my-3 rounded-full" />
            <p className="text-gray-600 text-sm sm:text-base">
              পছন্দের গুড় নির্বাচন করে সরাসরি বাটনে ক্লিক করলেই নিচের অর্ডার ফর্মে যুক্ত হবে
            </p>
          </div>

          {/* Slider Outer Container */}
          <div className="relative group/slider">
            {/* Left Floating Arrow Button */}
            <button
              type="button"
              onClick={() => scrollPricing("left")}
              disabled={!canScrollPricingLeft}
              aria-label="পূর্ববর্তী পণ্যসমূহ"
              className={`flex absolute left-0 sm:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 text-emerald-950 shadow-xl border border-amber-300/80 items-center justify-center transition-all duration-300 ${
                canScrollPricingLeft
                  ? "opacity-100 hover:bg-brand-green hover:text-white hover:scale-110 cursor-pointer"
                  : "opacity-0 sm:opacity-30 pointer-events-none cursor-default"
              }`}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </button>

            {/* Right Floating Arrow Button */}
            <button
              type="button"
              onClick={() => scrollPricing("right")}
              disabled={!canScrollPricingRight}
              aria-label="পরবর্তী পণ্যসমূহ"
              className={`flex absolute right-0 sm:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 text-emerald-950 shadow-xl border border-amber-300/80 items-center justify-center transition-all duration-300 ${
                canScrollPricingRight
                  ? "opacity-100 hover:bg-brand-green hover:text-white hover:scale-110 cursor-pointer shadow-amber-500/20"
                  : "opacity-0 sm:opacity-30 pointer-events-none cursor-default"
              }`}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </button>

            {/* Horizontal Scrollable Track */}
            <div
              ref={pricingSliderRef}
              onScroll={checkPricingScroll}
              className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory py-3 px-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {products.map((p) => {
                const isSelected = (selectedItems[p.id] || 0) > 0;
                const discount = p.regularPrice > p.salePrice ? p.regularPrice - p.salePrice : 0;

                return (
                  <div
                    key={p.id}
                    className={`w-[260px] sm:w-[280px] lg:w-[calc(25%-18px)] shrink-0 snap-start bg-white rounded-xl sm:rounded-2xl border-2 transition-all duration-300 flex flex-col overflow-hidden shadow-xs hover:shadow-luxury group ${
                      isSelected
                        ? "border-brand-green ring-2 ring-brand-green/20"
                        : "border-gray-200 hover:border-amber-400"
                    }`}
                  >
                    {/* Image with Premium Badges */}
                    <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 260px, (max-width: 1024px) 280px, 320px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Left Badge (e.g. ফ্রি ডেলিভারি) */}
                      {p.badge && (
                        <div className="absolute top-2.5 left-2.5 z-10">
                          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md shadow-amber-950/20 border border-amber-300/50">
                            <Truck className="w-3 h-3 text-amber-200" />
                            <span>{p.badge}</span>
                          </span>
                        </div>
                      )}

                      {/* Right Discount Badge */}
                      {discount > 0 && (
                        <div className="absolute top-2.5 right-2.5 z-10">
                          <span className="inline-flex items-center gap-0.5 bg-[#042418]/90 backdrop-blur-md text-amber-300 border border-amber-400/50 text-[11px] font-black px-2.5 py-1 rounded-full shadow-md shadow-emerald-950/30">
                            <Flame className="w-3 h-3 text-amber-400" />
                            <span>৳{discount} ছাড়</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-gray-500 block mb-1">{p.weight}</span>
                        <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-brand-green transition-colors min-h-[38px]">
                          {p.name}
                        </h3>
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-100">
                        {/* Price Row */}
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="text-base sm:text-xl font-black text-brand-green">
                            ৳{p.salePrice}
                          </span>
                          {p.regularPrice > p.salePrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ৳{p.regularPrice}
                            </span>
                          )}
                        </div>

                        {/* Select & Scroll Button - Matching Order Button Color */}
                        <button
                          type="button"
                          onClick={() => scrollToOrderForm(p.id)}
                          className={`w-full py-2.5 px-3 sm:px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 cursor-pointer shadow-md whitespace-nowrap ${
                            isSelected
                              ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-gray-950 shadow-glow-gold hover:scale-[1.02] active:scale-98 border border-amber-300"
                              : "bg-gradient-to-r from-[#8B3A14] via-[#A8471B] to-[#8B3A14] hover:from-[#722E11] hover:to-[#722E11] text-white shadow-[#8B3A14]/25 hover:shadow-lg hover:shadow-[#8B3A14]/35 hover:scale-[1.02] active:scale-98 border border-[#C25E18]"
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3] text-gray-950 shrink-0" />
                              <span className="whitespace-nowrap">সিলেক্ট করা আছে</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[2.2] shrink-0" />
                              <span className="whitespace-nowrap">অর্ডার করুন</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Swipe Hint + Pagination Controls */}
            <div className="flex md:hidden items-center justify-between mt-4 px-2">
              {/* Mobile Prev Button */}
              <button
                type="button"
                onClick={() => scrollPricing("left")}
                disabled={!canScrollPricingLeft}
                aria-label="পূর্ববর্তী পণ্যসমূহ"
                className={`p-2 rounded-xl border border-amber-200 bg-white shadow-xs text-gray-700 transition-colors flex items-center gap-1 text-xs font-bold ${
                  canScrollPricingLeft
                    ? "hover:bg-amber-50 active:bg-amber-100 text-gray-900"
                    : "opacity-30 cursor-default"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>আগেরটি</span>
              </button>

              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5">
                {products.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToPricingIndex(idx)}
                    aria-label={`পণ্য ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      pricingActiveIndex === idx
                        ? "w-6 h-2 bg-gradient-to-r from-amber-500 to-brand-green"
                        : "w-2 h-2 bg-amber-200 hover:bg-amber-300"
                    }`}
                  />
                ))}
              </div>

              {/* Mobile Next Button */}
              <button
                type="button"
                onClick={() => scrollPricing("right")}
                disabled={!canScrollPricingRight}
                aria-label="পরবর্তী পণ্যসমূহ"
                className={`p-2 rounded-xl border border-amber-200 bg-white shadow-xs text-gray-700 transition-colors flex items-center gap-1 text-xs font-bold ${
                  canScrollPricingRight
                    ? "hover:bg-amber-50 active:bg-amber-100 text-gray-900 bg-amber-50/50"
                    : "opacity-30 cursor-default"
                }`}
              >
                <span>পরেরটি</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER REVIEWS & TESTIMONIALS SECTION */}
      <section className="py-12 sm:py-16 bg-white border-y border-gray-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 mb-2">
              প্রকৃত ক্রেতাদের অভিজ্ঞতা
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-950 font-heading">
              সম্মানিত গ্রাহকদের রিভিউ
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-brand-green mx-auto my-3 rounded-full" />
            <p className="text-gray-600 text-sm sm:text-base">
              হোয়াটসঅ্যাপ ও মেসেঞ্জারে সরাসরি পাঠানো আমাদের সম্মানিত গ্রাহকদের ফিডব্যাক স্ক্রিনশট
            </p>
          </div>

          {/* Stats Bar */}
          <div className="bg-[#faf9f6] border border-amber-200/80 rounded-2xl p-4 sm:p-5 mb-10 max-w-4xl mx-auto shadow-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-x divide-gray-200">
              <div className="px-2">
                <p className="text-xl sm:text-2xl font-black text-amber-600">৪.৯ / ৫.০</p>
                <p className="text-xs text-gray-600 mt-0.5">গ্রাহক সন্তুষ্টি রেটিং</p>
              </div>
              <div className="px-2">
                <p className="text-xl sm:text-2xl font-black text-brand-green">১০০% খাঁটি</p>
                <p className="text-xs text-gray-600 mt-0.5">ভেজালমুক্ত প্রাকৃতিক গুড়</p>
              </div>
              <div className="px-2">
                <p className="text-xl sm:text-2xl font-black text-amber-600">১২,৫০০+</p>
                <p className="text-xs text-gray-600 mt-0.5">সফল ডেলিভারি সম্পন্ন</p>
              </div>
              <div className="px-2">
                <p className="text-xl sm:text-2xl font-black text-brand-green">০ হিডেন চার্জ</p>
                <p className="text-xs text-gray-600 mt-0.5">ক্যাশ অন হোম ডেলিভারি</p>
              </div>
            </div>

          </div>

          {/* Review Slider Container */}
          <div className="relative group/reviewslider">
            {/* Left Floating Arrow Button (Desktop) */}
            <button
              type="button"
              onClick={() => scrollReview("left")}
              disabled={!canScrollReviewLeft}
              aria-label="পূর্ববর্তী রিভিউ"
              className={`hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-emerald-950 shadow-xl border border-amber-300/80 items-center justify-center transition-all duration-300 ${
                canScrollReviewLeft
                  ? "hover:bg-brand-green hover:text-white hover:scale-110 cursor-pointer"
                  : "opacity-30 pointer-events-none cursor-default"
              }`}
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* Right Floating Arrow Button (Desktop) */}
            <button
              type="button"
              onClick={() => scrollReview("right")}
              disabled={!canScrollReviewRight}
              aria-label="পরবর্তী রিভিউ"
              className={`hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 text-emerald-950 shadow-xl border border-amber-300/80 items-center justify-center transition-all duration-300 ${
                canScrollReviewRight
                  ? "hover:bg-brand-green hover:text-white hover:scale-110 cursor-pointer"
                  : "opacity-30 pointer-events-none cursor-default"
              }`}
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* Horizontal Scrollable Track */}
            <div
              ref={reviewSliderRef}
              onScroll={checkReviewScroll}
              className={`flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory py-4 px-1 ${
                REVIEWS.length <= 3 ? "md:justify-center" : ""
              }`}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {REVIEWS.map((r, idx) => (
                <div
                  key={r.id || idx}
                  onClick={() => setSelectedReviewImage(r.image)}
                  className="w-[240px] sm:w-[280px] md:w-[310px] shrink-0 snap-start bg-white border-2 border-amber-200/90 hover:border-brand-green p-1.5 sm:p-2 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group/card flex flex-col"
                  title="বড় করে দেখতে ক্লিক করুন"
                >
                  <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100">
                    <Image
                      src={r.image}
                      alt={r.alt || `কাস্টমার রিভিউ স্ক্রিনশট ${idx + 1}`}
                      fill
                      sizes="(max-width: 640px) 240px, (max-width: 768px) 280px, 310px"
                      className="object-cover object-top transition-transform duration-500 group-hover/card:scale-105"
                    />
                    {/* Hover Zoom Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3 backdrop-blur-[1px]">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-emerald-950 text-xs font-bold shadow-lg">
                        <ZoomIn className="w-3.5 h-3.5 text-brand-green" />
                        <span>বড় করে দেখুন</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Bottom Controls: Dots & Mobile Buttons */}
            <div className="flex items-center justify-between sm:justify-center gap-3 mt-6">
              {/* Mobile Prev Button */}
              <button
                type="button"
                onClick={() => scrollReview("left")}
                disabled={!canScrollReviewLeft}
                aria-label="পূর্ববর্তী রিভিউ"
                className={`md:hidden p-2 rounded-xl border border-amber-200 bg-white shadow-xs text-gray-700 transition-colors ${
                  canScrollReviewLeft ? "hover:bg-amber-50 active:bg-amber-100" : "opacity-30 cursor-default"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5">
                {REVIEWS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToReviewIndex(idx)}
                    aria-label={`রিভিউ ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      reviewActiveIndex === idx
                        ? "w-6 h-2 bg-gradient-to-r from-amber-500 to-brand-green"
                        : "w-2 h-2 bg-amber-200 hover:bg-amber-300"
                    }`}
                  />
                ))}
              </div>

              {/* Mobile Next Button */}
              <button
                type="button"
                onClick={() => scrollReview("right")}
                disabled={!canScrollReviewRight}
                aria-label="পরবর্তী রিভিউ"
                className={`md:hidden p-2 rounded-xl border border-amber-200 bg-white shadow-xs text-gray-700 transition-colors ${
                  canScrollReviewRight ? "hover:bg-amber-50 active:bg-amber-100" : "opacity-30 cursor-default"
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 7. THE MAIN 1-PAGE CHECKOUT FORM SECTION */}
      <section ref={orderFormRef} id="order-form" className="py-12 sm:py-20 bg-[#faf9f6]">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Main Checkout Container with Luxurious Golden & Forest Green Border - Optimized Width */}
          <div className="max-w-5xl mx-auto bg-white rounded-3xl border-3 border-amber-500 shadow-luxury overflow-hidden">
            {/* Top Form Header Strip - Clean Warm Luxury Style */}
            <div className="bg-gradient-to-b from-amber-50/90 via-amber-50/40 to-white px-4 py-6 sm:px-8 sm:py-8 text-center border-b border-amber-200/80">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#042418] font-heading leading-tight mb-3">
                অর্ডার করতে নিচের ফর্মে আপনার{" "}
                <span className="text-[#b45309] underline decoration-amber-400/80 decoration-wavy decoration-2">
                  নাম, পূর্ণ ঠিকানা এবং মোবাইল নাম্বার
                </span>{" "}
                লিখুন
              </h2>

              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-2xs">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>
                  ডেলিভারি ম্যানের সামনে দেখে, খেয়ে, চেক করে রিসিভ করতে পারবেন। পছন্দ না হলে সাথে সাথে রিটার্ন করতে পারবেন।
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-8 lg:p-10 space-y-8">
              {/* SECTION A: PRODUCT SELECTION GRID */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-brand-green text-white flex items-center justify-center text-xs font-black">
                      ১
                    </span>
                    <h3 className="text-base sm:text-xl font-black text-gray-950 font-heading">
                      আপনার প্রোডাক্ট সিলেক্ট করুনঃ
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-gray-500">
                    সিলেক্টেড: <span className="text-brand-green font-black">{totalItemCount} টি</span>
                  </span>
                </div>

                {/* Product Selection Rows */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {products.map((p) => {
                    const isSelected = (selectedItems[p.id] || 0) > 0;
                    const qty = selectedItems[p.id] || 1;
                    const isHighlighted = highlightedProductId === p.id;

                    return (
                      <div
                        key={p.id}
                        className={`relative p-2.5 sm:p-3 rounded-xl border-2 transition-all duration-200 flex items-center justify-between gap-2.5 sm:gap-3 ${
                          isSelected
                            ? "bg-amber-50/30 border-amber-500 shadow-sm"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        } ${isHighlighted ? "animate-pulse ring-4 ring-amber-400" : ""}`}
                      >
                        {/* Top-Right Badge (e.g. ফ্রি ডেলিভারি) */}
                        {p.badge && (
                          <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full shadow-xs border border-amber-300/40 z-10 inline-flex items-center gap-1">
                            <Truck className="w-3 h-3 text-amber-200" />
                            <span>{p.badge}</span>
                          </span>
                        )}

                        {/* Left & Middle: Checkbox + Image + Details (Title + Stepper) */}
                        <div
                          onClick={() => handleToggleProduct(p)}
                          className="flex items-center gap-2.5 cursor-pointer flex-1 select-none min-w-0"
                        >
                          {/* Custom Checkbox */}
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 transition-colors ${
                              isSelected
                                ? "bg-brand-green border-brand-green text-white"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>

                          {/* Thumbnail */}
                          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>

                          {/* Name (2 lines with ellipsis) & Stepper underneath */}
                          <div className="flex-1 min-w-0 pr-1">
                            <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug line-clamp-2">
                              {p.name}
                            </h4>

                            {/* Quantity Counter underneath title */}
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white w-fit mt-1.5 shadow-2xs"
                            >
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuantityChange(p.id, -1);
                                }}
                                className="w-6 h-6 sm:w-7 sm:h-7 bg-gray-50 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer text-xs"
                                aria-label="Decrease"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 sm:w-7 text-center text-xs font-black text-gray-900 select-none">
                                {isSelected ? qty : 1}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuantityChange(p.id, 1);
                                }}
                                className="w-6 h-6 sm:w-7 sm:h-7 bg-gray-50 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer text-xs"
                                aria-label="Increase"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Price on the Right */}
                        <div className="shrink-0 text-right pl-1">
                          <span className="text-xs sm:text-sm md:text-base font-black text-gray-900 block leading-tight">
                            {p.salePrice.toLocaleString()}৳
                          </span>
                          {p.regularPrice > p.salePrice && (
                            <span className="text-[10px] sm:text-xs text-gray-400 line-through block mt-0.5">
                              {p.regularPrice.toLocaleString()}৳
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION B: 2-COLUMN CHECKOUT FORM */}
              <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-gray-200">
                {/* LEFT COLUMN: BILLING & SHIPPING DETAILS */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <span className="w-7 h-7 rounded-full bg-brand-green text-white flex items-center justify-center text-xs font-black">
                      ২
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-gray-950 font-heading">
                      গ্রাহকের তথ্য ও ডেলিভারি ঠিকানা
                    </h3>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5">
                      আপনার নাম <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="আপনার নাম লিখুন"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition bg-white"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5">
                      মোবাইল নাম্বার <span className="text-red-500">*</span>
                      <span className="text-gray-400 font-normal text-xs ml-1">
                        (ডেলিভারির যোগাযোগের জন্য)
                      </span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="১১ ডিজিটের মোবাইল নম্বর লিখুন (যেমন: 017XXXXXXXX)"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition bg-white"
                      />
                    </div>
                  </div>

                  {/* Complete Delivery Address */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5">
                      সম্পূর্ণ ডেলিভারি ঠিকানা <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3.5 pointer-events-none text-gray-400">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <textarea
                        required
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="বাসা নং, রোড নং, এলাকা/গ্রাম, থানা ও জেলার নাম বিস্তারিত লিখুন..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition bg-white resize-none"
                      />
                    </div>
                  </div>

                  {/* Shipping Zone Selector */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">
                      ডেলিভারি এরিয়া নির্বাচন করুন <span className="text-red-500">*</span>
                    </label>

                    {isFreeShipping && (
                      <div className="mb-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-xs text-brand-green font-bold">
                        <Sparkles className="w-4 h-4 shrink-0 text-emerald-600" />
                        <span>৳২৫০০-এর বেশি অর্ডারে ফ্রি ডেলিভারি! 🎉</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Inside Dhaka */}
                      <label
                        className={`cursor-pointer rounded-xl border-2 p-3.5 flex items-center justify-between transition ${
                          deliveryZone === "inside_dhaka"
                            ? "border-brand-green bg-emerald-50/60 shadow-xs"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingZone"
                            checked={deliveryZone === "inside_dhaka"}
                            onChange={() => setDeliveryZone("inside_dhaka")}
                            className="w-4 h-4 text-brand-green focus:ring-brand-green"
                          />
                          <div>
                            <p className="text-sm font-black text-gray-900">ঢাকার সিটির ভেতরে</p>
                            <p className="text-xs text-gray-500">হোম ডেলিভারি (১-২ দিন)</p>
                          </div>
                        </div>
                        <span className="text-sm font-black text-brand-green">
                          {isFreeShipping ? "ফ্রি" : "৳৭০"}
                        </span>
                      </label>

                      {/* Outside Dhaka */}
                      <label
                        className={`cursor-pointer rounded-xl border-2 p-3.5 flex items-center justify-between transition ${
                          deliveryZone === "outside_dhaka"
                            ? "border-brand-green bg-emerald-50/60 shadow-xs"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingZone"
                            checked={deliveryZone === "outside_dhaka"}
                            onChange={() => setDeliveryZone("outside_dhaka")}
                            className="w-4 h-4 text-brand-green focus:ring-brand-green"
                          />
                          <div>
                            <p className="text-sm font-black text-gray-900">ঢাকার বাইরে সারা দেশে</p>
                            <p className="text-xs text-gray-500">হোম ডেলিভারি (২-৩ দিন)</p>
                          </div>
                        </div>
                        <span className="text-sm font-black text-brand-green">
                          {isFreeShipping ? "ফ্রি" : "৳১৩০"}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Customer Note (Optional) */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-1.5">
                      অর্ডার নোট (ঐচ্ছিক)
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3.5 pointer-events-none text-gray-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={customerNote}
                        onChange={(e) => setCustomerNote(e.target.value)}
                        placeholder="যেমন: ডেলিভারির বিশেষ সময় বা মন্তব্য লিখুন..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: ORDER SUMMARY & SUBMIT */}
                <div className="md:col-span-5 flex flex-col justify-between">
                  <div className="bg-[#faf9f6] rounded-2xl border-2 border-amber-300 p-4 sm:p-6 space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-amber-200">
                      <span className="w-7 h-7 rounded-full bg-brand-green text-white flex items-center justify-center text-xs font-black">
                        ৩
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-gray-950 font-heading">
                        আপনার অর্ডার সামারি
                      </h3>
                    </div>

                    {/* Selected Products Breakdown */}
                    <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                      {selectedProductList.length === 0 ? (
                        <p className="text-xs text-red-500 font-bold py-4 text-center">
                          কোনো প্রোডাক্ট সিলেক্ট করা নেই। দয়া করে অন্তত একটি প্রোডাক্ট সিলেক্ট করুন।
                        </p>
                      ) : (
                        selectedProductList.map(({ product, quantity, lineTotal }) => (
                          <div
                            key={product.id}
                            className="flex items-center justify-between gap-2 text-xs sm:text-sm py-2 border-b border-gray-200/80"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="relative w-8 h-8 rounded bg-gray-100 overflow-hidden shrink-0">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  sizes="32px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="truncate">
                                <p className="font-bold text-gray-900 truncate">{product.name}</p>
                                <p className="text-[11px] text-gray-500">
                                  ৳{product.salePrice} × {quantity}
                                </p>
                              </div>
                            </div>
                            <span className="font-black text-gray-950 shrink-0">
                              ৳{lineTotal}
                            </span>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Calculations */}
                    <div className="space-y-2 pt-2 border-t border-amber-200 text-xs sm:text-sm">
                      <div className="flex items-center justify-between text-gray-600">
                        <span>সাবটোটাল</span>
                        <span className="font-bold text-gray-900">৳{subtotal}</span>
                      </div>

                      <div className="flex items-center justify-between text-gray-600">
                        <span>ডেলিভারি চার্জ</span>
                        <span className="font-bold text-gray-900">
                          {shippingFee === 0 ? (
                            <span className="text-brand-green font-black">ফ্রি (০৳)</span>
                          ) : (
                            `৳${shippingFee}`
                          )}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-base sm:text-lg font-black text-gray-950 pt-2 border-t border-amber-300">
                        <span>সর্বমোট প্রদেয় বিল</span>
                        <span className="text-xl sm:text-2xl font-black text-brand-green">
                          ৳{grandTotal}
                        </span>
                      </div>
                    </div>

                    {/* Payment Option */}
                    <div className="bg-amber-100/70 border border-amber-300 rounded-xl p-3.5 space-y-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="codPayment"
                          checked
                          readOnly
                          className="w-4 h-4 text-brand-green"
                        />
                        <label
                          htmlFor="codPayment"
                          className="text-xs sm:text-sm font-black text-gray-900"
                        >
                          ক্যাশ অন ডেলিভারি (Cash on Delivery)
                        </label>
                      </div>
                      <p className="text-[11px] text-gray-700 pl-6">
                        পণ্য হাতে পেয়ে দেখে সম্পূর্ণ টাকা ডেলিভারি ম্যানের কাছে পরিশোধ করবেন।
                      </p>
                    </div>

                    {/* Error Banner */}
                    {formError && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{formError}</span>
                      </div>
                    )}

                    {/* SUBMIT BUTTON */}
                    <button
                      type="submit"
                      disabled={isSubmitting || selectedProductList.length === 0}
                      className={`${
                        !isSubmitting && selectedProductList.length > 0 ? "animate-btn-pulse" : ""
                      } relative overflow-hidden group w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#8B3A14] via-[#A8471B] to-[#8B3A14] hover:from-[#722E11] hover:to-[#722E11] text-white font-black text-base sm:text-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_14px_28px_-6px_rgba(139,58,20,0.45)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_18px_34px_-6px_rgba(139,58,20,0.55)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-2 border-[#C25E18]`}
                    >
                      {/* Glace Shine Light Beam */}
                      {!isSubmitting && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 pointer-events-none w-full h-full overflow-hidden rounded-2xl"
                        >
                          <span className="absolute top-0 -left-[150%] w-[120%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-[25deg] animate-glace" />
                        </span>
                      )}

                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin relative z-10" />
                          <span className="relative z-10">অর্ডার প্রসেসিং হচ্ছে...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">অর্ডার কনফার্ম করুন ৳{grandTotal}</span>
                          <ArrowRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-1.5 transition-transform duration-200 relative z-10" />
                        </>
                      )}
                    </button>

                    {/* Safety Badges Under Button */}
                    <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] sm:text-[11px] text-gray-600">
                      <div className="flex flex-col items-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-brand-green" />
                        <span>১০০% নিরাপদ</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Truck className="w-4 h-4 text-brand-green" />
                        <span>দ্রুত হোম ডেলিভারি</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <RotateCcw className="w-4 h-4 text-brand-green" />
                        <span>সহজ রিটার্ন</span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 10. DEDICATED FUNNEL FOOTER WITH ANIMATED DATE PALM TREES (খেজুর গাছ ও রসের হাঁড়ি) */}
      <footer className="relative overflow-hidden bg-gradient-to-b from-[#041a12] via-[#02130c] to-[#010906] text-gray-300 pt-16 pb-12 border-t-2 border-[#166534]/50 shadow-2xl">
        {/* Inline CSS Keyframes for Date Palm Tree Animations */}
        <style>{`
          @keyframes palmSwayLeft {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(2.8deg); }
            100% { transform: rotate(0deg); }
          }
          @keyframes palmSwayRight {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(-2.5deg); }
            100% { transform: rotate(0deg); }
          }
          @keyframes sapDripDrop1 {
            0% { transform: translateY(0); opacity: 0; }
            15% { transform: translateY(2px); opacity: 1; }
            80% { transform: translateY(22px); opacity: 0.95; }
            100% { transform: translateY(27px); opacity: 0; }
          }
          @keyframes sapDripDrop2 {
            0% { transform: translateY(0); opacity: 0; }
            20% { transform: translateY(3px); opacity: 1; }
            75% { transform: translateY(20px); opacity: 0.9; }
            100% { transform: translateY(25px); opacity: 0; }
          }
          @keyframes potSway {
            0% { transform: rotate(-1.5deg); }
            50% { transform: rotate(1.8deg); }
            100% { transform: rotate(-1.5deg); }
          }
          @keyframes fireflyGlow {
            0%, 100% { transform: translateY(0) scale(0.8); opacity: 0.2; }
            50% { transform: translateY(-8px) scale(1.3); opacity: 0.95; }
          }
          @keyframes mistFloat {
            0% { transform: translateX(0); }
            50% { transform: translateX(-20px); }
            100% { transform: translateX(0); }
          }
        `}</style>

        {/* Soft Moonlight & Ambient Glow Behind Palm Crowns */}
        <div className="absolute top-0 left-10 w-72 h-72 bg-emerald-500/[0.08] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-10 w-80 h-80 bg-amber-400/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-emerald-950/20 blur-2xl pointer-events-none" />

        {/* Ambient Fireflies / Winter Stars */}
        <div className="absolute top-6 left-1/4 w-1.5 h-1.5 rounded-full bg-amber-300 pointer-events-none shadow-[0_0_8px_#fde047]" style={{ animation: "fireflyGlow 3.5s ease-in-out infinite" }} />
        <div className="absolute top-14 left-1/3 w-1 h-1 rounded-full bg-emerald-300 pointer-events-none shadow-[0_0_6px_#86efac]" style={{ animation: "fireflyGlow 4.2s ease-in-out infinite 1s" }} />
        <div className="absolute top-8 right-1/3 w-1.5 h-1.5 rounded-full bg-amber-200 pointer-events-none shadow-[0_0_8px_#fef08a]" style={{ animation: "fireflyGlow 5s ease-in-out infinite 0.5s" }} />
        <div className="absolute top-16 right-1/4 w-1 h-1 rounded-full bg-emerald-200 pointer-events-none shadow-[0_0_6px_#a7f3d0]" style={{ animation: "fireflyGlow 3.8s ease-in-out infinite 1.8s" }} />

        {/* LEFT DATE PALM TREE GRAPHICS & ANIMATION (খেজুর গাছ, চাঁছা অংশ ও রস পড়ার মাটির ভাঁড়) */}
        <div className="absolute bottom-0 left-0 w-36 sm:w-52 md:w-64 lg:w-72 h-auto pointer-events-none z-0 opacity-80 lg:opacity-95 select-none">
          <svg viewBox="0 0 240 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Ground Silhouette */}
            <path d="M0,320 L240,320 Q120,300 0,312 Z" fill="#010c07" />

            {/* Date Palm Tree Trunk (Stepped textured bark notches) */}
            <path
              d="M32,320 Q55,240 68,170 Q76,128 82,98 L98,96 Q92,126 84,170 Q72,240 54,320 Z"
              fill="#062e1d"
              stroke="#042014"
              strokeWidth="1.5"
            />
            {/* Trunk Notch Textures (খেজুর গাছের খাঁজকাটা ধাপ) */}
            <path d="M37,298 Q47,296 52,301" stroke="#0f482d" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M41,274 Q51,272 58,277" stroke="#0f482d" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M46,250 Q56,248 63,253" stroke="#0f482d" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M51,226 Q60,224 67,229" stroke="#0f482d" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M56,202 Q65,200 72,205" stroke="#0f482d" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M62,178 Q70,176 76,180" stroke="#0f482d" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M67,154 Q75,152 80,156" stroke="#0f482d" strokeWidth="2" strokeLinecap="round" />
            <path d="M72,130 Q79,128 84,132" stroke="#0f482d" strokeWidth="2" strokeLinecap="round" />
            <path d="M76,110 Q83,108 87,112" stroke="#0f482d" strokeWidth="2" strokeLinecap="round" />

            {/* Shaved Bark Neck (গাছের চাঁছা অংশ - হালকা পোড়া বাদামী) */}
            <polygon points="76,104 88,96 98,98 86,114" fill="#a47148" opacity="0.9" />
            <polygon points="78,106 86,100 94,101 84,113" fill="#cda379" opacity="0.95" />

            {/* Bamboo Spile (বাঁশের নলি / খিল যেখান দিয়ে রস পড়ে) */}
            <line x1="84" y1="108" x2="76" y2="120" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="83" y1="109" x2="77" y2="119" stroke="#ca8a04" strokeWidth="1" strokeLinecap="round" />

            {/* Dripping Sap Droplet Animation (খেজুরের মিষ্টি রস এক ফোঁটা করে পড়ছে) */}
            <g style={{ animation: "sapDripDrop1 2.4s ease-in infinite" }}>
              <circle cx="76" cy="120" r="2.8" fill="#fde047" filter="drop-shadow(0 0 5px #fde047)" />
              <path d="M76,117 Q77.5,120 76,122 Q74.5,120 76,117 Z" fill="#ffffff" opacity="0.8" />
            </g>

            {/* Hanging Earthen Clay Pot (রসের মাটির ভাঁড় / কলসি) */}
            <g style={{ transformOrigin: "80px 116px", animation: "potSway 4s ease-in-out infinite" }}>
              {/* Jute Rope Tied Around Neck (পাটের দড়ির বাঁধন) */}
              <path d="M85,106 L78,124" stroke="#d97706" strokeWidth="1.2" strokeDasharray="2,1" />
              <path d="M87,107 L82,124" stroke="#b45309" strokeWidth="1.2" strokeDasharray="2,1" />

              {/* Clay Pot Rim & Mouth */}
              <ellipse cx="80" cy="125" rx="5.5" ry="2" fill="#78350f" stroke="#451a03" strokeWidth="0.8" />
              <path d="M75,125 L74,129 L86,129 L85,125 Z" fill="#9a3412" />

              {/* Clay Pot Rounded Belly (মাটির কলসি) */}
              <ellipse cx="80" cy="138" rx="10.5" ry="9.5" fill="#7c2d12" stroke="#451a03" strokeWidth="1" />
              {/* Pot Shading & Highlight */}
              <path d="M74,133 Q80,146 86,133" stroke="#431407" strokeWidth="1" fill="none" opacity="0.6" />
              <ellipse cx="77" cy="135" rx="4" ry="3.5" fill="#c2410c" opacity="0.5" />
              {/* Full of Sap Glow Indicator */}
              <ellipse cx="80" cy="126" rx="3.5" ry="1" fill="#fef08a" opacity="0.8" />
            </g>

            {/* Swaying Crown Leaves (খেজুর পাতার মুকুট - বাতাসে দুলছে) */}
            <g style={{ transformOrigin: "89px 96px", animation: "palmSwayLeft 6.5s ease-in-out infinite" }}>
              {/* Frond 1: Left Downward Arching */}
              <path d="M89,96 Q45,75 10,95 Q48,65 89,96 Z" fill="#0f4d30" />
              <path d="M10,95 Q25,82 45,82 M20,90 Q35,78 55,79 M30,86 Q50,75 70,80" stroke="#166534" strokeWidth="1.5" />

              {/* Frond 2: Left Mid Arching */}
              <path d="M89,96 Q35,50 8,55 Q42,40 89,96 Z" fill="#14532d" />
              <path d="M8,55 Q28,48 50,52 M18,53 Q38,45 62,50 M30,50 Q52,43 75,54" stroke="#15803d" strokeWidth="1.5" />

              {/* Frond 3: Upper Left Sweep */}
              <path d="M89,96 Q50,25 25,18 Q62,22 89,96 Z" fill="#166534" />
              <path d="M25,18 Q45,22 65,38 M35,22 Q55,27 72,48" stroke="#22c55e" strokeWidth="1.2" />

              {/* Frond 4: Center High Arching */}
              <path d="M89,96 Q80,15 88,2 Q98,18 89,96 Z" fill="#15803d" />
              <path d="M88,2 Q84,20 86,45 M88,2 Q94,22 90,48" stroke="#4ade80" strokeWidth="1.2" />

              {/* Frond 5: Upper Right Sweep */}
              <path d="M89,96 Q125,25 152,18 Q118,22 89,96 Z" fill="#166534" />
              <path d="M152,18 Q132,22 112,38 M142,22 Q122,27 105,48" stroke="#22c55e" strokeWidth="1.2" />

              {/* Frond 6: Right Mid Arching */}
              <path d="M89,96 Q145,50 170,58 Q138,42 89,96 Z" fill="#14532d" />
              <path d="M170,58 Q150,50 128,54 M160,55 Q140,46 116,52" stroke="#15803d" strokeWidth="1.5" />

              {/* Frond 7: Right Downward Arching */}
              <path d="M89,96 Q135,78 168,102 Q130,70 89,96 Z" fill="#0f4d30" />
              <path d="M168,102 Q152,88 132,86 M158,95 Q142,82 122,81" stroke="#166534" strokeWidth="1.5" />

              {/* Crown Center Bud / Heart */}
              <circle cx="89" cy="96" r="6" fill="#052e1b" />
            </g>
          </svg>
        </div>

        {/* RIGHT DATE PALM TREES GRAPHICS & ANIMATION (ডানপাশের খেজুর গাছ ও বাতাসের দোলনা) */}
        <div className="absolute bottom-0 right-0 w-36 sm:w-52 md:w-64 lg:w-72 h-auto pointer-events-none z-0 opacity-80 lg:opacity-95 select-none">
          <svg viewBox="0 0 240 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Ground Silhouette */}
            <path d="M240,320 L0,320 Q120,305 240,314 Z" fill="#010c07" />

            {/* Secondary Smaller Background Palm Tree (দূরবর্তী ছোট খেজুর গাছ) */}
            <g opacity="0.65">
              <path d="M208,320 Q196,250 188,185 Q184,150 180,132 L192,130 Q196,150 200,185 Q208,250 220,320 Z" fill="#042014" />
              <g style={{ transformOrigin: "186px 131px", animation: "palmSwayRight 5s ease-in-out infinite" }}>
                <path d="M186,131 Q155,100 135,110 Q160,95 186,131 Z" fill="#0b3823" />
                <path d="M186,131 Q150,75 140,55 Q165,65 186,131 Z" fill="#0f482d" />
                <path d="M186,131 Q180,50 184,35 Q192,55 186,131 Z" fill="#135334" />
                <path d="M186,131 Q215,75 228,58 Q208,68 186,131 Z" fill="#0f482d" />
                <path d="M186,131 Q220,105 235,115 Q212,100 186,131 Z" fill="#0b3823" />
              </g>
            </g>

            {/* Primary Foreground Date Palm Tree (প্রধান বড় খেজুর গাছ) */}
            <path
              d="M175,320 Q160,240 152,175 Q145,130 140,94 L156,92 Q162,128 168,175 Q178,240 196,320 Z"
              fill="#062e1d"
              stroke="#042014"
              strokeWidth="1.5"
            />
            {/* Trunk Notches */}
            <path d="M188,298 Q180,296 174,301" stroke="#0f482d" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M183,274 Q175,272 169,277" stroke="#0f482d" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M178,250 Q170,248 164,253" stroke="#0f482d" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M173,226 Q165,224 159,229" stroke="#0f482d" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M168,202 Q160,200 155,205" stroke="#0f482d" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M162,178 Q155,176 150,180" stroke="#0f482d" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M157,154 Q150,152 145,156" stroke="#0f482d" strokeWidth="2" strokeLinecap="round" />
            <path d="M152,128 Q146,126 142,130" stroke="#0f482d" strokeWidth="2" strokeLinecap="round" />
            <path d="M148,108 Q142,106 138,110" stroke="#0f482d" strokeWidth="2" strokeLinecap="round" />

            {/* Shaved Bark (চাঁছা অংশ) */}
            <polygon points="152,102 142,94 134,96 144,112" fill="#a47148" opacity="0.9" />
            <polygon points="150,104 144,98 138,99 146,111" fill="#cda379" opacity="0.95" />

            {/* Bamboo Spile */}
            <line x1="144" y1="106" x2="152" y2="118" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="145" y1="107" x2="151" y2="117" stroke="#ca8a04" strokeWidth="1" strokeLinecap="round" />

            {/* Dripping Sap Animation 2 */}
            <g style={{ animation: "sapDripDrop2 2.7s ease-in infinite 0.8s" }}>
              <circle cx="152" cy="118" r="2.8" fill="#fde047" filter="drop-shadow(0 0 5px #fde047)" />
              <path d="M152,115 Q153.5,118 152,120 Q150.5,118 152,115 Z" fill="#ffffff" opacity="0.8" />
            </g>

            {/* Hanging Earthen Clay Pot 2 */}
            <g style={{ transformOrigin: "148px 114px", animation: "potSway 4.8s ease-in-out infinite 0.5s" }}>
              <path d="M143,104 L150,122" stroke="#d97706" strokeWidth="1.2" strokeDasharray="2,1" />
              <path d="M141,105 L146,122" stroke="#b45309" strokeWidth="1.2" strokeDasharray="2,1" />

              <ellipse cx="148" cy="123" rx="5.5" ry="2" fill="#78350f" stroke="#451a03" strokeWidth="0.8" />
              <path d="M143,123 L142,127 L154,127 L153,123 Z" fill="#9a3412" />

              <ellipse cx="148" cy="136" rx="10.5" ry="9.5" fill="#7c2d12" stroke="#451a03" strokeWidth="1" />
              <path d="M142,131 Q148,144 154,131" stroke="#431407" strokeWidth="1" fill="none" opacity="0.6" />
              <ellipse cx="145" cy="133" rx="4" ry="3.5" fill="#c2410c" opacity="0.5" />
              <ellipse cx="148" cy="124" rx="3.5" ry="1" fill="#fef08a" opacity="0.8" />
            </g>

            {/* Swaying Crown Leaves 2 */}
            <g style={{ transformOrigin: "148px 92px", animation: "palmSwayRight 7.2s ease-in-out infinite" }}>
              <path d="M148,92 Q105,72 70,92 Q108,62 148,92 Z" fill="#0f4d30" />
              <path d="M70,92 Q85,79 105,79 M80,87 Q95,75 115,76" stroke="#166534" strokeWidth="1.5" />

              <path d="M148,92 Q95,48 68,52 Q102,38 148,92 Z" fill="#14532d" />
              <path d="M68,52 Q88,45 110,49 M78,50 Q98,42 122,47" stroke="#15803d" strokeWidth="1.5" />

              <path d="M148,92 Q110,22 85,15 Q122,19 148,92 Z" fill="#166534" />
              <path d="M85,15 Q105,19 125,35 M95,19 Q115,24 132,45" stroke="#22c55e" strokeWidth="1.2" />

              <path d="M148,92 Q140,12 148,0 Q158,15 148,92 Z" fill="#15803d" />
              <path d="M148,0 Q144,18 146,42 M148,0 Q154,20 150,45" stroke="#4ade80" strokeWidth="1.2" />

              <path d="M148,92 Q185,22 212,15 Q178,19 148,92 Z" fill="#166534" />
              <path d="M212,15 Q192,19 172,35 M202,19 Q182,24 165,45" stroke="#22c55e" strokeWidth="1.2" />

              <path d="M148,92 Q205,48 230,55 Q198,39 148,92 Z" fill="#14532d" />
              <path d="M230,55 Q210,47 188,51 M220,52 Q200,43 176,49" stroke="#15803d" strokeWidth="1.5" />

              <path d="M148,92 Q195,75 228,98 Q190,67 148,92 Z" fill="#0f4d30" />
              <path d="M228,98 Q212,85 192,83 M218,92 Q202,79 182,78" stroke="#166534" strokeWidth="1.5" />

              <circle cx="148" cy="92" r="6" fill="#052e1b" />
            </g>
          </svg>
        </div>

        {/* Central Content Container */}
        <div className="container mx-auto px-4 lg:px-8 text-center space-y-4 relative z-10 max-w-3xl">
          {/* Winter Village Tradition Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/70 backdrop-blur-md border border-emerald-600/40 text-emerald-200 text-xs font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>ঐতিহ্যবাহী রাজশাহীর খাঁটি খেজুরের গুড়</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-lg border border-emerald-500/30">
              <div className="relative w-full h-full">
                <Image
                  src="/logo.webp"
                  alt={siteConfig.name}
                  fill
                  sizes="44px"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="text-left">
              <span className="text-xl sm:text-2xl font-black text-white font-heading block leading-tight">
                {siteConfig.name}
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-amber-400 block tracking-widest uppercase mt-0.5">
                best in taste & purity
              </span>
            </div>

          </div>

          <div className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl mx-auto space-y-1.5">
            <p>
              ঠিকানা: {siteConfig.contact.addressBangla}
            </p>
            <p className="flex items-center justify-center gap-3 flex-wrap">
              <span>হেল্পলাইন: <a href={`tel:${siteConfig.contact.phone}`} className="text-amber-300 font-bold hover:underline">{siteConfig.contact.phone}</a></span>
              <span className="text-emerald-600">•</span>
              <span>ইমেইল: <a href={`mailto:${siteConfig.contact.email}`} className="text-amber-300 font-bold hover:underline">{siteConfig.contact.email}</a></span>
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-amber-300 font-bold pt-2">
            <Link href="/privacy-policy" className="hover:underline">প্রাইভেসি পলিসি</Link>
            <span className="text-emerald-700">•</span>
            <Link href="/terms" className="hover:underline">শর্তাবলী</Link>
            <span className="text-emerald-700">•</span>
            <Link href="/refund-policy" className="hover:underline">রিফান্ড পলিসি</Link>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 font-medium pt-4 border-t border-emerald-900/60 flex items-center justify-center gap-1.5 flex-wrap">
            <span>© {new Date().getFullYear()} {siteConfig.englishName}. All Rights Reserved.</span>
            <span>Developed by</span>
            <a
              href="https://coderitsolution.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 font-bold hover:text-amber-300 transition-colors"
            >
              Coder IT Solution
            </a>
          </p>
        </div>
      </footer>

      {/* 11. MOBILE STICKY ORDER BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-2.5 shadow-[0_-4px_25px_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-gray-500 block">মোট প্রদেয় বিল</span>
            <span className="text-lg font-black text-brand-green leading-tight">
              ৳{grandTotal}
            </span>
          </div>

          <button
            type="button"
            onClick={() => scrollToOrderForm()}
            className="animate-btn-pulse relative overflow-hidden group flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#8B3A14] to-[#A8471B] hover:from-[#722E11] hover:to-[#722E11] text-white font-black text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
          >
            {/* Glace Shine Light Beam */}
            <span
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none w-full h-full overflow-hidden rounded-xl"
            >
              <span className="absolute top-0 -left-[150%] w-[120%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-[25deg] animate-glace" />
            </span>

            <ShoppingBag className="w-4 h-4 text-white relative z-10" />
            <span className="relative z-10">অর্ডার করুন (৳{grandTotal})</span>
          </button>
        </div>
      </div>

      {/* 12. REVIEW SCREENSHOT LIGHTBOX / MODAL */}
      {selectedReviewImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedReviewImage(null)}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl p-2 sm:p-4 flex flex-col items-center"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedReviewImage(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Image display */}
            <div className="relative w-full h-[72vh] sm:h-[82vh] flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
              <Image
                src={selectedReviewImage}
                alt="গ্রাহকের রিভিউ স্ক্রিনশট"
                fill
                sizes="(max-width: 1024px) 95vw, 900px"
                className="object-contain"
                priority
              />
            </div>

            <div className="w-full pt-3 pb-1 px-2 flex items-center justify-between text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4 text-brand-green" />
                গ্রাহকের বাস্তব ফিডব্যাক
              </span>
              <span>স্ক্রিনের যেকোনো জায়গায় ক্লিক করে বন্ধ করুন</span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
