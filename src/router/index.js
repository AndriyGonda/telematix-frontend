import Vue from 'vue'
import VueRouter from 'vue-router'
import DevicesView from "@/views/DevicesView";
import MonitoringView from "@/views/MonitoringView";
import ReportView from "@/views/ReportView";
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import Error from "@/views/Error";

Vue.use(VueRouter)

const ifAuthenticated = (to, from, next) => {
  if (sessionStorage.getItem('token')) {
    next()
    return
  }
  next('/login')
}

const routes = [
  {
    path: '/',
    name: 'devices',
    component: DevicesView,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/monitoring',
    name: 'monitoring',
    component: MonitoringView,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/report',
    name: 'report',
    component: ReportView,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: "*",
    name: 'NotFound',
    component: () => Error
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
