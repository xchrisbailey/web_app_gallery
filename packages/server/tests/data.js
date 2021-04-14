const faker = require('faker');

const dummyUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

const dummyWebApp = {
  manifestURL: 'https://maps.google.com',
  startURL: 'https://maps.google.com',
  name: 'google maps',
  description: 'mobile maps',
  appleMobileWebCapable: true,
  category: 'navigation',
};

const dummyGoogleHtml = `<meta name="apple-mobile-web-app-capable" content="yes"><link rel="manifest" crossorigin="use-credentials" href="_/DotsSplashUi/manifest.json"><meta name="description" content="Comprehensive up-to-date news coverage, aggregated from sources all over the world by Google News.">`;

const dummyGoogleManifest = {
  name: 'Google News',
  short_name: 'News',
  start_url: '/?lfhs=2',
  theme_color: 'white',
  icons: [
    {
      src: '//ssl.gstatic.com/gnews/logo/google_news_192.png',
      type: 'image/png',
      sizes: '192x192',
    },
    {
      src: '//ssl.gstatic.com/gnews/logo/google_news_512.png',
      type: 'image/png',
      sizes: '512x512',
    },
    {
      src: '//ssl.gstatic.com/gnews/logo/google_news_1024.png',
      type: 'image/png',
      sizes: '1024x1024',
    },
    {
      src: '//ssl.gstatic.com/gnews/logo/google_news_120.png',
      type: 'image/png',
      sizes: '120x120',
    },
    {
      src: '//ssl.gstatic.com/gnews/logo/google_news_152.png',
      type: 'image/png',
      sizes: '152x152',
    },
    {
      src: '//ssl.gstatic.com/gnews/logo/google_news_167.png',
      type: 'image/png',
      sizes: '167x167',
    },
    {
      src: '//ssl.gstatic.com/gnews/logo/google_news_180.png',
      type: 'image/png',
      sizes: '180x180',
    },
    {
      src: '//ssl.gstatic.com/gnews/logo/google_news_80.png',
      type: 'image/png',
      sizes: '80x80',
    },
    {
      src: '//ssl.gstatic.com/gnews/logo/google_news_87.png',
      type: 'image/png',
      sizes: '87x87',
    },
    {
      src: '//ssl.gstatic.com/gnews/logo/google_news_58.png',
      type: 'image/png',
      sizes: '58x58',
    },
    {
      src: '//ssl.gstatic.com/gnews/logo/google_news_60.png',
      type: 'image/png',
      sizes: '60x60',
    },
    {
      src: '//ssl.gstatic.com/gnews/logo/google_news_40.png',
      type: 'image/png',
      sizes: '40x40',
    },
  ],
  background_color: 'white',
};

module.exports = {
  dummyUser,
  dummyWebApp,
  dummyGoogleHtml,
  dummyGoogleManifest,
};
