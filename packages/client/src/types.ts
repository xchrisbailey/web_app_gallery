export interface WebApp {
  manifestURL: string;
  startUrl: string;
  name: string;
  description: string;
  icon: Icon;
  appleMobileWebAppCapable: boolean;
  categories?: Category[];
  screenshots?: Screenshot[];
  themeColor?: string;
  backgroundColor?: string;
  averageRating: number;
}

export type Category =
  | "books"
  | "business"
  | "donations"
  | "education"
  | "entertainment"
  | "finance"
  | "fitness"
  | "food"
  | "fundraising"
  | "games"
  | "government"
  | "health"
  | "kids"
  | "lifestyle"
  | "magazines"
  | "medical"
  | "music"
  | "navigation"
  | "news"
  | "personalization"
  | "photo"
  | "politics"
  | "productivity"
  | "security"
  | "shopping"
  | "social"
  | "sports"
  | "travel"
  | "utilities"
  | "weather";

export const categories: Category[] = [
  "books",
  "business",
  "donations",
  "education",
  "entertainment",
  "finance",
  "fitness",
  "food",
  "fundraising",
  "games",
  "government",
  "health",
  "kids",
  "lifestyle",
  "magazines",
  "medical",
  "music",
  "navigation",
  "news",
  "personalization",
  "photo",
  "politics",
  "productivity",
  "security",
  "shopping",
  "social",
  "sports",
  "travel",
  "utilities",
  "weather",
];

export function isCategory(category: any): category is Category {
  return categories.includes(category);
}

export interface Icon {
  src: string;
  purpose: "any" | "maskable";
}

export interface Screenshot {
  src: string;
  size?: { height: number; width: number };
  label?: string;
  platform?: Platform;
}

export type Platform =
  | "narrow"
  | "wide"
  | "android"
  | "chromeos"
  | "ios"
  | "kaios"
  | "macos"
  | "windows"
  | "windows10x"
  | "xbox"
  | "chrome_web_store"
  | "play"
  | "itunes"
  | "microsoft";

export const platforms: Platform[] = [
  "narrow",
  "wide",
  "android",
  "chromeos",
  "ios",
  "kaios",
  "macos",
  "windows",
  "windows10x",
  "xbox",
  "chrome_web_store",
  "play",
  "itunes",
  "microsoft",
];

export function isPlatform(platform: any): platform is Platform {
  return platforms.includes(platform);
}

export interface Review {
  rating: number;
  review?: string;
  name: string;
  lastUpdated: number;
}
