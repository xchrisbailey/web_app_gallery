import axios from "axios";

console.log("Note: for this script to work auth must be disabled for /api/webapp");

axios.defaults.baseURL = "http://localhost:3000";

const apps = [
  {
    appUrl: "https://proxx.app/",
    category: "games"
  },
  {
    appUrl: "https://connexagon.web.app/",
    category: "games"
  },
  {
    appUrl: "https://doodlecricket.github.io/",
    category: "games"
  },
  {
    appUrl: "https://sudoku.jull.dev/",
    category: "games"
  },
  {
    appUrl: "https://snake-pwa.github.io/",
    category: "games"
  },
  {
    appUrl: "https://www.towergame.app/",
    category: "games"
  },
  {
    appUrl: "https://crossyroad.netlify.app/",
    category: "games"
  },
  {
    appUrl: "https://maxwellito.github.io/breaklock/",
    category: "games"
  },
  {
    appUrl: "https://mastermind.jull.dev/",
    category: "games"
  },
  {
    appUrl: "https://mahjong.jull.dev/",
    category: "games"
  },
  {
    appUrl: "https://malzeit.jull.dev/",
    category: "games"
  },
  {
    appUrl: "https://santatracker.google.com/",
    category: "games"
  },
  {
    appUrl: "https://kylesureline.com/hangapp/",
    category: "games"
  },
  {
    appUrl: "https://the-circle.app",
    category: "games"
  },
  {
    appUrl: "https://FreeSolitaire.win/",
    category: "games"
  },
  {
    appUrl: "https://vaporboy.net/",
    category: "games"
  },
  {
    appUrl: "https://arrows-rain.firebaseapp.com/",
    category: "games"
  },
  {
    appUrl: "https://bubblepairs.apps.in.rs/",
    category: "games"
  },
  {
    appUrl: "https://www.youtube.com/",
    category: "social"
  },
  {
    appUrl: "https://www.pinterest.com/",
    category: "social"
  },
  {
    appUrl: "https://tinder.com/",
    category: "social"
  },
  {
    appUrl: "https://twitter.com/",
    category: "social"
  },
  {
    appUrl: "https://www.instagram.com/",
    category: "social"
  },
  {
    appUrl: "https://web.telegram.org/",
    category: "social"
  },
  {
    appUrl: "https://www.tiktok.com/",
    category: "social"
  },
  {
    appUrl: "https://www.trivago.com/",
    category: "travel"
  },
  {
    appUrl: "https://sky.shiiyu.moe/",
    category: "utilities"
  },
  {
    appUrl: "https://encounters.heromuster.com/",
    category: "utilities"
  },
  {
    appUrl: "https://squoosh.app/",
    category: "utilities"
  },
  {
    appUrl: "https://musickit.jull.dev/tuner",
    category: "utilities"
  },
  {
    appUrl: "https://snapdrop.net/",
    category: "utilities"
  },
  {
    appUrl: "https://www.pencilapp.io/",
    category: "utilities"
  },
  {
    appUrl: "https://lofi.news/",
    category: "news"
  },
  {
    appUrl: "https://www.olx.in/",
    category: "shopping"
  },
  {
    appUrl: "https://m.aliexpress.com/",
    category: "shopping"
  },
  {
    appUrl: "https://www.google.co.in/maps",
    category: "navigation"
  },
  {
    appUrl: "https://playlist.iondrimbafilho.me/",
    category: "music"
  },
  {
    appUrl: "https://www.duolingo.com/",
    category: "education"
  }
];

for (const app of apps) {
  axios.post("/api/webapp", app);
}
