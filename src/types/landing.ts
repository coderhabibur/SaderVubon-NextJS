export interface FunnelProduct {
  id: number;
  name: string;
  weight: string;
  regularPrice: number;
  salePrice: number;
  image: string;
  badge?: string;
  isPopular?: boolean;
}

export interface OrderBumpData {
  id: number;
  title: string;
  subtitle?: string;
  pitch: string;
  regularPrice: number;
  salePrice: number;
  image: string;
  badge?: string;
}

export interface ReviewScreenshot {
  id: number;
  image: string;
  alt: string;
}

export interface LandingFAQ {
  question: string;
  answer: string;
}

export interface LandingFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface LandingConfig {
  slug: string;
  title: string;
  seoDescription: string;
  badge: string;
  headline: string;
  highlightText: string;
  subheadline: string;
  heroImage: string;
  videoUrl?: string;
  videoEmbed?: string;
  theme?: {
    primaryColor?: string; // e.g. '#8B3A14' or '#062b1e'
    accentColor?: string;
    gradientFrom?: string;
    gradientTo?: string;
  };
  features: LandingFeature[];
  products: FunnelProduct[];
  defaultSelectedProductId?: number;
  orderBump?: OrderBumpData;
  reviews?: ReviewScreenshot[];
  faqs?: LandingFAQ[];
  guaranteeNotice?: string;
}
