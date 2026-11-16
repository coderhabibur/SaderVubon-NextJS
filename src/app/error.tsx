"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global runtime error:", error);
  }, [error]);

  return (
    <div className="bg-gray-50 min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 max-w-lg w-full text-center shadow-xs">
        <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-2xs border border-red-100">
          <AlertCircle className="w-10 h-10" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-gray-950 mb-2">
          কিছু একটা সমস্যা হয়েছে!
        </h1>

        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          সাময়িকভাবে পেজটি লোড হতে সমস্যা হচ্ছে। পুনরায় চেষ্টা করুন অথবা আমাদের কাস্টমার কেয়ারে যোগাযোগ করুন।
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-hover text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>পুনরায় চেষ্টা করুন</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all"
          >
            <Home className="w-4 h-4" />
            <span>হোমে যান</span>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-500">
          জরুরি প্রয়োজনে কল করুন:{" "}
          <a
            href={`tel:${siteConfig.contact.hotline}`}
            className="text-brand-green font-bold hover:underline"
          >
            {siteConfig.contact.hotline}
          </a>
        </div>
      </div>
    </div>
  );
}
