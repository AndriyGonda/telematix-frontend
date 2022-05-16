import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/auth";
import device from "@/store/device"
Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      auth,
      device
    },
    strict: process.env.DEV
  })

  return Store
}
