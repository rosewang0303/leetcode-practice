import { createWebHistory, createRouter } from "vue-router";

import HomeView from "@/components/Home.vue";
import PracticeView from "@/views/Practice.vue";
import NotFoundView from "@/views/NotFound.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/practice/:id", component: PracticeView },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
