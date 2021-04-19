import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/categories/:category?",
    alias: "/",
    name: "Category",
    component: () => import(/* webpackChunkName: "AppList" */ "../views/AppList.vue")
  },
  {
    path: "/apps/:id",
    name: "Web App",
    component: () => import(/* webpackChunkName: "WebApp" */ "../views/WebApp.vue")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "*",
    name: "Not Found",
    component: () => import(/* webpackChunkName: "404" */ "../views/404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
