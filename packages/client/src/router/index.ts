import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import SignInView from "../views/SignInView.vue"
import SignUpView from "../views/SignUpView.vue"

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "*",
    name: "Not Found",
    component: () => import(/* webpackChunkName: "404" */ "../views/404.vue")
  },
  {
    path:"/signIn",
    name:"signIn",
    component: SignInView
  },
  {
    path:"/signUp",
    name:"signUp",
    component: SignUpView
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
