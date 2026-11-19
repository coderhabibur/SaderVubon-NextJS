import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { TrackOrderClientView } from "./TrackOrderClientView";

export const metadata: Metadata = {
  title: "অর্ডার ট্র্যাক করুন | লাইভ পার্সেল ট্র্যাকিং - স্বাদের ভুবন",
  description:
    "আপনার অর্ডার নম্বর ও মোবাইল নম্বর দিয়ে স্বাদের ভুবনের পার্সেলের বর্তমান অবস্থান ও লাইভ ডেলিভারি স্ট্যাটাস ট্র্যাক করুন।",
  alternates: {
    canonical: `${siteConfig.url}/track-order`,
  },
  openGraph: {
    title: "অর্ডার ট্র্যাক করুন | স্বাদের ভুবন",
    description: "আপনার অর্ডারের ডেলিভারি স্ট্যাটাস ও পার্সেল ট্র্যাক করুন সহজে।",
    url: `${siteConfig.url}/track-order`,
    type: "website",
    images: ["/logo.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "অর্ডার ট্র্যাক করুন | স্বাদের ভুবন",
    description: "আপনার অর্ডারের ডেলিভারি স্ট্যাটাস ও পার্সেল ট্র্যাক করুন সহজে।",
    images: ["/logo.webp"],
  },
};

export default function TrackOrderPage() {
  return <TrackOrderClientView />;
}
