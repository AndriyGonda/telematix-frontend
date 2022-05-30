import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import vSelect from 'vue-select'
import VModal from 'vue-js-modal'
import loader from "vue-ui-preloader"
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'leaflet/dist/leaflet.css'
import 'vue-select/dist/vue-select.css'
import { Plotly } from 'vue-plotly';
Vue.use(Plotly);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VModal)
Vue.component('v-select', vSelect)
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.use(loader);
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
