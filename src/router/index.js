import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const constantRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  }
];

const asyncRoutes = [

]


const router = new VueRouter({
  constantRoutes,
});

export default router;
