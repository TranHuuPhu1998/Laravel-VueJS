import { createRouter, createWebHistory } from "vue-router";
import Dashboards from "../views/Dashboards.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import Surveys from "../views/Surveys.vue";
import SurveyView from "../views/SurveyView.vue";
import SurveyCreate from "../views/SurveyView.vue";
import SurveyPublicView from "../views/SurveyPublicView.vue";
import AuthLayout from "../components/AuthLayout.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DefaultLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/dashboard",
        component: Dashboards,
        name: "Dashboard",
      },
      {
        path: "/surveys",
        component: Surveys,
        name: "Surveys",
      },
      {
        path: "/surveys/create",
        component: SurveyCreate,
        name: "SurveysCreate",
      },
      {
        path: "/surveys/:id",
        component: SurveyView,
        name: "SurveyView",
      },
    ],
  },
  {
    path: "/view/survey/:slug",
    name: "SurveyPublicView",
    component: SurveyPublicView,
  },
  {
    path: "/auth",
    redirect: "login",
    name: "Auth",
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  strict: true, // applies to all routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "Login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
