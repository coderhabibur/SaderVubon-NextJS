import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, RotateCcw, ShieldCheck, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `রিটার্ন ও রিফান্ড পলিসি | ${siteConfig.name}`,
  description: `স্বাদের ভুবনের ৭ দিনের সহজ রিটার্ন ও রিফান্ড পলিসি। পণ্যে কোনো ত্রুটি থাকলে সাথে সাথে রিটার্ন বা পরিবর্তন করার সুবিধা।`,
  alternates: {
    canonical: `${siteConfig.url}/refund-policy`,
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-gray-50 flex-1 py-8 sm:py-14">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-brand-green transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">Return & Refund Policy</span>
        </nav>

        {/* Content Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-12 shadow-xs space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
          <div className="border-b border-gray-200 pb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-brand-green text-xs font-bold mb-2">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>100% Buyer Protection</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-950">
              Return & Refund Policy
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Last updated: January 2026
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-black text-gray-900">
              1. Doorstep Inspection Guarantee
            </h2>
            <p>
              At Sader Vubon, your complete satisfaction is our foremost priority. We offer full Cash on Delivery nationwide. You are encouraged to inspect your parcel upon arrival in the presence of the courier delivery executive before completing payment. If any item is broken, leaking, damaged, or incorrect, you can reject the parcel right away with zero penalty.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-black text-gray-900">
              2. 7-Day Hassle-Free Replacement
            </h2>
            <p>
              If you discover any genuine manufacturing defect, broken seal, or quality issue after receiving your package, you are eligible for an immediate free replacement or refund within <strong>7 days</strong> of delivery:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-gray-600 text-sm">
              <li>Received an incorrect product or variant.</li>
              <li>Bottle leakage or damaged packaging during transit.</li>
              <li>Noticeable deviation in taste, aroma, or quality from our promised standard.</li>
              <li>Missing items or accessories in multi-item combo orders.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-black text-gray-900">
              3. Refund Execution & Timelines
            </h2>
            <p>
              Once your returned item is received at our fulfillment center and verified, our finance team will initiate your refund within <strong>24 to 72 hours</strong>. Refunds are sent directly to your preferred bKash, Nagad, Rocket, or local bank account.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-black text-gray-900">
              4. Return Shipping Costs
            </h2>
            <p>
              If the return is due to an error on our part (damaged, defective, or incorrect product), Sader Vubon will bear 100% of the return courier fees.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-black text-gray-900 text-base">Have an issue with your order? Reach out instantly</h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Hotline: {siteConfig.contact.hotline} | WhatsApp: {siteConfig.contact.phone}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`tel:${siteConfig.contact.hotline}`}
                className="px-4 py-2.5 rounded-xl bg-brand-green text-white font-bold text-xs hover:bg-brand-green-hover transition flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Hotline</span>
              </a>
              <a
                href={siteConfig.social.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-green-600 text-white font-bold text-xs hover:bg-green-700 transition flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
