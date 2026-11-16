import Link from "next/link";
import { ArrowLeft, Home, Search, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-gray-50 min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-14 max-w-lg w-full text-center shadow-xs">
        {/* 404 Badge */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-amber-50 text-amber-600 font-black text-4xl mb-6 shadow-2xs border border-amber-200">
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-gray-950 mb-3">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          আপনি যে ঠিকানা বা পেজটি খুঁজছেন তা হয়তো সরানো হয়েছে অথবা লিঙ্কটি ভুল টাইপ করা হয়েছে।
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>হোমে ফিরে যান</span>
          </Link>

          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>শপ ভিজিট করুন</span>
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-4 text-xs font-semibold text-gray-500">
          <Link href="/track-order" className="hover:text-brand-green transition">
            অর্ডার ট্র্যাকিং
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-brand-green transition">
            যোগাযোগ
          </Link>
          <span>•</span>
          <Link href="/about" className="hover:text-brand-green transition">
            আমাদের সম্পর্কে
          </Link>
        </div>
      </div>
    </div>
  );
}
