import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import Home from "@views/landing/Home.vue";
import SignIn from "../views/Auth/SignIn.vue";
import SignUp from "@views/Auth/SignUp.vue";
import Analyze from "@views/Profile/Analyze.vue";
import MyAnalyze from "@views/Profile/MyAnalyze.vue";
import DetailAnalyze from "@views/Profile/DetailAnalyze.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/profile/analyze",
    name: "Analyze",
    component: Analyze,
  },
  {
    path: "/profile/my-analyze",
    name: "My Analyze",
    component: MyAnalyze,
  },
  {
    path: "/profile/detail-analyze",
    name: "Detail Analyze",
    component: DetailAnalyze,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
