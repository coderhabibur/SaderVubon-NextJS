import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#062b1e] via-[#042016] to-[#02130d] text-gray-200 pt-16 pb-24 sm:pb-12 border-t-4 border-brand-yellow">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer Grid - 4 Columns on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-14 border-b border-emerald-900/60">
          
          {/* 1. Brand Column */}
          <div>
            {/* Brand Logo & Name */}
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
                <span className="text-2xl font-black text-white block leading-tight tracking-tight group-hover:text-brand-yellow transition-colors">
                  স্বাদের ভুবন
                </span>
                <span className="text-xs font-black text-brand-yellow block tracking-widest uppercase mt-0.5">
                  Sader Vubon
                </span>
              </div>
            </Link>

            <p className="text-brand-yellow font-bold text-sm tracking-wide mb-2">
              🌾 {siteConfig.tagline}
            </p>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-sm">
              {siteConfig.description}
            </p>

            {/* Social Icons (Pure SVG) */}
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-emerald-900/80 hover:bg-brand-yellow hover:text-brand-dark text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                title="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Messenger */}
              <a
                href={siteConfig.social.messenger}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-emerald-900/80 hover:bg-brand-yellow hover:text-brand-dark text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                title="Messenger"
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              {/* YouTube */}
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-emerald-900/80 hover:bg-brand-yellow hover:text-brand-dark text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                title="YouTube"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={siteConfig.social.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-green-600 hover:bg-green-500 text-white flex items-center justify-center transition-all duration-300 shadow-sm"
                title="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 2. Useful Links */}
          <div>
            <h4 className="text-white font-black text-base sm:text-lg mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-brand-yellow">
              Useful Links
            </h4>
            <ul className="space-y-3 text-sm sm:text-base font-medium">
              {[
                { name: "About Us", href: "/about" },
                { name: "Track Order", href: "/track-order" },
                { name: "Shipping Policy", href: "/shipping-policy" },
                { name: "Return Policy", href: "/refund-policy" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms & Conditions", href: "/terms" },
                { name: "Contact Us", href: "/contact" },
                { name: "Shop", href: "/shop" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-brand-yellow transition-colors block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Top Categories */}
          <div>
            <h4 className="text-white font-black text-base sm:text-lg mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-brand-yellow">
              Top Categories
            </h4>
            <ul className="space-y-3 text-sm sm:text-base font-medium">
              {[
                { name: "Date & Sugarcane Jaggery", href: "/category/gur" },
                { name: "Sundarban Raw Honey", href: "/category/honey" },
                { name: "Pure Mustard Oil", href: "/category/oil" },
                { name: "Homemade Special Pickles", href: "/category/pickle" },
                { name: "Fresh Rajshahi Mangoes", href: "/category/mango" },
                { name: "Combos & Special Offers", href: "/category/offer" },
              ].map((cat, idx) => (
                <li key={idx}>
                  <Link
                    href={cat.href}
                    className="text-gray-300 hover:text-brand-yellow transition-colors block"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Us */}
          <div>
            <h4 className="text-white font-black text-base sm:text-lg mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-brand-yellow">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-900/60 flex items-center justify-center text-brand-yellow shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-gray-300 leading-snug">{siteConfig.contact.address}</span>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-900/60 flex items-center justify-center text-brand-yellow shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block leading-none mb-0.5">Hotline</span>
                  <a
                    href={`tel:${siteConfig.contact.hotline}`}
                    className="text-white font-bold hover:text-brand-yellow transition-colors"
                  >
                    {siteConfig.contact.hotline}
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-900/60 flex items-center justify-center text-green-400 shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block leading-none mb-0.5">Phone / WhatsApp</span>
                  <a
                    href={siteConfig.social.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold hover:text-brand-yellow transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-900/60 flex items-center justify-center text-brand-yellow shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-gray-300 hover:text-brand-yellow transition-colors break-all"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Row (Full English) */}
        <div className="pt-8 text-center text-sm text-gray-400 font-medium">
          <p>
            © {new Date().getFullYear()}{" "}
            <strong className="text-white font-semibold">Sadervubon.com</strong> | All rights reserved
            — Developed By{" "}
            <a
              href="https://coderitsolution.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-yellow hover:underline cursor-pointer font-bold inline-block"
            >
              Coder IT Solution
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
