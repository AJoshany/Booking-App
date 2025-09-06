import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/Dashboard/Dashboard.vue";
import Login from "../components/Login/Login.vue";
import SignUp from "../components/Login/SignUp.vue";
import Apointments from "../components/Apointments/Apointments.vue";

function isLogin() {
  const isLogin = localStorage.getItem("currentUser") || "";
  return isLogin;
}

const routes = [
  { path: "/", component: Login },
  { path: "/signup", component: SignUp },
  {
    path: "/dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (isLogin()) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/appointments",
    component: Apointments,
    beforeEnter: (to, from, next) => {
      if (isLogin()) {
        next();
      } else {
        next("/");
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
