import { createRouter, createWebHistory } from "vue-router";

const HomePage = () => import("../pages/HomePage.vue");
const ModifiedRates = () => import("../pages/ModifiedRates.vue");
const SearchRate = () => import("../pages/SearchRate.vue");
const EditRate = () => import("../pages/EditRate.vue");
const NotFound = () => import("../pages/NotFound.vue");

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/modified", name: "ModifiedRates", component: ModifiedRates },
  { path: "/search", name: "SearchRate", component: SearchRate },
  {
    path: "/edit/:currencyCode",
    name: "EditRate",
    component: EditRate,
    props: true,
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
