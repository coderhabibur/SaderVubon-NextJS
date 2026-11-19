"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MapPin, Mail, Phone, MessageCircle, Heart, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  const pathname = usePathname();
  const isFunnelPage =
    pathname === "/khejur-gur-patali-jhola" ||
    pathname?.startsWith("/khejur-gur-patali-jhola") ||
    pathname === "/order" ||
    pathname === "/landing";
  if (isFunnelPage) {
    return null;
  }

  return (
    <footer className="bg-gradient-to-b from-[#062e1f] via-[#042418] to-[#02140d] text-gray-200 pt-16 pb-24 sm:pb-12 border-t-2 border-amber-500/40 relative overflow-hidden">
      {/* Background Subtle Gradient Blobs & Shapes */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Main Footer Grid - 4 Columns on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-14 border-b border-emerald-900/60">
          
          {/* 1. Brand Column */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3.5 mb-5 group">
              <div className="w-14 h-14 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <div className="relative w-full h-full">
                  <Image
                    src="/logo.webp"
                    alt="স্বাদের ভুবন (Sader Vubon)"
                    fill
                    sizes="56px"
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-white block leading-tight tracking-tight group-hover:text-amber-400 transition-colors font-heading">
                  স্বাদের ভুবন
                </span>
                <span className="text-[10px] font-black text-amber-400 block tracking-widest uppercase mt-0.5">
                  best in taste & purity
                </span>
              </div>
            </Link>

            <p className="text-emerald-100/70 text-sm leading-relaxed mb-6 max-w-sm">
              {siteConfig.description}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-emerald-900/60 hover:bg-amber-500 hover:text-gray-950 text-white flex items-center justify-center transition-all duration-300 border border-emerald-800/50 hover:scale-110 shadow-xs"
                title="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href={siteConfig.social.messenger}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-emerald-900/60 hover:bg-amber-500 hover:text-gray-950 text-white flex items-center justify-center transition-all duration-300 border border-emerald-800/50 hover:scale-110 shadow-xs"
                title="Messenger"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-emerald-900/60 hover:bg-amber-500 hover:text-gray-950 text-white flex items-center justify-center transition-all duration-300 border border-emerald-800/50 hover:scale-110 shadow-xs"
                title="YouTube"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              <a
                href={siteConfig.social.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-green-600 hover:bg-green-500 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xs"
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="text-white font-black text-base sm:text-lg mb-5 relative pb-2 font-heading after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-amber-400">
              প্রয়োজনীয় লিংক
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-emerald-150 hover:text-amber-400 transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  <span>আমাদের সম্পর্কে</span>
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-emerald-150 hover:text-amber-400 transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  <span>সকল পণ্যসমূহ</span>
                </Link>
              </li>
              <li>
                <Link href="/category/offer" className="text-amber-300 font-bold hover:text-amber-200 transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  <span>🔥 স্পেশাল কম্বো অফার</span>
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-emerald-150 hover:text-amber-400 transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  <span>অর্ডার ট্র্যাকিং</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-emerald-150 hover:text-amber-400 transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  <span>যোগাযোগ করুন</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Customer Policies */}
          <div>
            <h4 className="text-white font-black text-base sm:text-lg mb-5 relative pb-2 font-heading after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-amber-400">
              গ্রাহক সেবা ও নীতি
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-emerald-150 hover:text-amber-400 transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  <span>প্রাইভেসি পলিসি</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-emerald-150 hover:text-amber-400 transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  <span>শর্তাবলী ও নিয়মাবলি</span>
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-emerald-150 hover:text-amber-400 transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  <span>রিফান্ড ও রিটার্ন নীতি</span>
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="text-emerald-150 hover:text-amber-400 transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  <span>ডেলিভারি সংক্রান্ত তথ্য</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Contact Information */}
          <div>
            <h4 className="text-white font-black text-base sm:text-lg mb-5 relative pb-2 font-heading after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-amber-400">
              যোগাযোগের ঠিকানা
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-emerald-100/90 leading-snug">
                  {siteConfig.contact.addressBangla}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <a href={`tel:${siteConfig.contact.hotline}`} className="text-white font-bold hover:text-amber-400 transition">
                    হটলাইন: {siteConfig.contact.hotline}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-emerald-100/90 hover:text-amber-400 transition">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>

            <div className="mt-5 p-3 rounded-2xl bg-emerald-950/90 border border-emerald-800/80 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-white block">১০০% নিরাপদ কেনাকাটা</span>
                <span className="text-emerald-300">ক্যাশ অন ডেলিভারি সুবিধা</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/80 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} <strong className="text-white font-bold">{siteConfig.englishName}</strong>. All rights reserved.
          </p>
          <p className="flex items-center gap-1 justify-center text-emerald-200/90">
            <span>Developed by</span>
            <a
              href="https://coderitsolution.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 font-bold hover:text-amber-300 transition-colors ml-1"
            >
              Coder IT Solution
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
