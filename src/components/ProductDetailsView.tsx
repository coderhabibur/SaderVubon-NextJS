"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { LiveProduct, ProductVariation } from "@/lib/woocommerce";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { MobileStickyBuyBar } from "@/components/MobileStickyBuyBar";
import {
  ShoppingBag,
  Phone,
  MessageCircle,
  Truck,
  ShieldCheck,
  RefreshCw,
  Minus,
  Plus,
  Star,
  CheckCircle2,
  FileText,
  Sparkles,
  Sprout,
  HeartPulse,
  Users,
  Leaf,
  Package,
  Scale,
  Check,
  Loader2,
  ThumbsUp,
  MessageSquare,
  PenLine,
  Heart,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ProductDetailsViewProps {
  product: LiveProduct;
  variations?: ProductVariation[];
}

interface ParsedDescription {
  intro: string;
  packageItems: { emoji?: string; name: string; weight?: string }[];
  totalWeight?: string;
  features: string[];
}

function parseProductDescription(raw: string): ParsedDescription | null {
  if (!raw) return null;

  // Convert HTML breaks to newlines and strip remaining HTML tags
  const text = raw
    .replace(/<br\s*[\/]?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .trim();

  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const hasPackage = lines.some((l) => l.includes("প্যাকেজে") || l.includes("প্যাকেজ"));
  const hasFeatures = lines.some((l) => l.includes("বৈশিষ্ট্য") || l.startsWith("✅") || l.startsWith("✓"));

  if (!hasPackage && !hasFeatures) {
    return null;
  }

  const introLines: string[] = [];
  const packageItems: { emoji?: string; name: string; weight?: string }[] = [];
  let totalWeight = "";
  const features: string[] = [];

  let currentSection: "intro" | "package" | "features" = "intro";

  for (const line of lines) {
    if (line.includes("প্যাকেজে যা থাকছে") || line.includes("প্যাকেজ সূচি")) {
      currentSection = "package";
      continue;
    }
    if (line.includes("বৈশিষ্ট্য")) {
      currentSection = "features";
      continue;
    }
    if (line.includes("মোট পরিমাণ") || line.toLowerCase().includes("total weight")) {
      totalWeight = line;
      continue;
    }

    if (currentSection === "intro") {
      if (line.startsWith("✅") || line.startsWith("✓")) {
        currentSection = "features";
        features.push(line.replace(/^[✅✓\s]+/, "").trim());
      } else if (line.match(/^[\u{1F300}-\u{1F9FF}]/u)) {
        currentSection = "package";
        // Parse package item
        const emojiMatch = line.match(/^([\u{1F300}-\u{1F9FF}])\s*(.*)$/u);
        const emoji = emojiMatch ? emojiMatch[1] : undefined;
        const rest = emojiMatch ? emojiMatch[2] : line;
        const parts = rest.split(/–|-/);
        packageItems.push({
          emoji,
          name: parts[0]?.trim() || rest,
          weight: parts.length > 1 ? parts.slice(1).join("-").trim() : undefined,
        });
      } else {
        introLines.push(line);
      }
    } else if (currentSection === "package") {
      if (line.startsWith("✅") || line.startsWith("✓")) {
        currentSection = "features";
        features.push(line.replace(/^[✅✓\s]+/, "").trim());
      } else {
        const emojiMatch = line.match(/^([\u{1F300}-\u{1F9FF}])\s*(.*)$/u);
        const emoji = emojiMatch ? emojiMatch[1] : undefined;
        const rest = emojiMatch ? emojiMatch[2] : line;
        const parts = rest.split(/–|-/);
        packageItems.push({
          emoji,
          name: parts[0]?.trim() || rest,
          weight: parts.length > 1 ? parts.slice(1).join("-").trim() : undefined,
        });
      }
    } else if (currentSection === "features") {
      features.push(line.replace(/^[✅✓\s]+/, "").trim());
    }
  }

  return {
    intro: introLines.join(" "),
    packageItems,
    totalWeight,
    features,
  };
}

export function ProductDetailsView({ product, variations = [] }: ProductDetailsViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "benefits" | "delivery" | "reviews">("description");

  // Reviews State
  const [reviews, setReviews] = useState([
    {
      id: "rev-1",
      name: "মোহাম্মদ রাশেদুল ইসলাম",
      location: "ধানমন্ডি, ঢাকা",
      rating: 5,
      date: "৩ দিন আগে",
      comment: "আলহামদুলিল্লাহ, পণ্যের মান অত্যন্ত চমৎকার ও খাঁটি। প্যাকেজিং এত মজবুত ছিল যে জার বা বোতলে কোনো লিকেজ হয়নি। ডেলিভারিম্যান থেকে খুলে দেখে নিয়েছি, ভবিষ্যতেও নিয়মিত অর্ডার করব ইনশাআল্লাহ।",
      verified: true,
      likes: 14,
    },
    {
      id: "rev-2",
      name: "ডা. ফাহিমা আক্তার",
      location: "উত্তরা, ঢাকা",
      rating: 5,
      date: "১ সপ্তাহ আগে",
      comment: "পরিবারের জন্য সবসময় নিরাপদ ও নির্ভেজাল খাবার খুঁজছিলাম। এদের পণ্যের স্বাদ ও প্রাকৃতিক ঘ্রাণ সত্যিই অপূর্ব। একদম খাঁটি গ্রামীণ স্বাদ!",
      verified: true,
      likes: 9,
    },
    {
      id: "rev-3",
      name: "তানভীর হাসান",
      location: "রাজশাহী",
      rating: 5,
      date: "২ সপ্তাহ আগে",
      comment: "ক্যাশ অন ডেলিভারিতে কোনো অগ্রিম টাকা ছাড়াই পেয়েছি। মাত্র ২ দিনের মধ্যে সুপার ফাস্ট ডেলিভারি পেয়েছি। স্বাদের ভুবনের সার্ভিস খুবই ভালো।",
      verified: true,
      likes: 18,
    },
  ]);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewLocation, setNewReviewLocation] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [likedReviews, setLikedReviews] = useState<string[]>([]);

  const handleLikeReview = (id: string) => {
    if (likedReviews.includes(id)) {
      setLikedReviews((prev) => prev.filter((item) => item !== id));
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, likes: Math.max(0, r.likes - 1) } : r))
      );
    } else {
      setLikedReviews((prev) => [...prev, id]);
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
      );
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      name: newReviewName.trim(),
      location: newReviewLocation.trim() || "বাংলাদেশ",
      rating: newReviewRating,
      date: "এইমাত্র",
      comment: newReviewComment.trim(),
      verified: true,
      likes: 0,
    };

    setReviews([newRev, ...reviews]);
    setNewReviewName("");
    setNewReviewLocation("");
    setNewReviewComment("");
    setNewReviewRating(5);
    setShowReviewForm(false);
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 5000);
  };

  // State for Variable Products
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(
    variations.length > 0 ? variations[0] : null
  );

  // Active Price calculations
  const activePriceString = selectedVariation ? selectedVariation.price : product.price;
  const activeRegularPriceString = selectedVariation
    ? selectedVariation.regular_price
    : product.regular_price || product.price;

  const current = parseFloat(activePriceString || "0");
  const regular = parseFloat(activeRegularPriceString || "0");
  const savings = regular > current ? regular - current : 0;
  const totalPrice = current * quantity;

  // Images
  const images = product.images.length > 0 ? product.images : [{ id: 0, src: "/placeholder.jpg", alt: product.name }];

  // Keyboard navigation & body scroll lock for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowLeft") setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setSelectedImage((prev) => (prev + 1) % images.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, images.length]);

  const { addToCart, openDrawer } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isFav = isInWishlist(product.id);
  const [orderBtnState, setOrderBtnState] = useState<"idle" | "adding" | "added">("idle");

  const handleOrder = () => {
    if (orderBtnState !== "idle") return;
    setOrderBtnState("adding");

    const variationOption = selectedVariation?.attributes[0]?.option;
    const itemId = selectedVariation ? `${product.id}-${selectedVariation.id}` : product.id;

    addToCart(
      {
        id: itemId,
        productId: product.id,
        variationId: selectedVariation?.id,
        name: product.name,
        slug: product.slug,
        price: current,
        regularPrice: regular > current ? regular : undefined,
        image: selectedVariation?.image?.src || images[0]?.src || "/placeholder.jpg",
        variationOption,
      },
      quantity,
      false
    );

    setTimeout(() => {
      setOrderBtnState("added");
      setTimeout(() => {
        openDrawer();
      }, 350);

      setTimeout(() => {
        setOrderBtnState("idle");
      }, 2000);
    }, 250);
  };

  const handleWhatsAppOrder = () => {
    const variationText = selectedVariation ? ` [সাইজ/ওজন: ${selectedVariation.attributes[0]?.option}]` : "";
    const text = encodeURIComponent(
      `আসসালামু আলাইকুম, আমি স্বাদের ভুবন থেকে অর্ডার করতে চাই:\n\nপণ্য: ${product.name}${variationText}\nপরিমাণ: ${quantity} টি\nমোট মূল্য: ৳${totalPrice}\n\nদয়া করে অর্ডারটি কনফার্ম করুন।`
    );
    window.open(`https://wa.me/88${siteConfig.contact.whatsapp}?text=${text}`, "_blank");
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Upper Area: Gallery + Buy Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* 1. Left Gallery Column (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            {/* Main Large Image */}
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="relative w-full pt-[100%] rounded-3xl overflow-hidden bg-gray-50 border border-gray-200/90 shadow-lg cursor-zoom-in group/zoom"
              title="Click to enlarge image"
            >
              <Image
                src={images[selectedImage]?.src || "/placeholder.jpg"}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover group-hover/zoom:scale-105 transition-all duration-300"
                priority
              />

              {savings > 0 && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-500 text-white text-xs font-black px-3.5 py-1 rounded-full shadow-lg border border-white/25">
                    Save ৳{savings}
                  </div>
                </div>
              )}

              {/* Wishlist Heart Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist({
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: current,
                    regularPrice: regular > current ? regular : undefined,
                    image: images[0]?.src || "/placeholder.jpg",
                  });
                }}
                className={`absolute top-4 right-4 z-10 w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-md ${
                  isFav
                    ? "bg-rose-50 text-rose-600 scale-105"
                    : "bg-white/90 hover:bg-white text-gray-400 hover:text-rose-500"
                }`}
                title={isFav ? "উইশলিস্ট থেকে মুছুন" : "উইশলিস্টে যুক্ত করুন"}
              >
                <Heart className={`w-5 h-5 transition-transform active:scale-125 ${isFav ? "fill-rose-500 text-rose-500" : ""}`} />
              </button>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition shrink-0 cursor-pointer ${
                      selectedImage === idx
                        ? "border-brand-green shadow-md scale-105"
                        : "border-gray-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img.src} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 2. Right Product Info & Variation Area (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Category & Stock */}
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-xs sm:text-sm font-bold text-brand-green uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full">
              {product.categories[0]?.name || "খাঁটি পণ্য"}
            </span>
            <span className="text-xs sm:text-sm font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>In Stock</span>
            </span>
          </div>

          {/* Product Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-snug mb-3">
            {product.name}
          </h1>

          {/* Rating - Clickable to open reviews */}
          <button
            type="button"
            onClick={() => {
              setActiveTab("reviews");
              const el = document.getElementById("product-tabs");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 mb-4 pb-4 border-b border-gray-100 text-left hover:opacity-85 transition cursor-pointer"
          >
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs sm:text-sm text-gray-600 font-bold hover:text-brand-green transition">
              (৫.০ স্টার রেটিং • {reviews.length}টি ভেরিফাইড ক্রেতার রিভিউ)
            </span>
          </button>

          {/* Dynamic Price Box */}
          <div className="bg-amber-50/60 border border-amber-200/80 p-5 rounded-2xl mb-6 shadow-xs">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-gray-950">
                ৳{current}
              </span>
              {savings > 0 && (
                <span className="text-lg text-gray-400 line-through font-semibold">
                  ৳{regular}
                </span>
              )}
              {savings > 0 && (
                <span className="text-sm font-bold text-red-700 bg-red-100 border border-red-200 px-3 py-0.5 rounded-full">
                  ৳{savings} সাশ্রয়
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1.5 font-medium">
              সর্বোচ্চ খুচরা মূল্য (ক্যাশ অন ডেলিভারি প্রযোজ্য)
            </p>
          </div>

          {/* 3. Variations / Size / Weight Selector (যেমন: ১ কেজি, ২ কেজি, ৫০০ গ্রাম) */}
          {variations.length > 0 && (
            <div className="mb-6 p-4 rounded-2xl bg-gray-50/80 border border-gray-200/90">
              <span className="text-sm sm:text-base font-bold text-gray-800 block mb-2.5">
                ওজন / সাইজ নির্বাচন করুন (Select Weight / Size):
              </span>
              <div className="flex flex-wrap gap-2.5">
                {variations.map((v) => {
                  const label = v.attributes[0]?.option || `Option #${v.id}`;
                  const isSelected = selectedVariation?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariation(v)}
                      className={`px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                        isSelected
                          ? "bg-brand-green text-white shadow-md scale-105 border-2 border-brand-green"
                          : "bg-white text-gray-800 border border-gray-300 hover:border-brand-green hover:bg-emerald-50/50"
                      }`}
                    >
                      <span>{label}</span>
                      <span className={`text-xs sm:text-sm font-black ${isSelected ? "text-amber-200" : "text-emerald-700"}`}>
                        - ৳{v.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Short Description */}
          {product.short_description && (
            <div
              className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 bg-emerald-50/30 p-4 rounded-xl border border-emerald-100/70"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />
          )}

          {/* Quantity Selector & Action Buttons */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm mb-6 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-800">পরিমাণ:</span>
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-gray-50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-black text-base text-gray-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm text-gray-500 font-medium">
                সর্বমোট: <strong className="text-gray-950 font-black text-base">৳{totalPrice}</strong>
              </span>
            </div>

            {/* Buttons Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleOrder}
                disabled={orderBtnState !== "idle"}
                className={`flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-black text-base sm:text-lg shadow-lg transition-all duration-300 cursor-pointer ${
                  orderBtnState === "added"
                    ? "bg-emerald-700 text-white scale-[1.02] shadow-emerald-700/40"
                    : orderBtnState === "adding"
                    ? "bg-emerald-600 text-white opacity-90 scale-95"
                    : "bg-brand-green hover:bg-brand-green-hover text-white active:scale-95"
                }`}
              >
                {orderBtnState === "adding" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : orderBtnState === "added" ? (
                  <>
                    <Check className="w-5 h-5 stroke-[3] animate-in zoom-in-50" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>অর্ডার করুন (Order Now)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-bold text-base sm:text-lg shadow-md transition active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>হোয়াটসঅ্যাপে অর্ডার</span>
              </button>
            </div>

            {/* Hotline Helpline */}
            <div className="pt-2 text-center">
              <a
                href={`tel:${siteConfig.contact.hotline}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-brand-green transition"
              >
                <Phone className="w-3.5 h-3.5 text-brand-green" />
                <span>সরাসরি কল করে অর্ডার করতে: <strong className="text-gray-900 font-bold">{siteConfig.contact.hotline}</strong></span>
              </a>
            </div>
          </div>

          {/* Modern Premium Estimated Delivery Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-4 sm:p-5 mb-6">
            {/* Header: Truck icon + Title + Live Dispatch Pill */}
            <div className="flex items-center justify-between gap-3 pb-3 mb-3.5 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-brand-green flex items-center justify-center border border-emerald-100/80 shadow-2xs">
                  <Truck className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="font-black text-gray-950 text-sm sm:text-base leading-tight">
                    Estimated Delivery
                  </h4>
                  <p className="text-xs text-gray-500 font-medium">
                    Fast & reliable doorstep dispatch
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-brand-green border border-emerald-200/80 text-xs font-bold shrink-0">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                <span>Ready to Ship</span>
              </div>
            </div>

            {/* 2 Delivery Zone Pills (Inside Dhaka & Outside Dhaka) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
              {/* Inside Dhaka */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50/90 border border-gray-200/70">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs sm:text-sm font-bold text-gray-800">Inside Dhaka</span>
                </div>
                <div className="text-right">
                  <span className="text-xs sm:text-sm font-black text-gray-900 block leading-tight">24–48 Hours</span>
                  <span className="text-[11px] text-gray-500 font-semibold">Delivery Fee: ৳70</span>
                </div>
              </div>

              {/* Outside Dhaka */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50/90 border border-gray-200/70">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-xs sm:text-sm font-bold text-gray-800">Outside Dhaka</span>
                </div>
                <div className="text-right">
                  <span className="text-xs sm:text-sm font-black text-gray-900 block leading-tight">2–3 Days</span>
                  <span className="text-[11px] text-gray-500 font-semibold">Delivery Fee: ৳130</span>
                </div>
              </div>
            </div>

            {/* Free Delivery Nationwide Perk Banner */}
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 text-brand-green border border-emerald-200/60 text-xs sm:text-sm font-bold">
              <Sparkles className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Orders over ৳2,500 qualify for <strong className="font-black text-emerald-950">FREE Delivery</strong> nationwide!</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Beautiful Tabbed Product Description Section */}
      <div id="product-tabs" className="mt-8 bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-10 shadow-sm scroll-mt-24">
        {/* Modern Segmented Navigation Tabs */}
        <div className="flex p-1.5 bg-gray-100 rounded-2xl gap-2 mb-8 overflow-x-auto no-scrollbar border border-gray-200/70">
          <button
            onClick={() => setActiveTab("description")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
              activeTab === "description"
                ? "bg-brand-green text-white shadow-md scale-[1.01]"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>পণ্যের বিবরণ (Description)</span>
          </button>

          <button
            onClick={() => setActiveTab("benefits")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
              activeTab === "benefits"
                ? "bg-brand-green text-white shadow-md scale-[1.01]"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>উপকারিতা ও বিশুদ্ধতা</span>
          </button>

          <button
            onClick={() => setActiveTab("delivery")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
              activeTab === "delivery"
                ? "bg-brand-green text-white shadow-md scale-[1.01]"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>ডেলিভারি ও রিটার্ন পলিসি</span>
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
              activeTab === "reviews"
                ? "bg-brand-green text-white shadow-md scale-[1.01]"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>কাস্টমার রিভিউ ({reviews.length})</span>
          </button>
        </div>

        {/* Tab 1: Detailed Description */}
        {activeTab === "description" && (() => {
          const parsed = parseProductDescription(product.description || "");

          if (parsed) {
            return (
              <div className="space-y-8">
                {/* Intro Highlight Box */}
                {parsed.intro && (
                  <div className="bg-emerald-50/70 border-l-4 border-brand-green p-5 sm:p-6 rounded-r-2xl shadow-xs">
                    <p className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                      {parsed.intro}
                    </p>
                  </div>
                )}

                {/* Package Items Grid */}
                {parsed.packageItems.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <h4 className="font-black text-gray-900 text-base sm:text-lg flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center shadow-2xs">
                          <Package className="w-4 h-4 stroke-[2.2]" />
                        </span>
                        <span>প্যাকেজে যা যা থাকছে:</span>
                      </h4>
                      {parsed.totalWeight && (
                        <span className="bg-brand-green text-white text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-xs inline-flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5" />
                          <span>{parsed.totalWeight}</span>
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {parsed.packageItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200 hover:border-brand-green/60 shadow-xs hover:shadow-md transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-green border border-emerald-100/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Package className="w-5 h-5 stroke-[2]" />
                            </span>
                            <span className="font-bold text-gray-900 text-sm sm:text-base">
                              {item.name}
                            </span>
                          </div>
                          {item.weight && (
                            <span className="bg-emerald-50 text-brand-green text-xs font-black px-3 py-1 rounded-full border border-emerald-200/80">
                              {item.weight}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features Grid */}
                {parsed.features.length > 0 && (
                  <div>
                    <h4 className="font-black text-gray-900 text-base sm:text-lg flex items-center gap-2.5 mb-4">
                      <span className="w-8 h-8 rounded-xl bg-green-50 text-brand-green border border-green-200/80 flex items-center justify-center shadow-2xs">
                        <Sparkles className="w-4 h-4 stroke-[2.2]" />
                      </span>
                      <span>পণ্যের বিশেষ বৈশিষ্ট্য:</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {parsed.features.map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50/70 border border-gray-200/80 hover:bg-emerald-50/50 hover:border-emerald-200 transition shadow-2xs"
                        >
                          <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 stroke-[2.5]" />
                          <span className="text-xs sm:text-sm text-gray-800 font-bold leading-snug">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Assurance Banner */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-200/70 flex flex-col sm:flex-row items-center gap-4 shadow-xs">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-emerald-100 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-brand-green stroke-[2.2]" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h5 className="font-black text-gray-900 text-sm sm:text-base mb-0.5">
                      ১০০% ক্যাশ অন ডেলিভারি ও বিশুদ্ধতার নিশ্চয়তা
                    </h5>
                    <p className="text-xs sm:text-sm text-gray-600">
                      পণ্য হাতে পেয়ে চেক করে মূল্য পরিশোধ করুন। স্বাদ বা মানে কোনো অসঙ্গতি থাকলে তাত্ক্ষণিক রিটার্ন সুবিধা।
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          // Fallback to rich HTML description
          return (
            <div className="prose-sadervubon max-w-none">
              {product.description ? (
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
              ) : (
                <p>
                  {product.name} হলো স্বাদের ভুবনের শতভাগ বিশুদ্ধ ও প্রিমিয়াম কোয়ালিটি পণ্য। এতে কোনো প্রকার ক্ষতিকর রাসায়নিক, কৃত্রিম সুবাস বা প্রিজারভেটিভ ব্যবহার করা হয়নি।
                </p>
              )}
            </div>
          );
        })()}

        {/* Tab 2: Benefits - All Vector SVGs */}
        {activeTab === "benefits" && (
          <div className="space-y-6">
            <h4 className="font-black text-gray-900 text-base sm:text-lg mb-4 flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-emerald-50 text-brand-green border border-emerald-100 flex items-center justify-center shadow-2xs">
                <Leaf className="w-5 h-5 stroke-[2.2]" />
              </span>
              <span>স্বাদের ভুবনের খাদ্য সামগ্রীর বিশেষ উপকারিতা:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "১০০% প্রাকৃতিক ও খাঁটি",
                  desc: "সরাসরি গ্রামীণ বিশ্বস্ত কৃষক ও মৌয়ালদের থেকে সংগৃহীত, কোনো প্রকার ভেজাল নেই।",
                  icon: Sprout,
                  colorClass: "bg-emerald-50 text-brand-green border-emerald-100",
                },
                {
                  title: "রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি",
                  desc: "প্রাকৃতিক অ্যান্টিঅক্সিডেন্ট ও প্রয়োজনীয় পুষ্টি উপাদানে ভরপুর যা শরীরকে সুস্থ রাখে।",
                  icon: HeartPulse,
                  colorClass: "bg-rose-50 text-rose-600 border-rose-100",
                },
                {
                  title: "প্রিজারভেটিভ ও কেমিক্যালমুক্ত",
                  desc: "কোনো কৃত্রিম রং, ফ্লেভার, সুগন্ধি বা ক্ষতিকর রাসায়নিক পদার্থ মেশানো হয় না।",
                  icon: ShieldCheck,
                  colorClass: "bg-blue-50 text-blue-600 border-blue-100",
                },
                {
                  title: "পরিবারের সবার জন্য নিরাপদ",
                  desc: "শিশু থেকে বয়োবৃদ্ধ—সব বয়সের মানুষের পুষ্টি ও স্বাস্থ্য নিরাপত্তার জন্য পুরোপুরি নির্ভরযোগ্য।",
                  icon: Users,
                  colorClass: "bg-amber-50 text-amber-700 border-amber-100",
                },
              ].map((b, i) => {
                const Icon = b.icon;
                return (
                  <div key={i} className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/90 hover:border-emerald-300 hover:shadow-md transition-all flex gap-4 items-start group shadow-2xs">
                    <div className={`w-12 h-12 rounded-2xl ${b.colorClass} border flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div>
                      <h5 className="font-black text-gray-900 text-sm sm:text-base mb-1 leading-snug">{b.title}</h5>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Delivery Policy - All Vector SVGs */}
        {activeTab === "delivery" && (
          <div className="space-y-6">
            <h4 className="font-black text-gray-900 text-base sm:text-lg mb-4 flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center shadow-2xs">
                <Truck className="w-5 h-5 stroke-[2.2]" />
              </span>
              <span>ডেলিভারি ও রিটার্ন সংক্রান্ত তথ্য:</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "ঢাকা সিটির ভেতর",
                  desc: "অর্ডার কনফার্মেশনের ২৪ থেকে ৪৮ ঘণ্টার মধ্যে নিজস্ব হোম ডেলিভারি রাইডারের মাধ্যমে দ্রুত ডেলিভারি।",
                  badge: "১-২ কার্যদিবস",
                  icon: Truck,
                  iconClass: "bg-emerald-50 text-brand-green border-emerald-100",
                },
                {
                  title: "ঢাকার বাইরে (সমগ্র বাংলাদেশ)",
                  desc: "সুন্দরবন কুরিয়ার অথবা নির্ভরযোগ্য কুরিয়ার সার্ভিসের মাধ্যমে দেশের যেকোনো প্রান্তে হোম ডেলিভারি।",
                  badge: "২-৩ কার্যদিবস",
                  icon: Package,
                  iconClass: "bg-blue-50 text-blue-600 border-blue-100",
                },
                {
                  title: "ক্যাশ অন ডেলিভারি (COD)",
                  desc: "কোনো অগ্রিম পেমেন্টের প্রয়োজন নেই। ডেলিভারি ম্যানের সামনে প্যাকেট খুলে চেক করে মূল্য পরিশোধ করুন।",
                  badge: "১০০% নিরাপদ",
                  icon: ShieldCheck,
                  iconClass: "bg-teal-50 text-teal-600 border-teal-100",
                },
                {
                  title: "সহজ রিটার্ন পলিসি",
                  desc: "পণ্য হাতে পাওয়ার পর ক্ষতিগ্রস্ত বা পণ্যের বর্ণনার সাথে অমিল থাকলে তৎক্ষণাৎ রিটার্ন করার পূর্ণ সুবিধা।",
                  badge: "৭ দিনের গ্যারান্টি",
                  icon: RefreshCw,
                  iconClass: "bg-amber-50 text-amber-700 border-amber-100",
                },
              ].map((d, i) => {
                const Icon = d.icon;
                return (
                  <div key={i} className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/90 hover:border-emerald-300 hover:shadow-md transition-all flex gap-4 items-start shadow-2xs group">
                    <div className={`w-11 h-11 rounded-2xl ${d.iconClass} border flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                        <h5 className="font-black text-gray-900 text-sm sm:text-base leading-snug">{d.title}</h5>
                        <span className="text-[11px] font-black bg-brand-green/10 text-brand-green px-2.5 py-0.5 rounded-full border border-brand-green/20">
                          {d.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">{d.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Customer Reviews & Ratings */}
        {activeTab === "reviews" && (
          <div className="space-y-8">
            {/* Header & Rating Overview */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 rounded-3xl bg-amber-50/40 border border-amber-200/80">
              {/* Score Left Column (5 Cols) */}
              <div className="md:col-span-5 flex flex-col justify-center items-center text-center md:border-r md:border-amber-200/80 md:pr-6">
                <span className="text-5xl sm:text-6xl font-black text-gray-950 tracking-tight">
                  ৫.০
                </span>
                <div className="flex text-amber-400 my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-600 font-bold mb-4">
                  মোট {reviews.length}টি যাচাইকৃত ক্রেতার রিভিউ
                </p>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <PenLine className="w-4 h-4" />
                  <span>{showReviewForm ? "ফরম বন্ধ করুন" : "একটি রিভিউ লিখুন"}</span>
                </button>
              </div>

              {/* Progress Bars Right Column (7 Cols) */}
              <div className="md:col-span-7 flex flex-col justify-center space-y-2">
                {[
                  { star: "৫ স্টার", pct: 100, count: reviews.length },
                  { star: "৪ স্টার", pct: 0, count: 0 },
                  { star: "৩ স্টার", pct: 0, count: 0 },
                  { star: "২ স্টার", pct: 0, count: 0 },
                  { star: "১ স্টার", pct: 0, count: 0 },
                ].map((row, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <span className="w-14 font-bold text-gray-700 shrink-0">{row.star}</span>
                    <div className="flex-1 bg-amber-200/50 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right font-black text-gray-800">{row.count}</span>
                  </div>
                ))}
                <p className="text-[11px] text-emerald-800 font-bold pt-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-green" />
                  <span>১০০% ক্রেতা এই পণ্যটি সাজেস্ট করেছেন</span>
                </p>
              </div>
            </div>

            {/* Success Alert */}
            {reviewSubmitted && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 text-sm font-bold shadow-xs animate-in fade-in duration-300">
                <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
                <span>আপনার মূল্যবান রিভিউ সফলভাবে জমা হয়েছে। ধন্যবাদ!</span>
              </div>
            )}

            {/* Write Review Form */}
            {showReviewForm && (
              <form
                onSubmit={handleReviewSubmit}
                className="p-6 rounded-3xl bg-white border-2 border-brand-green/30 shadow-md space-y-4 animate-in fade-in slide-in-from-top-4 duration-300"
              >
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h4 className="font-black text-gray-900 text-base">আপনার মতামত ও রেটিং দিন</h4>
                  <span className="text-xs text-gray-500 font-medium">* সকল তথ্য নিরাপদ</span>
                </div>

                {/* Rating Selector */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    স্টার রেটিং নির্বাচন করুন:
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        className="p-1 hover:scale-110 transition cursor-pointer text-amber-400"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newReviewRating
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300 fill-gray-100"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-extrabold text-amber-600 ml-2">
                      ({newReviewRating} স্টার)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      আপনার নাম <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      placeholder="যেমন: মোঃ সাকিব হোসেন"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-green outline-none text-xs sm:text-sm text-gray-900"
                    />
                  </div>

                  {/* Location Input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      ঠিকানা বা জেলা (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      value={newReviewLocation}
                      onChange={(e) => setNewReviewLocation(e.target.value)}
                      placeholder="যেমন: মিরপুর, ঢাকা"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-green outline-none text-xs sm:text-sm text-gray-900"
                    />
                  </div>
                </div>

                {/* Comment Textarea */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    আপনার অভিজ্ঞতা বা রিভিউ <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="পণ্যটির স্বাদ, ঘ্রাণ, প্যাকেজিং ও ডেলিভারি সম্পর্কে আপনার মতামত লিখুন..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-brand-green outline-none text-xs sm:text-sm text-gray-900 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-800 transition cursor-pointer"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-green hover:bg-brand-green-hover text-white text-xs sm:text-sm font-black px-6 py-2.5 rounded-xl shadow-md transition active:scale-95 cursor-pointer"
                  >
                    রিভিউ প্রকাশ করুন
                  </button>
                </div>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              <h4 className="font-black text-gray-900 text-base sm:text-lg flex items-center gap-2">
                <span>গ্রাহকদের সাম্প্রতিক মন্তব্য</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-bold">
                  {reviews.length}
                </span>
              </h4>

              <div className="divide-y divide-gray-100">
                {reviews.map((rev) => (
                  <div key={rev.id} className="py-5 space-y-2.5 first:pt-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* Initial Avatar */}
                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-brand-green font-black text-sm flex items-center justify-center border border-emerald-200 shrink-0">
                          {rev.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-gray-950 text-sm sm:text-base">
                              {rev.name}
                            </h5>
                            {rev.verified && (
                              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-200">
                                <Check className="w-3 h-3 stroke-[3]" />
                                <span>ভেরিফাইড ক্রেতা</span>
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-400 font-medium">
                            {rev.location} • {rev.date}
                          </span>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex text-amber-400 shrink-0">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal pl-13">
                      {rev.comment}
                    </p>

                    {/* Helpful / Like Action */}
                    <div className="pl-13 pt-1 flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleLikeReview(rev.id)}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold transition cursor-pointer ${
                          likedReviews.includes(rev.id)
                            ? "text-brand-green font-black"
                            : "text-gray-400 hover:text-gray-700"
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>উপকারী ({rev.likes})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Buy Bar */}
      <MobileStickyBuyBar
        name={product.name}
        price={current}
        image={images[0]?.src || "/placeholder.jpg"}
        onAddToCart={handleOrder}
        btnState={orderBtnState}
      />

      {/* Fullscreen Lightbox Zoom Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-8 animate-in fade-in duration-200 select-none"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar with Title, Counter and Close button */}
          <div className="absolute top-3 left-3 right-3 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between text-white z-20">
            <span className="text-xs sm:text-sm font-bold bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-xs text-gray-200">
              {product.name} ({selectedImage + 1} / {images.length})
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(false);
              }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition cursor-pointer"
              aria-label="Close enlarged view"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Previous Arrow */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
              }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition cursor-pointer backdrop-blur-xs active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </button>
          )}

          {/* Next Arrow */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) => (prev + 1) % images.length);
              }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition cursor-pointer backdrop-blur-xs active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </button>
          )}

          {/* Large Image Container */}
          <div
            className="relative w-full max-w-4xl h-[65vh] sm:h-[75vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedImage]?.src || "/placeholder.jpg"}
              alt={product.name}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-contain"
              priority
            />
          </div>

          {/* Bottom Thumbnails */}
          {images.length > 1 && (
            <div
              className="flex items-center gap-2.5 mt-4 z-20 overflow-x-auto no-scrollbar max-w-full px-4"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition shrink-0 cursor-pointer ${
                    selectedImage === idx
                      ? "border-brand-yellow scale-110 shadow-lg"
                      : "border-white/30 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img.src} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
