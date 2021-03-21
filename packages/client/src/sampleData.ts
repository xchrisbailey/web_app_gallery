import { Review, WebApp } from './types';

interface DataReturn {
  status: 'ok' | 'error';
  data?: WebApp | WebApp[] | Review | Review[];
  message?: string;
}

interface AppsReturn extends DataReturn {
  status: 'ok';
  data: WebApp[];
}

interface ReviewsReturn extends DataReturn {
  status: 'ok';
  data: Review[];
}

interface ErrorReturn extends DataReturn {
  status: 'error';
  message: string;
}

export const sampleApps: AppsReturn = {
  status: 'ok',
  data: [
    {
      manifestURL: 'https://sky.shiiyu.moe/manifest.webmanifest',
      startUrl: 'https://sky.shiiyu.moe/',
      name: 'SkyCrypt',
      description: 'A beautiful site for sharing your SkyBlock profile 🌹',
      icon: {
        src: 'https://sky.shiiyu.moe/resources/img/app-icons/maskable-192.webp',
        purpose: 'maskable'
      },
      screenshots: [
        {
          src: 'https://sky.shiiyu.moe/resources/img/screenshot.jpg',
          size: { height: 2160, width: 3840 }
        }
      ],
      themeColor: '#282828',
      backgroundColor: '#282828',
      appleMobileWebAppCapable: true,
      averageRating: 4.8
    },
    {
      manifestURL: 'https://example.com/manifest.json',
      startUrl: 'https://example.com/',
      name: 'example app',
      description: 'this app is an example app',
      icon: {
        src: 'https://www.w3.org/TR/appmanifest/images/icon-mask-windows.svg',
        purpose: 'maskable'
      },
      appleMobileWebAppCapable: false,
      averageRating: 2.3
    },
    {
      manifestURL: 'https://proxx.app/manifest.json',
      startUrl: 'https://proxx.app/',
      name: 'PROXX',
      description:
        'Help your crew navigate space by marking out the black holes using proxx, your proximity scanner.',
      icon: {
        src: 'https://proxx.app/assets/icon-maskable-7a2eb399.png',
        purpose: 'maskable'
      },
      appleMobileWebAppCapable: true,
      themeColor: '#0e103e',
      backgroundColor: '#0e103e',
      averageRating: 4.3
    }
  ]
};

export const sampleReviews: ReviewsReturn = {
  status: 'ok',
  data: [
    {
      rating: 5,
      review: 'I love this app!',
      name: 'Nate',
      lastUpdated: 1615845522
    },
    {
      rating: 3,
      name: 'Lorem Ipsum',
      lastUpdated: 1615840284
    },
    {
      rating: 4,
      name: 'User32',
      lastUpdated: 1615843606
    },
    {
      rating: 1,
      review:
        "I hate this app it doesn't even work. When ever I try to open it it says app crashed.",
      name: 'Eeyore',
      lastUpdated: 1615837503
    }
  ]
};

export const sampleError: ErrorReturn = {
  status: 'error',
  message: 'Amet rem vel a harum'
};
