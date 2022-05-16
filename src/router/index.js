import Vue from 'vue'
import VueRouter from 'vue-router'
import DevicesView from "@/views/DevicesView";
import MonitoringView from "@/views/MonitoringView";
import ReportView from "@/views/ReportView";
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import MessagesView from "@/views/MessagesView";
import ProfileView from "@/views/ProfileView";

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
    path: '/devices',
    alias: '/',
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
    path: '/messages',
    name: 'messages',
    component: MessagesView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
