import Vue from 'vue'
import VueRouter from 'vue-router'
import DevicesView from "@/views/DevicesView";
import ReportView from "@/views/ReportView";
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import MessagesView from "@/views/MessagesView";
import ProfileView from "@/views/ProfileView";
import SensorsView from "@/views/SensorsView";

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
    path: '/reports',
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
    component: MessagesView,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/device/:id/sensors',
    name: 'sensors',
    component: SensorsView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
