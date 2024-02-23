import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../view/common/login.vue"),
  },
  {
    path: "/changePassword",
    name: "changePassword",
    component: () => import("../view/common/changePassword.vue"),
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
  // teacher
  {
    path: "/admin/teacher",
    name: "teacher",
    component: () => import("../view/admin/teacher/index.vue"),
  },
  {
    path: "/admin/addTeacher",
    name: "addTeacher",
    component: () => import("../view/admin/teacher/add.vue"),
  },
  {
    path: "/admin/editTeacher",
    name: "editTeacher",
    component: () => import("../view/admin/teacher/edit.vue"),
  },
  // class
  {
    path: "/admin/class",
    name: "class",
    component: () => import("../view/admin/class/index.vue"),
  },
  {
    path: "/admin/addClass",
    name: "addClass",
    component: () => import("../view/admin/class/add.vue"),
  },
  //parents
  {
    path: "/admin/parents",
    name: "parents",
    component: () => import("../view/admin/parents/index.vue"),
  },
  {
    path: "/admin/addParents",
    name: "addParent",
    component: () => import("../view/admin/parents/add.vue"),
  },
  {
    path: "/admin/print",
    name: "printAccount",
    component: () => import("../view/admin/teacher/printAccount.vue"),
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
