"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2, Clock } from "lucide-react";
import { siteConfig } from "@/config/site";

export function ContactClientView() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-gray-50 flex-1 py-8 sm:py-14">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 font-medium">
          <Link href="/" className="hover:text-brand-green transition">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">যোগাযোগ</span>
        </nav>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-brand-green text-xs font-bold inline-block mb-2">
            আমরা আছি আপনার পাশে
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-950 mb-3">
            আমাদের সাথে যোগাযোগ করুন
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
            যেকোনো পণ্য, অর্ডার ট্র্যাকিং, পাইকারি ক্রয়ের তথ্য বা পরামর্শের জন্য আমাদের সাথে ফোন, হোয়াটসঅ্যাপ অথবা নিচের ফর্মে যোগাযোগ করতে পারেন।
          </p>
        </div>

        {/* 2-Column Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Channels (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Hotline */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500">কাস্টমার কেয়ার হটলাইন</p>
                <a
                  href={`tel:${siteConfig.contact.hotline}`}
                  className="text-lg font-black text-gray-900 hover:text-brand-green transition block mt-0.5"
                >
                  {siteConfig.contact.hotline}
                </a>
                <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-400" /> সকাল ৯:০০ – রাত ১০:০০ (প্রতিদিন)
                </p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-brand-green rounded-xl flex items-center justify-center shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500">সরাসরি হোয়াটসঅ্যাপ</p>
                <a
                  href={siteConfig.social.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-black text-gray-900 hover:text-brand-green transition block mt-0.5"
                >
                  {siteConfig.contact.phone}
                </a>
                <p className="text-[11px] text-gray-400 mt-0.5">দ্রুত চ্যাট ও অর্ডার সহায়তা</p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500">অফিসিয়াল ইমেইল</p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm font-black text-gray-900 hover:text-brand-green transition block mt-0.5 break-all"
                >
                  {siteConfig.contact.email}
                </a>
                <p className="text-[11px] text-gray-400 mt-0.5">অফিসিয়াল ও প্রাতিষ্ঠানিক যোগাযোগ</p>
              </div>
            </div>

            {/* Office Address */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500">অফিস ও ফুলফিলমেন্ট হাব</p>
                <p className="text-xs sm:text-sm font-bold text-gray-800 mt-0.5 leading-relaxed">
                  {siteConfig.contact.addressBangla || siteConfig.contact.address}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Message Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-xs">
              <h3 className="text-xl font-black text-gray-950 mb-1">
                মেসেজ পাঠান
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-6">
                আপনার কোনো মতামত, অভিযোগ বা জিজ্ঞাসা থাকলে নিচের ফর্মে লিখে পাঠান, আমাদের প্রতিনিধি দ্রুত যোগাযোগ করবে।
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-14 h-14 bg-brand-green text-white rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-black text-gray-900">
                    আপনার মেসেজ সফলভাবে পৌঁছেছে!
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto">
                    স্বাদের ভুবনের সাথে যোগাযোগ করার জন্য ধন্যবাদ। খুব শীঘ্রই আমাদের কাস্টমার সাপোর্ট টিম আপনার সাথে যোগাযোগ করবে।
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setPhone("");
                      setMessage("");
                    }}
                    className="mt-3 px-5 py-2 bg-brand-green text-white font-bold text-xs rounded-xl hover:bg-brand-green-hover transition cursor-pointer"
                  >
                    আরেকটি মেসেজ পাঠান
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      আপনার পূর্ণ নাম <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="যেমন: মোঃ কামরুল ইসলাম"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      মোবাইল নম্বর <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="যেমন: 017XXXXXXXX"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      আপনার বার্তা বা জিজ্ঞাসা <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="আপনার প্রশ্ন বা মতামত এখানে বিস্তারিত লিখুন..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm text-gray-900 transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-brand-green hover:bg-brand-green-hover text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>মেসেজ পাঠান</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
