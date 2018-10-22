import Vue from "vue";
import VueParticles from "vue-particles";
import plugins from "./core/plugins";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

Vue.use(VueParticles);
Vue.use(plugins);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
