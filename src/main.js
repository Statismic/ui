import Vue from "vue";
import "./plugins/vuetify";
import plugins from "./core/plugins";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import StatismicPlots from "@statismic/plots";
import "./registerServiceWorker";

Vue.use(plugins);
Vue.use(StatismicPlots);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
