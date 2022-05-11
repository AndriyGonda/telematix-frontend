import Vue from 'vue'
import VueRouter from 'vue-router'
import DevicesView from "@/views/DevicesView";
import MonitoringView from "@/views/MonitoringView";
import ReportView from "@/views/ReportView";
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'devices',
    component: DevicesView
  },
  {
    path: '/monitoring',
    name: 'monitoring',
    component: MonitoringView
  },
  {
    path: '/report',
    name: 'report',
    component: ReportView
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
