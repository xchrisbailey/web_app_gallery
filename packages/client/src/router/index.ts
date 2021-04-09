import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/apps/:id",
    name: "Web App",
    component: () =>
      import(/* webpackChunkName: "WebApp" */ "../views/WebApp.vue")
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
  },
  {
    path:"/signIn",
    name:"signIn",
    component: () => import(/* webpackChunkName: "signin" */ "../views/SignInView.vue")
  },
  {
    path:"/signUp",
    name:"signUp",
    component: () => import(/* webpackChunkName: "signup" */ "../views/SignUpView.vue")
  },
  {
    path: "/Rating",
    name: "Rating",
    component: () => import(/* webpackChunkName: "review" */ "../views/Ratings.vue")    
  }
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
