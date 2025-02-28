import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@views/landing/Home.vue";
const routes = [
  {
    path: "/",
    name: "Basketball",
    component: Home,
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
