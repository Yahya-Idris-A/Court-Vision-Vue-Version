import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@views/landing/Home.vue";
import Authentication from "@views/Auth/Authentication.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/authentication ",
    name: "Authentication",
    component: Authentication,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
