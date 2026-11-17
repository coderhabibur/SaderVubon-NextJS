import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { OrderLandingClient } from "./OrderLandingClient";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "দক্ষ গাছিদের হাতে নিরাপদ খেজুরের গুড় — নিশ্চিন্তে অর্ডার করুন | স্বাদের ভুবন",
  description:
    "কোনো প্রকার চিনি, হাইড্রোজ বা ক্ষতিকর কেমিক্যাল ছাড়াই মাটির চুলায় সনাতন পদ্ধতিতে তৈরি খাঁটি দানাদার, পাটালি ও ঝোলা গুড়। ক্যাশ অন ডেলিভারি সারা দেশে।",
  alternates: {
    canonical: `${siteConfig.url}/khejur-gur-patali-jhola`,
  },
  openGraph: {
    title: "দক্ষ গাছিদের হাতে নিরাপদ খেজুরের গুড় — নিশ্চিন্তে অর্ডার করুন",
    description:
      "কোনো প্রকার চিনি, হাইড্রোজ বা ক্ষতিকর কেমিক্যাল ছাড়াই মাটির চুলায় সনাতন পদ্ধতিতে তৈরি খাঁটি দানাদার, পাটালি ও ঝোলা গুড়।",
    url: `${siteConfig.url}/khejur-gur-patali-jhola`,
    images: [
      {
        url: "/images/hero-gur-farmer.jpg",
        width: 800,
        height: 600,
        alt: "খাঁটি খেজুরের গুড় - স্বাদের ভুবন",
      },
    ],
  },
};

export default function KhejurGurLandingPage() {
  return <OrderLandingClient />;
}
