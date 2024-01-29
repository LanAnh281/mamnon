import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../view/common/login.vue"),
  },
  //Admin
  {
    path: "/admin/account",
    name: "Account",
    component: () => import("../view/admin/account/account.vue"),
  },
  {
    path: "/admin/school",
    name: "school",
    component: () => import("../view/admin/school/index.vue"),
  },
  {
    path: "/admin/menuDaily",
    name: "menuDaily",
    component: () => import("../view/admin/menuDaily/index.vue"),
  },
  //User

  {
    path: "/",
    name: "homepage",
    component: () => import("../view/user/index.vue"),
  },
  {
    path: "/introduce",
    name: "introduce",
    component: () => import("../view/user/introduce.vue"),
  },
  {
    path: "/programStudy",
    name: "programStudy",
    component: () => import("../view/user/programStudy.vue"),
  },
  {
    path: "/detailStudy",
    name: "detailStudy",
    component: () => import("../view/user/detailStudy.vue"),
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("../view/user/contact.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
