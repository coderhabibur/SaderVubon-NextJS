import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions | Sader Vubon",
  description: "Terms and conditions governing the use of Sader Vubon e-commerce platform and product purchases.",
};

export default function TermsPage() {
  return (
    <div className="bg-gray-50 flex-1 py-8 sm:py-14">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-brand-green transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">Terms & Conditions</span>
        </nav>

        {/* Content Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-12 shadow-xs space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
          <div className="border-b border-gray-200 pb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-brand-green text-xs font-bold mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Legal Guidelines</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-950">
              Terms & Conditions
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Last updated: January 2026
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-900">
              1. General Agreement
            </h2>
            <p>
              By accessing, browsing, or placing an order on Sader Vubon (sadervubon.com), you acknowledge and agree to comply with and be bound by the following terms and conditions. These terms apply to all visitors, registered users, and customers.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-900">
              2. Pricing & Product Availability
            </h2>
            <p>
              All prices listed on our platform are quoted in Bangladeshi Taka (৳) and include applicable taxes. We strive to maintain accurate inventory and pricing. In the rare event that an item is out of stock or subject to unexpected price revisions, our customer relations team will contact you before order dispatch.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-900">
              3. Order Fulfillment & Delivery
            </h2>
            <p>
              We process and dispatch verified orders nationwide. Standard delivery timelines are 24–48 hours for inside Dhaka and 2–3 business days for outside Dhaka. Delivery delays caused by natural weather disruptions or courier logistics contingencies will be communicated promptly.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-900">
              4. Payment & Cash on Delivery (COD)
            </h2>
            <p>
              We primarily operate with 100% Cash on Delivery (COD), allowing customers to verify the package before payment. Digital mobile banking transfers (bKash/Nagad) may also be used upon delivery with the delivery representative.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-black text-gray-900">
              5. Intellectual Property
            </h2>
            <p>
              All trademarks, product photography, logos, branding assets, and textual content displayed on this website are the intellectual property of Sader Vubon and may not be copied, reproduced, or used without prior written authorization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
