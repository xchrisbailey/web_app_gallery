module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: "http://localhost:3000"
  },
  pwa: {
    name: "Web App Gallery",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black-translucent"
  }
};
