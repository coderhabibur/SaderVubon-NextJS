import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Lock, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `গোপনীয়তা নীতি (Privacy Policy) | ${siteConfig.name}`,
  description: `স্বাদের ভুবনে আপনার ব্যক্তিগত তথ্যের নিরাপত্তা ও সুরক্ষার অঙ্গীকার। আমরা গ্রাহকের তথ্যের সর্বোচ্চ গোপনীয়তা রক্ষা করি।`,
  alternates: {
    canonical: `${siteConfig.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 flex-1 py-8 sm:py-14">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-brand-green transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">Privacy Policy</span>
        </nav>

        {/* Content Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-12 shadow-xs space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
          <div className="border-b border-gray-200 pb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-brand-green text-xs font-bold mb-2">
              <Lock className="w-3.5 h-3.5" />
              <span>Data Protection & Privacy</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-950">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Last updated: January 2026
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-900">
              1. Information We Collect
            </h2>
            <p>
              Sader Vubon respects your privacy and is committed to protecting your personal information. We only collect data strictly necessary to fulfill your orders and enhance your browsing experience:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-gray-600 text-sm">
              <li>Recipient name, phone number, and delivery street address.</li>
              <li>Order history and tracking details.</li>
              <li>Customer communication records (inquiries, feedback, product reviews).</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-900">
              2. How We Use & Protect Your Data
            </h2>
            <p>
              We treat your information with utmost confidentiality. We do not sell, rent, or monetize your contact data with third-party advertisers. Your shipping details are shared only with certified courier and logistics partners (e.g. Steadfast, Pathao) solely for the purpose of doorstep order delivery.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-900">
              3. Cookies & Session Storage
            </h2>
            <p>
              We use lightweight local browser storage to keep track of your shopping cart contents and wishlist items. No intrusive third-party behavioral tracking cookies are deployed on our storefront.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-900">
              4. Contact Our Privacy Team
            </h2>
            <p>
              If you have any questions regarding your data or wish to have your details deleted from our fulfillment records, please email us at{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-brand-green font-bold hover:underline">
                {siteConfig.contact.email}
              </a>{" "}
              or call our hotline at{" "}
              <a href={`tel:${siteConfig.contact.hotline}`} className="text-brand-green font-bold hover:underline">
                {siteConfig.contact.hotline}
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
