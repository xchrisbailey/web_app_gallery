module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: "http://webappgallery_server:3000",
    disableHostCheck: true
  },
  pwa: {
    name: "Web App Gallery",
    themeColor: "#00897b",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black-translucent",
    manifestOptions: {
      icons: [
        {
          src: "./img/icons/any-192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any"
        },
        {
          src: "./img/icons/any-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any"
        },
        {
          src: "./img/icons/any.svg",
          sizes: "any",
          type: "image/svg+xml",
          purpose: "any"
        },
        {
          src: "./img/icons/maskable-192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "./img/icons/maskable-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "./img/icons/maskable.svg",
          sizes: "any",
          type: "image/svg+xml",
          purpose: "maskable"
        },
        {
          src: "./img/icons/monochrome-192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "monochrome badge"
        },
        {
          src: "./img/icons/monochrome-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "monochrome badge"
        },
        {
          src: "./img/icons/monochrome.svg",
          sizes: "any",
          type: "image/svg+xml",
          purpose: "monochrome badge"
        }
      ]
    },
    iconPaths: {
      favicon32: "img/icons/favicon-32.png",
      favicon16: "img/icons/favicon-16.png",
      appleTouchIcon: "img/icons/apple-touch-512.png",
      maskIcon: "img/icons/monochrome.svg",
      msTileImage: "img/icons/ms-tile-144.png"
    }
  }
};
