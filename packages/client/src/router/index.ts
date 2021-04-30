import Vue from "vue";
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

function requireAuth(to: Route, from: Route, next: NavigationGuardNext<Vue>) {

  if (store.getters.userCredential == true) {
    next()
  } else {
    next({ name: "signIn", query: {redirect: to.path} });
  }
  // getUser()
  //   .then(() => next())
  //   .catch(() => next({ name: "signIn", query: { redirect: to.path } }));
}

const routes: Array<RouteConfig> = [
  {
    path: "/categories/:category?",
    alias: "/",
    name: "Category",
    component: () => import(/* webpackChunkName: "AppList" */ "../views/AppList.vue")
  },
  {
    path: "/apps/submit",
    name: "Submit App",
    component: () => import(/* webpackChunkName: "SubmitApp" */ "../views/SubmitApp.vue"),
    beforeEnter: requireAuth
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
  },
  {
    path: "/signIn",
    alias: "/login",
    name: "signIn",
    component: () => import(/* webpackChunkName: "signin" */ "../views/SignInView.vue")
  },
  {
    path: "/signUp",
    name: "signUp",
    component: () => import(/* webpackChunkName: "signup" */ "../views/SignUpView.vue")
  },
  {
    path: "/apps/:id/review",
    name: "Rating",
    component: () => import(/* webpackChunkName: "review" */ "../views/review.vue"),
    beforeEnter: requireAuth
  },
  {
    path: "/Profile",
    name: "Profile",
    component: () => import(/* webpackChunkName: "review" */ "../views/userProfileView.vue"),
    beforeEnter: requireAuth
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
