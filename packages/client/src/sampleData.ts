import { ApiResponse, Review, WebApp } from "./types";

export const sampleApps: ApiResponse<WebApp[]> = {
  status: "ok",
  data: [
    {
      _id: "0",
      manifestURL: "https://sky.shiiyu.moe/manifest.webmanifest",
      startURL: "https://sky.shiiyu.moe/",
      name: "SkyCrypt",
      description: "A beautiful site for sharing your SkyBlock profile 🌹",
      category: "utilities",
      icons: [
        {
          src: "/resources/img/app-icons/svg.svg",
          sizes: "any",
          type: "image/svg+xml",
          purpose: "any"
        },
        {
          src: "/resources/img/app-icons/192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any"
        },
        { src: "/resources/img/app-icons/512.png", sizes: "512x512", type: "image/png", purpose: "any" },
        {
          src: "/resources/img/app-icons/maskable-svg.svg",
          sizes: "any",
          type: "image/svg+xml",
          purpose: "maskable"
        },
        {
          src: "/resources/img/app-icons/maskable-192.webp",
          sizes: "192x192",
          type: "image/webp",
          purpose: "maskable"
        },
        {
          src: "/resources/img/app-icons/maskable-512.webp",
          sizes: "512x512",
          type: "image/webp",
          purpose: "maskable"
        }
      ],
      screenshots: [
        {
          src: "https://sky.shiiyu.moe/resources/img/screenshot.jpg",
          size: { height: 2160, width: 3840 }
        }
      ],
      themeColor: "#282828",
      backgroundColor: "#282828",
      appleMobileWebAppCapable: true,
      averageRating: 4.8
    },
    {
      _id: "1",
      manifestURL: "https://example.com/manifest.json",
      startURL: "https://example.com/",
      name: "example app",
      description: "this app is an example app",
      category: "utilities",
      icons: [
        {
          src: "https://www.w3.org/TR/appmanifest/images/icon-mask-windows.svg",
          purpose: "maskable"
        }
      ],
      appleMobileWebAppCapable: false,
      averageRating: 2.3
    },
    {
      _id: "1",
      manifestURL: "https://proxx.app/manifest.json",
      startURL: "https://proxx.app/",
      name: "PROXX",
      description: "Help your crew navigate space by marking out the black holes using proxx, your proximity scanner.",
      category: "games",
      icons: [
        { src: "assets/icon-05a70868.png", type: "image/png", sizes: "1024x1024" },
        { src: "assets/icon-maskable-7a2eb399.png", type: "image/png", sizes: "1024x1024", purpose: "maskable" }
      ],
      appleMobileWebAppCapable: true,
      themeColor: "#0e103e",
      backgroundColor: "#0e103e",
      averageRating: 4.3
    }
  ]
};

export const sampleReviews: ApiResponse<Review[]> = {
  status: "ok",
  data: [
    {
      rating: 5,
      review: "I love this app!",
      name: "Nate",
      lastUpdated: 1615845522
    },
    {
      rating: 3,
      name: "Lorem Ipsum",
      lastUpdated: 1615840284
    },
    {
      rating: 4,
      name: "User32",
      lastUpdated: 1615843606
    },
    {
      rating: 1,
      review: "I hate this app it doesn't even work. When ever I try to open it it says app crashed.",
      name: "Eeyore",
      lastUpdated: 1615837503
    }
  ]
};

export const sampleError: ApiResponse<any> = {
  status: "error",
  message: "Amet rem vel a harum"
};
