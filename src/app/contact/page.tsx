import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ContactClientView } from "./ContactClientView";

export const metadata: Metadata = {
  title: "যোগাযোগ ও কাস্টমার কেয়ার | স্বাদের ভুবন (Sader Vubon)",
  description:
    "স্বাদের ভুবনের কাস্টমার কেয়ার হটলাইন: 01305762659, সরাসরি হোয়াটসঅ্যাপ: 01305762659। যেকোনো পণ্য বা অর্ডারের বিষয়ে আমাদের সাথে সরাসরি যোগাযোগ করুন।",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: "যোগাযোগ ও কাস্টমার কেয়ার | স্বাদের ভুবন",
    description:
      "হটলাইন: 01305762659, হোয়াটসঅ্যাপ: 01305762659। খাঁটি ও বিশুদ্ধ পণ্যের আস্থায় স্বাদের ভুবন।",
    url: `${siteConfig.url}/contact`,
    type: "website",
    images: ["/logo.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "যোগাযোগ | স্বাদের ভুবন",
    description: "হটলাইন: 01305762659, হোয়াটসঅ্যাপ: 01305762659",
    images: ["/logo.webp"],
  },
};

export default function ContactPage() {
  return <ContactClientView />;
}
